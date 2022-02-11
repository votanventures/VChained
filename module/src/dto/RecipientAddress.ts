import { IsNotEmpty } from 'class-validator';

export class Recipient {
    @IsNotEmpty()
    public groupId: string;
    @IsNotEmpty()
    public groupName: string;
    @IsNotEmpty()
    public participant: string;
    @IsNotEmpty()
    public permission: string;
    @IsNotEmpty()
    public action: string;
}