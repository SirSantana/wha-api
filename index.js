const { Client, LocalAuth } = require('whatsapp-web.js');
const express = require('express')
const qrcode = require('qrcode-terminal');
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3001


app.use(cors())
app.use(express.json())

// const URL = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.exgvi.mongodb.net/?retryWrites=true&w=majority`


const client = new Client({
    authStrategy: new LocalAuth({ dataPath: "/tmp"}),
    puppeteer: {
      headless: true,
      ignoreHTTPSErrors: true,
      args: ['--no-sandbox','--disable-setuid-sandbox']
    },
});

client.initialize();

client.on('loading_screen', (percent, message) => {
    console.log('LOADING SCREEN', percent, message);
});

client.on('qr', (qr) => {
    // NOTE: This event will not be fired if a session is specified.
    qrcode.generate(qr, { small: true });
});

client.on('authenticated', () => {
    console.log('AUTHENTICATED');
});

client.on('auth_failure', msg => {
    // Fired if session restore was unsuccessful
    console.error('AUTHENTICATION FAILURE', msg);
});

client.on('ready', () => {
    console.log('READY');
    client.sendMessage('573143551942@c.us', 'Hola bro')
});
// let arrayVendedores = ['573114754394', '573138562763', '573143551942', '573143551942']
// mongoose.connect(URL).then(() => {
//     const store = new MongoStore({ mongoose: mongoose });
//     const client = new Client({
//         authStrategy: new RemoteAuth({
//             dataPath:'/tmp',
//             store: store,
//             backupSyncIntervalMs: 300000,
//         })
//     });

//     client.on('qr', (qr) => {
//         // NOTE: This event will not be fired if a session is specified.
//         qrcode.generate(qr, { small: true });
//     });
//     client.on('authenticated', () => {
//         console.log('AUTHENTICATED');
//     });
//     client.on('remote_session_saved', () => {
//         // Do Stuff...

//         console.log('ready');

//     })
//     // client.on('message', () => {
//     //     client.sendMessage(`573143551942@c.us`, 'Hola')

//     // })
    
//     client.initialize();





// })
// app.get("/", (req, res) => {
//     res.send('Hola mundo')
// })
// app.post('/send/vendedor/', (req, res) => {
//     console.log('Hola a todos');
//     console.log(req.body);
//     // console.log('READY');
//     // client.sendMessage(`573143551942@c.us`, 'Hola')

// })

app.listen(PORT, () => {
    console.log(`Server on Port ${PORT}`);
})









