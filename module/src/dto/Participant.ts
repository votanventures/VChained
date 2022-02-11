import { IsNotEmpty } from 'class-validator';


export class Participant {
    @IsNotEmpty()
    public company: string;
    public city: string;
    public country: string;
    public role: string;
    public email: string;
    public status: string;
    public action: string;
}