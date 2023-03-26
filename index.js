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
            dataPath: '/tmp',
            store: store,
            backupSyncIntervalMs: 300000,
        }),
        puppeteer: { headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-accelerated-2d-canvas', '--no-first-run', '--no-zygote', '--single-process', '--disable-gpu',] }
    });
    console.log('hola22');
    client.initialize();

    client.on('qr', (qr) => {
        // NOTE: This event will not be fired if a session is specified.
        qrcode.generate(qr, { small: true });
    });
    client.on('remote_session_saved', () => {
        // Do Stuff...
        console.log('SAVED');
    })
    console.log('hola3');

    client.on('ready', () => {
        console.log('ready');
       
        // Do Stuff...
    })
    app.post("/sendmessage/vendedor/", (req, res) => {
        console.log(req.body);
        if (client.info === undefined) {
            console.log('el sistema aún no está listo');
        }else{
            client.sendMessage(`573143551942@c.us`, 'Que mas23')
            res.send('enviado correctamente').status(204)
    
        }
        
    })

});




app.listen(PORT, () => {
    console.log('Server on port 3001')
})