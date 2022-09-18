import { IsNotEmpty } from 'class-validator';


export class AddTransaction {
    @IsNotEmpty()
    public transactionId: string;
    @IsNotEmpty()
    public transaction: string;
    @IsNotEmpty()
    public PId: string;
    @IsNotEmpty()
    public productId: string;
    @IsNotEmpty()
    public productData: string;
    @IsNotEmpty()
    public owner: string;
    @IsNotEmpty()
    public auth: string;
}