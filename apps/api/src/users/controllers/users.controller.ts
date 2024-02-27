import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserDTO, UserUpdateDTO } from '../dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async registerUser(@Body() body: UserDTO) {
    return await this.userService.createUser(body);
  }

  @Get()
  async findAllUsers() {
    return await this.userService.findUsers();
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
