🚀 Project Overview
This project demonstrates MongoDB fundamentals including database operations, advanced querying techniques, aggregation pipelines, and performance optimization through indexing. Built with Node.js and Mongoose ODM.

📁 Project Structure
text
mongodb-data-layer-fundamentals-and-advanced-techniques/
├── models/
│   └── Book.js                 # Mongoose schema and model
├── .env                        # Environment variables (MongoDB URI)
├── .gitignore                  # Git ignore rules
├── package.json               # Dependencies and scripts
├── db.js                      # Database connection setup
├── insert_books.js            # Database seeding script
├── crud-operations.js         # CRUD operations implementation
├── queries-filters.js         # Advanced queries and filters
├── aggregation-pipeline.js    # Aggregation pipeline examples
├── indexing-performance.js    # Indexing and performance demo
└── README.md                  # This file
🛠️ Technologies Used
Node.js - Runtime environment

MongoDB - NoSQL database

Mongoose - MongoDB object modeling

dotenv - Environment variable management

📋 Prerequisites
Node.js (v18 or higher)

MongoDB Atlas account or local MongoDB installation

Git

⚙️ Installation & Setup
Clone the repository

bash
git clone https://github.com/PLP-MERN-Stack-Development/mongodb-data-layer-fundamentals-and-advanced-techniques-Abusadiiqq.git
cd mongodb-data-layer-fundamentals-and-advanced-techniques-Abusadiiqq
Install dependencies

bash
npm install
Configure environment variables

Create a .env file in the root directory

Add your MongoDB connection string:

env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name
🎯 Assignment Implementation
1. Database Setup & Seeding
File: insert_books.js

Features:

MongoDB connection establishment

Database seeding with sample book data

Data validation and error handling

2. CRUD Operations
File: crud-operations.js

Operations Implemented:

Create: Insert new documents

Read: Find documents with various filters

Update: Modify existing documents

Delete: Remove documents

3. Advanced Queries & Filters
File: queries-filters.js

Query Types:

Equality queries

Comparison operators ($gt, $lt, $gte, $lte)

Logical operators ($and, $or)

Array queries

Regular expressions

Field selection and sorting

Pagination

4. Aggregation Pipeline
File: aggregation-pipeline.js

Aggregation Stages:

$group - Grouping and counting

$project - Field projection

$unwind - Array deconstruction

$sort - Result sorting

$match - Document filtering

5. Indexing & Performance
File: indexing-performance.js

Indexing Features:

Compound indexes

Single field indexes

Query performance analysis

Execution plan examination

📊 Sample Data Schema
The application uses a Book model with the following schema:

javascript
{
  title: String (required),
  author: String (required),
  genre: String (required),
  publicationYear: Number (required),
  isbn: String (required, unique),
  publisher: String,
  pageCount: Number,
  language: String (default: 'English'),
  price: Number,
  rating: Number (min: 0, max: 5),
  inStock: Boolean (default: true),
  tags: [String],
  timestamps: true
}
🚀 Usage
Run All Operations
bash
npm run all
Individual Scripts
bash
# Seed the database with sample data
npm run seed

# Execute CRUD operations
npm run crud

# Run advanced queries and filters
npm run queries

# Demonstrate aggregation pipeline
npm run aggregation

# Test indexing and performance
npm run indexing
📈 Key Features Demonstrated
🔍 Query Capabilities
Basic Queries: Find by exact match, range, comparison

Advanced Filters: Regex, array operations, logical combinations

Sorting & Pagination: Result ordering and limiting

Field Projection: Selective field retrieval

📊 Aggregation Framework
Data Analysis: Grouping, counting, averaging

Statistical Operations: Min, max, average calculations

Data Transformation: Field computation, array operations

Multi-stage Processing: Complex data processing pipelines

⚡ Performance Optimization
Index Creation: Single and compound indexes

Query Optimization: Execution plan analysis

Performance Monitoring: Execution time measurement

Index Utilization: Verification of index usage

🎓 Learning Objectives Achieved
✅ MongoDB Connection & Configuration
✅ Database Operations (CRUD)
✅ Advanced Querying Techniques
✅ Aggregation Pipeline Implementation
✅ Indexing Strategies
✅ Performance Optimization
✅ Error Handling & Validation
✅ Data Modeling with Mongoose

🔧 API Reference
Database Connection
javascript
const { connectDB } = require('./db');
await connectDB(); // Establishes MongoDB connection
Book Model Methods
javascript
const Book = require('./models/Book');

// Common operations
await Book.find({ genre: 'Fantasy' });
await Book.create({ /* book data */ });
await Book.findByIdAndUpdate(id, updates);
await Book.findByIdAndDelete(id);
🐛 Troubleshooting
Common Issues
Connection Failed: Check MongoDB URI in .env file

Authentication Error: Verify database user credentials

Network Issues: Ensure IP is whitelisted in MongoDB Atlas

Dependencies: Run npm install to install required packages

Debug Mode
Enable detailed logging by modifying db.js to include connection debugging.

🤝 Contributing
Fork the repository

Create a feature branch (git checkout -b feature/amazing-feature)

Commit your changes (git commit -m 'Add amazing feature')

Push to the branch (git push origin feature/amazing-feature)

Open a Pull Request

📝 License
This project is part of the PLP MERN Stack Development program assignments.

👨‍💻 Author
Abusadiiqq

GitHub: @Abusadiiqq

🙏 Acknowledgments
PLP Academy for the comprehensive curriculum

MongoDB University for excellent documentation

MERN Stack Development program instructors

<div align="center">
⭐ Star this repository if you find it helpful!

</div>
