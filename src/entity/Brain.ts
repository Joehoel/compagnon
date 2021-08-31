import { BaseEntity, Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("brains")
export class Brain extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({ unique: true, nullable: false })
    user: string;

    @Index()
    @Column({ default: 0 })
    score: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    constructor(model?: Partial<Brain>) {
        super();
        Object.assign(this, model);
    }
}
