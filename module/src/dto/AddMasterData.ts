import { IsNotEmpty } from 'class-validator';

export class AddMasterData { 
    @IsNotEmpty()
    public PID: string;
    @IsNotEmpty()
    public productId: string;
    @IsNotEmpty()
    public productAttributes: object;
    // add new entry
    @IsNotEmpty()
    public user_id: string;
}