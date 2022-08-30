"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
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
const UserModel = mongoose_1.default.model("UserModel", userModel);
exports.default = UserModel;
