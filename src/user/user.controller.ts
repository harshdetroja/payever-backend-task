import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/users')
  async create(@Body() userData): Promise<User> {
    return this.userService.createUser(userData);
  }

  @Get('/user/:userId')
  async getUser(@Param('userId') userId: any): Promise<any> {
    return this.userService.getUserById(userId);
  }

  @Get('/user/:userId/avatar')
  async getUserAvatar(@Param('userId') userId: any): Promise<any> {
    return this.userService.getUserAvatar(userId);
  }

  @Delete('/user/:userId/avatar')
  async deleteUser(@Param('userId') userId: any): Promise<any> {
    return this.userService.deleteUserAvatar(userId);
  }
}
