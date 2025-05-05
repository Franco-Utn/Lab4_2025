const express = require('express');
const router = express.Router();

const {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
} = require('../controllers/bookController');

// GET /authors: Obtener todos los libros
router.get('/', getAllBooks);

// GET /authors/:id: Obtener un autor por ID
router.get('/:id', getBookById);

// POST /authors: Crear un nuevo autor
router.post('/', createBook);

// PUT /authors/:id: Editar un autor existente
router.put('/:id', updateBook);

// DELETE /authors/:id: Eliminar un autor
router.delete('/:id', deleteBook);

module.exports = router;
