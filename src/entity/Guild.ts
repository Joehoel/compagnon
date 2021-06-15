import { BaseEntity, Column, CreateDateColumn, Entity, Index, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity("guilds")
export class Guild extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Index()
  @Column({ nullable: false })
  ownerId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(model?: Partial<Guild>) {
    super();
    Object.assign(this, model);
  }
}
