import { IsNotEmpty } from 'class-validator';

export class MasterData {
    @IsNotEmpty()
    public name: string;
    public description: string;
    public model: string;
    public category: string;
    public productclass: string;
    public productid: string;
    public action: string;
}