import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { RoleEntity } from '../role/enities/create-role.enities';
import { RoleModule } from '../role/role.module';
import { UsersEntity } from './enities/users.enities';
import { UserRolesController } from './user-roles.controller';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity , RoleEntity]) ,  forwardRef(() => RoleModule)],
  controllers:[UsersController , UserRolesController],
  providers: [UsersService], 
  exports:[
    UsersService,
  ]
})
export class UsersModule {}
