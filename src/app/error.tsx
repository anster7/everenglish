'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Home, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-ever-ivory flex items-center justify-center px-4 md:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <Card className="border-ever-sage/20 bg-white rounded-2xl shadow-lg">
          <CardHeader className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
              className="flex justify-center mb-4"
            >
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
            </motion.div>
            <CardTitle className="text-2xl text-ever-navy">오류가 발생했습니다</CardTitle>
            <CardDescription className="text-ever-navy/70 mt-2">
              페이지를 불러오는 중 문제가 발생했습니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-ever-sage/10 rounded-lg p-4">
              <p className="text-sm text-ever-navy/80 text-center">
                {error.message || '알 수 없는 오류가 발생했습니다.'}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={reset}
                className="flex-1 bg-ever-gold hover:bg-ever-gold/90 text-white"
              >
                <RefreshCw className="mr-2 w-4 h-4" />
                다시 시도
              </Button>
              <Button
                asChild
                variant="outline"
                className="flex-1 border-ever-sage/30 text-ever-navy hover:bg-ever-ivory"
              >
                <Link href="/">
                  <Home className="mr-2 w-4 h-4" />
                  홈으로
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
