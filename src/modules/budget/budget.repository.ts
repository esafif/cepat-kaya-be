import { Injectable } from "@nestjs/common";
import { Budget } from '../../entities/budget.entity';
import { CreateBudgetDto, UpdateBudgetDto, ResCreateBudgetDto } from './dto/budget.dto';
import { PrismaService } from "../../common/prisma.service";
import { User } from "../../entities/user.entity";

@Injectable()
export class BudgetRepository {
  constructor(private prismaService: PrismaService) { }

  async create(createBudgetDto: CreateBudgetDto, user: User): Promise<ResCreateBudgetDto> {
    const { name, limit, spent, categoryID } = createBudgetDto;

    const budget: Budget = {
      budgetID: Date.now().toString(),
      name,
      limit,
      spent,
      categoryID,
      userID: user.userID,
      startDate: new Date(),
      endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await this.prismaService.budget.create({
      data: {
        budgetID: budget.budgetID,
        name: budget.name,
        limit: budget.limit,
        spent: budget.spent,
        categoryID: budget.categoryID,
        userID: budget.userID,
        startDate: budget.startDate,
        endDate: budget.endDate,
        isActive: budget.isActive,
        createdAt: budget.createdAt,
        updatedAt: budget.updatedAt,
      }
    });

    return budget;
  }

  async update(updateBudgetDto: UpdateBudgetDto, user: User): Promise<ResCreateBudgetDto> {
    const { budgetID, name, limit, spent, categoryID } = updateBudgetDto;

    return await this.prismaService.budget.update({
      where: { budgetID },
      data: {
        name,
        limit,
        spent,
        categoryID,
        userID: user.userID,
        updatedAt: new Date(),
      }
    });
  }

  async findAll(userID: string): Promise<Budget[]> {
    return this.prismaService.budget.findMany({
      where: { userID, isActive: true }
    });
  }

  async findOne(budgetID: string, userID: string): Promise<Budget | null> {
    return this.prismaService.budget.findFirst({
      where: { budgetID, userID, isActive: true }
    });
  }

  async delete(budgetID: string, userID: string): Promise<void> {
    await this.prismaService.budget.delete({
      where: { budgetID, userID }
    });
  }
}