import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import User from './models/User.js';
import Order from './models/Order.js';

dotenv.config();

const seedData = async () => {
    try {
        await connectDB();

        // Clear existing data
        await User.deleteMany();
        await Order.deleteMany();

        console.log('Database cleared!');

        // Create dummy user
        const createdUser = await User.create({
            firebaseUid: 'dummyFirebaseUid123',
            email: 'testuser@athletix.com',
            displayName: 'John Doe',
            phone: '+1 234 567 8900',
            authProvider: 'email',
            addresses: [{
                name: 'Home',
                phone: '+1 234 567 8900',
                street: '123 MongoDB Avenue',
                city: 'Tech City',
                state: 'CA',
                pincode: '90210',
                isDefault: true
            }]
        });

        console.log('Dummy user created!');

        // Create dummy order
        await Order.create({
            orderNumber: `ATH${Date.now()}`,
            userId: createdUser._id,
            items: [
                {
                    productId: 'prod1',
                    name: 'Athletix Pro Running Shoes',
                    price: 120.00,
                    quantity: 1,
                    selectedColor: 'Black',
                    selectedSize: '10',
                    subtotal: 120.00
                }
            ],
            shippingAddress: {
                name: 'Home',
                phone: '+1 234 567 8900',
                street: '123 MongoDB Avenue',
                city: 'Tech City',
                state: 'CA',
                pincode: '90210'
            },
            paymentMethod: 'card',
            paymentStatus: 'paid',
            subtotal: 120.00,
            tax: 10.00,
            shippingCost: 5.00,
            total: 135.00,
            orderStatus: 'confirmed'
        });

        console.log('Dummy order created!');
        console.log('Data seeding completed! You can now check MongoDB Compass.');
        
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedData();
