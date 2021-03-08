import { BaseEntity, Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("fucks")
export class Fucks extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  user: string;

  @Index()
  @Column()
  fucksGiven: number;

  @Index()
  @Column()
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
