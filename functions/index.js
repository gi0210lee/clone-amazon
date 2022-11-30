const functions = require("firebase-functions");
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
    "sk_test_51LxM48Kkb267dxHg8ZSYwjar4k353DnhAtUnjXBGCjP5" +
    "7iHqEAoizCW6H6KDMLeDf65Ay7HgyAM8uN5gZ8ktAtIb00ctRWGTY4"
);

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

// 라우트
app.get("/", (req, res) => {
    res.status(200).send("안녕");
});

app.get("/react", (req, res) => {
    res.status(200).send("리액트");
});

app.post('/payments/create', async (req, res) => {
    const total = req.query.total

    console.log("payment 에서 가져온 토탈", total)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: 'usd',
    })

    res.status(201).send({
        clientSecret: paymentIntent.client_secret
    })


})

exports.api = functions.https.onRequest(app);

/**
 * http://127.0.0.1:5001/clone-8b834/us-central1/api
 */
