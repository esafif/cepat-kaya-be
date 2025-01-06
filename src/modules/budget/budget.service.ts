import { Injectable, Inject } from "@nestjs/common";
import { BudgetRepository } from "./budget.repository";
import { ValidationService } from "../../common/validation.service";
import { Logger } from "winston";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { BudgetValidation } from "./budget.validation";
import { CreateBudgetDto, ResCreateBudgetDto, UpdateBudgetDto } from "./dto/budget.dto";
import { User } from "../../entities/user.entity";
import { Budget } from "../../entities/budget.entity";

@Injectable()
export class BudgetService {
  constructor(
    private budgetRepository: BudgetRepository,
    private validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger
  ) { }

  async create(createBudgetDto: CreateBudgetDto, user: User): Promise<ResCreateBudgetDto> {
    this.logger.info(`Create new budget for user ${user.userID}`);
    const createBudgetRequest: CreateBudgetDto = this.validationService.validate(BudgetValidation.CREATE, createBudgetDto);
    return await this.budgetRepository.create(createBudgetRequest, user);
  }

  async update(updateBudgetDto: UpdateBudgetDto, user: User): Promise<ResCreateBudgetDto> {
    this.logger.info(`Update budget ${updateBudgetDto.budgetID} for user ${user.userID}`);
    const updateBudget: UpdateBudgetDto = this.validationService.validate(BudgetValidation.UPDATE, updateBudgetDto);
    return await this.budgetRepository.update(updateBudget, user);
  }

  async findAll(userID: string): Promise<Budget[]> {
    this.logger.info(`Get all budgets of user ${userID}`);
    return await this.budgetRepository.findAll(userID);
  }

  async findOne(budgetID: string, userID: string): Promise<Budget | null> {
    this.logger.info(`Get budget ${budgetID} of user ${userID}`);
    return await this.budgetRepository.findOne(budgetID, userID);
  }

  async delete(budgetID: string, userID: string): Promise<void> {
    this.logger.info(`Delete budget ${budgetID}`);
    await this.budgetRepository.delete(budgetID, userID);
  }
}