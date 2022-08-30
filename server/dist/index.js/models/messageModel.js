"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const messagesModel = new Schema({
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
}, {
    timestamps: true
});
const MessagesModel = mongoose_1.default.model("MessagesModel", messagesModel);
exports.default = MessagesModel;
