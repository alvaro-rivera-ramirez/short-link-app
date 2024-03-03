import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { LinkService } from '../services/link.service';
import { LinkCreateDTO, UserLinkDeleteDto } from '../dto/links.dto';

@Controller('links')
export class LinksController {
  constructor(private readonly linkService: LinkService) {}

  @Get()
  getLinks() {
    return 'Lista de links';
  }

  @Get('user/:id')
  async getLinksFromUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.linkService.findLinksByUser(id);
  }
  @Post()
  async createLink(@Body() body: LinkCreateDTO) {
    return await this.linkService.createLink(body);
  }

  @Delete(':linkId')
  async deleteLink(
    @Param('linkId') linkId: string,
    @Body() body: UserLinkDeleteDto,
  ) {
    return await this.linkService.deleteLink(linkId, body);
  }
}
