'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Search } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ever-ivory flex items-center justify-center px-4 md:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center"
      >
        <Card className="border-ever-sage/20 bg-white rounded-2xl shadow-lg">
          <CardHeader>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
              className="flex justify-center mb-4"
            >
              <div className="w-20 h-20 bg-ever-sage/20 rounded-full flex items-center justify-center">
                <Search className="w-10 h-10 text-ever-sage" />
              </div>
            </motion.div>
            <CardTitle className="text-3xl text-ever-navy">404</CardTitle>
            <CardDescription className="text-ever-navy/70 mt-2 text-lg">
              페이지를 찾을 수 없습니다
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-ever-navy/60">
              요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-ever-gold hover:bg-ever-gold/90 text-white w-full"
            >
              <Link href="/" className="flex items-center justify-center">
                <Home className="mr-2 w-5 h-5" />
                홈으로 돌아가기
              </Link>
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
