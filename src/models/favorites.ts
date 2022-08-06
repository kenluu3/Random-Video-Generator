import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
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

  @ManyToOne(() => Users, (users) => users.favorites)
  user: Users
}