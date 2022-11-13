import { RoleEntity } from "./role.entity";
import { BaseEntity, Column, PrimaryGeneratedColumn , Entity, ManyToMany, JoinTable } from "typeorm";

@Entity({name: 'users'})
export class UsersEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
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