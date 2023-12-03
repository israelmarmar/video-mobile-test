const functions = require("firebase-functions");
const axios = require("axios");
const querystring = require("querystring");

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
exports.helloWorld = functions.https.onRequest(async (request, response) => {
  response.send("hello world!");
});

// eslint-disable-next-line require-jsdoc
async function refreshToken() {
  try {
     // eslint-disable-next-line max-len
    const query = querystring.stringify({
      grant_type: "refresh_token",
      code: "d1f77f7c-0847-4836-84b7-9ff1a4cbfca6",
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      refresh_token: process.env.REFRESH_TOKEN
    });

    const tokens = await axios.post(
        `https://auth.pandavideo.com.br/oauth2/token?expires_in=2592000`,
        query,
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
        },
    );

    console.log(tokens.data);

    return tokens.data;
  } catch (error) {
    console.error("Erro ao autenticar", error.response);
    return null;
  }
}

exports.videos = functions.https.onRequest(async (request, response) => {
  const url = "https://api-v2.pandavideo.com.br/client";
  const headers = {
    "Authorization": process.env.PANDA_API_KEY,
    "accept": "application/json",
    "content-type": "application/json",
  };

  const dat = {
    name: "server",
    callback_url: "https://localhost:5001",
    website_url: "https://localhost:5001",
    logo: "data:image/png;base64,444",
  };

  // const clients = await axios.post(url, dat, {headers});
  // const client = clients.data[0];

  // console.log(clients);

  // eslint-disable-next-line max-len
  //const { access_token } = await refreshToken();

  //console.log(access_token)

  const fetchImage = async (imageUrl) => {
    try {
      const response = await axios.post(imageUrl, { Authorization: `Bearer ${access_token}` });

      // eslint-disable-next-line max-len
      return ("data:image/png;base64," + Buffer.from(response.data, "binary").toString("base64"));
    } catch (error) {
      console.error("Erro ao buscar imagem:", error.message);
      return null;
    }
  };

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

  // eslint-disable-next-line max-len
  for (let i=0; i<videos.length; i++) {
    // eslint-disable-next-line max-len
    //videos[i] = {...videos[i], thumbnail: await fetchImage(videos[i].thumbnail)};
  }

  response.send(videos);
});
