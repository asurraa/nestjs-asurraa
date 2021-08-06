import { Controller, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TranslationModuleController } from '../../../packages/translation/dist';
import { TestService } from './test.service';

@ApiTags('FUCK')
@Controller('test')
export class TestController extends TranslationModuleController(TestService) {
  constructor(private readonly testService: TestService) {
    super();
  }

  @Post('init-translation/:secret')
  initTranslation(@Param('secret') secret: string) {
    return this.testService.getInitExecution(secret, 'asurraa-unicorn');
  }
}
