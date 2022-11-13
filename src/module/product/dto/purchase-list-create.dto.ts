import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class PurchaseListCreateDto {
    @IsNotEmpty({message: 'Должно быть заполнено'})
    @IsString({message: 'Должно быть строкой'})
    @Length(3, 50 , {message: 'Должно быть от 3 до 50'})
    readonly title: string;
    
}