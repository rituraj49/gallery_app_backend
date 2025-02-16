class CreateMediaDto {
    constructor(title, userId, fileType, filePath, description, tags) {
        this.title = title;
        this.userId = userId;
        this.fileType = fileType;
        this.filePath = filePath;
        this.description = description;
        this.tags = tags;
    }

    static fromRequestBody(body) {
        return new CreateMediaDto(body.title, body.userId, body.fileType, body.filePath, body.description, body.tags);
    }

    validate() {
        if(!this.title || !this.userId || !this.fileType || !this.filePath) {
            throw new Error('all fields are required'); 
        }

    }
}

export default CreateMediaDto;