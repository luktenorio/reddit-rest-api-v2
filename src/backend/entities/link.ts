import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { Comment } from "./Comment";
import { Vote } from "./Vote";

@Entity()
export class Link {

    @PrimaryGeneratedColumn()
    public id!: number;
    @Column()
    public url!: string;
    @Column()
    public title!: string;
    @ManyToOne(type => User, user => user.links)
    user!: User;
    @OneToMany(type => Comment, comment => comment.link)
    comments!: Comment[];
    @OneToMany(type => Vote, vote => vote.link)
    votes!: Vote[];
}
