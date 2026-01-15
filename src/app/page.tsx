'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BookOpen, GraduationCap, CheckCircle2, MessageCircle, ArrowRight, MapPin, Phone, Mail, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-ever-ivory">
      <Navigation />
      <HeroSection />
      <HowWeTeachSection />
      <InstructorSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
}

function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const menuItems = [
    { id: 'how-we-teach', label: '지도 방식' },
    { id: 'instructor', label: '강사 소개' },
    { id: 'faq', label: 'FAQ' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center"
          >
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-2xl font-semibold text-ever-navy hover:text-ever-sage transition-colors duration-300"
            >
              Ever English
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-6 md:gap-8"
          >
            {menuItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-ever-navy/80 hover:text-ever-navy font-medium text-sm md:text-base transition-colors duration-300 relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-ever-sage transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
            <Button
              onClick={() => scrollToSection('cta-section')}
              size="sm"
              className="bg-ever-gold hover:bg-ever-gold/90 text-white px-4 py-2 text-sm rounded-full shadow-sm hover:shadow-md transition-all duration-300 hidden md:flex"
            >
              상담 문의
            </Button>
          </motion.div>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  const books = [
    { id: 1, title: 'Adventure', color: 'from-blue-400 to-blue-600', delay: 0.1, x: '10%', y: '20%' },
    { id: 2, title: 'Magic', color: 'from-purple-400 to-purple-600', delay: 0.2, x: '80%', y: '15%' },
    { id: 3, title: 'Wonder', color: 'from-amber-400 to-amber-600', delay: 0.3, x: '15%', y: '70%' },
    { id: 4, title: 'Dream', color: 'from-pink-400 to-pink-600', delay: 0.4, x: '75%', y: '65%' },
    { id: 5, title: 'Journey', color: 'from-green-400 to-green-600', delay: 0.5, x: '45%', y: '10%' },
    { id: 6, title: 'Story', color: 'from-indigo-400 to-indigo-600', delay: 0.6, x: '50%', y: '80%' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 md:px-8 py-20 pt-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFEBE2] via-ever-ivory to-[#FFF5F0]" />
      
      <div className="absolute inset-0 opacity-30">
        {books.map((book) => (
          <motion.div
            key={book.id}
            initial={{ opacity: 0, scale: 0, rotate: -20 }}
            animate={{
              opacity: [0.3, 0.5, 0.3],
              scale: [1, 1.1, 1],
              rotate: [-20, -15, -20],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              delay: book.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className={`absolute w-32 h-40 md:w-40 md:h-52 rounded-lg bg-gradient-to-br ${book.color} shadow-lg`}
            style={{
              left: book.x,
              top: book.y,
              transform: 'perspective(1000px) rotateY(-15deg)',
            }}
          >
            <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30" />
            <div className="absolute bottom-2 left-2 right-2 text-white text-xs font-semibold text-center opacity-80">
              {book.title}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 bottom-0 w-px border-l-2 border-dashed border-ever-navy/10" />
        <div className="absolute right-0 top-0 bottom-0 w-px border-r-2 border-dashed border-ever-navy/10" />
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: [0, 0.3, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 3,
              delay: i * 0.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute w-1 h-1 bg-ever-navy/20 rounded-full"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 30}%`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-5xl mx-auto w-full z-10">
        <div className="text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-ever-sage/20 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-ever-sage" />
              <span className="text-sm text-ever-sage font-medium">원서 영어 리딩 전문 공부방</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-semibold text-ever-navy leading-tight"
            >
              Ever English
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl md:text-3xl text-ever-navy/80 font-display italic"
            >
              원서를 이해하는 힘을 기릅니다
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="space-y-4 pt-6 max-w-3xl mx-auto"
          >
            <p className="text-lg md:text-xl text-ever-navy/80 leading-relaxed">
              원서를 <span className="font-semibold text-ever-navy">'풀어내는 기술'</span>이 아니라,<br />
              <span className="font-semibold text-ever-sage">'이해하는 힘'</span>을 기릅니다.
            </p>
            <p className="text-base text-ever-navy/70 leading-relaxed">
              단순 해석·문제풀이 중심 수업이 아닌,<br />
              맥락 이해 · 사고 확장 · 표현력 강화 중심 수업
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="pt-8"
          >
            <Button
              asChild
              size="lg"
              className="bg-ever-gold hover:bg-ever-gold/90 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105"
            >
              <Link href="/consultation" className="flex items-center">
                우리 아이에게 맞는지 상담해보기
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-wrap items-center justify-center gap-6 pt-8 text-sm text-ever-navy/60"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-ever-sage" />
              <span>소수 정예 수업</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-ever-sage" />
              <span>맞춤형 커리큘럼</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-ever-sage" />
              <span>원서 중심 학습</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HowWeTeachSection() {
  const steps = [
    {
      number: '01',
      title: '정확한 이해',
      subtitle: 'Comprehension',
      description: '문장 구조와 핵심 어휘를 맥락 속에서 이해합니다. 직독직해가 아닌 의미 단위 읽기 훈련을 통해 자연스러운 이해력을 기릅니다.',
      icon: BookOpen,
    },
    {
      number: '02',
      title: '사고 확장',
      subtitle: 'Thinking',
      description: '인물의 감정, 사건의 원인·결과를 분석합니다. Why / How 질문을 통한 논리적 사고 유도로 깊이 있는 읽기를 실현합니다.',
      icon: GraduationCap,
    },
    {
      number: '03',
      title: '표현 & 적용',
      subtitle: 'Output',
      description: '영어로 요약하기, 의견 말하기, 짧은 글쓰기를 통해 읽기 → 말하기 → 쓰기로 자연스럽게 연결합니다.',
      icon: MessageCircle,
    },
  ];

  return (
    <motion.section
      id="how-we-teach"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7 }}
      className="py-20 px-4 md:px-8 bg-white scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-ever-navy mb-4">
            지도 방식
          </h2>
          <p className="text-lg text-ever-navy/70 max-w-2xl mx-auto">
            단순 해석·문제풀이 중심 수업이 아닌,<br />
            맥락 이해 · 사고 확장 · 표현력 강화 중심 수업
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
            >
              <Card className="border-ever-sage/20 bg-ever-ivory/50 h-full rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl font-display text-ever-sage/40 font-bold">
                      {step.number}
                    </span>
                    <step.icon className="w-8 h-8 text-ever-sage" />
                  </div>
                  <CardTitle className="text-xl text-ever-navy mb-2">
                    {step.title}
                  </CardTitle>
                  <CardDescription className="text-ever-sage font-medium">
                    {step.subtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-ever-navy/70 leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="bg-ever-sage/10 rounded-2xl p-8"
          >
            <h3 className="text-xl font-semibold text-ever-navy mb-4">
              수준별 맞춤 원서 커리큘럼
            </h3>
            <p className="text-ever-navy/80 leading-relaxed mb-4">
              <span className="font-semibold">레벨 테스트 후 개별 원서 선정</span>
              <br />
              AR 지수·어휘 난이도·주제 성숙도까지 종합 고려
            </p>
            <p className="text-ever-sage font-medium italic">
              "같은 학년이어도 같은 책을 읽지 않습니다."
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="bg-ever-gold/5 rounded-2xl p-8 border border-ever-gold/20"
          >
            <h3 className="text-xl font-semibold text-ever-navy mb-4">
              소수 정예 집중 수업
            </h3>
            <p className="text-ever-navy/80 leading-relaxed">
              소규모 그룹 또는 개인 맞춤 지도로<br />
              아이의 이해 속도에 맞춘 피드백을 제공합니다.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 1 }}
          className="text-center pt-8"
        >
          <Button
            asChild
            size="lg"
            className="bg-ever-gold hover:bg-ever-gold/90 text-white px-8 py-6 text-lg rounded-full shadow-sm hover:shadow-md transition-all duration-300"
          >
            <Link href="/consultation">
              수업 방식 상담받기
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}

function InstructorSection() {
  const differences = [
    { wrong: '진도 위주의 수업', right: '이해도 중심 수업' },
    { wrong: '암기식 어휘 테스트', right: '문맥 속 어휘 습득' },
    { wrong: '결과만 보는 학습', right: '과정까지 공유하는 학습' },
  ];

  const promises = [
    '아이의 학습 상태를 정직하게 피드백합니다',
    '무리한 레벨 업을 권하지 않습니다',
    '아이가 영어를 싫어하지 않도록 최우선으로 지도합니다',
  ];

  return (
    <motion.section
      id="instructor"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7 }}
      className="py-20 px-4 md:px-8 bg-ever-ivory scroll-mt-20"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-ever-navy mb-4">
            강사 소개
          </h2>
          <p className="text-lg text-ever-navy/70">
            아이의 영어 실력을 '관리'가 아닌 '성장'으로 이끄는<br />
            원서 리딩 전문 강사
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex justify-center mb-12"
        >
          <div className="relative group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative w-64 h-64 md:w-80 md:h-80 rounded-3xl overflow-hidden shadow-xl border-4 border-white"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-ever-sage/20 to-ever-gold/20 z-10" />
              <Image
                src="/프로필.png"
                alt="Ever English 강사"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 256px, 320px"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-2xl p-4 shadow-lg border border-ever-sage/20 min-w-[200px]"
            >
              <p className="text-sm font-semibold text-ever-navy mb-1 text-center">원서 리딩 전문 강사</p>
              <p className="text-xs text-ever-navy/70 text-center">다년간의 교육 경험</p>
            </motion.div>
          </div>
        </motion.div>

        <div className="space-y-12">
          <Card className="border-ever-sage/20 bg-white rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-ever-navy mb-4">
                교육 철학
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-ever-navy/80 leading-relaxed mb-4">
                영어 실력은 문제를 많이 풀어서가 아니라,<br />
                제대로 읽고 깊이 생각할 때 자랍니다.
              </p>
              <p className="text-ever-navy/70 leading-relaxed">
                아이 한 명, 한 명의 이해 방식과 성향을 존중하며<br />
                '지금 실력'이 아닌 앞으로의 가능성을 보고 지도합니다.
              </p>
            </CardContent>
          </Card>

          <Card className="border-ever-sage/20 bg-white rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-ever-navy mb-4">
                지도 경험 & 전문성
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-ever-sage mt-0.5 flex-shrink-0" />
                  <span className="text-ever-navy/80 leading-relaxed">
                    원서 영어 리딩 지도 다년간의 교육 경험
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-ever-sage mt-0.5 flex-shrink-0" />
                  <span className="text-ever-navy/80 leading-relaxed">
                    초등 고학년 ~ 중등 수준까지 단계별 지도 노하우
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-ever-sage mt-0.5 flex-shrink-0" />
                  <span className="text-ever-navy/80 leading-relaxed">
                    단기 성적보다 중·장기 영어 실력 기반 구축에 집중
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-ever-sage/20 bg-white rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-ever-navy mb-6">
                Ever English가 다른 이유
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {differences.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <span className="text-red-400/60 text-lg">❌</span>
                    <span className="text-ever-navy/60 flex-1">{item.wrong}</span>
                    <ArrowRight className="w-5 h-5 text-ever-sage" />
                    <span className="text-ever-sage font-medium flex-1">⭕ {item.right}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-ever-gold/30 bg-ever-gold/5 rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-ever-navy mb-4">
                학부모님께 드리는 약속
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {promises.map((promise, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-ever-sage mt-0.5 flex-shrink-0" />
                    <span className="text-ever-navy/80 leading-relaxed">{promise}</span>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-center pt-8"
        >
          <Button
            asChild
            size="lg"
            className="bg-ever-gold hover:bg-ever-gold/90 text-white px-8 py-6 text-lg rounded-full shadow-sm hover:shadow-md transition-all duration-300"
          >
            <Link href="/consultation">
              우리 아이 원서 레벨 알아보기
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}

function FAQSection() {
  const faqs = [
    {
      question: '영어를 잘 못해도 원서 수업이 가능한가요?',
      answer: '네, 가능합니다. Ever English는 원서 수준을 아이에게 맞추는 수업입니다. 처음부터 어려운 책을 사용하지 않으며, 단계적으로 접근합니다.',
    },
    {
      question: '문법 수업은 따로 하지 않나요?',
      answer: '문법은 원서 속에서 자연스럽게 지도합니다. 필요한 문법은 읽기 과정에서 반복 노출·이해시키며, 문제풀이식 문법 수업은 지양합니다.',
    },
    {
      question: '학교 영어·내신에도 도움이 되나요?',
      answer: '도움이 됩니다. 독해 속도 향상, 긴 지문에 대한 거부감 감소, 서술형·서평형 문제 대응력 강화 등의 효과가 있습니다. 단, 내신 대비 학원이 아닌 "기본기 강화 수업"임을 분명히 안내드립니다.',
    },
    {
      question: '숙제와 과제는 얼마나 있나요?',
      answer: '과도한 숙제는 지양합니다. 꼭 필요한 복습만 제공하며, 아이의 생활 리듬을 해치지 않는 선에서 읽기 습관을 만드는 과제만 제공합니다.',
    },
    {
      question: '상담은 어떻게 진행되나요?',
      answer: '1️⃣ 간단한 사전 상담 → 2️⃣ 레벨 확인 → 3️⃣ 아이에게 맞는 수업 방향 제안 순서로 진행됩니다. 상담만으로도 아이의 영어 방향이 정리되었다는 말씀을 많이 듣습니다.',
    },
  ];

  return (
    <motion.section
      id="faq"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7 }}
      className="py-20 px-4 md:px-8 bg-white scroll-mt-20"
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-ever-navy mb-4">
            자주 묻는 질문
          </h2>
        </motion.div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <AccordionItem
                value={`item-${index}`}
                className="border-ever-sage/20 rounded-xl px-6 bg-ever-ivory/30"
              >
                <AccordionTrigger className="text-left text-ever-navy font-medium hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-ever-navy/70 leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-center pt-12"
        >
          <Button
            asChild
            size="lg"
            className="bg-ever-gold hover:bg-ever-gold/90 text-white px-8 py-6 text-lg rounded-full shadow-sm hover:shadow-md transition-all duration-300"
          >
            <Link href="/consultation">
              1:1 상담 신청하기
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}

function CTASection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7 }}
      id="cta-section"
      className="py-20 px-4 md:px-8 bg-ever-navy text-ever-ivory"
    >
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">
            지금 필요한 건, 더 많은 문제집이 아니라
            <br />
            아이에게 맞는 '읽기 방향'일지도 모릅니다.
          </h2>
          <p className="text-lg text-ever-ivory/90 leading-relaxed">
            Ever English에서 차분하게 함께 찾아보세요.
          </p>
          <div className="pt-6">
            <Button
              asChild
              size="lg"
              className="bg-ever-gold hover:bg-ever-gold/90 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link href="/consultation">
                1:1 상담 문의하기
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

function Footer() {
  return (
    <footer className="bg-ever-navy text-ever-ivory py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Ever English</h3>
            <p className="text-ever-ivory/80 leading-relaxed text-sm">
              원서를 이해하는 힘을 기르는<br />
              영어 리딩 전문 공부방
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">공부방 정보</h3>
            <div className="space-y-3 text-sm text-ever-ivory/80">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <div>
                  <p className="leading-relaxed">
                    경기도 김포시 마산동
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href="mailto:info@everenglish.com" className="hover:text-ever-sage transition-colors">
                  info@everenglish.com
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">약관 및 정책</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-ever-ivory/80 hover:text-ever-sage transition-colors">
                  개인정보 처리방침
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-ever-ivory/80 hover:text-ever-sage transition-colors">
                  이용약관
                </Link>
              </li>
              <li>
                <Link href="/consultation" className="text-ever-ivory/80 hover:text-ever-sage transition-colors">
                  1:1 상담 신청
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-ever-ivory/20 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-ever-ivory/60">
            <p>© 2024 Ever English. All rights reserved.</p>
            <p>사업자등록번호: 123-45-67890 | 대표자: 홍길동</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
