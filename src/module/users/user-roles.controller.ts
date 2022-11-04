import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AddRoleDto } from "../role/dto/addRole.dto";
import { UsersService } from "./users.service";

@Controller('user/roles')
export class UserRolesController {
    constructor(
        private readonly userService: UsersService
    ){}

    @Post('/add')
    @HttpCode(HttpStatus.OK)
    addRole(@Body() dto: AddRoleDto ) {
        return this.userService.addRole(dto)
    }

}