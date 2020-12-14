class User {
    private _userId: string;
    private _email: string;
    private _firstName: string;
    private _lastName: string;
    
    constructor(userId: string, email: string, firstName: string, lastName: string) {
        this._userId = userId;
        this._email = email;
        this._firstName = firstName;
        this._lastName = lastName;
    }

    get userId(): string {
        return this._userId;
    }

    get email(): string {
        return this._email;
    }

    get firstName(): string {
        return this._firstName;
    }

    get lastName(): string {
        return this._lastName;
    }
}

export default User;