import { IsNumber, IsOptional, IsString } from "class-validator";

export class ProductGetDto {
    @IsOptional()
    @IsNumber({}, {message: 'Должно быть числом'})
    readonly id?: number;

    @IsOptional()
    @IsString({message: 'Должно быть строкой'})
    readonly articul?: string;

}