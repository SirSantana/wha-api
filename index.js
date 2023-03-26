const { Client, RemoteAuth } = require('whatsapp-web.js');
const express = require('express');
const qrcode = require('qrcode-terminal');
const bodyParse = require('body-parser')
const cors = require('cors')
const app = express()


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


const URL = `mongodb+srv://santaNaN:C1Dgz8ycXDQVpHiB@cluster0.exgvi.mongodb.net/?retryWrites=true&w=majority`

// Load the session data
mongoose.connect(URL).then(() => {
    console.log('hola1');
    const store = new MongoStore({ mongoose: mongoose });
    const client = new Client({
        authStrategy: new RemoteAuth({
            // dataPath: '/tmp',
            store: store,
            backupSyncIntervalMs: 10000000,
        }),
        puppeteer: { args: ['--no-sandbox', '--disable-setuid-sandbox'] }
    });
    console.log('hola22');
    client.on('qr', (qr) => {
        // NOTE: This event will not be fired if a session is specified.
        qrcode.generate(qr, { small: true });
    });
    client.on('remote_session_saved', () => {
        // Do Stuff...
        console.log('SAVED');
    })
    console.log('hola3');
    console.log('hola4');

    client.on('ready', () => {
        // Do Stuff...
        // client.sendMessage(`573143551942@c.us`, 'Hola')
        console.log('ready');
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
    console.log('Server on port 3001')
})