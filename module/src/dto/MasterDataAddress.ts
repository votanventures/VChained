import { IsNotEmpty } from 'class-validator';

export class MasterData {
    @IsNotEmpty()
    public name: string;
    @IsNotEmpty()
    public description: string;
    @IsNotEmpty()
    public model: string;
    @IsNotEmpty()
    public category: string;
    @IsNotEmpty()
    public productclass: string;
    @IsNotEmpty()
    public productid: string;
    @IsNotEmpty()
    public action: string;
}