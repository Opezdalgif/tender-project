import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef } from '@nestjs/common/utils';
import { ProductEntity } from './enities/product.entity';
import { PurchaseListEntity } from './enities/purchase-list.entity';
import { PurchaseListService } from './services/purchase-list.service';
import { PurchaseListController } from './controllers/purchase-list.controller';
import { ScraperModule } from '../scraper/scraper.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, PurchaseListEntity]),  forwardRef(() => ScraperModule)],
  providers: [ProductService,PurchaseListService ],
  controllers: [ProductController, PurchaseListController],
  exports: [ProductService]
})
export class ProductModule {}
