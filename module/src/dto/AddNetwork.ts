import { IsNotEmpty } from 'class-validator';

export class AddNetwork {
    @IsNotEmpty()
    public productId: string;
    @IsNotEmpty()
    public budget: string;
    @IsNotEmpty()
    public number: string;
    @IsNotEmpty()
    public PID: string;
    @IsNotEmpty()
    public model: string;
    @IsNotEmpty()
    public name: string;
    @IsNotEmpty()
    public description: string;
    @IsNotEmpty()
    public action: string;
}