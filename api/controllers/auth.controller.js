import User from "../models/userSchema.js";
import bcrypt from 'bcryptjs';


export const signup = async (req, res, next) => {
    const {username, email, password} = req.body;
    const hashPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({username, email, password: hashPassword});
    try {
        await newUser.save();
        res.status(201).json({message: 'Created User...'})
    } catch (error) {
        next(error);
    }
}