import { 
    Injectable, 
    Logger,
    InternalServerErrorException,
    NotFoundException

} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersDto } from './dto/get-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersEntity } from './enities/users.enities';

@Injectable()
export class UsersService {
    
    private logger = new Logger('ACCOUNT-SERVICE');

    constructor(
        @InjectRepository(UsersEntity)
        private usersRepository: Repository<UsersEntity>
    ){}

    /**
     * Создание пользователя
     * 
     * @param dto
     * @returns
     * 
     */
    
    async createUser(dto: CreateUserDto) {
        const user =  this.usersRepository.create(dto)
        try {
            await user.save()
            return user
        } catch (err) {
            this.logger.error(`Произошла ошибка ${err}`)
            throw new InternalServerErrorException('Ошибка создания пользователя')
        }
    }

    /**
     * Поиск пользователя по id
     * 
     * @param where
     * @returns
     * 
     */

    async getUserById(where: GetUsersDto) {
        return await this.usersRepository.findOne({ where })
    }

    /**
     * Поиск пользователя по id
     * 
     * @param where
     * @returns
     * 
     */

    async getUserAllById(where: GetUsersDto) {
        const user = await this.usersRepository.findOne({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
            },
            where,
        });

        if (!user) {
            throw new NotFoundException('Аккаунт не существует или был удален');
        }

        return user;
    }
   

    async updateUser(where: GetUsersDto , dto: UpdateUserDto) {
        const user = await this.getUserAllById(where)

        if(user) {
            for(let key in dto) {
                user[key] = dto[key]
            }
            await user.save()
        }

        throw new InternalServerErrorException('Такого пользователя не существует')

    }

}
