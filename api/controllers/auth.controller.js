import User from "../models/userSchema.js";
import bcrypt from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';


export const signup = async (req, res, next) => {
    const {username, email, password} = req.body;
    console.log("Received data:", req.body);
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const hashPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({username, email, password: hashPassword});
    try {
        await newUser.save();
        res.status(201).json({message: 'User created successfully'})
    } catch (error) {
        next(error);
    }
}

export const signin = async (req, res, next) => {
    const {email, password} = req.body;
    console.log("Received data:", req.body);
    
    try {
        const validUser = await User.findOne({ email });
        if(!validUser) {
            return next(errorHandler(404, 'User Not Found!'))
        }
        const validPassword = bcrypt.compareSync(password, validUser.password);
        if(!validPassword) {
            return next(errorHandler(404, 'Invalid Credentials!'))            
        }
        const {password: hashPassword, ...rest} = validUser._doc;
        const token = jwt.sign({ id: validUser._id}, process.env.JWT_SECRET)
        const expiryDate = new Date(Date.now() + 3600000);
        res.cookie('access_token', token, { httpOnly: true, expires: expiryDate})
        .status(200)
        .json(rest);
       
    } catch (error) {
        next(error);
    }
}