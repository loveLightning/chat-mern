import { NextFunction } from 'express'
import MessagesModel from '../models/messageModel'
import { IBodyAddMessages, ISendMessageResult } from '../types/AddMessageModel/AddMessageModel'
import { RequestWithBody } from '../types/GenericRequestAndResponse/GenericRequestAndResponse'
import { Response } from 'express'
import { IBodyGetMessages, TMessages, TResponseAllMessages } from '../types/GetAllMessagesModel/GetAllMessagesModel'

export const addMessage = async (req: RequestWithBody<IBodyAddMessages>, res: Response<ISendMessageResult>, next: NextFunction) => {
    try {
        const { from, to, message } = req.body

        const data = await MessagesModel.create({
            message: { text: message },
            users: [from, to],
            sender: from
        })
        if (data) return res.json({ message: 'Message added successfully' })
        return res.json({ message: 'Failed to add message to the database' })
    } catch (err) {
        next(err)
    }
}

export const getAllMessages = async (req: RequestWithBody<IBodyGetMessages>, res: Response<TResponseAllMessages>, next: NextFunction) => {
    try {
        const { from, to } = req.body
        const messages = await MessagesModel.find({
            users: {
                $all: [from, to]
            }
        }).sort({ updatedAt: 1 })

        const projectMessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender === from,
                message: msg.message.text,
                dateSendMessage: msg.updatedAt
            }
        })
        res.json(projectMessages)

    } catch (err) {
        next(err)
    }
}