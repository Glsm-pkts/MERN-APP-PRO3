require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const notRote = require('./routes/notlar');

const app = express();

app.use(express.json());

// Middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// MongoDB Bağlantısı
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB bağlantısı başarılı');
        app.listen(process.env.PORT, () => {
            console.log(`${process.env.PORT} port dinleniyor`);
        });
    })
    .catch(err => console.log(err));

// Router
app.use('/api/notlar', notRote);
