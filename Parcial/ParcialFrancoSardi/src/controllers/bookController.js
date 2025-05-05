const Author = require('../models/Author.js');
const Book = require('../models/Book.js');

// GET /books: Obtener todos los libros.
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /books/:id: Obtener un libro por ID.
const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'libro no encontrado' });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// POST /books: Crear un libro.
const createBook = async (req, res) => {
    const { titulo, resumen, genero, publicacion, disponible } = req.body;

    try {
        const book = new Book({
            titulo,
            resumen,
            genero,
            publicacion,
            disponible
        });

        const savedBook = await book.save();
        res.status(201).json(savedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// PUT /books/:id: Editar un libro.
const updateBook = async (req, res) => {
    const { titulo, resumen, genero, publicacion, disponible, autor } = req.body;

    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            { titulo, resumen, genero, publicacion, disponible },
            { new: true }
        );

        if (!updatedBook) {
            return res.status(404).json({ message: 'Libro no encontrado.' });
        }

        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// DELETE /books/:id: Eliminar un libro.
const deleteBook = async (req, res) => {
    const bookId = req.params.id;

    try {
        const authorWithBook = await Author.findOne({ libros: bookId });

        if (authorWithBook) {
            return res.status(400).json({ 
                message: 'No se puede eliminar el libro porque está asignado a un autor.' 
            });
        }

        const deletedBook = await Book.findByIdAndDelete(bookId);

        if (!deletedBook) {
            return res.status(404).json({ message: 'Libro no encontrado.' });
        }

        res.status(200).json({ message: 'Libro eliminado correctamente.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};
