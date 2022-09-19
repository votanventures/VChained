import { IsNotEmpty } from 'class-validator';

//                 - id
//  *              - user_id
//  *              - owner
//  *              - PID
//  *              - modifiedAt
//  *              - createdAt
//  *              - percenatge
//  *              - percentageUsed
//  *              - action
//  *              - productAttributes
//  *              - claimRequest    

export class AddInventory {
    @IsNotEmpty()
    public PID: string;
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
    public action: string;
}
