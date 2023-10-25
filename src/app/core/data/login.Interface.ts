interface LoginData {
    "username": string,
    "password": string,
    "userType": string,
    "userId": string,
    "fullName": string
}

export interface UsersLoginData {
    users: LoginData[]
}