import { BaseEntity, Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("iqs")
export class IQ extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user: string;

    @Column({ default: 0 })
    score: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    constructor(model?: Partial<IQ>) {
        super();
        Object.assign(this, model);
    }
}
