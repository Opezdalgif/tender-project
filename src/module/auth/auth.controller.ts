import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AccessTokenGuard } from '../common/guards/accessToken.guard';
import { RefreshTokenGuard } from '../common/guards/refreshToken.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}
  
    @Post('signUp')
    signUp(@Body() dto: CreateUserDto) {
        return this.authService.signUp(dto)
    }

    
    @Post('signIn')
    signIn(@Body() dto: AuthDto) {
        return this.authService.signIn(dto)
    }

    @UseGuards(AccessTokenGuard)
    @Get('logout')
    logout(@Req() req: Request) {
        this.authService.logout(req.user['userId'])
    }

    @UseGuards(RefreshTokenGuard)
    @Get('refresh')
    refreshToken(@Req() req: Request){
        const userId = req.user['userId']
        const refreshToken = req.user['refreshToken']
        return this.authService.refreshToken(userId , refreshToken)
    } 
}
