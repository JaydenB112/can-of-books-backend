'use strict'

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const books = require('./books')
const app = express();
app.use(cors());
app.use(express.json())



app.get('/books', async (request, response) => {
  try {
    const booksDos = await books.find()
    response.json(booksDos);
  } catch (error) {
    console.error('Error retrieving books:', error);
    response.status(500).json({ error: 'Server error' });
  }

})
app.post('/books', async (request, response) => {
  try {
    const bookPull = request.body
    await books.insertMany(bookPull)
    response.send(bookPull)
  } catch (error) {

  }
})

app.delete('/books/:id', async (request, response) => {
  try {
    await mongoose.connect(process.env.MONGODB)
    const id = request.params.id;
    const result = await books.findOneAndDelete({ id_: id });
    response.send("Success")
  }catch(error){
    
  }


})

app.listen(3001, () => {
  console.log(`Server Running on ${process.env.PORT}`)
})

