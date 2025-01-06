import { Module } from "@nestjs/common";
import { BudgetController } from "./budget.controller";
import { BudgetService } from "./budget.service";
import { BudgetRepository } from "./budget.repository";

@Module({
  controllers: [BudgetController],
  providers: [BudgetService, BudgetRepository]
})


export class BudgetModule { }