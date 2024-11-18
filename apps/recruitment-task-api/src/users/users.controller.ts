import { Controller, Post, Get, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('add')
  async addWalletAddress(
    @Body('walletAddress') walletAddress: string,
  ): Promise<User> {
    return this.userService.add(walletAddress);
  }

  @Get('all')
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }
}
