import { forwardRef, Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TranslationEntity } from '../../../packages/translation/dist';

@Module({
  imports: [TypeOrmModule.forFeature([TranslationEntity])],
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}
