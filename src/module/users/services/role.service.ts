import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NoNeedToReleaseEntityManagerError, Repository } from 'typeorm';
import { RoleCreateDto } from '../dto/role-create.dto';
import { RoleGetDto } from '../dto/role-get.dto';
import { RoleUpdateDto } from '../dto/role-update.dto';
import { RoleEntity } from '../enities/role.entity';

@Injectable()
export class RoleService {
    private readonly logger: Logger = new Logger('ROLE-SERVICE');

    constructor(
        @InjectRepository(RoleEntity)
        private rolesRepository: Repository<RoleEntity>
    ){}

    /**
     * Создание роли
     * 
     * @param dto 
     * @returns 
     */
    async create (dto: RoleCreateDto) {
        const role = this.rolesRepository.create(dto);

        try {
            await role.save();
        } catch (e) {
            this.logger.error(`Ошибка создания роли: ${e}`);
            throw new InternalServerErrorException('Ошибка создания роли');
        }

        return role;
    }

    /**
     * Поиск роли
     * 
     * @param whereDto 
     * @returns 
     */
    async find (whereDto: RoleGetDto) {
        return this.rolesRepository.findOneBy(whereDto);
    }

    /**
     * Получение и проверка на существание
     * 
     * @param whereDto 
     * @returns 
     */
    async getExists (whereDto: RoleGetDto) {
        const role = await this.find(whereDto);

        if (!role) {
            throw new NotFoundException('Роль не существует или была удалена');
        }
        
        return role;
    }

    /**
     * Полученение всех ролей
     * 
     * @returns 
     */
    async findAll () {
        return this.rolesRepository.find();
    }

    /**
     * Обновление роли
     * 
     * @param roleId
     * @param updateDto
     * @returns 
     */
    async update (roleId: string, updateDto: RoleUpdateDto) {
        const role = await this.getExists({id: roleId});

        for (let key in updateDto) {
            role[key] = updateDto[key];
        }

        try {
            await role.save();
        } catch (e) {
            this.logger.error(`Ошибка обновления роли: ${e}`);
            throw new InternalServerErrorException('Ошибка обновления роли');
        }

        return;
    }

    /**
     * Удаление роли
     * 
     * @param roleId 
     * @param updateDto 
     * @returns
     */
    async remove (roleId: string) {
        const role = await this.getExists({id: roleId});

        try {
            await role.remove();
        } catch (e) {
            this.logger.error(`Ошибка удаления роли: ${e}`);
            throw new InternalServerErrorException('Ошибка удаления роли');
        }

        return;
    }
}
