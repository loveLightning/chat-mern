import mongoose from 'mongoose';
import { ISchemaUser } from '../types/RegisterAndLoginModel/RegisterAndLoginModel';
const { Schema } = mongoose;


const userModel = new Schema({
    username: {
        type: String,
        max: 20,
        min: 3,
        required: true,
        unique: true
    },
    email: {
        type: String,
        max: 50,
        required: true, 
        unique: true
    },
    password: {
        type: String,
        min: 8,
        required: true, 
        unique: true
    },
    isAvatarImageSet: {
        type: Boolean,
        default: false
    },
    avatarImage: {
        type: String,
        default: ''
    }
});


const UserModel = mongoose.model<ISchemaUser>("UserModel", userModel)
export default UserModel 
