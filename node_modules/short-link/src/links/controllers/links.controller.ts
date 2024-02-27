import { Body, Controller, Post } from '@nestjs/common';
import { LinkService } from '../services/link.service';
import { LinkCreateDTO } from '../dto/links.dto';

@Controller('links')
export class LinksController {
  constructor(private readonly linkService: LinkService) {}

  @Post()
  async createLink(@Body() body: LinkCreateDTO) {
    return await this.linkService.createLink(body);
  }
}
