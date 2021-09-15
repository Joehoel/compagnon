import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    Index,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { Leaderboard } from "./Leaderboard";

@Entity("games")
export class Game extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Index()
    @Column({ unique: true })
    name!: string;

    @Column({ nullable: true })
    imageUrl!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @OneToMany(() => Leaderboard, (leaderboard) => leaderboard.game)
    leaderboards!: Leaderboard[];

    constructor(model?: Partial<Game>) {
        super();
        Object.assign(this, model);
    }
}
