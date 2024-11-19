import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from './users.entity';
import { TwitterIntegrationService } from '../twitter-integration/twitter-integration.service';
import { TwitterUserDTO } from '../auth/dto/twitter-user.dto';
import { CurrentUserDTO } from '../auth/dto/current-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly twitterIntegrationService: TwitterIntegrationService
  ) {}

  async saveTwitterUser(twitterUserDTO: TwitterUserDTO): Promise<User>{

    const user = this.userRepository.create({
      email: twitterUserDTO.email,
      username: twitterUserDTO.username,
      token: twitterUserDTO.token,
      tokenSecret: twitterUserDTO.tokenSecret
    });

    return this.userRepository.save(user);
  }

  async add(currentUser: CurrentUserDTO, walletAddress: string): Promise<User> {

    console.log("1")
    const user: User = await this.findByEmail(currentUser.email);
    
    const isFollowingInvariantAccount: boolean = await this.twitterIntegrationService.checkUserFollowsAccount(user, 'invariant_labs');
    
    console.log("2")
    if(isFollowingInvariantAccount){
      throw new BadRequestException('You have to follow invariant_labs profile on the X')
    }
    
    
    user.isFollowingInvariantAccount = isFollowingInvariantAccount;
    user.walletAddress = walletAddress;
    
    console.log("5")
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({email: email});
  }

  async findByUsername(username:string) : Promise<User>{
    return this.userRepository.findOneBy({username: username});
  }

  async updateUser(user: User): Promise<UpdateResult>{
    return this.userRepository.update({id: user.id}, user);
  }

 
}
