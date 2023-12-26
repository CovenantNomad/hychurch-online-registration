'use client'

import { useRef } from "react";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import CpatureButton from "../Buttons/CpatureButton";
import BackButton from "../Buttons/BackButton";
import DeleteButton from "../Buttons/DeleteButton";


type ProfileCardProps = {
  data: {
    userId: string;
    registrationDate: string;
    name: string;
    introducer: string;
    gender: string;
    marriageStatus: string;
    birthday: string;
    phoneNumber: string;
    faithExperience: string;
    postcode: string;
    address: string;
    profileUrl: string;
}
}

const ProfileCard = ({ data }: ProfileCardProps) => {
  const componentRef = useRef<HTMLDivElement | null>(null)
  

  return (
    <>
      <h2 className="text-2xl font-bold tracking-tight leading-7 text-gray-900 pt-2 pb-4">온라인 등록자 카드</h2>
      <div className="hidden lg:flex lg:justify-end lg:pt-4 lg:pb-1">
        <CpatureButton componentRef={componentRef} name={data.name} />
      </div>
      <div ref={componentRef}>
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 lg:py-4 lg:px-2 lg:grid-cols-3">
          <div className="row-start-2 lg:row-start-1 lg:col-start-1 ring-1 ring-gray-900/5 rounded-md">
            <div className="">
              <AspectRatio ratio={3 / 4}>
                <Image src={data?.profileUrl} fill alt="이미지사진" className="rounded-md object-cover"/>
              </AspectRatio>
            </div>
          </div>

          <div className="shadow-sm ring-1 ring-gray-900/5 row-start-1 lg:col-start-2 sm:rounded-xl lg:col-span-2">
            <div className="px-4 py-6 sm:p-8">
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <span className="inline-block w-20 text-base font-medium leading-6 text-gray-900">
                    인도자
                  </span>
                  <span className="leading-6 text-gray-900">{data.introducer}</span>
                </div>

                <div className="col-span-full">
                  <span className="inline-block w-20 font-medium leading-6 text-gray-900">
                    이름
                  </span>
                  <span className="leading-6 text-gray-900">
                    {data.name}
                  </span>
                </div>

                <p className="col-span-full block text-sm font-normal leading-6 text-gray-600">등록자 정보</p>
                <div className="lg:col-span-2 -mt-8">
                  <div className="mt-2">
                    <div>
                      <span className="inline-block w-20 font-medium leading-6 text-gray-900">
                        성별
                      </span>
                      <span className="leading-6 text-gray-900">{data.gender}</span>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2 -mt-8">
                  <div className="mt-2">
                    <div>
                      <span className="inline-block w-20 font-medium leading-6 text-gray-900">
                        생년월일
                      </span>
                      <span className="leading-6 text-gray-900">{data.birthday}</span>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2 -mt-8">
                  <div className="mt-2">
                    <div>
                      <span className="inline-block w-20 font-medium leading-6 text-gray-900">
                        결혼상태
                      </span>
                      <span className="leading-6 text-gray-900">{data.marriageStatus}</span>
                    </div>
                  </div>
                </div>

                <p className="col-span-full block text-sm font-normal leading-6 text-gray-600">연락처 정보</p>
                <div className="md:col-span-2 -mt-8">
                  <div className="mt-2">
                    <div>
                      <span className="inline-block w-20 font-medium leading-6 text-gray-900">
                        휴대폰번호
                      </span>
                      <span className="leading-6 text-gray-900">{data.phoneNumber}</span>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-4 -mt-8">
                  <div className="mt-2">
                    <div>
                      <span className="block w-20 font-medium leading-6 text-gray-900 lg:inline-block">
                        주소
                      </span>
                      <span className="leading-6 text-gray-900">({data.postcode}) {data.address}</span>
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <p className="text-sm font-normal leading-6 text-gray-600">신앙 정보</p>
                  <div className="mt-2">
                    <div>
                      <span className="inline-block w-20 font-medium leading-6 text-gray-900">
                        신앙경력
                      </span>
                      <span className="leading-6 text-gray-900">{data.faithExperience}</span>
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <div>
                    <span className="inline-block w-20 font-medium leading-6 text-gray-900">
                      등록일자
                    </span>
                    <span className="leading-6 text-gray-900">{data.registrationDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between py-4">
        <BackButton />
        <DeleteButton userId={data.userId} name={data.name} />
      </div>
    </>
  );
};

export default ProfileCard;
