import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { IsEmail } from 'class-validator';

@Entity()
@Unique(["email"])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmail()
  email: string 

  @Column()
  username: string

  @Column({nullable: true})
  walletAddress: string;

  @Column({default: false})
  isFollowingInvariantAccount: boolean

  @Column({nullable: true})
  token: string

  @Column({nullable: true})
  tokenSecret: string
}