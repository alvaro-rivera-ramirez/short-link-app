import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/users.entity';
import {
  DeleteResult,
  QueryFailedError,
  Repository,
  UpdateResult,
} from 'typeorm';
import { UserDTO, UserUpdateDTO } from '../dto/user.dto';
import { ErrorManager } from 'src/config/error.manager';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(body: UserDTO): Promise<User> {
    try {
      return await this.userRepository.save(body);
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.driverError.code === '23505'
      ) {
        throw ErrorManager.customError({
          type: 'CONFLICT',
          message: 'El usuario ya existe',
        });
      } else {
        throw ErrorManager.createSignatureError(error.message);
      }
    }
  }

  async findUsers(): Promise<User[]> {
    try {
      const users = await this.userRepository.find();
      if (users.length === 0) {
        throw new ErrorManager({
          type: 'NO_CONTENT',
          message: 'No se encontro resultado',
        });
      }
      return users;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findUserById(id: string): Promise<User | undefined> {
    try {
      const userFound = await this.userRepository
        .createQueryBuilder('user')
        .where({ id })
        .getOne();
      console.log(userFound);
      if (!userFound) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Usuario no encontrado',
        });
      }
      return userFound;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async updateUser(body: UserUpdateDTO, id: string): Promise<UpdateResult> {
    try {
      const user: UpdateResult = await this.userRepository.update(id, body);
      if (user.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo actualizar',
        });
      }
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      const user: DeleteResult = await this.userRepository.delete(id);
      if (user.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo borrar',
        });
      }
      return;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
