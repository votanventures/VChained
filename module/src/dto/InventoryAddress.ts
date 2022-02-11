import { IsNotEmpty } from 'class-validator';

export class InventoryAddress {
    @IsNotEmpty()
    public id: string;
    @IsNotEmpty()
    public budget: string;
    @IsNotEmpty()
    public category: string;
    @IsNotEmpty()
    public model: string;
    @IsNotEmpty()
    public maunfacturein: string;
    @IsNotEmpty()
    public createdin: string;
    @IsNotEmpty()
    public description: string;
    @IsNotEmpty()
    public action: string;
}
