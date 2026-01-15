import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'Ever English - 원서 영어 리딩 전문 공부방',
  description: '원서를 이해하는 힘을 기르는 영어 리딩 전문 공부방. 문제풀이가 아닌 맥락 이해와 사고 확장 중심의 수업을 제공합니다.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
