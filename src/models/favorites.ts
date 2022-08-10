import { Entity, Column, ManyToOne, CreateDateColumn, PrimaryColumn, RelationOptions, JoinColumn } from 'typeorm';
import { Users } from './users';

@Entity()
export class Favorites {
  @PrimaryColumn()
  id: string

  @PrimaryColumn()
  user_id: string

  @Column()
  title: string

  @Column()
  url: string

  @Column()
  channel: string

  @CreateDateColumn()
  insert_date: Date

  @ManyToOne(() => Users, users => users.favorites, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: Users
}