import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Link } from "./Link";
import { User } from "./User";

@Entity()
export class Comment {

    @PrimaryGeneratedColumn()
    public id!: number;
    @Column()
    public textfield!: string;
    @ManyToOne(type => User, user => user.comments)
    user!: User;
    @ManyToOne(type => Link, link => link.comments)
    link!: Link;
}