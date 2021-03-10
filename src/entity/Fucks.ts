import { BaseEntity, Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("fucks")
export class Fucks extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  user: string;

  @Index()
  @Column({ default: 0 })
  fucksGiven: number;

  @Index()
  @Column({ default: 0 })
  gotFucked: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(model?: Partial<Fucks>) {
    super();
    Object.assign(this, model);
  }
}
