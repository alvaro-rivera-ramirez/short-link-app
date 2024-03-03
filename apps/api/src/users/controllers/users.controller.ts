import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserDTO, UserUpdateDTO } from '../dto/user.dto';
import { User } from '../entities/users.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAllUsers(): Promise<User[]> {
    return await this.userService.findUsers();
  }

  @Post()
  async registerUser(@Body() body: UserDTO) {
    return await this.userService.createUser(body);
  }

  @Get(':id')
  async findUser(@Param('id', ParseUUIDPipe) id: string) {
    return await this.userService.findUserById(id);
  }

  @Put(':id')
  async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UserUpdateDTO,
  ) {
    return await this.userService.updateUser(body, id);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return await this.userService.deleteUser(id);
  }
}
