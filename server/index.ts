import express from 'express'
import cors from 'cors';
import dotenv from "dotenv";
import { userRoutes } from './routes/userRoutes';
import { messagesRoutes } from './routes/messagesRoutes';
const mongoose = require('mongoose')
const app = express()
const multer = require('multer')
import http, { createServer } from 'http';
import { Server } from "socket.io";
import path from 'path';

dotenv.config();
app.use(express.json())
app.use(cors())
app.use('/api/auth', userRoutes)
app.use('/api/messages', messagesRoutes)

const mongoUrl = process.env.MONGO_URL
const port = process.env.PORT
const server = http.createServer(app);
const httpServer = createServer(app);

const storage = multer.diskStorage({
    destination: (req: any, file: any, cb: (arg0: null, arg1: string) => void) => {
        cb(null, 'images/')
    },
    filename: (req: any, file: { originalname: any; }, cb: (arg0: null, arg1: any) => void) => {
        cb(null, file.originalname)
    },
})

const upload = multer({ storage: storage })

app.post('/api/auth/upload', upload.single('file'), function (req, res) {
    console.log(req.body.file)
    res.json({file: req.body.file})
})

mongoose.connect(mongoUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(() => {
    console.log('connection Mongo')
}).catch((err: any) => {
    console.log(err.message)
})

const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000',
        credentials: true
    }
});

let onlineUsers = new Map()

io.on("connection", (socket) => {
    socket.on('add-user', (userId) => {
        onlineUsers.set(userId, socket.id)
    })

    socket.on('send-message', (data) => {
        const sendUserSocket = onlineUsers.get(data.to)
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit('msg-recieve', data.msg)
        }
    })
});

httpServer.listen(port);