const { Client, RemoteAuth } = require('whatsapp-web.js');
const express = require('express');
const qrcode = require('qrcode-terminal');
const bodyParse = require('body-parser')
const cors = require('cors')
const app = express()
require("dotenv").config();


app.use(bodyParse.urlencoded(true))
app.use(bodyParse.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send('Hola a todos')
})
// // Require database
const { MongoStore } = require('wwebjs-mongo');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3001


const URL = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.exgvi.mongodb.net/?retryWrites=true&w=majority`

// Load the session data
mongoose.connect(URL).then(() => {
    const store = new MongoStore({ mongoose: mongoose });
    const client = new Client({
        authStrategy: new RemoteAuth({
            dataPath: '/tmp',
            store: store,
            backupSyncIntervalMs: 10000000,
        }),
        puppeteer: { args: ['--no-sandbox', '--disable-setuid-sandbox'] }
    });
    client.on('qr', (qr) => {
        // NOTE: This event will not be fired if a session is specified.
        qrcode.generate(qr, { small: true });
    });
    client.on('remote_session_saved', () => {
        // Do Stuff...
        console.log('SAVED');
    })

    client.on('ready', () => {
        // Do Stuff...
        console.log('ready!');
    })
    app.post("/hi", (req, res) => {
        console.log(req.body);
        if (client.info === undefined) {
            console.log('the system is not ready yet');
            res.send('Erro').status(401)
        }
        else {
            client.sendMessage(`${req.body.number}@c.us`, req.body.titulo)
            res.send('enviado correctamente').status(204)
        }

    })
    client.initialize();

});




app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})