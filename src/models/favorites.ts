import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Users } from './users';

@Entity()
export class Favorites {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column()
  title: string

  @Column()
  url: string

  @Column()
  channel: string

  @CreateDateColumn()
  insert_date: Date

  @ManyToOne(() => Users, users => users.favorites, { onDelete: 'CASCADE' })
  user: Users
}