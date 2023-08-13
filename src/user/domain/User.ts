import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({nullable: false}) // Obligatorio
    name!: string;
    
    @Column({nullable: false}) // Obligatorio
    email!: string;

    @Column({nullable: false}) // Obligatorio
    password!: string;

    @Column({default: () => "CURRENT_TIMESTAMP"})
    creationDate!: Date;

    @Column({default: () => "CURRENT_T IMESTAMP"})
    modificationDate!: Date;

}