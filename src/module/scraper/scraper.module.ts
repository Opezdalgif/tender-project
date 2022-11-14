import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '../product/enities/product.entity';
import { ProductModule } from '../product/product.module';
import { ScraperController } from './scraper.controller';
import { ScraperService } from './scraper.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), forwardRef(() => ProductModule)],
  controllers: [ScraperController],
  providers: [ScraperService]
})
export class ScraperModule {}
