import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { RoleEntity } from './enities/role.entity';
import { UsersEntity } from './enities/users.enities';
import { UserRolesController } from './controller/user-roles.controller';
import { UsersController } from './controller/users.controller';
import { UsersService } from './services/users.service';
import { RoleService } from './services/role.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity , RoleEntity])],
  controllers:[UsersController , UserRolesController],
  providers: [UsersService, RoleService], 
  exports:[
    UsersService,
  ]
})
export class UsersModule {}
