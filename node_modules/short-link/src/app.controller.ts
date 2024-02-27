import { Controller, Get, Param, Res } from '@nestjs/common';
import { LinkService } from './links/services/link.service';
import { Response } from 'express';

@Controller('')
export class AppController {
  constructor(private readonly linkService: LinkService) {}

  @Get()
  getHello() {
    return 'Hello';
  }
  @Get(':code')
  async findShortUrl(@Param('code') code: string, @Res() res: Response) {
    const link = await this.linkService.findShortUrl(code);
    return res.redirect(`https://${link.url}`);
  }
}
