import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs'
import User from '../models/userSchema.js'

export const test = (req, res) => {
    res.json({
        message: 'API Working....'
    })
}

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, 'You can not update the account'));
    }
    try {
        if(req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                profilePicture: req.body.profilePicture,
            }

            }, { new: true });
            console.log("updated user : ", updatedUser);
            
            const {password, ...rest} = updatedUser._doc;
            res.status(200).json(rest)
        
    } catch (error) {
        next(error)
    }
}