const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const Product = require('../models/Product');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

const seedProducts = async () => {
    try {
        // Clear existing products
        await Product.deleteMany({});

        const products = [];

        // Generate 20 fake products
        for (let i = 0; i < 20; i++) {
            const product = {
                name: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                price: parseFloat(faker.commerce.price()),
                category: faker.commerce.department(),
                stock: faker.number.int({ min: 0, max: 100 }),
                imageUrl: faker.image.url()
            };
            products.push(product);
        }

        await Product.insertMany(products);
        console.log('Products seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding products:', error);
        process.exit(1);
    }
};

seedProducts();