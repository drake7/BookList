const Book = require('../models/Book');
const mongoose = require('mongoose');

// Get all books
async function getBooks(req, res) {
  try {
    const books = await Book.find({}).sort({createdAt: -1}); // Sorting in descending order based on creation date
    res.status(200).json(books);
  } catch (err) {
    res.status(400).json({error: err.message});
  }
}

//get book by id
const getBooksById =  async(req,res)=>{
    
  const {id}= req.params
  if(!mongoose.Types.ObjectId.isValid(id)){  //verifies given id is valid mongo type id which is 12bytes or 24hex
      return res.status(404).json({ error: "No such property" })
  }
  const books = await Book.findById(id)
  if(!books){
      return res.status(404).json({ error: "No such property" })
  }
  res.status(200).json(books);       
}


//delete books by id
const deleteBooksById =  async(req,res)=>{
    
  const {id}= req.params
  if(!mongoose.Types.ObjectId.isValid(id)){  //verifies given id is valid mongo type id which is 12bytes or 24hex
      return res.status(404).json({ error: "No such property" })
  }
  const books = await Book.findByIdAndDelete(id)
  if(!books){
      return res.status(404).json({ error: "No such property" })
  }
  res.status(200).json(books);       
}


//update books by id
const updateBooksById =  async(req,res)=>{
  const {id} = req.params
  if(!mongoose.Types.ObjectId.isValid(id)){  
      return res.status(404).json({ error: "No such property" })
  }
  const books = await Book.findByIdAndUpdate({_id:id},{...req.body}) //can have all or some fields 

  if(!books){
      return res.status(404).json({ error: "No such property" })
  }
  res.status(200).json(books);       
}


// Create a new book
async function createBook(req, res) {
  const {
    title,
    author,
    description
  } = req.body;
  console.log(req.body)
  try {
    const newBook = await Book.create({
        title,
        author,
        description
    });
    res.status(201).json(newBook);
  } catch (err) {
    console.error('Error creating new book:', err.message);
    res.status(500).json({error: err.message});
  }
}




module.exports = {
  getBooks,
  createBook,
  getBooksById,
  updateBooksById,
  deleteBooksById
};
