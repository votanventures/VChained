import { IsNotEmpty } from 'class-validator';


export class AddTransaction {
    @IsNotEmpty()
    public txId: string;
    @IsNotEmpty()
    public data: JSON;
}