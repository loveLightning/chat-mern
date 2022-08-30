import mongoose from 'mongoose';
import { IMessages } from '../types/GetAllMessagesModel/GetAllMessagesModel';
const { Schema } = mongoose;

const messagesModel = new Schema(
    {
        message: {
            text: {
                type: String,
                required: true
            },
        },
        users: Array,
        sender: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const MessagesModel = mongoose.model<IMessages>("MessagesModel", messagesModel)
export default MessagesModel 
