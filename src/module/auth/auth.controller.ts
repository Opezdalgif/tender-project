import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UsePipes } from '@nestjs/common/decorators';
import { Request } from 'express';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RefreshTokenGuard } from 'src/common/guards/refreshToken.guard';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
@UsePipes(ValidationPipe)
export class AuthController {

    constructor(private authService: AuthService){}
  
    @Post('/signUp')
    signUp(@Body() dto: CreateUserDto) {
        return this.authService.signUp(dto)
    }

    
    @Post('/signIn')
    signIn(@Body() dto: AuthDto) {
        return this.authService.signIn(dto)
    }

    @UseGuards(AccessTokenGuard)
    @Get('/logout')
    logout(@Req() req: Request) {
        this.authService.logout(req.user['userId'])
    }

    @Get('/refresh')
    @UseGuards(RefreshTokenGuard)
    refreshTokens(@Req() req: Request) {
        return this.authService.refreshToken(req.user as JwtPayload);
    }
}
