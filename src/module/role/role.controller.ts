import { Controller, Post , Body , Get , Param} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-roles.dto';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {

    constructor(private roleService: RoleService){}

    @Post('/create')
    create(@Body() dto: CreateRoleDto) {
        return this.roleService.createRole(dto)
    }

    @Get('/get/:value')
    find(@Param('value') value: string) {
        return this.roleService.getRoleByValue(value)
    }

}
