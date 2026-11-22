import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://portfoliopedro-gilt.vercel.app'),
  title: 'Pedro Cezar | Portfólio de Desenvolvimento',
  description: 'Conheça os projetos, tecnologias e experiências de Pedro Cezar em desenvolvimento de software e automação.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Pedro Cezar | Portfólio de Desenvolvimento',
    description: 'Projetos, tecnologias e experiências em desenvolvimento de software e automação.',
    url: '/',
    siteName: 'Portfólio de Pedro Cezar',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: { card: 'summary' },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  )
}
