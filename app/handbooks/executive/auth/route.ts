import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const form = await req.formData()
  const password = form.get('password')
  const expected = process.env.EXECUTIVE_PASS

  if (typeof password === 'string' && expected && password === expected) {
    const res = NextResponse.redirect(new URL('/handbooks/executive', req.url), 303)
    res.cookies.set('hb_executive', 'ok', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      path: '/handbooks',
      maxAge: 60 * 60 * 24 * 30,
    })
    return res
  }

  return new NextResponse('Unauthorized', { status: 401 })
}
