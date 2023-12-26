import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { RegistrationProviders } from './providers'
import Container from '@/components/Container'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '화양교회 온라인 등록',
  description: '화양교회 온라인 등록 신청서입니다',
}

export default function RegistrationLayout() {

  return (
    <section>
      <Container>
        <RegistrationProviders />
      </Container>
    </section>
  )
}
