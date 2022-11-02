import { IsNotEmpty, IsUUID , IsNumber} from "class-validator";

export class GetUsersDto {
    @IsNotEmpty({ message: 'Поле должно быть заполнено' })
    @IsNumber({} , {message: 'Поле должно быть числом'})
    readonly id: number;

    @IsNotEmpty({ message: 'Поле должно быть заполнено' })
    @IsUUID(4, { message: 'Поле должно быть типа UUIDv4' })
    readonly email: string;
}