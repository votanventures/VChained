import {HttpException} from '@nestjs/common';

export class RecipientError extends HttpException {

    constructor(message: string, errorCode: string, statusCode: number = 403) {
        super({message, errorCode, statusCode}, statusCode);
    }
}
