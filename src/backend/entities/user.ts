import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Link } from "./Link";
import { Comment } from "./Comment";
import { Vote } from "./Vote";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    public id!: number;
    @Column()
    public email!: string;
    @Column()
    public password!: string;
    @OneToMany(type => Link, link => link.user)
    links!: Link[];
    @OneToMany(type => Comment, comment => comment.user)
    comments!: Comment[];
    @OneToMany(type => Vote, vote => vote.user)
    votes!: Vote[];
}