import { IsNotEmpty } from 'class-validator';

// NID, BackendUrl, SecretKey, Status, TezosAppId

export class AddNetwork {
    @IsNotEmpty()
    public NID: string;
    @IsNotEmpty()
    public SecretKey: string;
    public TezosAppId: string;
}