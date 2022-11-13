import { BaseEntity , Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity({name: 'product'})
export class ProductEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    name: string;

    @Column({nullable: false})
    articul: string;
   
    @Column({nullable: false})
    price: number;
    
    @Column("float",{nullable: false})
    length : number;

    @Column("float",{nullable: false})
    width : number;

    @Column("float",{nullable: false})
    height: number;

    @Column({nullable: false})
    photo: string;

}