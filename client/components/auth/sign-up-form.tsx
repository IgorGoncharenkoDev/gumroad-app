'use client'

import { useRouter } from 'next/navigation'
import { RefObject, SubmitEvent, useRef, useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useRegisterUser } from '@/lib/hooks/mutations/useAuth'

export function SignUpForm() {
  const errorToastRef = useRef<string | number | null>(null)

  const router = useRouter()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { isPending: isMutationPending, mutate: mutateRegisterUser } =
    useRegisterUser()

  const handleToastDismiss = (toastRef: RefObject<string | number | null>) => {
    if (toastRef.current) {
      toast.dismiss(toastRef.current)
      toastRef.current = null
    }
  }

  const handleFormSubmit = (event: SubmitEvent) => {
    event.preventDefault()

    mutateRegisterUser(
      {
        email,
        name,
        password,
      },
      {
        onSuccess: () => {
          toast.success(
            'Account created successfully. You will now be redirected to the Dashboard',
            {
              duration: 5000,
              onAutoClose: () => router.push('/'),
            },
          )
        },
        onError: (error) => {
          errorToastRef.current = toast.error(error.message, {
            closeButton: true,
            duration: Infinity,
          })
        },
      },
    )
  }

  return (
    <Card className="border-0 bg-transparent shadow-none">
      <form className="space-y-4" onSubmit={handleFormSubmit}>
        <fieldset className="space-y-2">
          <legend className="text-sm font-medium text-zinc-900">Name</legend>
          <Input
            required
            autoComplete="name"
            className="h-11 border-zinc-300 text-[15px] placeholder:text-zinc-400"
            placeholder="Your name"
            value={name}
            onChange={(e) => {
              handleToastDismiss(errorToastRef)
              setName(e.target.value)
            }}
          />
        </fieldset>
        <fieldset className="space-y-2">
          <legend className="text-sm font-medium text-zinc-900">Email</legend>
          <Input
            required
            autoComplete="email"
            className="h-11 border-zinc-300 text-[15px] placeholder:text-zinc-400"
            placeholder="Your email"
            type="email"
            value={email}
            onChange={(e) => {
              handleToastDismiss(errorToastRef)
              setEmail(e.target.value)
            }}
          />
        </fieldset>
        <fieldset className="space-y-2">
          <legend className="text-sm font-medium text-zinc-900">
            Password
          </legend>
          <Input
            required
            autoComplete="password"
            className="h-11 border-zinc-300 text-[15px] placeholder:text-zinc-400"
            placeholder="Your password"
            type="password"
            value={password}
            onChange={(e) => {
              handleToastDismiss(errorToastRef)
              setPassword(e.target.value)
            }}
          />
        </fieldset>
        <Button
          className="h-11 w-full bg-zinc-900 text-white shadow-sm "
          disabled={isMutationPending}
          type="submit"
        >
          {isMutationPending ? 'Creating...' : 'Create Account'}
        </Button>
      </form>
    </Card>
  )
}
