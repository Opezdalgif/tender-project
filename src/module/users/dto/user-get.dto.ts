import { IsEmail, IsNumber, IsOptional, IsString } from "class-validator";

export class UserGetDto {
    @IsOptional()
    @IsNumber({}, {message: 'Должно быть числом'})
    readonly id?: number;

    @IsOptional()
    @IsEmail({message: 'Некорректный почтноый адрес'})
    readonly email?: string;
}