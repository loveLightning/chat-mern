import { RequestWithBody, RequestWithParamsAndBody } from "../types/GenericRequestAndResponse/GenericRequestAndResponse"
import { ILoginResponseMistake, IRegisterOrLoginResponse, IRegisterResponseMistake, IUserBody } from '../types/RegisterAndLoginModel/RegisterAndLoginModel'
import UserModel from "../models/userModel"
import { Request, Response, NextFunction } from "express"
import { IBodyImage, IParam, ISetAvatar } from "../types/SetAvatarModel/SetAvatarModel"
import { TGetAllUsers } from "../types/GetAllUsersModel/GetAllUsersModel"
const bcrypt = require('bcrypt')

export const register = async (req: RequestWithBody<IUserBody>, res: Response<IRegisterResponseMistake | IRegisterOrLoginResponse>, next: NextFunction) => {
    try {
        const { username, email, password } = req.body
        const usernameCheck = await UserModel.findOne({ username })
        if (usernameCheck) {
            return res.json({ messageUsername: 'username already used', messageEmail: '', status: false })
        }
        const emailCheck = await UserModel.findOne({ email })
        if (emailCheck) {
            return res.json({ messageUsername: '', messageEmail: 'email already used', status: false })
        }
        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = await UserModel.create({
            username,
            email,
            password: hashPassword
        })
        return res.json({ status: true, newUser })
    } catch (error) {
        next(error)
    }
}

export const login = async (req: RequestWithBody<IUserBody>, res: Response<IRegisterOrLoginResponse | ILoginResponseMistake>, next: NextFunction) => {
    try {
        const { username, password } = req.body
        const user = await UserModel.findOne({ username })

        if (!user) {
            return res.json({ message: 'incorrect username or password', status: false })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.json({ message: 'incorrect username or password', status: false })
        }
        return res.json({ status: true, user })
    } catch (error) {
        next(error)
    }
}

// export const setAvatar = async (req: RequestWithParamsAndBody<IParam, IBodyImage>, res: Response<ISetAvatar>, next: NextFunction) => {
// try {
//     const userId = req.params.id
//     const avatarImage = req.body.image
//     const userData = await UserModel.findByIdAndUpdate(userId, {
//         isAvatarImageSet: true,
//         avatarImage: avatarImage
//     })
//     return res.json({
//         isSet: userData?.isAvatarImageSet,
//         image: userData?.avatarImage
//     })
// } catch (err) {
//     next(err)
// }
// }

export const uploadAvatar = async (req: any, res: any, next: NextFunction) => {
    try {
        if (req.body) {
            console.log(req.body)
            res.json({ message: 'file uploaded successfully', file: req.body.file})
        } else {
            res.json({ message: 'file upload error' })
        }
    } catch (err) {
        next(err)
    }
}

export const getAllUsers = async (req: Request, res: Response<TGetAllUsers>, next: NextFunction) => {
    try {
        const users = await UserModel.find({ _id: { $ne: req.params._id } }).select([
            'username', 'email', '_id', 'avatarImage'
        ])
        console.log(users)
        res.json(users)
    } catch (err) {
        next(err)
    }
}
