import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("users")
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    userId!: string;

    @Column()
    name!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    constructor(model?: Partial<User>) {
        super();
        Object.assign(this, model);
    }
}
