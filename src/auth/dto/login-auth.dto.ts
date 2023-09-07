import { IsEmail, MinLength, IsAlphanumeric, IsOptional } from "class-validator";

export class LoginAuthDto {
    @IsEmail()
    @IsOptional()
    email: string;
    
    @IsOptional()
    username:string;

    @MinLength(8)
    @IsAlphanumeric()    
    password:string;
}
