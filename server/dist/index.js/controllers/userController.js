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
exports.getAllUsers = exports.uploadAvatar = exports.login = exports.register = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt = require('bcrypt');
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const usernameCheck = yield userModel_1.default.findOne({ username });
        if (usernameCheck) {
            return res.json({ messageUsername: 'username already used', messageEmail: '', status: false });
        }
        const emailCheck = yield userModel_1.default.findOne({ email });
        if (emailCheck) {
            return res.json({ messageUsername: '', messageEmail: 'email already used', status: false });
        }
        const hashPassword = yield bcrypt.hash(password, 10);
        const newUser = yield userModel_1.default.create({
            username,
            email,
            password: hashPassword
        });
        return res.json({ status: true, newUser });
    }
    catch (error) {
        next(error);
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield userModel_1.default.findOne({ username });
        if (!user) {
            return res.json({ message: 'incorrect username or password', status: false });
        }
        const isPasswordValid = yield bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.json({ message: 'incorrect username or password', status: false });
        }
        return res.json({ status: true, user });
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
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
const uploadAvatar = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body) {
            console.log(req.body);
            res.json({ message: 'file uploaded successfully', file: req.body.file });
        }
        else {
            res.json({ message: 'file upload error' });
        }
    }
    catch (err) {
        next(err);
    }
});
exports.uploadAvatar = uploadAvatar;
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.default.find({ _id: { $ne: req.params._id } }).select([
            'username', 'email', '_id', 'avatarImage'
        ]);
        console.log(users);
        res.json(users);
    }
    catch (err) {
        next(err);
    }
});
exports.getAllUsers = getAllUsers;
