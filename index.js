import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const PORT = 5050;
const uri = 'mongodb+srv://admin:159357753951Gf@cluster0.3kibbus.mongodb.net/?retryWrites=true&w=majority';
const app = express();

mongoose
    .connect(uri)
    .then(() => console.log('\x1b[42m', 'DB has been connected', '\x1b[0m'))
    .catch((err) => console.log('DB error: ', err));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hi, bro!');
});

app.post('/auth/login', (req, res) => {
    console.log(req.body);

    const token = jwt.sign({
        email: req.body.email,
        username: req.body.username,
    }, 'sectreKey');

    res.json({
        result: token,
    })
});

app.listen(PORT, (err) => {
    if(err) {
        return console.log('Not OK');
    }

    console.log('\x1b[42m','App has been started', '\x1b[0m');
});
