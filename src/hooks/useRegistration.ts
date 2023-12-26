'use client'

import { FormError } from "@/types/error"
import { useState } from "react"

const useRegistration = () => {
  const [ userName, setUserName ] = useState<string | null>(null)
  const [ isSubmitted, setIsSubmitted ] = useState<boolean>(false)
  const [ isError, setIsError ] = useState<FormError[] | null>(null)
  const [ isSubmitSuccessful, setIsSubmitSuccessful ] = useState<boolean>(false)

  return {
    userName,
    isError,
    isSubmitted,
    isSubmitSuccessful,
    setUserName,
    setIsError,
    setIsSubmitted,
    setIsSubmitSuccessful
  }
}

export default useRegistration