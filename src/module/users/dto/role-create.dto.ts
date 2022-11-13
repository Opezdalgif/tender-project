import {IsString, Length} from 'class-validator';

export class RoleCreateDto {
    @IsString({message: 'Должно быть строкой'})
    @Length(1, 45, {message: 'Должно содержать от 1 до 45 символов'})
    readonly name: string;

    @IsString({message: 'Должно быть строкой'})
    @Length(1, 120, {message: 'Должно содержать от 1 до 120 символов'})
    readonly description: string;
}