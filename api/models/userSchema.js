import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: 'https://www.pngkit.com/png/detail/126-1262807_instagram-default-profile-picture-png.png',
    }
}, {timestamps: true} );


const User = mongoose.model('User', userSchema);

export default User;