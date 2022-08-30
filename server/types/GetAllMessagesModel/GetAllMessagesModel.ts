export interface IBodyGetMessages {
    from: string
    to: string
}

export type TProjectMessages = IProjectMessages[]

export interface IProjectMessages {
    fromSelf: boolean
    message: string
}

export type TMessages = IMessages[]

export interface IMessages {
    message: { text: string }
    users: string[]
    sender: string 
    _id: string
    createdAt: string
    updatedAt: string
    __v: number
}

export type TResponseAllMessages = IResponseAllMessages[]

export interface IResponseAllMessages {
    fromSelf: boolean
    message: string
    dateSendMessage: string
}



