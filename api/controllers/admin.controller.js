import User from "../models/userSchema.js";
import bcrypt from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';


export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !user.isAdmin) {
      return next(errorHandler(401, 'Invalid credentials or not an admin!'))
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if(!validPassword) {
        return next(errorHandler(404, 'Invalid Credentials!'))            
    }

    const {password: hashPassword, ...rest} = user._doc;
    const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET)
    const expiryDate = new Date(Date.now() + 3600000);
    res.cookie('admin_token', token, { httpOnly: true, expires: expiryDate})
    .status(200)
    .json(rest);
    
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};