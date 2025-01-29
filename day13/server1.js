const express = require('express');
const mongoose = require('mongoose');
const server = express();
const port = 5000;

// MongoDB Atlas connection string
const databaseName = "mern"; // Replace with your database name
const collectionName = "db1"; // Replace with your collection name
const dbURI = `mongodb+srv://testUser:TSX8uNGoZc2AuteR@cluster0.7zpc1wb.mongodb.net/${databaseName}?retryWrites=true&w=majority`;

let dbConnected = false; // Flag to check MongoDB connection status
let Product; // Model placeholder

// Attempt to connect to MongoDB
mongoose.connect(dbURI)
    .then(() => {
        console.log(`Connected to MongoDB Atlas database: ${databaseName}`);
        dbConnected = true;

        // Define a Mongoose schema and model for products
        const productSchema = new mongoose.Schema({
            name: { type: String, required: true }, // Product name
            price: { type: Number, required: true } // Product price
        });

        Product = mongoose.model('Product', productSchema, collectionName);
    })
    .catch(err => {
        console.error("Error connecting to MongoDB Atlas:", err);
    });

// Middleware to parse JSON request body
server.use(express.json());

// Root route
server.get('/', (req, res) => {
    res.end(dbConnected
        ? "Server is running and connected to MongoDB Atlas"
        : "Server is running in standalone mode");
});

// GET route to fetch all products
server.get('/product', async (req, res) => {
    if (dbConnected) {
        try {
            const products = await Product.find();
            res.json(products);
        } catch (err) {
            res.status(500).json({ message: "Error fetching products", error: err });
        }
    } else {
        res.status(503).json({ message: "Database is not connected" });
    }
});

// POST route to add a new product
server.post('/product', async (req, res) => {
    const { name, price } = req.body;

    // Validate input
    if (!name || price === undefined) {
        return res.status(400).json({ message: "Both name and price are required" });
    }

    if (dbConnected) {
        try {
            const newProduct = new Product({ name, price });
            const savedProduct = await newProduct.save();
            res.status(201).json({
                message: "Item added successfully",
                product: savedProduct
            });
        } catch (err) {
            res.status(500).json({ message: "Error adding product", error: err });
        }
    } else {
        res.status(503).json({ message: "Database is not connected" });
    }
});

// PUT route to update an existing product by ID
server.put('/product/:id', async (req, res) => {
    const productId = req.params.id;
    const { name, price } = req.body;

    if (!name || price === undefined) {
        return res.status(400).json({ message: "Both name and price are required for update" });
    }

    if (dbConnected) {
        try {
            const updatedProduct = await Product.findByIdAndUpdate(
                productId,
                { name, price },
                { new: true, runValidators: true }
            );
            if (updatedProduct) {
                res.json({
                    message: "Product updated successfully",
                    product: updatedProduct
                });
            } else {
                res.status(404).json({ message: "Product not found" });
            }
        } catch (err) {
            res.status(500).json({ message: "Error updating product", error: err });
        }
    } else {
        res.status(503).json({ message: "Database is not connected" });
    }
});

// DELETE route to delete a product by ID
server.delete('/product/:id', async (req, res) => {
    const productId = req.params.id;

    if (dbConnected) {
        try {
            const deletedProduct = await Product.findByIdAndDelete(productId);
            if (deletedProduct) {
                res.json({
                    message: "Product deleted successfully",
                    product: deletedProduct
                });
            } else {
                res.status(404).json({ message: "Product not found" });
            }
        } catch (err) {
            res.status(500).json({ message: "Error deleting product", error: err });
        }
    } else {
        res.status(503).json({ message: "Database is not connected" });
    }
});

// Start the server
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
