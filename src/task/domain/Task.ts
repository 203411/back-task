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

  @Column()
  comments!: string;

  @Column()
  responsible!: string;

  @Column()
  tags!: string;

  @Column({default: true})
  isPublic!: boolean;

  @Column({default: ""})
  urlImage!: string;

  @Column({default: 1})
  userId!: number;

  @Column({default: () => "CURRENT_TIMESTAMP"})
  creationDate!: Date;

  @Column({default: () => "CURRENT_TIMESTAMP"})
  modificationDate!: Date;


}