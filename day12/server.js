const exp = require('express');
const server = exp();
const port = 5000;
const mongoose = require('mongoose');
require('dotenv').config();

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
        trim: true       
    }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

const mongo_uri = process.env.mong;

mongoose.connect(mongo_uri)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("MongoDB connection error:", error));

server.use(exp.json());

server.get('/', (req, res) => {
    res.end("Server is running");
});

server.get('/product', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch products" });
    }
});

server.post('/product', async (req, res) => {
    try {
        const newProduct = new Product({
            name: req.body.name
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ error: "Failed to create product" });
    }
});

server.put('/product/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name },
            { new: true, runValidators: true }
        );

        if (updatedProduct) {
            res.json(updatedProduct);
        } else {
            res.status(404).json({ error: "Product not found" });
        }
    } catch (error) {
        res.status(400).json({ error: "Failed to update product" });
    }
});

server.delete('/product/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (deletedProduct) {
            res.json(deletedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error deleting product', error });
    }
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});