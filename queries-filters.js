const { connectDB, mongoose } = require("./db");
const Book = require("./models/Book");

async function performQueriesAndFilters() {
    try {
        await connectDB();
        console.log('\n🔍 STARTING QUERIES AND FILTERS\n');

        // 1. Basic equality query
        console.log('1. BOOKS BY GENRE (Fiction)');
        const fictionBooks = await Book.find({ genre: 'Fiction' });
        fictionBooks.forEach(book => {
            console.log(`   - ${book.title} by ${book.author}`);
        });

        // 2. Comparison queries
        console.log('\n2. BOOKS PUBLISHED AFTER 1950');
        const modernBooks = await Book.find({ publicationYear: { $gt: 1950 } });
        modernBooks.forEach(book => {
            console.log(`   - ${book.title} (${book.publicationYear})`);
        });

        // 3. Logical operators
        console.log('\n3. FANTASY BOOKS IN STOCK');
        const fantasyInStock = await Book.find({
            $and: [
                { genre: 'Fantasy' },
                { inStock: true }
            ]
        });
        fantasyInStock.forEach(book => {
            console.log(`   - ${book.title} - $${book.price}`);
        });

        // 4. Array queries
        console.log('\n4. BOOKS WITH "adventure" TAG');
        const adventureBooks = await Book.find({ tags: 'adventure' });
        adventureBooks.forEach(book => {
            console.log(`   - ${book.title} [${book.tags.join(', ')}]`);
        });

        // 5. Regex search
        console.log('\n5. BOOKS WITH "The" IN TITLE');
        const theBooks = await Book.find({
            title: { $regex: /the/i }
        });
        theBooks.forEach(book => {
            console.log(`   - ${book.title}`);
        });

        // 6. Range query
        console.log('\n6. BOOKS BETWEEN $10 AND $15');
        const midRangeBooks = await Book.find({
            price: { $gte: 10, $lte: 15 }
        });
        midRangeBooks.forEach(book => {
            console.log(`   - ${book.title}: $${book.price}`);
        });

        // 7. Field selection and sorting
        console.log('\n7. TOP RATED BOOKS (Sorted by rating)');
        const topRated = await Book.find({ rating: { $gte: 4.5 } })
            .select('title author rating price')
            .sort({ rating: -1 });
        topRated.forEach(book => {
            console.log(`   - ${book.title} - Rating: ${book.rating}/5 - $${book.price}`);
        });

        // 8. Pagination
        console.log('\n8. PAGINATION (First 3 books)');
        const paginatedBooks = await Book.find()
            .select('title author')
            .limit(3)
            .sort({ title: 1 });
        paginatedBooks.forEach(book => {
            console.log(`   - ${book.title} by ${book.author}`);
        });

        // 9. Count documents
        const classicCount = await Book.countDocuments({ genre: 'Classic' });
        console.log(`\n9. STATISTICS:`);
        console.log(`   - Classic books: ${classicCount}`);
        console.log(`   - Books in stock: ${await Book.countDocuments({ inStock: true })}`);
        console.log(`   - High-rated books (4.5+): ${await Book.countDocuments({ rating: { $gte: 4.5 } })}`);

    } catch (error) {
        console.error('❌ Query error:', error.message);
    } finally {
        await mongoose.disconnect();
        console.log('\n🔌 Queries completed and disconnected');
    }
}

performQueriesAndFilters();