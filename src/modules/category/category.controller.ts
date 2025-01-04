import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto, ResCreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { WebResponse } from '../../entities/web.entity';
import { Auth } from '../../common/auth.decorator';
import { Category } from '../../entities/category.entity';
import { User } from '../../entities/user.entity';

@Controller('api/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post()
  @HttpCode(201)
  async create(@Auth() user: User, @Body() createCategoryDto: CreateCategoryDto): Promise<WebResponse<ResCreateCategoryDto>> {
    return {
      data: await this.categoryService.create(createCategoryDto, user),
    }
  }

  @Put(':id')
  @HttpCode(200)
  async update(@Auth() user: User, @Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto): Promise<WebResponse<Category>> {
    return {
      data: await this.categoryService.update(id, updateCategoryDto, user),
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Auth() user: User, @Param('id') id: string): Promise<void> {
    return await this.categoryService.delete(id, user);
  }

  @Get()
  @HttpCode(200)
  async findAll(@Auth() user: User): Promise<WebResponse<Category[] | []>> {
    return {
      data: await this.categoryService.findAll(user),
    }
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Auth() user: User, @Param('id') id: string): Promise<WebResponse<Category>> {
    return {
      data: await this.categoryService.findOne(id, user)
    }
  }


  // @Get()
  // findAll() {
  //   return this.categoryService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.categoryService.findOne(+id);
  // }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
  //   return this.categoryService.update(+id, updateCategoryDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.categoryService.remove(+id);
  // }
}
