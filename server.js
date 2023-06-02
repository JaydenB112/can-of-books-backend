'use strict'

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const books = require('./books')
const app = express();
app.use(cors());



app.get('/books',async (request, response) =>{
    try {
        const booksDos = await books.find()
        response.json(booksDos);
      } catch (error) {
        console.error('Error retrieving books:', error);
        response.status(500).json({ error: 'Server error' });
      }

})



app.listen(3001,() => {
    console.log(`Server Running on ${process.env.PORT}`)
})