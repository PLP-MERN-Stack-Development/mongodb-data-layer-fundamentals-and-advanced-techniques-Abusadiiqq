const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema({
    title: { 
        type: String, 
        required: true,
        index: true
    },
    author: { 
        type: String, 
        required: true,
        index: true
    },
    genre: { 
        type: String, 
        required: true 
    },
    publicationYear: { 
        type: Number, 
        required: true 
    },
    isbn: { 
        type: String, 
        unique: true,
        required: true 
    },
    publisher: String,
    pageCount: Number,
    language: { 
        type: String, 
        default: 'English' 
    },
    price: Number,
    rating: { 
        type: Number, 
        min: 0, 
        max: 5 
    },
    inStock: { 
        type: Boolean, 
        default: true 
    },
    tags: [String]
}, { 
    timestamps: true 
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;