require('dotenv').config();
const path = require('path');
const router = require('./router');
const flash = require('connect-flash');
const session = require('express-session');
const mongo = require('mongoose');
const mongoSession = require('connect-mongo');
const express = require('express');
const helmet = require('helmet');
const csrf = require('csurf');
const {csrfMiddleware} = require('./middlewares/middleware');
const app = express();

app.use(express.urlencoded({extended: true}));

mongo.connect(process.env.stringKeyDb)
    .then(e => {
        console.log('Database connected');
        app.emit('db connected');
    })
    .catch(e => console.log('Database connection failed: ', e));

app.set('views', path.resolve(__dirname, 'view'));
app.set('view engine', 'ejs');

app.use(express.static(path.resolve(__dirname, 'public')))

const refresh = session({
    secret: 'J41phal12bla97adlb12790jfnasdoaud90108nlczhoat9613p1-21370917014ya98a',
    store: mongoSession.create({
        mongoUrl: process.env.stringKeyDb,
        ttl: 1000 * 60 * 60 * 24 * 7,
        autoRemove: 'native'
    }),
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60 *24 *7,
        httpOnly: true,
    }
})
app.use(helmet());
app.use(refresh);
app.use(csrf());
app.use(csrfMiddleware);
app.use(flash());
app.use(router);


app.on('db connected', () =>{
    app.listen(3001, () =>{
        console.log('Access: http://localhost:3001');
        console.log('Server listen');
    })
})