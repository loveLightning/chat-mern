export type TGetAllUsers = IGetAllUsers[]

interface IGetAllUsers {
    username: string
    email: string
    _id: string
    avatarImage: string
}