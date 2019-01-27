import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Link } from "./Link";
import { User } from "./User";

@Entity()
export class Vote {

    @PrimaryGeneratedColumn()
    public id!: number;
    @Column()
    public vote!: boolean;
    @ManyToOne(type => User, user => user.votes)
    user!: User;
    @ManyToOne(type => Link, link => link.votes)
    link!: Link;   
}