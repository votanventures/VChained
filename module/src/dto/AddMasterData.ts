import { IsNotEmpty } from 'class-validator';

export class AddMasterData {
    @IsNotEmpty()
    public name: string;
    @IsNotEmpty()
    public description: string;
    @IsNotEmpty()
    public model: string;
    @IsNotEmpty()
    public PID: string;
    @IsNotEmpty()
    public category: string;
    @IsNotEmpty()
    public productClass: string;
    @IsNotEmpty()
    public productId: string;
}