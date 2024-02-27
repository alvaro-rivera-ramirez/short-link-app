import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Links } from '../entities/links.entity';
import { Repository } from 'typeorm';
import { LinkCreateDTO } from '../dto/links.dto';
import { User } from 'src/users/entities/users.entity';
import { ErrorManager } from 'src/config/error.manager';
import { nanoidDefault } from 'src/utils/nanoid.generate';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(Links) private readonly linkRepository: Repository<Links>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createLink(body: LinkCreateDTO): Promise<Links> {
    try {
      const userFound = await this.userRepository.findOneBy({
        id: body.user as unknown as string,
      });
      console.log(userFound);
      if (!userFound) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Usuario no encontrado',
        });
      }
      body.shortUrl = nanoidDefault(7);
      return await this.linkRepository.save(body);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findShortUrl(code: string): Promise<Links> {
    try {
      const link = await this.linkRepository.findOneBy({ shortUrl: code });
      if (!link) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Link no encontrado',
        });
      }
      return link;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
