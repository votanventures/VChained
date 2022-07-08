import { IsNotEmpty } from 'class-validator';

// NID, BackendUrl, SecretKey, Status, TezosAppId

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