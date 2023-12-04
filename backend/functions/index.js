const functions = require("firebase-functions");
const axios = require("axios");
const path = require("path");
const os = require("os");
const fs = require("fs");
const {v4: uuidv4} = require("uuid");
const Busboy = require("busboy");

const parseToBase64 = (string)=>Buffer.from(string).toString("base64");

// eslint-disable-next-line no-unused-vars, require-jsdoc
function readFile(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}


// eslint-disable-next-line require-jsdoc
async function uploadToPanda(file) {
  const API_KEY = process.env.PANDA_API_KEY;
  const FOLDER_ID = null;
  const VIDEO_ID = uuidv4();
  let FILENAME = file.split("/");
  FILENAME = FILENAME[FILENAME.length -1];

  const binaryFile = await readFile(file);

  let metadata = `authorization ${parseToBase64(API_KEY)}`;
  if (FOLDER_ID) {
    metadata += `, folder_id ${parseToBase64(FOLDER_ID)}`;
  }
  metadata += `, filename ${parseToBase64(FILENAME)}`;
  metadata += `, video_id ${parseToBase64(VIDEO_ID)}`;

  try {
    const {data: uploadServers} = await axios.get(
        "https://api-v2.pandavideo.com.br/hosts/uploader",
        {
          headers: {
            Authorization: API_KEY,
          },
        },
    );
    const allHosts = Object.values(uploadServers.hosts).reduce(
        (acc, curr) => [...acc, ...curr],
        [],
    );
    const host = allHosts[Math.floor(Math.random() * allHosts.length)];
    console.log(`Starting upload to ${host}`);

    // The binary file must be in the body of the POST request
    await axios.post(
        `https://${host}.pandavideo.com.br/files`,
        Buffer.from(binaryFile, "binary"),
        {
          headers: {
            "Tus-Resumable": "1.0.0",
            "Upload-Length": binaryFile.byteLength,
            "Content-Type": "application/offset+octet-stream",
            "Upload-Metadata": metadata,
          },
        },
    );
    console.log("Upload concluido com sucesso");
  } catch (error) {
    console.log("UPLOAD ERROR");
    console.log(error);
  }
}

exports.upload = functions.https.onRequest((req, res) => {
  if (req.method === "POST") {
    // eslint-disable-next-line max-len
    const busboy = Busboy({headers: req.headers});
    const uploads = {};

    busboy.on("file", (fieldname, file, {filename, mimetype, encoding}) => {
      filename = filename.replaceAll('-','');
      console.log(
          // eslint-disable-next-line max-len
          `File [${JSON.stringify(fieldname)}] filename: ${JSON.stringify(
              filename,
          )}, encoding: ${encoding}, mimetype: ${mimetype}`,
      );

      const filepath = path.join(os.tmpdir(), filename);
      uploads[fieldname] = {file: filepath};
      console.log(`Saving '${fieldname}' to ${filepath}`);
      file.pipe(fs.createWriteStream(filepath));
    });

    busboy.on("finish", async () => {
      // eslint-disable-next-line guard-for-in
      for (const name in uploads) {
        const upload = uploads[name];
        const file = upload.file;
        console.log('file',file);
        await uploadToPanda(file);
        res.write(`${file}\n`);
        // fs.unlinkSync(file);
      }
      res.status(201).end();
    });

    busboy.end(req.rawBody);
  } else {
    res.status(405).end();
  }
});

exports.helloWorld = functions.https.onRequest(async (request, response) => {
  response.send("hello world!");
});

exports.videos = functions.https.onRequest(async (request, response) => {
  const options = {
    method: "GET",
    url: "https://api-v2.pandavideo.com.br/videos",
    headers: {
      accept: "application/json",
      Authorization:
        // eslint-disable-next-line max-len
        process.env.PANDA_API_KEY,
    },
  };

  const {data} = await axios.request(options);
  const videos = data.videos;

  response.send(videos);
});
