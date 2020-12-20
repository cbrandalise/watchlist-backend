import express from 'express';
import { HTTPMethod } from "./enums";

export type Route = {
    path: string,
    method: HTTPMethod,
    handler: (req: express.Request, res: express.Response) => void,
    validation?: any,
    protected?: boolean
}

export class UserDto {
    public email: string;
    public firstName: string;
    public lastName: string;
    public password: string;
    public passwordConfirmation: string;

    constructor(email: string, firstName: string, lastName: string, password: string, passwordConfirmaton: string) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.passwordConfirmation = passwordConfirmaton;
    }
}


export type JwtData = {
    user_id: string,
    email: string
}