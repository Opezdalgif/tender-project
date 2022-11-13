import {IsUUID, IsString, IsOptional} from 'class-validator';

export class RoleGetDto {
    @IsOptional()
    @IsUUID(4, {message: 'Должен быть типа UUIDv4'})
    readonly id?: string;
    
    @IsOptional()
    @IsString({message: 'Должно быть строкой'})
    readonly name?: string;
}