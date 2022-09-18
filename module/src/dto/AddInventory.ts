import { IsNotEmpty } from 'class-validator';

export class AddInventory {
    @IsNotEmpty()
    public PID: string;
    @IsNotEmpty()
    public productAttributes:object;
}
