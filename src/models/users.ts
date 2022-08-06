import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Favorites } from './favorites';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column({ unique: true })
  username: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column()
  active: boolean

  @OneToMany(() => Favorites, (favorites) => favorites.user)
  favorites: Favorites[]
}