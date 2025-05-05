const express = require('express');
const router = express.Router();

const {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor,
    addBookToAuthor
} = require('../controllers/authorController');

// GET /authors: Obtener todos los autores
router.get('/', getAllAuthors);

// GET /authors/:id: Obtener un autor por ID
router.get('/:id', getAuthorById);

// POST /authors: Crear un nuevo autor
router.post('/', createAuthor);

// PUT /authors/:id: Editar un autor existente
router.put('/:id', updateAuthor);

// DELETE /authors/:id: Eliminar un autor
router.delete('/:id', deleteAuthor);

// PUT /authors/:id/addBook/:bookId: Agregar un libro al autor
router.put('/:id/addBook/:bookId', addBookToAuthor);

module.exports = router;
