import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Links } from '../entities/links.entity';
import { LinkCreateDTO, UserLinkDeleteDto } from '../dto/links.dto';
import { User } from 'src/users/entities/users.entity';
import { ErrorManager } from 'src/config/error.manager';
import { nanoidDefault } from 'src/utils/nanoid.generate';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(Links) private readonly linkRepository: Repository<Links>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findLinks(): Promise<Links[]> {
    try {
      return await this.linkRepository.find();
    } catch (error) {
      throw new ErrorManager.createSignatureError(error.message);
    }
  }

  async findLinksByUser(userId: string): Promise<User> {
    try {
      const userFound = await this.userRepository.findOneBy({ id: userId });

      if (!userFound) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'El usuario no existe',
        });
      }

      return await this.userRepository
        .createQueryBuilder('user')
        .where({ id: userId })
        .leftJoinAndSelect('user.links', 'links')
        .getOne();
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
  async createLink(body: LinkCreateDTO): Promise<Links> {
    try {
      const userFound = await this.userRepository.findOneBy({
        id: body.user as unknown as string,
      });
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
          message: 'Linkaa no encontrado',
        });
      }
      link.clicks = ++link.clicks;
      this.linkRepository.save(link);
      return link;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async deleteLink(
    linkId: string,
    userId: UserLinkDeleteDto,
  ): Promise<DeleteResult> {
    try {
      return this.linkRepository
        .createQueryBuilder('link')
        .delete()
        .where('id = :id and user=:user', { id: linkId, user: userId.user })
        .execute();
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
