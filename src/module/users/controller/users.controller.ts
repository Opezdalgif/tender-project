import { Controller  , Post , Get , Body , Param, Patch, Delete} from '@nestjs/common';

import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserGetDto } from '../dto/user-get.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService){}

    @Post('/create')
    create(@Body() dto: CreateUserDto) {
        return this.userService.create(dto)
    }

    @Get('/get')
    find(@Body() dto: UserGetDto){
        return  this.userService.find(dto)
    }

    @Get('/getAll')
    findAll() {
        return this.userService.findAll()
    }

    @Patch('/:userId')
    update(@Param('userId') userId: number, @Body() dto: UpdateUserDto) {
        return this.userService.update(userId, dto)
    }

    @Delete('/:userId')
    delete(@Param('userId') userId: number) {
        return this.userService.remove(userId)
    }
}
