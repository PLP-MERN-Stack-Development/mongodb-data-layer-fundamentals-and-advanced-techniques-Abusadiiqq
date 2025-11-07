const { connectDB, mongoose } = require("./db");
const Book = require("./models/Book");

async function performAggregation() {
    try {
        await connectDB();
        console.log('\n📊 STARTING AGGREGATION PIPELINE\n');

        // 1. Group by genre and count
        console.log('1. BOOK COUNT BY GENRE');
        const genreStats = await Book.aggregate([
            {
                $group: {
                    _id: '$genre',
                    count: { $sum: 1 },
                    averageRating: { $avg: '$rating' },
                    averagePrice: { $avg: '$price' }
                }
            },
            { $sort: { count: -1 } }
        ]);

        genreStats.forEach(stat => {
            console.log(`   - ${stat._id}: ${stat.count} books, Avg rating: ${stat.averageRating.toFixed(1)}, Avg price: $${stat.averagePrice.toFixed(2)}`);
        });

        // 2. Average rating by publication decade
        console.log('\n2. BOOKS BY DECADE');
        const decadeStats = await Book.aggregate([
            {
                $project: {
                    title: 1,
                    publicationYear: 1,
                    rating: 1,
                    decade: {
                        $subtract: [
                            '$publicationYear',
                            { $mod: ['$publicationYear', 10] }
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: '$decade',
                    count: { $sum: 1 },
                    averageRating: { $avg: '$rating' },
                    books: { $push: '$title' }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        decadeStats.forEach(stat => {
            console.log(`   - ${stat._id}s: ${stat.count} books, Avg rating: ${stat.averageRating.toFixed(1)}`);
        });

        // 3. Price analysis
        console.log('\n3. PRICE ANALYSIS');
        const priceStats = await Book.aggregate([
            {
                $group: {
                    _id: null,
                    totalBooks: { $sum: 1 },
                    averagePrice: { $avg: '$price' },
                    maxPrice: { $max: '$price' },
                    minPrice: { $min: '$price' },
                    priceRange: { 
                        $subtract: [
                            { $max: '$price' },
                            { $min: '$price' }
                        ]
                    }
                }
            }
        ]);

        console.log(`   - Total books: ${priceStats[0].totalBooks}`);
        console.log(`   - Average price: $${priceStats[0].averagePrice.toFixed(2)}`);
        console.log(`   - Price range: $${priceStats[0].minPrice} - $${priceStats[0].maxPrice}`);

        // 4. Most common tags
        console.log('\n4. MOST POPULAR TAGS');
        const tagStats = await Book.aggregate([
            { $unwind: '$tags' },
            {
                $group: {
                    _id: '$tags',
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } },
            { $limit: 5 }
        ]);

        tagStats.forEach(tag => {
            console.log(`   - ${tag._id}: ${tag.count} books`);
        });

        // 5. Stock status by genre
        console.log('\n5. STOCK STATUS BY GENRE');
        const stockStats = await Book.aggregate([
            {
                $group: {
                    _id: { genre: '$genre', inStock: '$inStock' },
                    count: { $sum: 1 }
                }
            },
            {
                $group: {
                    _id: '$_id.genre',
                    stockInfo: {
                        $push: {
                            status: '$_id.inStock',
                            count: '$count'
                        }
                    }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        stockStats.forEach(stat => {
            const inStock = stat.stockInfo.find(s => s.status === true)?.count || 0;
            const outOfStock = stat.stockInfo.find(s => s.status === false)?.count || 0;
            console.log(`   - ${stat._id}: ${inStock} in stock, ${outOfStock} out of stock`);
        });

        // 6. Author statistics
        console.log('\n6. AUTHOR STATISTICS');
        const authorStats = await Book.aggregate([
            {
                $group: {
                    _id: '$author',
                    bookCount: { $sum: 1 },
                    averageRating: { $avg: '$rating' },
                    totalPages: { $sum: '$pageCount' }
                }
            },
            { $sort: { bookCount: -1 } },
            { $limit: 5 }
        ]);

        authorStats.forEach(author => {
            console.log(`   - ${author._id}: ${author.bookCount} books, Avg rating: ${author.averageRating.toFixed(1)}, Total pages: ${author.totalPages}`);
        });

    } catch (error) {
        console.error('❌ Aggregation error:', error.message);
    } finally {
        await mongoose.disconnect();
        console.log('\n🔌 Aggregation completed and disconnected');
    }
}

performAggregation();