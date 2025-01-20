import { z, ZodType } from "zod"

export class TransactionValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string().min(5).max(15),
    amount: z.number().min(0),
    categoryID: z.string(),
    accountID: z.string(),
    type: z.enum(["INCOME", "EXPENSE", "TRANSFER"]),
    note: z.string().optional(),
    date: z.string(),
  })

  static readonly UPDATE: ZodType = z.object({
    transactionID: z.string(),
    amount: z.number().min(0).optional(),
    categoryID: z.string(),
    accountID: z.string(),
    type: z.enum(["INCOME", "EXPENSE", "TRANSFER"]).optional(),
    note: z.string().optional(),
    date: z.string().optional(),
  })
}
