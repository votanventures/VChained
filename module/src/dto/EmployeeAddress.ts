import { IsNotEmpty } from 'class-validator';


export class Employee {
    @IsNotEmpty()
    public productId: string;
    public budget: string;
    public number: string;
    public model: string;
    public name: string;
    public description: string;
    public action: string;
}