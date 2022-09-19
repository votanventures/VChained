import { IsNotEmpty } from 'class-validator';


export class AddNetwork {
    @IsNotEmpty()
    public NID: string;
    @IsNotEmpty()
    public BackendUrl: string;
    @IsNotEmpty()
    public SecretKey: string;
    @IsNotEmpty()
    public Status: string;
    @IsNotEmpty()
    public TezosAppId: string;
}