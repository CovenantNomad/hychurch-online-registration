import { z } from "zod"

export const AuthFormSchema = z.object({
  email: z.string({ required_error: '이메일을 입력해주세요'}).min(1, {message: '이메일을 입력해주세요'}),
  password: z.string({ required_error: '비밀번호를 입력해주세요'}).min(1, {message: '비밀번호를 입력해주세요'}),
})