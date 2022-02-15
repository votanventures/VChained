import { IsNotEmpty } from 'class-validator';


export class Transaction {
    @IsNotEmpty()
    public id: string;
    @IsNotEmpty()
    public from: string;
    @IsNotEmpty()
    public to: string;
    @IsNotEmpty()
    public data: string;
    @IsNotEmpty()
    public status: string;
}