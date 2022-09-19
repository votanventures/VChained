import { IsNotEmpty } from 'class-validator';

export class AddParticipient {
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
    public TezosAppID: string;
    @IsNotEmpty()
    public AppNetworkID: string;
}