class LoginUserDto {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    static fromRequestBody(body) {
        return new LoginUserDto(body.email, body.password);
    }

    validate() {
        if(!this.email || !this.password) {
            throw new Error('all fields are required');
        }
    }
}

export default LoginUserDto;