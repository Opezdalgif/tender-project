import { PartialType } from "@nestjs/mapped-types";
import { PurchaseListCreateDto } from "./purchase-list-create.dto";

export class PurchaseListUpdateDto extends PartialType(PurchaseListCreateDto){}