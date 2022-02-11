import { IsNotEmpty } from 'class-validator';

export class UserAddress {
    @IsNotEmpty()
    public userid: string;
    @IsNotEmpty()
    public firstname: string;
    @IsNotEmpty()
    public lastname: string;
    @IsNotEmpty()
    public address: string;
    @IsNotEmpty()
    public email: string;
    @IsNotEmpty()
    public password: string;
    @IsNotEmpty()
    public usedcresit: string;
    @IsNotEmpty()
    public credits: string;
    @IsNotEmpty()
    public plan: string;
    @IsNotEmpty()
    public active:  string;
}