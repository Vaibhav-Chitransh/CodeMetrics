import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';

export const signup = async (req, res) => {
    const {email, password, name, username} = req.body;
    try {
        if(!email || !password || !name || !username) {
            return res.status(400).json({message: 'All fields are required'});
        }

        const userAlreadyExists = await User.findOne({email});
        if(userAlreadyExists) {
            return res.status(400).json({success: false, message: 'Email already exists'});
        }
        const usernameAlreadyExists = await User.findOne({username});
        if(usernameAlreadyExists) {
            return res.status(400).json({success: false, message: 'Username already exists'});
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const user = await User.create({
            email,
            password: hashedPassword,
            name,
            username,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
        })

        await user.save();
        generateTokenAndSetCookie(res, user._id);

        res.status(201).json({success: true, message: 'User created successfully', user: {
            ...user._doc, password: undefined
        }});
    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
}

export const login = async (req, res) => {
    res.send('Login Route');
}

export const logout = async (req, res) => {
    res.send('Logout Route');
}