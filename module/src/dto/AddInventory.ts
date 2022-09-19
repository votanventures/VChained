import { IsNotEmpty } from 'class-validator';
 
export class AddInventory {
    @IsNotEmpty()
    public PID: string;
    @IsNotEmpty()
    public user_id: string;
    @IsNotEmpty()
    public productAttributes: object;
    // new entry added
    @IsNotEmpty()
    public id: string;
    @IsNotEmpty()
    public owner: string;
    @IsNotEmpty()
    public modifiedAt: string;
    @IsNotEmpty()
    public createdAt: string;
    @IsNotEmpty()
    public claimRequest: string;
    @IsNotEmpty()
    public action: string;
}
