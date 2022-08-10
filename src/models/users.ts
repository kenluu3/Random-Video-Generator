import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { Favorites } from './favorites';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  username: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column()
  active: boolean

  @CreateDateColumn()
  register_date: Date

  @OneToMany(() => Favorites, favorites => favorites.user)
  favorites: Favorites
}