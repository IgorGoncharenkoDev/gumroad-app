'use client'

import { useRouter } from 'next/navigation'
import type { SubmitEvent } from 'react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useLoginUser } from '@/lib/hooks/mutations/useAuth'

export function SignInForm() {
  const router = useRouter()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { isPending: isMutationPending, mutate: mutateLoginUser } =
    useLoginUser()

  const handleFormSubmit = (event: SubmitEvent) => {
    event.preventDefault()
    
    mutateLoginUser(
      { email, password },
      {
        onSuccess: () => {
          router.push('/')
        },
      },
    )
  }

  return (
    <Card className="border-0 bg-transparent shadow-none">
      <form className="space-y-4" onSubmit={handleFormSubmit}>
        <fieldset className="space-y-2">
          <legend className="text-sm font-medium text-zinc-900">Email</legend>
          <Input
            required
            autoComplete="email"
            className="h-11 border-zinc-300 text-[15px] placeholder:text-zinc-400"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </fieldset>
        <Button
          className="h-11 w-full bg-zinc-900 text-white shadow-sm "
          disabled={isMutationPending}
          type="submit"
        >
          {isMutationPending ? 'Logging in...' : 'Log In'}
        </Button>
      </form>
    </Card>
  )
}
