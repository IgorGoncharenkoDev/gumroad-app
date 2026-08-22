import Link from 'next/link';

import { SignUpForm } from '@/components/auth/sign-up-form'

export default function SignUpPage () {
  return (
    <>
      <header className="flex flex-col gap-4 border-b border-zinc-200 p-8 sm:p-16 md:p-8">
        <div className="flex items-center justify-between gap-2">
          <h1 className="hidden sm:block text-3xl">
            <Link className="font-semibold tracking-tight" href={'/'}>
              Gumroad
            </Link>
          </h1>
          <div className="flex items-center gap-4 text-md">
            <Link className="font-medium underline" href="/sign-in">
              Sign In
            </Link>
          </div>
        </div>
        <h2 className="text-2xl font-semibold tracking-tight">Sign Up</h2>
      </header>
      <div className="p-8 sm:p-16">
        <div className="max-w-md">
          <SignUpForm />
        </div>
      </div>
    </>
  )
}