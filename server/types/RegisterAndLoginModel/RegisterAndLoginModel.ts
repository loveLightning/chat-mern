
export interface IUser {
    body: IUserBody
}

export interface IUserBody {
    username: string
    email?: string
    password: string | number
}

export interface IRegisterOrLoginResponse {
    status: boolean
    newUser?: ISchemaUser
    user?: ISchemaUser
}

export interface IRegisterResponseMistake {
    messageUsername: string
    messageEmail: string
    status: boolean
}

export interface ILoginResponseMistake {
    message: string
    status: boolean
}

export interface ISchemaUser {
    username: string
    email: string
    password: string | number
    isAvatarImageSet: boolean
    avatarImage: string
    _id?: string
}