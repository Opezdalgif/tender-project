import { IsEmail, IsString  , Length} from "class-validator";

export class AuthDto{
    @IsString({message: 'Должно быть строкой'})
    @IsEmail({} , {message: 'Некорректный email'})
    readonly email: string;
    
    @IsString({message: 'Поле должно быть строкой'})
    @Length(4,20,{message: 'Пароль должен быть не меньше 4 и не больше 20 символов'})
    readonly password: string;
}