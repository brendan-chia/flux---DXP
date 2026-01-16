'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Calendar, 
  Star, 
  Users, 
  Award,
  TrendingUp,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { BentoCard, BentoGrid } from '@/components/ui/bento-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DigitalSongket, DigitalSongketGold } from '@/components/ui/digital-songket';
import { COURSES, STATS, REVIEWS } from '@/lib/mockData';
import { formatPrice, formatDate } from '@/lib/utils';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export default function HomePage() {
  const featuredCourse = COURSES.find(c => c.id === 'esg-reporting-workshop')!;
  const upcomingCourses = COURSES.slice(0, 4);

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <DigitalSongketGold className="z-0" />
        
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950 z-10" />
        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-indigo-600/10 to-transparent z-10" />
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl"
          >
            <motion.div variants={itemVariants}>
              <Badge variant="gold" className="mb-6">
                <Award className="h-3 w-3" />
                HRD Corp Registered Provider
              </Badge>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6"
            >
              <span className="text-slate-50">Future-Ready Skills</span>
              <br />
              <span className="text-gradient">for Malaysia</span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-lg sm:text-xl text-slate-400 max-w-2xl mb-8 leading-relaxed"
            >
              Transform your workforce with industry-leading corporate training programs. 
              From ESG compliance to AI integration—equip your team for tomorrow&apos;s challenges.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <Button size="xl" asChild>
                <Link href="/programs">
                  Explore Programs
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="xl">
                <Calendar className="h-5 w-5" />
                Download 2026 Calendar
              </Button>
            </motion.div>

            {/* Stats Row */}
            <motion.div 
              variants={itemVariants}
              className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6"
            >
              {STATS.map((stat) => (
                <div key={stat.label} className="text-center sm:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-slate-50">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Bento Grid Showcase */}
      <section className="relative py-20 overflow-hidden">
        <DigitalSongket opacity={0.03} color="#6366f1" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-50 mb-4">
              Featured Programs
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Discover our most in-demand corporate training programs, 
              designed for Malaysian business leaders.
            </p>
          </motion.div>

          <BentoGrid className="auto-rows-[200px] md:auto-rows-[280px]">
            {/* Featured Course - Large Tile */}
            <BentoCard 
              className="col-span-12 md:col-span-8 row-span-2 p-6 md:p-8 group"
              delay={0.1}
            >
              <div className="h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <Badge variant="urgent" pulse>
                      {featuredCourse.seats_left} Seats Left
                    </Badge>
                    <Badge variant="gold">
                      <Star className="h-3 w-3 fill-current" />
                      Featured
                    </Badge>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-50 mb-3 group-hover:text-indigo-300 transition-colors">
                    {featuredCourse.title}
                  </h3>
                  
                  <p className="text-slate-400 mb-4 line-clamp-3">
                    {featuredCourse.description}
                  </p>

                  <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                    <span className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-indigo-400" />
                      {formatDate(featuredCourse.next_date)}
                    </span>
                    <span className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-indigo-400" />
                      {featuredCourse.duration}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-6">
                  <div>
                    <span className="text-3xl font-bold text-slate-50">
                      {formatPrice(featuredCourse.price)}
                    </span>
                    {featuredCourse.is_hrd_claimable && (
                      <span className="ml-2 text-sm text-emerald-400">HRD Claimable</span>
                    )}
                  </div>
                  <Button asChild className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href={`/programs/${featuredCourse.id}`}>
                      View Details
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </BentoCard>

            {/* HRD Corp Badge - Tall Tile */}
            <BentoCard 
              className="col-span-12 md:col-span-4 row-span-1 p-6"
              delay={0.2}
              hoverScale={false}
            >
              <div className="h-full flex flex-col justify-center items-center text-center">
                <div className="mb-4 relative">
                  <div className="absolute -inset-4 bg-amber-500/20 rounded-full blur-xl" />
                  <Award className="relative h-12 w-12 text-amber-400" />
                </div>
                <h4 className="text-lg font-semibold text-slate-50 mb-2">
                  HRD Corp Registered
                </h4>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-amber-400 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-slate-400 mt-2">4.9 Average Rating</p>
              </div>
            </BentoCard>

            {/* Upcoming Intake - Wide Tile */}
            <BentoCard 
              className="col-span-12 md:col-span-4 row-span-1 p-6 overflow-hidden"
              delay={0.3}
              hoverScale={false}
            >
              <div className="h-full flex flex-col justify-center">
                <h4 className="text-sm font-medium text-slate-400 mb-3">
                  Upcoming Intake
                </h4>
                <div className="relative overflow-hidden">
                  <div className="animate-marquee whitespace-nowrap flex gap-8">
                    {upcomingCourses.concat(upcomingCourses).map((course, i) => (
                      <span 
                        key={`${course.id}-${i}`}
                        className="text-lg font-semibold text-slate-200"
                      >
                        {course.title} • {formatDate(course.next_date)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </BentoCard>

            {/* Quick Stats Cards */}
            <BentoCard 
              className="col-span-6 md:col-span-4 p-6"
              delay={0.4}
            >
              <div className="h-full flex flex-col justify-center">
                <TrendingUp className="h-8 w-8 text-emerald-400 mb-3" />
                <div className="text-3xl font-bold text-slate-50">98%</div>
                <p className="text-sm text-slate-400">Completion Rate</p>
              </div>
            </BentoCard>

            <BentoCard 
              className="col-span-6 md:col-span-4 p-6"
              delay={0.5}
            >
              <div className="h-full flex flex-col justify-center">
                <Users className="h-8 w-8 text-indigo-400 mb-3" />
                <div className="text-3xl font-bold text-slate-50">12,000+</div>
                <p className="text-sm text-slate-400">Professionals Trained</p>
              </div>
            </BentoCard>

            <BentoCard 
              className="col-span-12 md:col-span-4 p-6"
              delay={0.6}
            >
              <div className="h-full flex flex-col justify-center">
                <CheckCircle2 className="h-8 w-8 text-amber-400 mb-3" />
                <div className="text-3xl font-bold text-slate-50">45+</div>
                <p className="text-sm text-slate-400">HRD Corp Approved Programs</p>
              </div>
            </BentoCard>
          </BentoGrid>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950" />
        <DigitalSongket opacity={0.02} color="#eab308" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-50 mb-4">
              Trusted by Malaysia&apos;s Leading Companies
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Hear from corporate leaders who have transformed their teams with our programs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.slice(0, 3).map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass rounded-2xl p-6 cursor-pointer hover:border-indigo-500/30 transition-colors"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-amber-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  &ldquo;{review.content}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-amber-500 flex items-center justify-center text-white font-semibold">
                    {review.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-slate-50">{review.author}</div>
                    <div className="text-sm text-slate-400">
                      {review.role}, {review.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-amber-600/20" />
        <DigitalSongketGold opacity={0.06} />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-50 mb-4">
              Ready to Transform Your Team?
            </h2>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
              Join 250+ Malaysian corporations who trust Flux 
              for their professional development needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="xl" variant="gold" asChild>
                <Link href="/programs">
                  Browse All Programs
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="xl" variant="outline">
                Request Corporate Quote
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
