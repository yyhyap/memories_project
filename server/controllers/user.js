import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import User from '../models/user.js';

export const signin = async (req, res) => {
    // console.log('Read req body', req.body);
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if(!existingUser) {
            return res.status(404).json({ message: 'User does not exist.' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // 'test' >>> secret key to sign
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: '1h' });

        res.status(200).json({ result: existingUser, token })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
}

export const signup = async (req, res) => {
    console.log('Read req body in sign up: ', req.body);
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if(existingUser) {
            console.log('User already exists.');
            return res.status(400).json({ message: 'User already exists.' });
        }

        if(password !== confirmPassword) {
            console.log('Passwords do not match.' );
            return res.status(400).json({ message: 'Passwords do not match.' });
        }

        // 12 >>> salt length
        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });
        console.log("Result: ", result);

        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: '1h' });
        console.log("Token: ", token);

        res.status(200).json({ result, token })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong.' });
    }
}