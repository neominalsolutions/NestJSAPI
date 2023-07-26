import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Role {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;



  @ManyToMany((type => User), user => user.roles) // çoka çok ilişki bilgisi
  @JoinTable({ // hangi tablonun joinlendiği bilgisi
    name: 'userrole'
  })
  users: User[];



}