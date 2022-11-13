import { Controller } from '@nestjs/common';
import { Body, Delete, Get, Param, Patch, Post } from '@nestjs/common/decorators';
import { ProductUpdateDto } from '../dto/poduct-update.dto';
import { ProductCreateDto } from '../dto/product-create.dto';
import { ProductGetDto } from '../dto/product-get.dto';
import { ProductService } from '../services/product.service';

@Controller('product')
export class ProductController {
    constructor(
        private readonly productService: ProductService
    ){}
    
    @Post('/create')
    create(@Body() dto: ProductCreateDto) {
        return this.productService.create(dto);
    }

    @Get('/get')
    find(@Body() dto: ProductGetDto){
        return this.productService.find(dto)
    }

    @Get('/getAll')
    findAll() {
        return this.productService.findAll()
    }

    @Patch('/update/:productId')
    update(@Param('productId') productId: number, @Body() dto: ProductUpdateDto) {
        return this.productService.update(productId, dto)
    }

    @Delete('/delete/:productId')
    delete(@Param('productId') productId: number) {
        return this.productService.remove(productId)
    }
}
