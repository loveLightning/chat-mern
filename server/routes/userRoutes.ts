import * as express from 'express';
import { register, login, getAllUsers, uploadAvatar } from '../controllers/userController';
import { uploadFile } from '../middleware/file';
export const userRoutes = express.Router()

userRoutes.post('/register', register)
userRoutes.post('/login', login)
// userRoutes.post('/setAvatar/:id', setAvatar)
userRoutes.get('/allusers/:id', getAllUsers)
// userRoutes.post('/upload', uploadFile.single('avatar'), uploadAvatar)
