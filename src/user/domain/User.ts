import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({nullable: false}) 
    name!: string;
    
    @Column({nullable: false})
    email!: string;

    @Column({nullable: false}) 
    password!: string;

    @Column({default: () => "CURRENT_TIMESTAMP"})
    creationDate!: Date;

    @Column({default: () => "CURRENT_TIMESTAMP"})
    modificationDate!: Date;

}