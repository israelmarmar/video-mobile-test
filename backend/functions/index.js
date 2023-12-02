const functions = require("firebase-functions");
const axios = require("axios");

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
exports.helloWorld = functions.https.onRequest((request, response) => {
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

  axios
      .request(options)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});
