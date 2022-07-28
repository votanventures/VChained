import { IsNotEmpty } from 'class-validator';

export class AddInventory {
    @IsNotEmpty()
    public id: string;
    @IsNotEmpty()
    public name: string;
    @IsNotEmpty()
    public user_id: string;
    @IsNotEmpty()
    public owner: string;
    @IsNotEmpty()
    public PID: string;
    @IsNotEmpty()
    public category: string;
    @IsNotEmpty()
    public model: string;
    @IsNotEmpty()
    public manufactureIn: string;
    @IsNotEmpty()
    public createdIn: string;
    @IsNotEmpty()
    public description: string; 
    @IsNotEmpty()
    public action: string;
    
    public productAttributes:object;
}
