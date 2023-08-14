import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Task{
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({nullable: false}) // Obligatorio
  title!: string;

  @Column({nullable: false}) // Obligatorio
  description!: string;

  @Column({nullable: false}) // Obligatorio
  completionStatus!: string;

  @Column({nullable: false}) // Obligatorio
  dueDate!: string;

  @Column({default: "", nullable: true})
  comments!: string;

  @Column({default: "", nullable: true})
  responsible!: string;

  @Column({default: "", nullable: true})
  tags!: string;

  @Column({default: true})
  isPublic!: boolean;

  @Column({default: "", nullable: true})
  urlImage!: string;

  @Column({nullable: true})
  userId!: number;

  @Column({default: () => "CURRENT_TIMESTAMP"})
  creationDate!: Date;

  @Column({default: () => "CURRENT_TIMESTAMP"})
  modificationDate!: Date;


}