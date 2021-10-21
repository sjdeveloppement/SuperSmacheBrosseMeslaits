const express = require('express');
const app = express();
// body parser
const bodyParser = require('body-parser');
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const helmet = require('helmet'); // sécurise les entêtes http
const path = require('path'); //accès aux  chemins des fichiers

const userRoute = require('./routes/user');


//const session = require('cookie-session'); //paramètrage des cookies

require('dotenv').config({path: './config/.env'});

//connexion app à la bdd
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI,
    {   
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> console.log('Connexion à MongoDB réussie !'))
.catch((err)=> console.log('Connexion à MongoDB échouée !', err));
// Cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// sécuriser les cookies
// const expiryDate = new Date(Date.now()+60*60*1000);
// app.use(session({
//   name: 'session',
//   secret: process.env.SEC_SES,
//   cookie: {
//     secure: true,
//     httpOnly: true,
//     domain: 'http://localhost:5000',
//     expires: expiryDate
//   }
// }));
app.use(bodyParser.json());
//helmet 
app.use(helmet());
// gestion image par l'app
//app.use('/images', express.static(path.join(__dirname,'images')));

//routes des users
app.use('/api/user', userRoute);

module.exports = app;