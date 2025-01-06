import { z, ZodType } from 'zod'

export class BudgetValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string().min(5).max(100),
    limit: z.number().min(0),
    spent: z.number().min(0),
    categoryID: z.string(),
  })

  static readonly UPDATE: ZodType = z.object({
    budgetID: z.string(),
    name: z.string().min(5).max(100),
    limit: z.number().min(0),
    spent: z.number().min(0),
    categoryID: z.string(),
    isActive: z.boolean()
  })
}