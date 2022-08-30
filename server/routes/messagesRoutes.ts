import * as express from 'express';
import { addMessage, getAllMessages } from '../controllers/messagesController';
export const messagesRoutes = express.Router()

messagesRoutes.post('/addMsg', addMessage)
messagesRoutes.post('/getMsg', getAllMessages)