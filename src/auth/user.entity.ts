import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Unique } from "typeorm";

@Entity()
@Unique('uqn_username',['username'])
export class User extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    username : string
    
    
    @Column()
    password: string


    @Column()
    salt : string
}