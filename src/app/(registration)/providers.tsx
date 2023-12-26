"use client"
 
import * as React from "react"
import useRegistration from "@/hooks/useRegistration"
import Submission from "./@submission/page"
import RegistrationForm from "@/components/RegistrationForm"

 
export function RegistrationProviders() {
  const { userName, isSubmitted, isError, isSubmitSuccessful, setUserName, setIsSubmitted, setIsError, setIsSubmitSuccessful } = useRegistration()


  return (
    <>
      { isSubmitted ? (
        <Submission
          userName={userName} 
          isError={isError} 
          isSubmitSuccessful={isSubmitSuccessful}
        />
      ) : (
        <RegistrationForm
          setUserName={setUserName} 
          setIsError={setIsError} 
          setIsSubmitted={setIsSubmitted} 
          setIsSubmitSuccessful={setIsSubmitSuccessful} 
        />
      )}
    </>
  )
}