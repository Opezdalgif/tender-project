import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { AuthDto } from './dto/auth.dto';
import { RefreshTokenGuard } from '../common/guards/refreshToken.guard';



@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService
    ){}

    async signUp(dto: CreateUserDto):Promise<any>{
        const userExists = await this.usersService.geUserByEmail(dto.email)
        if(userExists){
            throw new ForbiddenException('Пользователь с таким email уже есть')
        }
        const passwordHash = await bcrypt.hash(dto.passwordHash , 5)
        const newUser = await this.usersService.createUser({
            ...dto,
            passwordHash: passwordHash
        })
       const token = await this.getTokens(newUser.id , newUser.email)
       await this.updateRefreshToken(newUser.id , token.refreshToken)
        return token;
     
    }

    async signIn(dto: AuthDto ) {
        const user = await this.usersService.geUserByEmail(dto.email)
        if(!user) {
            throw new ForbiddenException('Пользователь с таким email не найден')
        }
        const passwordExists = await bcrypt.compare(dto.password, user.passwordHash)
        
        if(!passwordExists) {
            throw new ForbiddenException('Пароль некорректный')
        }
        const token = await this.getTokens(user.id , user.email)
        await this.updateRefreshToken(user.id , token.refreshToken)
        return token;
    }

    async logout(userId: number) {
        await this.updateRefreshToken(userId ,  null)
    }

    async updateRefreshToken(userId:number , refreshToken:string ) {
           const hashedRefreshToken = await bcrypt.hash(refreshToken , 5)
           await this.usersService.updateToken(
           {refreshToken: hashedRefreshToken}, userId)     
    }

    async getTokens(userID: number, email: string) {
        const [accessToken, refreshToken] = await Promise.all([
          this.jwtService.signAsync(
            {
              userId: userID,
              email,
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

    async refreshToken(userId: number, refreshToken: string){
        const user = await this.usersService.getUserById(userId)
        if(!user || !user.refreshToken){
            throw new ForbiddenException('Доступ запрещен')
        }
        const refreshTokenMathes = await bcrypt.compare(refreshToken,user.refreshToken)
        if(!refreshTokenMathes) {
            throw new ForbiddenException('Доступ запрещен')
        }
        const token = await this.getTokens(user.id , user.email)
        await this.updateRefreshToken(user.id, token.refreshToken)
        return token; 
    }
}    
    
    

