const { Client, RemoteAuth } = require('whatsapp-web.js');
const express = require('express');
const qrcode = require('qrcode-terminal');


const app = express()

app.get("/", (req, res)=>{
    res.send('Hola a todos')
})
// // Require database
const { MongoStore } = require('wwebjs-mongo');
const mongoose = require('mongoose');


const URL = `mongodb+srv://santaNaN:C1Dgz8ycXDQVpHiB@cluster0.exgvi.mongodb.net/?retryWrites=true&w=majority`

// Load the session data
mongoose.connect(URL).then(() => {
    console.log('hola1');
    const store = new MongoStore({ mongoose: mongoose });
    const client = new Client({
        authStrategy: new RemoteAuth({
            dataPath:'/tmp',
            store: store,
            backupSyncIntervalMs: 300000,
        })
    });
    console.log('hola2');
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
        // Do Stuff...
        client.sendMessage(`573143551942@c.us`, 'Hola')
    })
    client.initialize();

});
 



app.listen(3001, ()=>{
    console.log('Server on port 3001')
})