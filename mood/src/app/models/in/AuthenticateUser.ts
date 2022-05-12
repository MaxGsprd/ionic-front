export class AuthenticateUser {
    email : string;
    password : string;

    constructor(formValue : any) {
        this.email = formValue.email;
        this.password = formValue.password;
    }
}