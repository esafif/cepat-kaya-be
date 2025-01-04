import { Injectable } from "@nestjs/common";
import { Category } from "src/entities/category.entity";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { PrismaService } from "../../common/prisma.service";
import { User } from "src/entities/user.entity";

@Injectable()
export class CategoryRepository {
  constructor(private prismaService: PrismaService) { }

  async create(createCategoryDto: CreateCategoryDto, user: User): Promise<Category> {
    const { name, description, type, icon } = createCategoryDto;

    const category: Category = {
      categoryID: Date.now().toString(),
      name,
      description,
      type,
      icon,
      createdAt: new Date(),
      updatedAt: new Date(),
      userID: user.userID,
      isActive: true
    };

    await this.prismaService.category.create({ data: category });

    return category;
  }

  async update(categoryID: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {

    const updatedCategory = await this.prismaService.category.update({
      where: { categoryID },
      data: {
        ...updateCategoryDto,
        updatedAt: new Date()
      }
    });

    return updatedCategory;
  }

  async findAll(userID: string): Promise<Category[]> {
    return this.prismaService.category.findMany({
      where: { userID, isActive: true }
    });
  }

  async findOne(categoryID: string, userID: string): Promise<Category | null> {
    return this.prismaService.category.findFirst({
      where: { categoryID, userID, isActive: true }
    });
  }

  async delete(categoryID: string, userID: string): Promise<any> {
    return await this.prismaService.category.delete({
      where: { categoryID, userID }
    });
  }
}