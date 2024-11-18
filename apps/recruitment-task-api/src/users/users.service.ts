import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { TwitterIntegrationService } from '../twitter-integration/twitter-integration.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly twitterIntegrationService: TwitterIntegrationService
  ) {}

  async add(walletAddress: string): Promise<User> {

    Boolean isFollowing = this.twitterIntegrationService.checkUserFollowsAccount()

    const user = this.userRepository.create({  });
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(email: string): Promise<User> {
    return this.userRepository.findOneBy({email: email});
  }
}
