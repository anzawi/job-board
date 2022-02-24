export interface User {
    username: string,
    email: string,
    token: string,
    isAdmin: boolean,
    resume: string,
    currentPosition: string,
    userName?: string
}

export interface UserForms {
    email: string,
    password: string,
    username?: string,
    confirmPassword?: string,
    currentPosition?: string
}