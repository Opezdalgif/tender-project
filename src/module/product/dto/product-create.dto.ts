import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class ProductCreateDto {
    @IsNotEmpty({message: 'Поле должно быть заполнено'})
    @IsString({message: 'Поле должно быть строкой'})
    @Length(4,80, {message: 'Длина должна быть от 4 до 80'})
    readonly name: string;
    
    @IsNotEmpty({message: 'Поле должно быть заполнено'})
    @IsString({message: 'Поле должно быть строкой'})
    @Length(4,20, {message: 'Длина должна быть от 4 до 80'})
    readonly articul: string;
    
    @IsNotEmpty({message: 'Поле должно быть заполнено'})
    @IsNumber({}, {message: 'Поле должно быть числом'})
    @Length(1,5, {message: 'Длина должна быть от 1 до 5'})
    readonly length: number;

    @IsNotEmpty({message: 'Поле должно быть заполнено'})
    @IsNumber({}, {message: 'Должно быть строкой'})
    @Length(1,7, {message: 'Длина должна быть от 1 до 5'})
    readonly price: number;

    @IsNotEmpty({message: 'Поле должно быть заполнено'})
    @IsNumber({}, {message: 'Поле должно быть числом'})
    @Length(1,5, {message: 'Длина должна быть от 1 до 5'})
    readonly width: number;

    @IsNotEmpty({message: 'Поле должно быть заполнено'})
    @IsNumber({}, {message: 'Поле должно быть числом'})
    @Length(1,5, {message: 'Длина должна быть от 1 до 5'})
    readonly height: number;
   
    @IsNotEmpty({message: 'Поле должно быть заполнено'})
    @IsString({message: 'Поле должно быть строкой'})
    readonly photo: string;
}