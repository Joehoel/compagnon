import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Guild } from "./Guild";

@Entity("configs")
export class Config extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Guild)
  @JoinColumn()
  guild: Guild;

  @Column({ default: "!" })
  prefix: string;

  @Column({ default: "#ffc600" })
  color: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(model?: Partial<Config>) {
    super();
    Object.assign(this, model);
  }
}
