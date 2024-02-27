import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Links } from './entities/links.entity';
import { LinkService } from './services/link.service';
import { User } from 'src/users/entities/users.entity';
import { LinksController } from './controllers/links.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Links, User])],
  providers: [LinkService],
  controllers: [LinksController],
  exports: [LinkService],
})
export class LinksModule {}
