const express = require('express');
const router = express.Router(); // getting instance of Router for us
const { createBook, getBooks, getBooksById, deleteBooksById, updateBooksById} = require('../controllers/BookController');

// Get all users
router.get('/', getBooks);

// Post a new car
router.post('/', createBook);


router.get('/:id',getBooksById);

router.delete('/:id',deleteBooksById);

router.put('/:id',updateBooksById);

module.exports = router;