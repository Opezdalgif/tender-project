import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from '../users/enities/users.enities';
import { UsersModule } from '../users/users.module';
import { RoleEntity } from './enities/create-role.enities';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity , RoleEntity]) , 
   forwardRef(() => UsersModule)
  ],
  controllers: [RoleController],
  providers: [RoleService], 
  exports: [
    RoleService
  ]
})
export class RoleModule {}
