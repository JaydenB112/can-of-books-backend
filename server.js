'use strict'

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const books = require('./books')
const verifyUser = require('./verifyUser')
const jwt = require('express-jwt')
const app = express();
app.use(cors());
app.use(express.json())


app.use(verifyUser);


app.get('/books', async (request, response) => {
  try {
    console.log(request?.user)
    const booksDos = await books.find({email:request?.user?.email})
    response.json(booksDos);
  } catch (error) {
    console.error('Error retrieving books:', error);
    response.status(500).json({ error: 'Server error' });
  }
  

});
// const userinfo = user.data;
app.post('/books', async (request, response) => {
  try {
    const bookPull = request.body
    bookPull.email = request.user?.email
    await books.insertMany(bookPull)
    response.send(bookPull)
  } catch (error) {
    console.error(error)
  }
})

app.delete('/books/:id', async (request, response) => {
  try {
    await mongoose.connect(process.env.MONGODB)
    const id = request.params.id;
    const result = await books.findOneAndDelete({ _id: id, });
    response.send("Success")
  } catch (error) {

  }


})

app.put('/books/:id', async (request, response) => {
  try {
    await mongoose.connect(process.env.MONGODB)
    const id = request.params.id;
    const updatedBook = await books.findOneAndUpdate({ _id: id, },
      { title: title, description: description, status: status },
      { new: true }
    );
      const booksWithUpdate = await books.find({});
      response.send(booksWithUpdate);
  }catch(error){
    
  }
})

app.listen(3001, () => {
  console.log(`Server Running on ${process.env.PORT}`)
})

