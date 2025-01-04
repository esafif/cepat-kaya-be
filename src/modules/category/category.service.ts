import { Injectable, Inject } from '@nestjs/common';
import { CreateCategoryDto, ResCreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { User } from 'src/entities/user.entity';
import { ValidationService } from './../../common/validation.service';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { CategoryValidation } from './category.validation';
import { CategoryRepository } from './category.repository';
import { Category } from '../../entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger
  ) { }

  async create(createCategoryDto: CreateCategoryDto, user: User): Promise<Category> {
    this.logger.info(`Create new category ${JSON.stringify(createCategoryDto)}`);
    const createCategoryRequest: CreateCategoryDto = this.validationService.validate(CategoryValidation.CREATE, createCategoryDto);
    return await this.categoryRepository.create(createCategoryRequest, user);
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto, user: User): Promise<Category> {
    this.logger.info(`Update category ${id} with data ${JSON.stringify(updateCategoryDto)}`);
    const updateCategoryRequest: UpdateCategoryDto = this.validationService.validate(CategoryValidation.UPDATE, updateCategoryDto);
    return await this.categoryRepository.update(id, updateCategoryRequest);
  }

  async delete(id: string, user: User): Promise<void> {
    this.logger.info(`Delete category ${id}`);
    return await this.categoryRepository.delete(id, user.userID);
  }

  async findAll(user: User): Promise<Category[]> {
    this.logger.info(`Get all categories of user ${user.userID}`);
    return await this.categoryRepository.findAll(user.userID);
  }

  async findOne(id: string, user: User): Promise<Category> {
    this.logger.info(`Get category ${id} of user ${user.userID}`);
    return await this.categoryRepository.findOne(id, user.userID);
  }
}
