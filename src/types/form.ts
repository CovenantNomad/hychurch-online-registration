import { z } from "zod"

const phoneRegex = new RegExp(/^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/);

export const RegistrationFormSchema = z.object({
  registrationDate: z.date({
    required_error: '등록일을 선택해주세요.'
  }),
  name: z.string({
    required_error: '이름을 입력해주세요'
  }).trim().min(1, {
    message: '최소 1글자 이상 입력해주세요'
  }),
  introducer: z.string({
    required_error: '인도자를 입력해주세요'
  }).trim().min(1, {
    message: '최소 1글자 이상 입력해주세요'
  }),
  gender: z.enum(['남자', '여자'], { required_error : '성별을 선택해주세요' }),
  marriageStatus: z.enum(['미혼', '기혼', '기타'], { required_error : '결혼여부를 선택해주세요' }),
  birthYear: z.string(
    { required_error: '태어난 연도를 입력해주세요'}
  ).length(4, {
    message: '태어난 연도를 4자리(ex, 1999)로 입력해주세요'
  }),
  birthMonth: z.string(
    { required_error: '태어난 월을 입력해주세요'}
  ).length(2, {
    message: '태어난 월을 2자리(ex, 07)로 입력해주세요'
  })
  ,
  birthDay: z.string(
    { required_error: '태어난 일을 입력해주세요'}
  ).length(2, {
    message: '태어난 일을 2자리(ex, 07)로 입력해주세요'
  }),
  phoneNumber: z.string({
    required_error: '휴대폰번호를 입력해주세요'
  }).regex(phoneRegex, '올바른 휴대폰번호를 입력해주세요'),
  postcode: z.string({
    required_error: '우편번호를 입력해주세요'
  }).length(5, {
    message: '5자리 우편번호를 입력해주세요'
  }).refine((value) => {
    // 숫자로 이루어진지 검사
    return /^\d+$/.test(value);
  }, {
    message: '숫자로 이루어진 우편번호를 입력해주세요'
  }),
  primaryAddress: z.string({
    required_error: '주소를 입력해주세요'
  }),
  detailAddress: z.string().optional(),
  faithExperience: z.enum(['초신자', '세례자', '집사', '권사', '장로', '기타'], { required_error: '신앙경험을 선택해주세요'}),
  miscellaneousInput: z.string().optional()
})


export const RegistrationDataSchema = z.object({
  registrationDate: z.date(),
  registrationDateString: z.string(),
  yearOfRegistration: z.string(),
  monthOfRegistration: z.string(),
  name: z.string(),
  introducer: z.string(),
  gender: z.string(),
  marriageStatus: z.string(),
  yearOfBirth: z.string(),
  birthday: z.string(),
  phoneNumber: z.string(),
  postcode: z.string().length(5),
  fullAddress: z.string(),
  faithExperience: z.string(),
  profileUrl: z.string()
})

export type TRegistrationData = {
  registrationDate: Date,
  registrationDateString: string,
  yearOfRegistration: string,
  monthOfRegistration: string,
  name: string,
  introducer: string,
  gender: string,
  marriageStatus: string,
  yearOfBirth: string,
  birthday: string,
  phoneNumber: string,
  postcode: string,
  fullAddress: string,
  faithExperience: string,
  profileUrl: string,
}