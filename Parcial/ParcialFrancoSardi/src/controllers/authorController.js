const mongoose = "mongoose"
const Author = require("../models/Author");
const Book = require("../models/Book")

// GET /authors: Obtener todos los autores.
const getAllAuthors = async (req, res) => {
    try {
        const authors = await Author.find().populate('libros');
        res.status(200).json(authors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /authors/:id: Obtener un autor por ID.
const getAuthorById = async (req, res) => {
    try {
        const author = await Author.findById(req.params.id).populate('libros');
        if (!author) {
            return res.status(404).json({ message: 'autor no encontrado' });
        }
        res.status(200).json(author);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST /authors: Crear un autor.
const createAuthor = async (req, res) => {
    const { nombre,bio,fechaNacimiento,nacionalidad, libros } = req.body;

    try {
        if (libros && libros.length > 0) {
            const foundBooks = await Book.find({ _id: { $in: libros } });

            if (foundBooks.length !== libros.length) {
                return res.status(400).json({
                    message: "El libro no existe. No se puede crear el autor."
                });
            }
        }

        const author = new Author({  nombre,bio,fechaNacimiento,nacionalidad, libros});
        const savedAuthor = await author.save();

        res.status(201).json(savedAuthor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// PUT /authors/:id: Editar un autor.
const updateAuthor = async (req, res) => {
    const { nombre,bio,fechaNacimiento,nacionalidad, libros } = req.body;

    try {
        if (libros && libros.length > 0) {
            const foundBooks = await Book.find({ _id: { $in: libros } });

            if (foundBooks.length !== libros.length) {
                return res.status(400).json({
                    message: 'El libro no existe. No se puede actualizar el autor.'
                });
            }
        }

        const updatedAuthor = await Author.findByIdAndUpdate(
            req.params.id,
            { nombre,bio,fechaNacimiento,nacionalidad, libros  },
            { new: true }
        ).populate('libros');

        if (!updatedAuthor) {
            return res.status(404).json({ message: 'Autor no encontrado.' });
        }

        res.status(200).json(updatedAuthor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// DELETE /authors/:id: Eliminar un autor.
const deleteAuthor = async (req, res) => {
    try {
        const deletedAuthor = await Author.findByIdAndDelete(req.params.id);

        if (!deletedAuthor) {
            return res.status(404).json({ message: 'Autor no encontrado.' });
        }

        res.status(200).json({ message: 'Autor eliminado correctamente.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// PUT /authors/:id/addBook/:bookId: Agregar un libro a la lista del autor.
// otra opción: /authors/addBook?id=:id&bookId=:bookId:

const addBookToAuthor = async (req, res) => {
    const { id, bookId } = req.params;

    try {
        const author = await Author.findById(id);
        if (!author) {
            return res.status(404).json({ message: 'Autor no encontrado.' });
        }

        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Libro no encontrado.' });
        }

        if (author.libros.includes(bookId)) {
            return res.status(400).json({ message: 'El libro ya está asignado al autor.' });
        }

        author.libros.push(bookId);
        const updatedAuthor = await author.save();

        res.status(200).json(updatedAuthor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor,
    addBookToAuthor
};