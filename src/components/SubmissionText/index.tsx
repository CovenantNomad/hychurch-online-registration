'use client'

type SubmissionTextProps = {
  userName: string | null
  isSubmitSuccessful: boolean
}

const SubmissionText = ({ userName, isSubmitSuccessful }: SubmissionTextProps) => {
  return (
    <>
      {isSubmitSuccessful ? (
        <p className="mt-3 text-sm leading-6 text-gray-600 whitespace-pre-line text-center">
          {`환영합니다. ${userName}님
            화양교회 온라인 등록이 완료되었습니다.
          `}
        </p>
      ) : (
        <p className="mt-3 text-sm leading-6 text-gray-600 whitespace-pre-line text-center">
          {`${userName}님, 불편을 드려서 죄송합니다.
            온라인 등록과정 중 오류가 발생하여 등록을 완료하지 못했습니다.
            02-2205-0033 연락주시면 도와드리겠습니다
          `}
        </p>
      )}
    </>
  );
};

export default SubmissionText;
