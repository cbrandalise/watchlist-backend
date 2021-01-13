"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(userId, email, firstName, lastName) {
        this._hash = null;
        this._userId = userId;
        this._email = email;
        this._firstName = firstName;
        this._lastName = lastName;
    }
    get userId() {
        return this._userId;
    }
    get email() {
        return this._email;
    }
    get firstName() {
        return this._firstName;
    }
    get lastName() {
        return this._lastName;
    }
    get hash() {
        return this._hash;
    }
    set hash(pw) {
        this._hash = pw;
    }
}
exports.default = User;
