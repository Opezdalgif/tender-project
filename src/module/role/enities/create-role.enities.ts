import { UsersEntity } from "src/module/users/enities/users.enities";
import { BaseEntity , Entity , PrimaryGeneratedColumn , Column , OneToOne, ManyToOne , JoinColumn, ManyToMany} from "typeorm";

@Entity({name: 'roles'})
export class RoleEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: false})
    value: string;

    @Column({nullable: false})
    description: string;

}