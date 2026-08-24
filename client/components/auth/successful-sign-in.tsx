'use client'

import { useEffect } from 'react'
import { toast } from 'sonner'

export function SuccessfulSignIn() {
  useEffect(() => {
    const loginSuccess = sessionStorage.getItem('login-success')

    if (loginSuccess) {
      sessionStorage.removeItem('login-success')

      toast.success('You have logged in successfully.', {
        duration: 5000,
      })
    }
  }, [])

  return null
}