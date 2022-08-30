"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllMessages = exports.addMessage = void 0;
const messageModel_1 = __importDefault(require("../models/messageModel"));
const addMessage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { from, to, message } = req.body;
        const data = yield messageModel_1.default.create({
            message: { text: message },
            users: [from, to],
            sender: from
        });
        if (data)
            return res.json({ message: 'Message added successfully' });
        return res.json({ message: 'Failed to add message to the database' });
    }
    catch (err) {
        next(err);
    }
});
exports.addMessage = addMessage;
const getAllMessages = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { from, to } = req.body;
        const messages = yield messageModel_1.default.find({
            users: {
                $all: [from, to]
            }
        }).sort({ updatedAt: 1 });
        const projectMessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender === from,
                message: msg.message.text,
                dateSendMessage: msg.updatedAt
            };
        });
        res.json(projectMessages);
    }
    catch (err) {
        next(err);
    }
});
exports.getAllMessages = getAllMessages;
