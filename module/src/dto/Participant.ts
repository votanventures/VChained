import { IsNotEmpty } from 'class-validator';


export class Participant {
    @IsNotEmpty()
    public company: string;
    @IsNotEmpty()
    public city: string;
    @IsNotEmpty()
    public country: string;
    @IsNotEmpty()
    public role: string;
    @IsNotEmpty()
    public email: string;
    @IsNotEmpty()
    public status: string;
    @IsNotEmpty()
    public action: string;
}