import { IsNotEmpty } from 'class-validator';

export class AddMasterData { 
    @IsNotEmpty()
    public PID: string;
    @IsNotEmpty()
    public productId: string;
    @IsNotEmpty()
    public productAttributes: object;
}