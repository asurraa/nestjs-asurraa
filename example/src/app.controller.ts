import { Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Post('init-translation/:secret')
  // initTranslation(@Param('secret') secret: string) {
  //   return this.translationService.getInitExecution(secret, 'asurraa-unicorn');
  // }
}
