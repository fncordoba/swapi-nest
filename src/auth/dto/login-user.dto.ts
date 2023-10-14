import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';


export class LoginUserDto {

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).{6,50}$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;

}