import { IsNotEmpty } from 'class-validator';

export class PathAddress {
    @IsNotEmpty()
    public productName: string;
}
