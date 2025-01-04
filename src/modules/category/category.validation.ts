import { z, ZodType } from "zod"

export class CategoryValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string().min(5).max(100),
    description: z.string().min(5).max(255),
    type: z.enum(["INCOME", "EXPENSE"]),
  })

  static readonly UPDATE: ZodType = z.object({
    categoryID: z.string(),
    name: z.string().min(5).max(100),
    description: z.string().min(5).max(255),
    type: z.enum(["INCOME", "EXPENSE"]),
  })
}