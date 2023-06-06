const mongoose = require('mongoose');

// Defining the book schema
const bookSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: String
})

//This is a model for my books
const Book = mongoose.model('Book', bookSchema);
async function seed() {
   await mongoose.connect(process.env.MONGODB)
        .then(() => {
            console.log('connected')
        })



    // Creating a new book array with defined books
    const bookData = [

        new Book({ title: 'War and Peace', description: 'Some famous book', status: 'Fiction' }),
        new Book({ title: 'To Kill a Mockingbird', description: 'Another Classic', status: 'Fiction' }),
        new Book({ title: 'The 48 Laws of Power', description: 'Manipulation Tutorial', status: 'NonFiction' })


    ];

   await Book.insertMany(bookData);
    // mongoose.disconnect()
}seed();

module.exports = Book