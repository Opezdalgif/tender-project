import { Body, Controller, HttpCode, HttpStatus, Post, Get, Param, Patch, Delete } from "@nestjs/common";
import { AddRoleDto } from "../dto/addRole.dto";
import { RoleCreateDto } from "../dto/role-create.dto";
import { RoleGetDto } from "../dto/role-get.dto";
import { RoleUpdateDto } from "../dto/role-update.dto";
import { RoleService } from "../services/role.service";
import { UsersService } from "../services/users.service";

@Controller('users/roles')
export class UserRolesController {
    constructor(
        private readonly userService: UsersService,
        private readonly roleService: RoleService
    ){}

    @Post('/create')
    create(@Body() dto: RoleCreateDto) {
        return this.roleService.create(dto)
    }

    @Get('/get')
    find(@Body() dto: RoleGetDto) {
        return this.roleService.find(dto)
    }

    @Get('/getAll') 
    findAll() {
        return this.roleService.findAll()
    }

    @Patch('/:roleId')
    update(@Param('roleId') roleId: string, @Body() dto: RoleUpdateDto) {
        return this.roleService.update(roleId, dto)
    }

    @Delete('/:roleId')
    delete(@Param('roleId') roleId: string){
        return this.roleService.remove(roleId)
    }

    @Post('/add')
    @HttpCode(HttpStatus.OK)
    addRole(@Body() dto: AddRoleDto ) {
        return this.userService.addRole(dto)
    }

    

}