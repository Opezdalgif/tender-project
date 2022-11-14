import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RefreshTokenEntity } from './enities/refresh-token.entity';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';

@Module({
    imports:[JwtModule.register({}), UsersModule, TypeOrmModule.forFeature([RefreshTokenEntity])],
    controllers:[AuthController],
    providers:[AuthService , AccessTokenStrategy , RefreshTokenStrategy , ConfigService],

})
export class AuthModule {}
