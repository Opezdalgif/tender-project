import { BaseEntity , Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity({name: 'roles'})
export class RoleEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: false})
    name: string;

    @Column({nullable: false})
    description: string;

}