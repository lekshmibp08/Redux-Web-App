import User from "../models/userSchema.js";
import bcrypt from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';


export const loginAdmin = async (req, res, next) => {
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
    next(error);
  }
};

export const adminSignout = (req, res) => {
  console.log("INSIDE SIGN OUT");
  
  res.clearCookie('admin_token', { httpOnly: true, sameSite: 'Strict' }) 
    .status(200)
    .json({ message: 'Signout Successfully!' }); 
    console.log(res);
    
}

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({ isAdmin: false })
      .sort({ createdAt: -1 })
      .select('-password');;

    res.status(200).json({ users });    
  } catch (error) {
    next(error);
  }
};

export const deletetUser = async (req, res, next) => {
  const id = req.params.id  
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if(!deletedUser) 
      return next(errorHandler(404, 'User not found!')) 
    
    res.status(200).json({ message: 'User deleted successfully' });
    
  } catch (error) {
    next(error);
  }
}

export const addUser = async (req, res, next) => {
  const {username, email, password} = req.body
  
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return next(errorHandler(400, 'Email already exists!'));
    }

    const hashPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashPassword });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully', newUser });
  } catch (error) {
      next(error);
  }
}

export const editUser = async (req, res, next) => {
  const { id } = req.params;
  const {username, email} = req.body;
  console.log("PASSWORD : ", req.body);
  
  try {
    const updateData = {};
    
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: { username, email} },
      { new: true }
    );
    
    if(!updatedUser) {
      return next(errorHandler(404, 'User not found!'));
    }
    res.status(200).json({ message: 'User updated successfully', updatedUser });
  } catch (error) {
    
  }
}
