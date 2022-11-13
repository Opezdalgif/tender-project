import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './module/auth/auth.module';
import { ProductModule } from './module/product/product.module';
import { UsersEntity } from './module/users/enities/users.enities';
import { UsersModule } from './module/users/users.module';


@Module({
  imports: [ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST ,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      entities: [
        UsersEntity
      ],
      synchronize: true,
      
      
    }),
    UsersModule,
    AuthModule,
    ProductModule
  ],
  controllers: [],
  providers:[]
})
export class AppModule {}
