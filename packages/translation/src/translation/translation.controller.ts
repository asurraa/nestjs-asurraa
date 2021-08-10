import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Type,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { CreateTranslationDto } from './dto/create-translation.dto';
// import { TranslationService } from './translation.service';

export interface ITranslationController<T> {
  getAllData();
  getSpecificTranslateLanguage(param: any);
  getPrettierBaseI18nData();
  createTranslation(dto: CreateTranslationDto);
  editTranslation(dto: CreateTranslationDto);
  deleteTranslateKey(key);
}

export function TranslationModuleController(
  translationService,
): Type<ITranslationController<any>> {
  class TranslationController {
    @Inject(translationService) public readonly translationService;

    @Get('/original-data')
    getAllData() {
      return this.translationService.getOriginalDataServices();
    }

    @Get('/messages/:lang')
    getSpecificTranslateLanguage(@Param() param) {
      return this.translationService.getSpecificTranslateLanguageService(
        param.lang,
      );
    }

    @Get('/baseI18nDataModelData')
    getPrettierBaseI18nData() {
      return this.translationService.getPrettierBaseI18nDataServices();
    }

    @Post('/create')
    async createTranslation(@Body() dto: CreateTranslationDto) {
      return await this.translationService.createTranslationKeyServices(dto);
    }

    @Put('/update')
    async editTranslation(@Body() dto: CreateTranslationDto) {
      return await this.translationService.createTranslationKeyServices(dto);
    }

    @Delete('/delete/:key')
    async deleteTranslateKey(@Param() key) {
      return this.translationService.deleteKeyServices(key);
    }
  }

  return TranslationController;
}
