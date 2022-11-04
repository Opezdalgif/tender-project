import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-roles.dto';
import { RoleEntity } from './enities/create-role.enities';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(RoleEntity)
        private rolesRepository: Repository<RoleEntity>
    ){}

    async createRole(dto: CreateRoleDto){
        return this.rolesRepository.create(dto).save()
    }

    async getRoleByValue(value: string){
        return this.rolesRepository.findOneBy({value: value})
    }

}
