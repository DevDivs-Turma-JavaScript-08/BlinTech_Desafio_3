import { Controller, Get, Res } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  async redirect(@Res() resposta: any) {
    return resposta.redirect('/swagger');
  }
}
