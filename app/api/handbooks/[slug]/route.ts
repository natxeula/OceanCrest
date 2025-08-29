import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const ROOT = process.cwd()
const DATA_DIR = path.join(ROOT, 'data', 'handbooks')

async function ensureDir() {
  await fs.mkdir(DATA_DIR, { recursive: true })
}

function allowed(slug: string, req: NextRequest) {
  const cookies = req.cookies
  if (slug === 'internal') return cookies.get('hb_internal')?.value === 'ok'
  if (slug === 'executive') return cookies.get('hb_executive')?.value === 'ok'
  return false
}

function fileFor(slug: string) {
  return path.join(DATA_DIR, `${slug}.md`)
}

export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  const slug = params.slug
  await ensureDir()
  const file = fileFor(slug)
  try {
    const content = await fs.readFile(file, 'utf8')
    return NextResponse.json({ content })
  } catch {
    return NextResponse.json({ content: '' })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
  const slug = params.slug
  if (!allowed(slug, req)) {
    return new NextResponse('Unauthorized', { status: 401 })
  }
  await ensureDir()
  const file = fileFor(slug)
  const body = await req.json()
  const content = typeof body?.content === 'string' ? body.content : ''
  await fs.writeFile(file, content, 'utf8')
  return NextResponse.json({ ok: true })
}
