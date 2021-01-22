import { BaseEntity, Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Game } from "./Game";
import { Leaderboard } from "./Leaderboard";

@Entity("scores")
export class Score extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column()
    user: string;

    @Column()
    score: string;

    @Column({ nullable: true })
    proof: string;

    @ManyToOne(() => Leaderboard, (leaderboard) => leaderboard.scores)
    leaderboard: Leaderboard;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    constructor(model?: Partial<Score>) {
        super();
        Object.assign(this, model);
    }
}
