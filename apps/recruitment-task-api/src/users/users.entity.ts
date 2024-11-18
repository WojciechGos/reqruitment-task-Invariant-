import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail } from 'class-validator';



@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmail()
  email: string 

  @Column()
  walletAddress: string;

  @Column()
  isFollowingInvariantAccount: boolean

  @Column()
  twitterId: string;

  @Column()
  accessToken: string;

  @Column()
  accessTokenSecret: string;
}