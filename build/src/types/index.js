"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDto = void 0;
class UserDto {
    constructor(email, firstName, lastName, password, passwordConfirmaton) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.passwordConfirmation = passwordConfirmaton;
    }
}
exports.UserDto = UserDto;
