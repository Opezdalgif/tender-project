import { RoleEntity } from "src/module/role/enities/create-role.enities";
import { BaseEntity, Column, PrimaryGeneratedColumn , Entity , OneToMany, JoinColumn, ManyToMany, JoinTable } from "typeorm";

@Entity({name: 'users'})
export class UsersEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({nullable: false})
    firstName: string;

    @Column({nullable: false})
    lastName: string;

    @Column({nullable: false})
    email: string;

    @Column({nullable: false})
    passwordHash: string;

    @Column()
    refreshToken: string;

    @ManyToMany(() => RoleEntity )
    @JoinTable()
    roles: RoleEntity[]


}