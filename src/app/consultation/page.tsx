'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Send, Loader2, Home, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import Image from 'next/image';

const consultationSchema = z.object({
  name: z.string().min(2, '이름을 입력해주세요.').max(50, '이름이 너무 깁니다.'),
  contact: z
    .string()
    .min(10, '연락처를 정확히 입력해주세요.')
    .regex(/^[0-9-]+$/, '연락처는 숫자와 하이픈(-)만 입력 가능합니다.'),
  studentGrade: z.string().min(1, '학년을 선택해주세요.'),
  studentAge: z
    .string()
    .min(1, '나이를 입력해주세요.')
    .regex(/^[0-9]+$/, '나이는 숫자만 입력 가능합니다.')
    .refine((val) => {
      const age = parseInt(val);
      return age >= 5 && age <= 18;
    }, '나이는 5세 이상 18세 이하여야 합니다.'),
  educationMonths: z
    .string()
    .min(1, '영어 교육 개월 수를 입력해주세요.')
    .regex(/^[0-9]+$/, '개월 수는 숫자만 입력 가능합니다.')
    .refine((val) => {
      const months = parseInt(val);
      return months >= 0 && months <= 120;
    }, '개월 수는 0개월 이상 120개월 이하여야 합니다.'),
  additionalInfo: z.string().max(500, '기타 내용은 500자 이내로 입력해주세요.').optional(),
});

type ConsultationFormValues = z.infer<typeof consultationSchema>;

const FORMPREE_ENDPOINT = 'https://formspree.io/f/xvzzgrzr';

export default function ConsultationPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ConsultationFormValues>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      name: '',
      contact: '',
      studentGrade: '',
      studentAge: '',
      educationMonths: '',
      additionalInfo: '',
    },
  });

  const onSubmit = async (data: ConsultationFormValues) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('이름', data.name);
      formData.append('연락처', data.contact);
      formData.append('학생 학년', data.studentGrade);
      formData.append('학생 나이', data.studentAge);
      formData.append('영어 교육 개월 수', data.educationMonths);
      if (data.additionalInfo) {
        formData.append('기타', data.additionalInfo);
      }

      const response = await fetch(FORMPREE_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log('Form data submitted successfully to Formspree:', responseData);
        setIsSubmitted(true);
        form.reset();
      } else {
        console.error('Formspree submission error:', responseData);
        throw new Error(responseData.error || '제출에 실패했습니다.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setIsSubmitting(false);
      toast({
        title: '오류가 발생했습니다.',
        description: '다시 시도해주세요.',
        variant: 'destructive',
      });
    }
  };

  if (isSubmitted) {
    return <CompletionPage />;
  }

  return (
    <div className="min-h-screen bg-ever-ivory">
      <div className="max-w-2xl mx-auto px-4 md:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-8"
        >
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="text-ever-navy hover:text-ever-sage">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold text-ever-navy">
                1:1 상담 신청
              </h1>
              <p className="text-ever-navy/70 mt-2">
                아이에게 맞는 원서 리딩 수업을 함께 찾아보세요.
              </p>
            </div>
          </div>

          <Card className="border-ever-sage/20 bg-white rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-ever-navy">상담 신청서</CardTitle>
              <CardDescription className="text-ever-navy/70">
                아래 정보를 입력해주시면 빠른 시일 내에 연락드리겠습니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-ever-navy font-medium">
                          이름 <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="보호자 이름을 입력해주세요"
                            className="border-ever-sage/30 focus:border-ever-sage focus:ring-ever-sage/20"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-ever-navy font-medium">
                          연락처 <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="010-1234-5678"
                            className="border-ever-sage/30 focus:border-ever-sage focus:ring-ever-sage/20"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-ever-navy/60">
                          하이픈(-)을 포함하여 입력해주세요.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="studentGrade"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-ever-navy font-medium">
                            학생 학년 <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <select
                              className="flex h-10 w-full rounded-md border border-ever-sage/30 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ever-sage/20 focus-visible:ring-offset-2 focus-visible:border-ever-sage"
                              {...field}
                            >
                              <option value="">선택해주세요</option>
                              <option value="초등 1학년">초등 1학년</option>
                              <option value="초등 2학년">초등 2학년</option>
                              <option value="초등 3학년">초등 3학년</option>
                              <option value="초등 4학년">초등 4학년</option>
                              <option value="초등 5학년">초등 5학년</option>
                              <option value="초등 6학년">초등 6학년</option>
                              <option value="중등 1학년">중등 1학년</option>
                              <option value="중등 2학년">중등 2학년</option>
                              <option value="중등 3학년">중등 3학년</option>
                              <option value="기타">기타</option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="studentAge"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-ever-navy font-medium">
                            학생 나이 <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="예: 10"
                              className="border-ever-sage/30 focus:border-ever-sage focus:ring-ever-sage/20"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className="text-ever-navy/60">
                            만 나이를 입력해주세요.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="educationMonths"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-ever-navy font-medium">
                          영어 교육 개월 수 <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="예: 24 (2년)"
                            className="border-ever-sage/30 focus:border-ever-sage focus:ring-ever-sage/20"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-ever-navy/60">
                          지금까지 받은 영어 교육 기간을 개월 수로 입력해주세요.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="additionalInfo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-ever-navy font-medium">기타</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="아이의 영어 수준, 관심사, 특별히 알고 싶은 내용 등을 자유롭게 작성해주세요."
                            className="min-h-[120px] border-ever-sage/30 focus:border-ever-sage focus:ring-ever-sage/20 resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-ever-navy/60">
                          {field.value?.length || 0} / 500자
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 border-ever-sage/30 text-ever-navy hover:bg-ever-ivory"
                      onClick={() => form.reset()}
                    >
                      초기화
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-ever-gold hover:bg-ever-gold/90 text-white shadow-sm hover:shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                          제출 중...
                        </>
                      ) : (
                        <>
                          상담 신청하기
                          <Send className="ml-2 w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="bg-ever-sage/10 rounded-2xl p-6 text-center"
          >
            <p className="text-ever-navy/80 leading-relaxed">
              상담 신청 후 1-2일 내에 연락드리겠습니다.
              <br />
              급한 문의사항이 있으시면 연락처로 직접 문의해주세요.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function CompletionPage() {
  return (
    <div className="min-h-screen bg-ever-ivory flex items-center justify-center px-4 md:px-8 py-20">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center space-y-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
            className="flex justify-center"
          >
            <div className="w-20 h-20 bg-ever-sage/20 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-ever-sage" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-4"
          >
            <h1 className="text-3xl md:text-4xl font-semibold text-ever-navy">
              상담 신청이 완료되었습니다
            </h1>
            <p className="text-lg text-ever-navy/70">
              빠른 시일 내에 연락드리겠습니다.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="relative w-full max-w-2xl mx-auto aspect-[4/3] rounded-2xl overflow-hidden shadow-xl"
          >
            <Image
              src="/당근 포스터.png"
              alt="Ever English 강사 소개"
              fill
              className="object-contain"
              priority
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="pt-8"
          >
            <Button
              asChild
              size="lg"
              className="bg-ever-gold hover:bg-ever-gold/90 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <Link href="/" className="flex items-center">
                <Home className="mr-2 w-5 h-5" />
                홈으로 돌아가기
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="bg-ever-sage/10 rounded-2xl p-6 mt-8"
          >
            <p className="text-ever-navy/80 leading-relaxed text-sm">
              상담 신청 후 1-2일 내에 연락드리겠습니다.
              <br />
              급한 문의사항이 있으시면 이메일로 직접 문의해주세요.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
