import { PartialType } from "@nestjs/mapped-types";
import { AddProductDto } from "./addProduct.dto";

export class DeleteProductDto extends PartialType(AddProductDto){}