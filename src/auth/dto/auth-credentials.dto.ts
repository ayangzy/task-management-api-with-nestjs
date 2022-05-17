import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto{

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/, {message: 'Password is too weak'})
    password: string;
}