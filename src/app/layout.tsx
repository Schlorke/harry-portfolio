import type { Metadata, Viewport } from 'next'
import { Alegreya_Sans_SC, Poppins } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

// Otimização de fontes com next/font
const poppins = Poppins({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--body-font',
  preload: true
})

const alegreyaSansSC = Alegreya_Sans_SC({
  weight: ['300', '400', '500', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--second-font',
  preload: true
})

export const metadata: Metadata = {
  title: 'Harry Schlorke - Desenvolvedor Full-Stack',
  description:
    'Portfólio profissional de Harry Schlorke. Full-Stack Developer especializado em sites modernos, sistemas robustos e design sofisticado para empresas em Porto Alegre, RS.',
  manifest: '/assets/img/site.webmanifest',
  icons: {
    icon: [
      { url: '/assets/img/favicon.ico' },
      {
        url: '/assets/img/favicon-96x96.png',
        sizes: '96x96',
        type: 'image/png'
      },
      { url: '/assets/img/favicon.svg', type: 'image/svg+xml' }
    ],
    apple: [{ url: '/assets/img/apple-touch-icon.png', sizes: '180x180' }]
  },
  openGraph: {
    type: 'website',
    url: 'https://harryschlorke.com/',
    title: 'Harry Schlorke | Full-Stack Developer',
    description:
      'Portfólio de Harry Schlorke: soluções web modernas, design sofisticado e sistemas robustos. Desenvolvedor Full-Stack em Porto Alegre, RS. Conheça meus projetos, habilidades e experiências.',
    images: [{ url: 'https://harryschlorke.com/assets/img/harry-meta.jpg' }]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@HarrySchlorke',
    title: 'Harry Schlorke | Full-Stack Developer',
    description:
      'Portfólio de Harry Schlorke: soluções web modernas, design sofisticado e sistemas robustos. Desenvolvedor Full-Stack em Porto Alegre, RS. Conheça meus projetos, habilidades e experiências.',
    images: ['https://harryschlorke.com/assets/img/harry-meta.jpg']
  }
}

export const viewport: Viewport = {
  themeColor: 'hsl(358, 100%, 1%)'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang='pt-BR'
      className={`${poppins.variable} ${alegreyaSansSC.variable}`}
    >
      <head>
{/* Page loading agora é gerenciado pelo hook usePageLoading */}
        {/* Vídeos preloaded apenas quando necessário (on hover/scroll) */}
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://cdn.jsdelivr.net' crossOrigin='' />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/icon?family=Material+Icons'
        />
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css'
        />
      </head>
      <body className='page-loading'>
        {children}
        <Script
          src='https://www.googletagmanager.com/gtag/js?id=G-78FTGT8E17'
          strategy='afterInteractive'
        />
        <Script id='gtag-init' strategy='afterInteractive'>
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-78FTGT8E17');`}
        </Script>
      </body>
    </html>
  )
}
