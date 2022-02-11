import { IsNotEmpty } from 'class-validator';


export class IncomingAddress {
    @IsNotEmpty()
    public productId: string;
    public budget: string;
    public number: string;
    public model: string;
    public name: string;
    public description: string;
    public action: string;
    public status: string;
}