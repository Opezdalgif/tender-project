import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class UpdateUserDto {
    
    @IsNotEmpty({message: 'Поле должно быть заполнено'})
    @IsString({message: 'Поле должно быть строкой'})
    @Length(2, 45 , {message: 'Должно быть от 2 до 45 символов'})
    readonly firstName: string;

    @IsNotEmpty({message: 'Поле должно быть заполнено'})
    @IsString({message: 'Поле должно быть строкой'})
    @Length(2, 80 , {message: 'Должно быть от 2 до 80 символов'})
    readonly lastName: string;

    @IsNotEmpty({message: 'Поле должно быть заполнено'})
    @IsEmail({message: 'Должна быть электронная почта'})
    readonly email: string;
}