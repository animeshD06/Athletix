import Razorpay from 'razorpay';
import dotenv from 'dotenv';
import crypto from 'crypto';
dotenv.config();

export const createRazorpayOrder = async (req, res) => {
    try {
        const { amount } = req.body;
        
        if (!amount) {
            return res.status(400).json({ message: 'Amount is required' });
        }

        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const options = {
            amount: amount * 100, // amount in smallest currency unit (paise)
            currency: 'INR',
            receipt: `receipt_order_${Date.now()}`
        };

        const order = await instance.orders.create(options);

        if (!order) return res.status(500).json({ message: 'Some error occurred' });

        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature === expectedSign) {
            return res.status(200).json({ message: "Payment verified successfully" });
        } else {
            return res.status(400).json({ message: "Invalid signature sent!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
    }
};
