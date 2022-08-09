import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
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
}