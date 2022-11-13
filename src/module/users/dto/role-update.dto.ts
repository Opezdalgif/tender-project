import { PartialType } from '@nestjs/mapped-types';
import {IsString, Length} from 'class-validator';
import { RoleCreateDto } from './role-create.dto';

export class RoleUpdateDto extends PartialType(RoleCreateDto) {}