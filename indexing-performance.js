const { connectDB, mongoose } = require("./db");
const Book = require("./models/Book");

async function demonstrateIndexing() {
    try {
        await connectDB();
        console.log('\n⚡ DEMONSTRATING INDEXING AND PERFORMANCE\n');

        // 1. Create indexes
        console.log('1. CREATING INDEXES');
        
        // Compound index for genre and rating
        await Book.collection.createIndex({ genre: 1, rating: -1 });
        console.log('   ✅ Created compound index on (genre, rating)');
        
        // Text index for search
        await Book.collection.createIndex({ title: 'text', author: 'text' });
        console.log('   ✅ Created text index on (title, author)');
        
        // Index on publication year
        await Book.collection.createIndex({ publicationYear: -1 });
        console.log('   ✅ Created index on publicationYear');

        // 2. Get index information
        console.log('\n2. INDEX INFORMATION');
        const indexes = await Book.collection.getIndexes();
        console.log(`   Total indexes: ${Object.keys(indexes).length}`);
        Object.keys(indexes).forEach(indexName => {
            console.log(`   - ${indexName}:`, indexes[indexName].key);
        });

        // 3. Performance comparison with explain()
        console.log('\n3. PERFORMANCE ANALYSIS WITH explain()');

        // Query without specific index
        console.log('   Query for Fantasy books with high rating:');
        const query = { genre: 'Fantasy', rating: { $gte: 4.5 } };
        
        const explainResult = await Book.find(query).explain('executionStats');
        console.log(`   - Documents examined: ${explainResult.executionStats.totalDocsExamined}`);
        console.log(`   - Execution time: ${explainResult.executionStats.executionTimeMillis}ms`);
        console.log(`   - Index used: ${explainResult.executionStats.executionStages.inputStage?.indexName || 'Collection Scan'}`);

        // 4. Text search using index
        console.log('\n4. TEXT SEARCH USING INDEX');
        const textSearchResults = await Book.find(
            { $text: { $search: 'great fantasy' } },
            { score: { $meta: 'textScore' } }
        ).sort({ score: { $meta: 'textScore' } });

        console.log(`   Found ${textSearchResults.length} books matching "great fantasy":`);
        textSearchResults.forEach(book => {
            console.log(`   - ${book.title} by ${book.author}`);
        });

        // 5. Covered query (query that can be satisfied entirely using an index)
        console.log('\n5. COVERED QUERY DEMONSTRATION');
        const coveredQuery = await Book.find(
            { genre: 'Fantasy' },
            { _id: 0, title: 1, genre: 1 } // Only return fields that are in index
        ).hint({ genre: 1, rating: -1 }); // Force using our compound index

        console.log(`   Covered query returned ${coveredQuery.length} fantasy books`);
        console.log('   (This query uses only the index, without examining documents)');

        // 6. Index efficiency for sorting
        console.log('\n6. SORTING PERFORMANCE');
        
        // Sort using index
        console.log('   Sorting by publicationYear (indexed):');
        const startTime1 = Date.now();
        const sortedByYear = await Book.find().sort({ publicationYear: -1 }).limit(5);
        const time1 = Date.now() - startTime1;
        console.log(`   - Execution time: ${time1}ms`);
        sortedByYear.forEach(book => {
            console.log(`     ${book.title} (${book.publicationYear})`);
        });

        // 7. Analyze query performance
        console.log('\n7. QUERY PERFORMANCE METRICS');
        
        // Reset statistics
        await Book.collection.stats();
        
        const slowQuery = await Book.find({
            $or: [
                { genre: 'Fiction' },
                { publicationYear: { $gt: 2000 } },
                { rating: { $gte: 4.5 } }
            ]
        }).explain('executionStats');

        console.log('   Complex query performance:');
        console.log(`   - Execution time: ${slowQuery.executionStats.executionTimeMillis}ms`);
        console.log(`   - Documents scanned: ${slowQuery.executionStats.totalDocsExamined}`);
        console.log(`   - Documents returned: ${slowQuery.executionStats.nReturned}`);

    } catch (error) {
        console.error('❌ Indexing demonstration error:', error.message);
    } finally {
        await mongoose.disconnect();
        console.log('\n🔌 Indexing demonstration completed and disconnected');
    }
}

demonstrateIndexing();