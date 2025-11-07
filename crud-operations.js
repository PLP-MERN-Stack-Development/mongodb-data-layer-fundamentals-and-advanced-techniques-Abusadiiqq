const { connectDB, mongoose } = require("./db");
const Book = require("./models/Book");

async function performCRUDOperations() {
    try {
        await connectDB();
        console.log('\n🎯 STARTING CRUD OPERATIONS\n');

        // CREATE - Add new books
        console.log('1. CREATE OPERATION');
        const newBook = await Book.create({
            title: "The Alchemist",
            author: "Paulo Coelho",
            genre: "Fiction",
            publicationYear: 1988,
            isbn: "9780061122415",
            publisher: "HarperCollins",
            pageCount: 208,
            price: 14.99,
            rating: 4.5,
            inStock: true,
            tags: ["adventure", "philosophical", "quest"]
        });
        console.log('✅ Created book:', newBook.title);

        // READ - Find all books
        console.log('\n2. READ OPERATIONS');
        const allBooks = await Book.find();
        console.log(`📚 Total books: ${allBooks.length}`);

        // READ - Find by ID
        const bookById = await Book.findById(newBook._id);
        console.log(`🔍 Found by ID: ${bookById.title}`);

        // READ - Find with conditions
        const fantasyBooks = await Book.find({ genre: 'Fantasy' });
        console.log(`🧙 Fantasy books: ${fantasyBooks.length}`);

        // UPDATE - Update a book
        console.log('\n3. UPDATE OPERATIONS');
        const updatedBook = await Book.findByIdAndUpdate(
            newBook._id,
            { price: 16.99, rating: 4.7 },
            { new: true }
        );
        console.log(`✏️  Updated book price: $${updatedBook.price}`);

        // UPDATE - Update multiple documents
        const updateResult = await Book.updateMany(
            { genre: 'Fantasy' },
            { $set: { inStock: true } }
        );
        console.log(`🔄 Updated ${updateResult.modifiedCount} fantasy books`);

        // DELETE - Delete a book
        console.log('\n4. DELETE OPERATIONS');
        const deletedBook = await Book.findByIdAndDelete(newBook._id);
        console.log(`🗑️  Deleted book: ${deletedBook.title}`);

        // DELETE - Delete with conditions
        const deleteResult = await Book.deleteMany({ rating: { $lt: 4.0 } });
        console.log(`🗑️  Deleted ${deleteResult.deletedCount} low-rated books`);

        // Final count
        const finalCount = await Book.countDocuments();
        console.log(`\n📊 Final book count: ${finalCount}`);

    } catch (error) {
        console.error('❌ CRUD operation error:', error.message);
    } finally {
        await mongoose.disconnect();
        console.log('\n🔌 CRUD operations completed and disconnected');
    }
}

performCRUDOperations();