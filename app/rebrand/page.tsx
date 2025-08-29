import { redirect } from 'next/navigation'

export default function LegacyRebrandRedirect() {
  redirect('/')
}

export const metadata = {
  title: 'OceanCrest',
  description: 'OceanCrest',
  robots: { index: false, follow: false }
}
