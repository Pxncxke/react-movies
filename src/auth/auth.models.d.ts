export interface claim{
    name: string;
    value: string;
}

export interface userCredentials{
    email: string;
    password: string;
}

export interface autheticationResponse{
    token: string;
    expiration: Date;
}

export interface userDto{
    id: string;
    email: string;
}
