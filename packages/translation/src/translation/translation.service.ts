import _ from 'lodash';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTranslationDto } from './dto/create-translation.dto';
import { TranslationEntity } from './entities/translation.entity';
// import { bootstrapSecretKey } from '@base-url';
// import {
//   translateChineseData,
//   translateEnglishData,
//   translateKhmerData,
// } from 'src/config/default-config-data/translate-data.config';
import { TRANSLATE_LANG_ENUM } from './enum/translate-lang.enum';
import { i18nDataSample } from './sample/data.sample';

// @Injectable()
export function TranslationModuleService(Entity): any {
  class TranslationService {
    @InjectRepository(Entity)
    private translationRepo: Repository<typeof Entity>;

    // * Helper
    manipulateTranslateKeyHelperFun = async (dto: CreateTranslationDto) => {
      try {
        const objHaveNotManipulateKeyYet = {
          key: dto.value,
        };
        const objManipulatedKey = {};
        delete Object.assign(objManipulatedKey, objHaveNotManipulateKeyYet, {
          [dto.key]: objHaveNotManipulateKeyYet['key'],
        })['key'];

        const translateKeys = await this.translationRepo.find({
          where: { lang: dto.lang },
        });
        const getLastId = translateKeys[0].id;

        const getLastTranslateKey = translateKeys[0].translate_key;
        const newTranslateKey = {
          ...getLastTranslateKey,
          ...objManipulatedKey,
        };
        return {
          getLastId,
          newTranslateKey,
        };
      } catch (error) {
        throw new Error(error);
      }
    };

    async getInitExecution(init_secret: string, origin_secret: string) {
      if (init_secret !== origin_secret) {
        throw new UnauthorizedException(
          'you need to provide secret key to bootstrap this config translation',
        );
      }

      await this.translationRepo.save({
        id: 1,
        lang: TRANSLATE_LANG_ENUM.kh,
        translate_key: i18nDataSample.kh,
      });
      await this.translationRepo.save({
        id: 2,
        lang: TRANSLATE_LANG_ENUM.en,
        translate_key: i18nDataSample.en,
      });
      // await this.translationRepo.save({
      //   id: 3,
      //   lang: TRANSLATE_LANG_ENUM.cn,
      //   translate_key: translateChineseData,
      // });
      return {
        message: 'Init Translate Successfully',
        data: await this.translationRepo.find(),
      };
    }

    // findAll(option: PaginateParam): Observable<Pagination<TranslationEntity>> {
    //   return from(
    //     paginate<TranslationEntity>(this.translationRepo, option, {
    //       where: [{ name: ILike(`%${option.filter}%`) }],
    //     }),
    //   );
    // }

    // * Services
    getOriginalDataServices = async () => {
      const data = await this.translationRepo.find();
      return data;
    };

    getSpecificTranslateLanguageService = async (lang: TRANSLATE_LANG_ENUM) => {
      try {
        const getTranslateData = async (languagesCode: TRANSLATE_LANG_ENUM) => {
          const getData = await this.translationRepo.find({
            where: { lang: languagesCode },
          });
          console.log(getData);
          return getData[0]['translate_key'];
        };

        switch (lang) {
          case TRANSLATE_LANG_ENUM.kh:
            return getTranslateData(TRANSLATE_LANG_ENUM.kh);
          case TRANSLATE_LANG_ENUM.en:
            return getTranslateData(TRANSLATE_LANG_ENUM.en);
          case TRANSLATE_LANG_ENUM.cn:
            return getTranslateData(TRANSLATE_LANG_ENUM.cn);
          default:
            return {};
        }
      } catch (error) {
        throw new Error(error);
      }
    };

    // * Services
    getPrettierBaseI18nDataServices = async () => {
      try {
        const dataFromDb = await this.translationRepo.find();
        const getFindKeyTranslate = (lang: TRANSLATE_LANG_ENUM) => {
          return dataFromDb.find((res) => res.lang === lang).translate_key;
        };
        const enTranslateData = getFindKeyTranslate(TRANSLATE_LANG_ENUM.en);
        const khTranslateData = getFindKeyTranslate(TRANSLATE_LANG_ENUM.kh);
        const cnTranslateData = getFindKeyTranslate(TRANSLATE_LANG_ENUM.cn);

        const i18nData = {
          en: {
            translation: enTranslateData,
          },
          kh: {
            translation: khTranslateData,
          },
          ch: {
            translation: cnTranslateData,
          },
        };
        return i18nData;
      } catch (error) {
        throw new Error(error);
      }
    };

    // * Services
    createTranslationKeyServices = async (dto: CreateTranslationDto) => {
      try {
        const data = await this.manipulateTranslateKeyHelperFun(dto);
        const saveData = {
          id: data.getLastId,
          translate_key: { ...data.newTranslateKey },
        };

        await this.translationRepo.save({
          lang: dto.lang,
          ...saveData,
        });
        return {
          message: 'Translate created',
          data: saveData,
        };
      } catch (error) {
        throw new Error(error);
      }
    };

    // * Services
    deleteKeyServices = async (param: string) => {
      try {
        const translateKeys = await this.translationRepo.find();
        const dataKey = translateKeys.map((data) => data.translate_key);
        const key = param['key'];

        const deleteEn = _.omit(dataKey[0], [key]);
        const deleteKh = _.omit(dataKey[1], [key]);
        const deleteCn = _.omit(dataKey[2], [key]);

        await this.translationRepo.save({
          id: 1,
          lang: TRANSLATE_LANG_ENUM.kh,
          translate_key: deleteKh,
        });

        await this.translationRepo.save({
          id: 2,
          lang: TRANSLATE_LANG_ENUM.en,
          translate_key: deleteEn,
        });

        await this.translationRepo.save({
          id: 3,
          lang: TRANSLATE_LANG_ENUM.cn,
          translate_key: deleteCn,
        });

        return this.translationRepo.find();
      } catch (error) {
        throw new Error(error);
      }
    };
  }

  return TranslationService;
}
