class CreateUserDto {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static fromRequestBody(body) {
        return new CreateUserDto(body.name, body.email, body.password);
    }

    validate() {
        if(!this.name || !this.email || !this.password) {
            throw new Error('all fields are required'); 
        }

    }
}

export default CreateUserDto;