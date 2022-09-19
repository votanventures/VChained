import { IsNotEmpty } from 'class-validator';

export class CreateUser {
    @IsNotEmpty()
    public firstname: string;
    @IsNotEmpty()
    public lastname: string;
    @IsNotEmpty()
    public address: string;
    @IsNotEmpty()
    public email: string;
    @IsNotEmpty()
    public password: string;
    @IsNotEmpty()
    public PID: object;
}