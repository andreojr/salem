import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  let next = searchParams.get('next') ?? '/'
  if (!next.startsWith('/')) {
    next = '/'
  }

  if (code) {
    const supabase = await createClient()
    const { error, data } = await supabase.auth.exchangeCodeForSession(code)
    if (!error && data.user?.id && data.user?.email) {
      const forwardedHost = request.headers.get('x-forwarded-host')
      const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https'
      const host = forwardedHost || request.headers.get('host') || 'localhost'
      const redirectUrl = `${protocol}://${host}${next}`

      return NextResponse.redirect(redirectUrl)
    } else {
      await supabase.auth.signOut()
    }
  }

  const fallbackHost = request.headers.get('x-forwarded-host') || request.headers.get('host') || 'localhost'
  const fallbackProtocol = process.env.NODE_ENV === 'development' ? 'http' : 'https'
  return NextResponse.redirect(`${fallbackProtocol}://${fallbackHost}/auth/error`)
}
