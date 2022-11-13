import { Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AddProductDto } from "../dto/addProduct.dto";
import { DeleteProductDto } from "../dto/deleteProduct.dto";
import { PurchaseListCreateDto } from "../dto/purchase-list-create.dto";
import { PurchaseListGetDto } from "../dto/purchase-list-get.dto";
import { PurchaseListUpdateDto } from "../dto/purchase-list-update.dto";
import { PurchaseListEntity } from "../enities/purchase-list.entity";
import { ProductService } from "./product.service";

@Injectable()
export class PurchaseListService{
    private readonly logger: Logger = new Logger('PURCHASELIST-SERVICE');
    constructor(
        @InjectRepository(PurchaseListEntity)
        private readonly purchaseListRepository: Repository<PurchaseListEntity>,
        private readonly productService: ProductService
    ){}

    
    /**
     * Создание списка закупок
     * @param createDto 
     */

    async create(createDto: PurchaseListCreateDto) {
        const purchaseList = this.purchaseListRepository.create(createDto)

        try {
            await purchaseList.save()
        } catch (e) {
            this.logger.error(`Ошибка: ${e}`)
            throw new InternalServerErrorException('Ошибка создания листа закупок')
        }
        
    }

    /**
     * Поиск по параметрам
     * @param whereDto 
     * @returns 
     */

    async find(whereDto: PurchaseListGetDto) {
        return await this.purchaseListRepository.findOne({
            select: {
                id:true,
                title: true,
            },
            where: whereDto,
            relations: {
                products: true,
            }
        })
    }

    /**
     * Вывод всех списков 
     * @returns 
     */

    async findAll() {
        return await this.purchaseListRepository.find({
            select: {
                id:true,
                title: true,
            },
            relations: {
                products: true,
            }
        })
    }

    async getExists(whereDto: PurchaseListGetDto) {
        const purchaseList = await this.find(whereDto)
        
        if(!purchaseList) {
            throw new NotFoundException('Такого списка не существует или ранее он был удален')
        }

        return purchaseList
    }

    async update(id: number, updateDto: PurchaseListUpdateDto)  {
        const purchaseList = await this.getExists({id: id})

        for( let key in updateDto) {
            purchaseList[key] = updateDto[key]
        }

        try {
            await purchaseList.save()
        } catch (e) {
            this.logger.error(`Ошибка: ${e}`)
            throw new InternalServerErrorException('Ошибка обновления списка закупок')
        }
    }

    async remove(id: number) {

        const purchaseList = await this.getExists({id: id})

        try {
            await purchaseList.remove()
        } catch (e) {
            this.logger.error(`Ошибка: ${e}`)
            throw new InternalServerErrorException('Ошибка удаление списка закупок')
        }
    }

    async deleteProduct(deleteDto: DeleteProductDto) {
        const purchaseList = await this.purchaseListRepository.findOne({
            where: {id: deleteDto.purchaseListId},
            relations: {products: true}
        })
        const product = await this.productService.getExists({articul: deleteDto.articul})
        if( product && purchaseList) {
            // if (product.roles.filter(x => x.name === role.name)) {
            //     throw new BadRequestException('Указанная роль уже привязана к аккаунту')
            // }
            purchaseList.products.splice(purchaseList.products.indexOf(product), 1)
            await purchaseList.save();
        }
    }

    async addProduct(addDto: AddProductDto) {
        const purchaseList = await this.purchaseListRepository.findOne({
            where: {id: addDto.purchaseListId},
            relations: {products: true}
        })
        const product = await this.productService.getExists({articul: addDto.articul})
        if( product && purchaseList) {
            // if (product.roles.filter(x => x.name === role.name)) {
            //     throw new BadRequestException('Указанная роль уже привязана к аккаунту')
            // }
            purchaseList.products.push()
            await purchaseList.save();
        }
    }
}