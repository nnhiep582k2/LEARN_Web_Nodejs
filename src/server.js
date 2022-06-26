// const express = require('express');     // import thư viện express
import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRoute from './route/web';
import initAPIRoute from './route/api';
import morgan from 'morgan';
// import connection from './configs/connectDB';
require('dotenv').config();

const app = express(); // tạo một instance của express
const port = process.env.PORT || 3000; // Định nghĩa biến port là cổng 8000 lấy từ file môi trường .env

app.use(morgan('combined'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setup view engine
configViewEngine(app);
// Init web route
initWebRoute(app);
initAPIRoute(app);

// handle 404 not found
app.use((req, res) => {
    return res.render('404');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`); // Lắng nghe port
});
