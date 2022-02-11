import { IsNotEmpty } from 'class-validator';


export class Transaction {
    @IsNotEmpty()
    public id: string;
    public from: string;
    public to: string;
    public data: string;
    public status: string;
}