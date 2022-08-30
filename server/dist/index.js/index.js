"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoutes_1 = require("./routes/userRoutes");
const messagesRoutes_1 = require("./routes/messagesRoutes");
const mongoose = require('mongoose');
const app = (0, express_1.default)();
const multer = require('multer');
const http_1 = __importStar(require("http"));
const socket_io_1 = require("socket.io");
dotenv_1.default.config();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/auth', userRoutes_1.userRoutes);
app.use('/api/messages', messagesRoutes_1.messagesRoutes);
const mongoUrl = process.env.MONGO_URL;
const port = process.env.PORT;
const server = http_1.default.createServer(app);
const httpServer = (0, http_1.createServer)(app);
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage });
app.post('/api/auth/upload', upload.single('file'), function (req, res) {
    console.log(req.body.file);
    res.json({ file: req.body.file });
});
mongoose.connect(mongoUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(() => {
    console.log('connection Mongo');
}).catch((err) => {
    console.log(err.message);
});
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000',
        credentials: true
    }
});
let onlineUsers = new Map();
io.on("connection", (socket) => {
    socket.on('add-user', (userId) => {
        onlineUsers.set(userId, socket.id);
    });
    socket.on('send-message', (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit('msg-recieve', data.msg);
        }
    });
});
httpServer.listen(port);
