import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Game } from "./Game";
import { Score } from "./Score";

@Entity("leaderboards")
export class Leaderboard extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  name: string;

  @Index()
  @ManyToOne(() => Game, (game) => game.leaderboards)
  game: Game;

  @OneToMany(() => Score, (score) => score.leaderboard)
  scores: Score[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(model?: Partial<Leaderboard>) {
    super();
    Object.assign(this, model);
  }
}
