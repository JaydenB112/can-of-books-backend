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
    const booksDos = await books.find({userinfo:userEmail});
    response.json(booksDos);
  } catch (error) {
    console.error('Error retrieving books:', error);
    response.status(500).json({ error: 'Server error' });
  }
  const accessToken = request.headers.authorization.split(' ')[1];
  headers:{ authorization: `Bearer ${accessToken}`}

});
const userinfo = user.data;
app.post('/books', async (request, response) => {
  try {
    const bookPull = request.body
    await books.insertMany(bookPull)
    response.send(bookPull)
    const accessToken = request.headers.authorization.split(' ')[1];
  } catch (error) {

  }
})

app.delete('/books/:id', async (request, response) => {
  try {
    await mongoose.connect(process.env.MONGODB)
    const id = request.params.id;
    const result = await books.findOneAndDelete({ id_: id, userEmail:userinfo.email});
    response.send("Success")
  } catch (error) {

  }


})

app.put('/books/:id', async (request, response) => {
  try {
    await mongoose.connect(process.env.MONGODB)
    const id = request.params.id;
    const updatedBook = await books.findOneAndUpdate({ id_: id, userEmail: userinfo.email},
      { title: title, description: description, status: status },
      { new: true }
    );
      const booksWithUpdate = await books.find({ userEmail:userinfo.email });
      response.send(booksWithUpdate);
  }catch(error){
    
  }
})

app.listen(3001, () => {
  console.log(`Server Running on ${process.env.PORT}`)
})

