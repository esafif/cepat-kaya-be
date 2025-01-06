import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode } from "@nestjs/common";
import { BudgetService } from "./budget.service";
import { CreateBudgetDto, UpdateBudgetDto, ResCreateBudgetDto } from "./dto/budget.dto";
import { WebResponse } from "../../entities/web.entity";
import { Auth } from "../../common/auth.decorator";
import { User } from "../../entities/user.entity";


@Controller('api/budget')
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) { }

  @Post()
  @HttpCode(201)
  async create(@Auth() user: User, @Body() createBudgetDto: CreateBudgetDto): Promise<WebResponse<ResCreateBudgetDto>> {
    return {
      data: await this.budgetService.create(createBudgetDto, user),
    }
  }

  @Put(':id')
  @HttpCode(200)
  async update(@Auth() user: User, @Param('id') id: string, @Body() updateBudgetDto: UpdateBudgetDto): Promise<WebResponse<ResCreateBudgetDto>> {
    return {
      data: await this.budgetService.update(updateBudgetDto, user),
    }
  }

  @Get()
  @HttpCode(200)
  async findAll(@Auth() user: User): Promise<WebResponse<ResCreateBudgetDto[]>> {
    return {
      data: await this.budgetService.findAll(user.userID),
    }
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Auth() user: User, @Param('id') id: string): Promise<WebResponse<ResCreateBudgetDto>> {
    {
      return {
        data: await this.budgetService.findOne(id, user.userID),
      }
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Auth() user: User, @Param('id') id: string): Promise<void> {
    await this.budgetService.delete(id, user.userID);
  }
}