import { Injectable } from '@nestjs/common';
import {
  TranslationEntity,
  TranslationModuleService,
} from '../../../packages/translation/dist';

@Injectable()
export class TestService extends TranslationModuleService(TranslationEntity) {}
