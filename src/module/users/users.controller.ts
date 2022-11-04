import { Controller  , Post , Get , Body , Param} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService){}

    @Post('/create')
    create(@Body() dto: CreateUserDto) {
        return this.userService.createUser(dto)
    }

    @Get('/:userId')
    find(@Param('userId') userId: number){
        return  this.userService.getUserById(userId)
    }

    @Get('/get')
    findAll() {
        return this.userService.getUser()
    }

}
