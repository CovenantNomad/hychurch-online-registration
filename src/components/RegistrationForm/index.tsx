'use client'

import { ChangeEvent, useEffect, useState } from "react"
import dayjs from 'dayjs'
import { v4 as uuidv4 } from 'uuid'
import { useDaumPostcodePopup } from 'react-daum-postcode';
// form
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import { RegistrationFormSchema } from '@/types/form';

// components
import { Button } from '../ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CalendarIcon } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import UploadFilePreview from "../UploadFilePreview/UploadFilePreview"
import Modal from "../Modal/Modal";
// firebase
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { db, storage } from '@/configs/firebaseConfigs'
import { addDoc, collection } from 'firebase/firestore'
import { FIREBASE_COLLECTION } from '@/types/firebase'
// utils
import { format } from "date-fns"
import { cn } from '@/lib/utils';
import { FormError } from "@/types/error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRegistrtaion } from "@/lib/firebase";


type RegistrationFormProps = {
  setUserName: React.Dispatch<React.SetStateAction<string | null>>,
  setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>, 
  setIsSubmitSuccessful: React.Dispatch<React.SetStateAction<boolean>>,
  setIsError: React.Dispatch<React.SetStateAction<FormError[] | null>>
}


const RegistrationForm = ({ setUserName, setIsSubmitted, setIsSubmitSuccessful, setIsError } : RegistrationFormProps) => {
  const queryClient = useQueryClient()
  const [ modalOpen, setModalOpen ] = useState(false)
  const [ selectedFile, setSelectedFile ] = useState<File | null>(null);
  const [ imagePreview, setImagePreview ] = useState("");
  const mutation = useMutation({ mutationFn: createRegistrtaion})
  const form = useForm<z.infer<typeof RegistrationFormSchema>>({
    resolver: zodResolver(RegistrationFormSchema),
    defaultValues: {
      registrationDate: new Date(),
      introducer: "",
      name: "",
      birthYear: "",
      birthMonth: "",
      birthDay: "",
      phoneNumber: "",
      postcode: "",
      primaryAddress: ""
    }
  })
  const open = useDaumPostcodePopup();

  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    form.setValue('postcode', data.zonecode)
    form.clearErrors('postcode')
    form.setValue('primaryAddress', fullAddress)
    form.clearErrors('primaryAddress')
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  const onSubmitHandler = async (data: z.infer<typeof RegistrationFormSchema>) => {
    setModalOpen(true)
    try {
      if (selectedFile) {
        const id = uuidv4();
        const storageRef = ref(storage, `profiles/${data.name}_${id}`);
        const uploadTask = uploadBytes(storageRef, selectedFile);
  
        const snapshot = await uploadTask;
        const downloadURL = await getDownloadURL(snapshot.ref);
  
        const registerForm = {
          registrationDate: data.registrationDate, 
          registrationDateString: dayjs(data.registrationDate).format('YYYY-MM-DD'),
          yearOfRegistration: dayjs(data.registrationDate).get('year').toString(),
          monthOfRegistration: (dayjs(data.registrationDate).get('month')+1).toString(), 
          name: data.name, 
          introducer: data.introducer, 
          gender: data.gender, 
          marriageStatus: data.marriageStatus, 
          birthday: `${data.birthYear}-${data.birthMonth}-${data.birthDay}`,
          yearOfBirth: data.birthYear,
          phoneNumber: data.phoneNumber, 
          postcode: data.postcode, 
          fullAddress: data.detailAddress ? data.primaryAddress + " " + data.detailAddress : data.primaryAddress, 
          faithExperience: data.faithExperience === '기타' ? `기타: ${data.miscellaneousInput}`: data.faithExperience, 
          profileUrl: downloadURL, 
        };

        const result = await mutation.mutateAsync(registerForm, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getRegistrations'] })
          },
        })

        if (result.id) {
          setModalOpen(false)
          setUserName(data.name)
          setIsError(null)
          form.reset()
          setIsSubmitSuccessful(true)
          setIsSubmitted(true)
        }

      } else {
        setModalOpen(false)
        setIsError((currentErrors) => {
          const newError = {
            type: 'Not upload a profile image',
            message: '이미지를 첨부하지 않았습니다.'
          }

          if (currentErrors === null) {
            return [newError];
          }

          return [...currentErrors, newError]
        })
        throw new Error('이미지가 없습니다.')
      }
      
    } catch (error) {
      setModalOpen(false)
      setIsError((currentErrors) => {
        const newError = {
          type: 'FirebaseError',
          message: 'Firebase 저장 중 에러가 발생하였습니다'
        }

        if (currentErrors === null) {
          return [newError];
        }

        return [...currentErrors, newError]
      })
      console.log(error)
      throw new Error('온라인 등록 중 오류가 발생하였습니다.')
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (selectedFile) {
      setImagePreview(URL.createObjectURL(selectedFile));
    }
  }, [selectedFile])

  

  return (
    <div className="py-12 md:px-12 md:border">
      <div className="pb-8 border-b">
        <h2 className="text-2xl font-semibold leading-7 text-gray-900">화양교회 온라인 등록</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          온라인으로 화양교회를 찾아주신 새가족 여러분을 진심으로 환영합니다
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitHandler)}>
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-6 md:grid-cols-9 lg:grid-cols-12 gap-x-3 md:gap-x-4 lg:gap-x-6 gap-y-8 ">
              {/* 등록일 */}
              <div className="col-span-6 md:col-span-9 lg:col-span-12">
                <FormField
                  control={form.control}
                  name="registrationDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>등록일<span className="text-red-600">*</span></FormLabel>
                      <FormDescription>온라인 등록신청서 작성 날짜를 선택해주세요</FormDescription>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "yyyy-MM-dd")
                              ) : (
                                <span>날짜를 선택해주세요</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onDayClick={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* 인도자 */}
              <div className="col-span-6 md:col-span-9 lg:col-span-12">
                <FormField
                  control={form.control}
                  name="introducer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>인도자<span className="text-red-600">*</span></FormLabel>
                      <FormDescription>{`인도자가 없을 경우 '자진'이라고 입력해주세요`}</FormDescription>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* 이름 */}
              <div className="col-span-6 md:col-span-9 lg:col-span-12">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이름<span className="text-red-600">*</span></FormLabel>
                      <FormDescription>{`실명으로 입력해주세요`}</FormDescription>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* 성별 */}
              <div className="col-span-6 md:col-span-9 lg:col-span-12">
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>성별<span className="text-red-600">*</span></FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-x-4"
                        >
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="남자" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              남자
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="여자" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              여자
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* 결혼관계 */}
              <div className="col-span-6 md:col-span-9 lg:col-span-12">
                <FormField
                  control={form.control}
                  name="marriageStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>결혼관계<span className="text-red-600">*</span></FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-x-4"
                        >
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="미혼" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              미혼
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="기혼" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              기혼
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="기타" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              기타
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* 생일 */}
              <div className="col-span-6 md:col-span-9 lg:col-span-12 -mb-6">
                <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  생년월일<span className="text-red-600">*</span>
                </span>
              </div>
              <div className="relative col-span-2 md:col-span-3 lg:col-span-4">
                <FormField
                  control={form.control}
                  name="birthYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="YYYY" className="w-[70%] md:w-[85%] lg:w-[90%] text-right"  />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <span className="absolute top-1/2 right-3 -mt-2 text-gray-500 text-sm">
                  년
                </span>
              </div>
              <div className="relative col-span-2 md:col-span-3 lg:col-span-4">
                <FormField
                  control={form.control}
                  name="birthMonth"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="MM" className="w-[70%] md:w-[85%] lg:w-[90%] text-right" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <span className="absolute top-1/2 right-3 -mt-2 text-gray-500 text-sm">
                  월
                </span>
              </div>
              <div className="relative col-span-2 md:col-span-3 lg:col-span-4">
                <FormField
                  control={form.control}
                  name="birthDay"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="DD" className="w-[70%] md:w-[85%] lg:w-[90%] text-right" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <span className="absolute top-1/2 right-3 -mt-2 text-gray-500 text-sm">
                  일
                </span>
              </div>
              {/* 휴대폰번호 */}
              <div className="col-span-6 md:col-span-9 lg:col-span-12">
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>휴대폰번호<span className="text-red-600">*</span></FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* 우편번호 with 카카오 */}
              <div className="col-span-6 md:col-span-9 lg:col-span-12">
                <FormField
                  control={form.control}
                  name="postcode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>주소<span className="text-red-600">*</span></FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-x-4">
                          <Input {...field} placeholder="우편번호" />
                          <Button type="button" onClick={handleClick}>우편번호 찾기</Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* 주소 */}
              <div className="col-span-6 md:col-span-9 lg:col-span-12">
                <FormField
                  control={form.control}
                  name="primaryAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="주소" className="-mt-4" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* 상세주소 */}
              <div className="col-span-6 md:col-span-9 lg:col-span-12">
                <FormField
                  control={form.control}
                  name="detailAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="상세주소" className="-mt-6" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* 신앙경력 */}
              <div className="col-span-6 md:col-span-9 lg:col-span-12">
                <FormField
                  control={form.control}
                  name="faithExperience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>신앙경력<span className="text-red-600">*</span></FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="space-y-2"
                        >
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="초신자" />
                            </FormControl>
                            <FormLabel className="">
                              초신자
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="세례자" />
                            </FormControl>
                            <FormLabel className="">
                              세례자
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="집사" />
                            </FormControl>
                            <FormLabel className="">
                              집사
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="권사" />
                            </FormControl>
                            <FormLabel className="">
                              권사
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="장로" />
                            </FormControl>
                            <FormLabel className="">
                              장로
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="기타" />
                            </FormControl>
                            <FormLabel className="">
                              기타
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* 신앙경력 - 기타입력사항 */}
              {form.watch('faithExperience') === '기타' && (
                <div className="col-span-4 md:col-span-9 lg:col-span-12">
                  <FormField
                    control={form.control}
                    name="miscellaneousInput"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} className="-mt-5"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
              {/* 사진 */}
              <div className="col-span-6 md:col-span-9 lg:col-span-12">
                <FormLabel>사진을 올려주세요<span className="text-red-600">*</span></FormLabel>
                <FormDescription className="whitespace-pre-line">{`성도님의 얼굴 확인을 위해서 개인사진을 올려주시기 바랍니다^^\n가급적 세로사진(세로가 긴 사진)으로 첨부해주세요`}</FormDescription>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="relative text-center">
                    {/* <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" /> */}
                    
                      {imagePreview ? (
                        <UploadFilePreview 
                          src={imagePreview} 
                          alt="사진 미리보기" 
                          aspectRatio="portrait" 
                          width={250} 
                          height={330} 
                          setSelectedFile={setSelectedFile}
                          setImagePreview={setImagePreview}
                        />
                      ) : (
                        <div className="text-sm leading-6 text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-700"
                          >
                            <span>이미지 첨부</span>
                            <input id="file-upload" name="file-upload" type="file" accept='image/*' className="sr-only" onChange={handleFileChange} required />
                          </label>
                          <p className="text-xs leading-5 text-gray-600">PNG, JPG, WEBP up to 10MB</p>
                        </div>
                      )}
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end">
            <Button type="submit" size={'lg'}>제출하기</Button>
          </div>
        </form>
      </Form>
      <Modal open={modalOpen} setOpen={setModalOpen} />
    </div>
  );
};

export default RegistrationForm;
