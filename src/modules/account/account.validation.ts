import { z, ZodType } from "zod"

export class AccountValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string().min(5).max(100),
    balance: z.number().min(0),
    icon: z.string().optional(),
  })

  static readonly UPDATE: ZodType = z.object({
    accountID: z.string(),
    name: z.string().min(5).max(100),
    balance: z.number().min(0),
    icon: z.string().optional(),
  })
}
