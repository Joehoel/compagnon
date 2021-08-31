import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("questions")
export class Question extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column()
    date: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    constructor(model?: Partial<Question>) {
        super();
        Object.assign(this, model);
    }
}
