import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './enities/product.entity';
import { PurchaseListEntity } from './enities/purchase-list.entity';
import { PurchaseListService } from './services/purchase-list.service';
import { PurchaseListController } from './controllers/purchase-list.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, PurchaseListEntity])],
  providers: [ProductService,PurchaseListService ],
  controllers: [ProductController, PurchaseListController]
})
export class ProductModule {}
