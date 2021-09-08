import { BaseEntity, Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("swears")
export class Swear extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Index()
    @Column()
    user!: string;

    @Index()
    @Column({ default: 0 })
    swears!: number;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    constructor(model?: Partial<Swear>) {
        super();
        Object.assign(this, model);
    }
}
