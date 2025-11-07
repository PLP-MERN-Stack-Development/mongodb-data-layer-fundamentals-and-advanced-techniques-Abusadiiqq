const { connectDB, mongoose } = require("./db");
const Book = require("./models/Book");

async function populateBooks() {
    try {
        await connectDB();

        // Clear existing books
        await Book.deleteMany({});
        console.log('🗑️  Cleared existing books');

        // Insert sample books
        const books = await Book.insertMany([
            {
                title: "The Great Gatsby",
                author: "F. Scott Fitzgerald",
                genre: "Classic",
                publicationYear: 1925,
                isbn: "9780743273565",
                publisher: "Scribner",
                pageCount: 180,
                language: "English",
                price: 12.99,
                rating: 4.5,
                inStock: true,
                tags: ["american", "jazz age", "tragedy"]
            },
            {
                title: "To Kill a Mockingbird",
                author: "Harper Lee",
                genre: "Fiction",
                publicationYear: 1960,
                isbn: "9780061120084",
                publisher: "J.B. Lippincott & Co.",
                pageCount: 281,
                language: "English",
                price: 14.99,
                rating: 4.8,
                inStock: true,
                tags: ["southern", "courtroom", "racism"]
            },
            {
                title: "1984",
                author: "George Orwell",
                genre: "Dystopian",
                publicationYear: 1949,
                isbn: "9780451524935",
                publisher: "Secker & Warburg",
                pageCount: 328,
                language: "English",
                price: 10.99,
                rating: 4.7,
                inStock: false,
                tags: ["dystopian", "political", "surveillance"]
            },
            {
                title: "Pride and Prejudice",
                author: "Jane Austen",
                genre: "Romance",
                publicationYear: 1813,
                isbn: "9780141439518",
                publisher: "T. Egerton",
                pageCount: 432,
                language: "English",
                price: 9.99,
                rating: 4.6,
                inStock: true,
                tags: ["romance", "british", "class"]
            },
            {
                title: "The Hobbit",
                author: "J.R.R. Tolkien",
                genre: "Fantasy",
                publicationYear: 1937,
                isbn: "9780547928227",
                publisher: "George Allen & Unwin",
                pageCount: 310,
                language: "English",
                price: 15.99,
                rating: 4.9,
                inStock: true,
                tags: ["fantasy", "adventure", "middle-earth"]
            }
        ]);

        console.log(`✅ Successfully inserted ${books.length} books into the database`);
        
        // Display inserted books
        const bookCount = await Book.countDocuments();
        console.log(`📚 Total books in database: ${bookCount}`);

    } catch (error) {
        console.error('❌ Error populating books:', error.message);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Disconnected from MongoDB');
    }
}

populateBooks();