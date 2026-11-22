import type { Metadata } from 'next'
import './globals.css'

const siteUrl = 'https://portfoliopedro-gilt.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfilePage',
      '@id': `${siteUrl}/#profile`,
      url: `${siteUrl}/`,
      name: 'Portfólio de Pedro Cezar',
      isPartOf: { '@id': `${siteUrl}/#website` },
      mainEntity: { '@id': `${siteUrl}/#person` },
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: 'Portfólio de Pedro Cezar',
      description: metadata.description,
      inLanguage: 'pt-BR',
      author: { '@id': `${siteUrl}/#person` },
    },
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: 'Pedro Cézar',
      url: `${siteUrl}/`,
      jobTitle: 'Desenvolvedor Full Stack e Designer UI/UX',
      sameAs: ['https://github.com/ary-pedro'],
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
        {children}
      </body>
    </html>
  )
}
