import { BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

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

}