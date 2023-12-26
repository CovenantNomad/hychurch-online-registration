'use client'

import { useState } from "react"

const useAuth = () => {
  // const [ error, setError ] = useState()
  const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(false)

  return {
    isLoggedIn
  }
}

export default useAuth