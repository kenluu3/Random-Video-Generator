import { BaseEntity, Entity, PrimaryColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Account } from './account';

@Entity()
class Favorite extends BaseEntity {
  @PrimaryColumn()
  id: string

  @PrimaryColumn()
  accountId: string

  @Column()
  title: string

  @Column()
  channel: string

  @CreateDateColumn()
  saveDate: Date

  @ManyToOne(() => Account, account => account.favorite, {onDelete: 'CASCADE'})
  @JoinColumn({name: 'accountId'})
  account: Account
}

export { Favorite };