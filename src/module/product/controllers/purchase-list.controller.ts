import { Body, Controller, Get, Post, Patch } from "@nestjs/common";
import { Delete, Param, UseGuards, UsePipes } from "@nestjs/common/decorators";
import { AccessTokenGuard } from "src/common/guards/accessToken.guard";
import { ValidationPipe } from "src/common/pipes/validation.pipe";
import { AddProductDto } from "../dto/addProduct.dto";
import { DeleteProductDto } from "../dto/deleteProduct.dto";
import { PurchaseListCreateDto } from "../dto/purchase-list-create.dto";
import { PurchaseListGetDto } from "../dto/purchase-list-get.dto";
import { PurchaseListUpdateDto } from "../dto/purchase-list-update.dto";
import { PurchaseListService } from "../services/purchase-list.service";

@Controller('product/purchaseList')
@UseGuards(AccessTokenGuard)
@UsePipes(ValidationPipe)
export class PurchaseListController {
    constructor(
        private readonly purchaseListService: PurchaseListService
    ){}

    @Post('/create')
    create(@Body() dto: PurchaseListCreateDto) {
        return this.purchaseListService.create(dto)
    }

    @Get('/get')
    find(@Body() whereDto: PurchaseListGetDto) {
        return this.purchaseListService.find(whereDto)
    }

    @Get('/getAll')
    findAll() {
        return this.purchaseListService.findAll()
    }

    @Patch('/update/:purchaseListId')
    update(@Param('purchaseListId') purchaseListId: number, @Body() updateDto: PurchaseListUpdateDto) {
        return this.purchaseListService.update(purchaseListId, updateDto)
    }

    @Delete('/delete/:purchaseListId')
    delete(@Param('purchaseListId') purchaseListId: number) {
        return this.purchaseListService.remove(purchaseListId)
    }

    @Post('/addProduct')
    addProduct(@Body() dto:AddProductDto ) {
        return this.purchaseListService.addProduct(dto)
    }

    @Delete('/deleteProduct')
    DeleteProductDto(@Body() dto:DeleteProductDto) {
        return this.purchaseListService.deleteProduct(dto)
    }
    
}