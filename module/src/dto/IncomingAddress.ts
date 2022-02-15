import { IsNotEmpty } from 'class-validator';


export class IncomingAddress {
    @IsNotEmpty()
    public productId: string;
    @IsNotEmpty()
    public budget: string;
    @IsNotEmpty()
    public number: string;
    @IsNotEmpty()
    public model: string;
    @IsNotEmpty()
    public name: string;
    @IsNotEmpty()
    public description: string;
    @IsNotEmpty()
    public action: string;
    @IsNotEmpty()
    public status: string;
}