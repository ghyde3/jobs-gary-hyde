import type { Metadata } from 'next';
import { Space_Grotesk, DM_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://jobs.garyhyde.com'),
  title: 'Gary Hyde - Senior Full-Stack Developer',
  description:
    'Senior full-stack developer. I own work end to end, from data model and API through to a polished frontend.',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Gary Hyde - Senior Full-Stack Developer',
    description:
      'Senior full-stack developer. I own work end to end, from data model and API through to a polished frontend.',
    images: [
      {
        url: '/gary-hyde-og.png',
        width: 1200,
        height: 630,
        alt: 'Gary Hyde - Senior Full-Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gary Hyde - Senior Full-Stack Developer',
    description:
      'Senior full-stack developer. I own work end to end, from data model and API through to a polished frontend.',
    images: ['/gary-hyde-og.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
