import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    name: string;
    @Column()
    cpf: string;
    @Column()
    email: string;
    @Column()
    status: string;
}