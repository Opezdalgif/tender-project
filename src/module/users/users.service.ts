import { 
    Injectable, 
    Logger,
    InternalServerErrorException,
    NotFoundException

} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefreshTokenDto } from '../auth/dto/refreshToken.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersEntity } from './enities/users.enities';
import { AddRoleDto } from '../role/dto/addRole.dto';
import { RoleEntity } from '../role/enities/create-role.enities';
import { RoleService } from '../role/role.service';

@Injectable()
export class UsersService {
    
    private logger = new Logger('USER-SERVICE');

    constructor(
        @InjectRepository(UsersEntity)
        private usersRepository: Repository<UsersEntity> ,
        private rolesService: RoleService
    ){}

    /**
     * Создание пользователя
     * 
     * @param dto
     * @returns
     * 
     */
    
    async createUser(dto: CreateUserDto) {
        
        const user = this.usersRepository.create(dto)
        user.refreshToken = uuidv4()
        try {
            await user.save()
            return user
        } catch (err) {
            this.logger.error(`Произошла ошибка ${err}`)
            throw new InternalServerErrorException('Ошибка создания пользователя')
        }
    }

    async getUser(){
        return this.usersRepository.find()
    }
    /**
     * Поиск пользователя по id
     * 
     * @param id
     * @returns
     * 
     */

    async getUserById(id: number){
        return await this.usersRepository.findOne({ where: {id}  })
        
    }

    /**
     * Поиск пользователя по email
     * 
     * @param email
     * @returns
     * 
     */

    async geUserByEmail(email: string) {
        return await this.usersRepository.findOne({ where: {email}})
    }

    /**
     * Польная информация пользователя по id
     * 
     * @param id
     * @returns
     * 
     */

    async getUserAllById(id: number) {
        const user = await this.usersRepository.findOne({
            select: {
                firstName: true,
                lastName: true,
                email: true,
            },
            where: {id},
        });

        if (!user) {
            throw new NotFoundException('Аккаунт не существует или был удален');
        }

        return user;
    }
   
    /**
     * Изменение информации пользователя
     * 
     * @param id
     * @param dto
     * @returns
     * 
     */

    async updateUser(id: number , dto: UpdateUserDto) {
        const user = await this.getUserAllById(id)

        if(user) {
            for(let key in dto) {
                user[key] = dto[key]
            }
            await user.save()
        }

        throw new InternalServerErrorException('Такого пользователя не существует')

    }

    async updateToken(dto: RefreshTokenDto , idUser: number){
        return await this.usersRepository.update(dto , {id: idUser})
    }

    async addRole(dto : AddRoleDto){
        const user = await this.usersRepository.findOneBy({id: dto.userId})
        const role = await this.rolesService.getRoleByValue(dto.value)
        if( role && user) {
            user.roles.push(role);
            await user.save();
        }
    }

}
