import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/services/users.service';
import * as bcrypt from 'bcryptjs';
import { AuthDto } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshTokenEntity } from './enities/refresh-token.entity';
import { Repository } from 'typeorm';
import { UsersEntity } from '../users/enities/users.enities';




@Injectable()
export class AuthService {

    private readonly logger = new Logger('AUTH-SERVICE');

    constructor(

      @InjectRepository(RefreshTokenEntity)
      private refreshTokenRepository: Repository<RefreshTokenEntity>,

        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService
    ){}

    async signUp(dto: CreateUserDto):Promise<any>{
        const userExists = await this.usersService.find({email: dto.email})
        if(userExists){
            throw new ForbiddenException('Пользователь с таким email уже есть')
        }

        const user = await this.usersService.create(dto)
        const tokens = await this.getTokens(user.id, user.email)
        return tokens;
    }

    async signIn(dto: AuthDto ) {
        let user: UsersEntity
        if(!(user = await this.usersService.findPassword({email: dto.email}))) {
          throw new BadRequestException('Аккаунт с указанной почтой не сущесвтует')
        }

        if(!(await this.usersService.comparePassword(user, dto.password))) {
            throw new BadRequestException('Пароль неверный')
        }

        const tokens = await this.getTokens(user.id, user.email)
        return tokens;
    }

    async logout(jwtPaylod: JwtPayload) {
        const refreshToken = await this.refreshTokenRepository.findOneBy({
          id: jwtPaylod.refreshTokenId
        })

        if(!refreshToken) {
          throw new ForbiddenException('Доступ запрещён')
        }

        try {
          await refreshToken.remove()
          return;
        } catch (e) {
          this.logger.error(`Ошибка: ${e}`)
          throw new ForbiddenException('Ошибка выхода из аккаунта')
        }
    }


    async getTokens(userID: number, email: string) {
      const refreshTokenInstance = RefreshTokenEntity.create({ userId: userID });

        try {
            await refreshTokenInstance.save();
        } catch (e) {
            this.logger.error(`Error generate tokens: ${e}`);
            throw new InternalServerErrorException('Ошибка генерации токенов');
        }
        const [accessToken, refreshToken] = await Promise.all([
          this.jwtService.signAsync(
            {
              userId: userID,
              email,
              refreshTokenId: refreshTokenInstance.id,
            },
            {
              secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
              expiresIn: '1d',
            },
          ),
          this.jwtService.signAsync(
            {
              userId: userID,
              email,
              refreshTokenId: refreshTokenInstance.id,
            },
            {
              secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
              expiresIn: '7d',
            },
          ),
        ]);
    
        return {
          accessToken,
          refreshToken,
        };
    }

    async refreshToken(jwtPaylod: JwtPayload){
        const user = await this.usersService.find({id: jwtPaylod.userId})
        if(!user || !jwtPaylod.refreshTokenId){
            throw new ForbiddenException('Доступ запрещен')
        }
        const refreshTokenMathes = await this.refreshTokenRepository.findOneBy({
          id: jwtPaylod.refreshTokenId
        })
        if(!refreshTokenMathes) {
            throw new ForbiddenException('Доступ запрещен')
        }
         try {
          await refreshTokenMathes.remove()
        } catch (e) {
          this.logger.error(`Ошибка: ${e}`)
          throw new InternalServerErrorException('Ошибка деактивации refresh-token')
        }

    }
}    
    
    

