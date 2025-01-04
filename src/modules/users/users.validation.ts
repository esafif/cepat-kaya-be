import { z, ZodType } from "zod"

export class UserValidation {
  static readonly REGISTER: ZodType = z.object({
    username: z.string().min(5).max(100),
    email: z.string().email().min(7).max(100),
    password: z.string().min(7).max(100),
    phone: z.string().min(7).max(20),
    fullname: z.string().min(5).max(100),
    role: z.enum(["OWNER", "PARTNER"]),
  })

  static readonly LOGIN: ZodType = z.object({
    username: z.string().min(5).max(100),
    password: z.string().min(7).max(100),
  })

  static readonly UPDATE: ZodType = z.object({
    fullname: z.string().min(5).max(100),
    password: z.string().min(7).max(100),
  })
}