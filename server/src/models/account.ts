import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Favorite } from './favorite';

@Entity()
class Account extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  username: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column({ default: true })
  active: boolean
  
  @CreateDateColumn({ type: 'date' })
  createDate: Date;

  @OneToMany(() => Favorite, favorite => favorite.accountId)
  favorite: Favorite[]
}

export { Account };