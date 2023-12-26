import SubmissionText from "@/components/SubmissionText";
import { FormError } from "@/types/error";
import Image from "next/image";
import Link from "next/link";

type SubmissionProps = {
  userName: string | null
  isError: FormError[] | null
  isSubmitSuccessful: boolean
}

const Submission = ({ userName, isError, isSubmitSuccessful }: SubmissionProps) => {
  return (
    <div className="pt-40 pb-12 md:px-12 md:border md:min-h-screen -mb-[30px] md:-mb-[50px] lg:-pb-[100px]">
      {isSubmitSuccessful ? (
        <div className="flex flex-col items-center">
          <div className="mb-6">
            <div className="w-16 h-16 flex justify-center items-center bg-teal-700 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            </div>  
          </div>

          <h2 className="text-2xl font-semibold leading-7 text-gray-900">온라인 등록 완료</h2>
          <SubmissionText isSubmitSuccessful={isSubmitSuccessful} userName={userName} />
          <div className="w-full grid grid-cols-1 gap-y-2 mt-10 lg:grid-cols-2 lg:gap-x-4 lg:mt-16">
            <Link
              href={'http://www.hwayang.org/'}
              passHref
            >
              <div
                className="relative w-full flex items-center space-x-6 rounded-lg border border-gray-300 bg-white px-6 py-4 shadow-sm hover:border-gray-400"
              >
                <div className="flex-shrink-0">
                  <Image className="h-10 w-10 rounded-full" src={'/images/channels4_profile.jpg'} alt="" width={40} height={40} />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-base font-medium text-gray-900">화양교회 홈페이지 바로가기</p>
                </div>
              </div>
            </Link>
            <Link
              href={'https://www.youtube.com/channel/UCd2cL2bgCRuaLRwEQF2Mxzw'}
              passHref
            >
              <div
                className="relative w-full flex items-center space-x-6 rounded-lg border border-gray-300 bg-white px-6 py-4 shadow-sm hover:border-gray-400"
              >
                <div className="flex-shrink-0">
                  <Image className="h-10 w-10 rounded-full" src={'/images/youtube_icon.png'} alt="" width={40} height={40} />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-base font-medium text-gray-900">화양교회 유튜브 채널 보러가기</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="mb-6">
            <div className="w-16 h-16 flex justify-center items-center bg-red-700 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </div>  
          </div>

          <h2 className="text-2xl font-semibold leading-7 text-gray-900">온라인 등록 실패</h2>
          <SubmissionText isSubmitSuccessful={isSubmitSuccessful} userName={userName} />
        </div>
      )}
    </div>
  );
};

export default Submission;
