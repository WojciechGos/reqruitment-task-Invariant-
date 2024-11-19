import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { CurrentUserDTO } from '../auth/dto/current-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('add')  
  @UseGuards(JwtAuthGuard)
  async addWalletAddress(
    @CurrentUser() currentUser: CurrentUserDTO,
    @Body('walletAddress') walletAddress: string,
  ): Promise<User>{
    return this.userService.add(currentUser, walletAddress);
  }

  @Get('all')
  @UseGuards(JwtAuthGuard)
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMyInformation(){

  }

}
