'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Award,
  Star,
  CheckCircle2,
  ArrowLeft,
  CreditCard,
  Building2,
  ChevronRight,
  MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DigitalSongket } from '@/components/ui/digital-songket';
import { generateWhatsAppUrl } from '@/components/ui/floating-whatsapp';
import { COURSES, TRAINERS, REVIEWS } from '@/lib/mockData';
import { formatPrice, formatDate, getSeatsStatus, cn } from '@/lib/utils';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProgramDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [isHrdCorp, setIsHrdCorp] = useState(false);
  
  const course = COURSES.find(c => c.id === id);
  
  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-50 mb-4">Program Not Found</h1>
          <Button asChild>
            <Link href="/programs">Browse Programs</Link>
          </Button>
        </div>
      </div>
    );
  }

  const trainer = TRAINERS[0]; // Mock - assign first trainer
  const courseReviews = REVIEWS.filter(r => r.course_id === course.id);
  const seatsStatus = getSeatsStatus(course.seats_left);

  return (
    <div className="relative min-h-screen">
      <DigitalSongket opacity={0.02} color="#6366f1" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link 
            href="/programs"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Programs
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="secondary">{course.category}</Badge>
                <Badge variant="gold">
                  <Award className="h-3 w-3" />
                  HRD Corp Registered
                </Badge>
                <Badge 
                  variant={seatsStatus.variant === 'urgent' ? 'urgent' : 'warning'}
                  pulse={seatsStatus.variant === 'urgent'}
                >
                  {seatsStatus.label}
                </Badge>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-slate-50">
                {course.title}
              </h1>

              <p className="text-lg text-slate-400 leading-relaxed">
                {course.description}
              </p>

              {/* Quick Meta */}
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-2 text-slate-300">
                  <Calendar className="h-5 w-5 text-indigo-400" />
                  <span>{formatDate(course.next_date)}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <MapPin className="h-5 w-5 text-indigo-400" />
                  <span>{course.location}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Clock className="h-5 w-5 text-indigo-400" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Users className="h-5 w-5 text-indigo-400" />
                  <span>{course.level}</span>
                </div>
              </div>
            </motion.div>

            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="w-full justify-start overflow-x-auto">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                  <TabsTrigger value="trainer">Trainer</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div className="glass rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-slate-50 mb-4">
                      What You&apos;ll Learn
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {course.curriculum.slice(0, 6).map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="text-slate-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="glass rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-slate-50 mb-4">
                      Who Should Attend
                    </h3>
                    <ul className="space-y-3 text-slate-300">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
                        Senior managers and directors seeking to upskill
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
                        Professionals transitioning into new roles
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
                        Team leaders responsible for strategic initiatives
                      </li>
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="curriculum" className="space-y-4">
                  <div className="glass rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-slate-50 mb-6">
                      Course Curriculum
                    </h3>
                    <div className="space-y-4">
                      {course.curriculum.map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50"
                        >
                          <div className="h-8 w-8 rounded-full bg-indigo-600/20 text-indigo-400 flex items-center justify-center text-sm font-semibold">
                            {i + 1}
                          </div>
                          <span className="text-slate-200">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="trainer" className="space-y-4">
                  <div className="glass rounded-2xl p-6">
                    <div className="flex flex-col sm:flex-row gap-6">
                      <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-amber-500 flex items-center justify-center text-white text-3xl font-bold shrink-0">
                        {trainer.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-slate-50 mb-1">
                          {trainer.name}
                        </h3>
                        <p className="text-indigo-400 mb-4">{trainer.role}</p>
                        <p className="text-slate-400 leading-relaxed mb-4">
                          {trainer.bio}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {trainer.expertise.map((skill) => (
                            <Badge key={skill} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="space-y-4">
                  {courseReviews.length > 0 ? (
                    courseReviews.map((review) => (
                      <div key={review.id} className="glass rounded-2xl p-6">
                        <div className="flex items-center gap-1 mb-3">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-amber-400 fill-current" />
                          ))}
                        </div>
                        <p className="text-slate-300 mb-4 leading-relaxed">
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
                      </div>
                    ))
                  ) : (
                    <div className="glass rounded-2xl p-6 text-center">
                      <p className="text-slate-400">No reviews yet for this program.</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>

          {/* Sticky Booking Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="sticky top-28"
            >
              <div className="glass rounded-2xl p-6 space-y-6">
                {/* Price */}
                <div>
                  <div className="text-sm text-slate-400 mb-1">Course Fee</div>
                  <div className="text-4xl font-bold text-slate-50">
                    {formatPrice(course.price)}
                  </div>
                  {course.is_hrd_claimable && (
                    <div className="flex items-center gap-2 mt-2">
                      <Award className="h-4 w-4 text-emerald-400" />
                      <span className="text-sm text-emerald-400">100% HRD Corp Claimable</span>
                    </div>
                  )}
                </div>

                {/* Payment Toggle */}
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Building2 className={cn(
                        "h-5 w-5 transition-colors",
                        isHrdCorp ? "text-amber-400" : "text-slate-500"
                      )} />
                      <div>
                        <Label 
                          htmlFor="hrd-toggle" 
                          className="cursor-pointer font-medium text-slate-200"
                        >
                          Corporate Grant
                        </Label>
                        <p className="text-xs text-slate-400">HRD Corp Levy</p>
                      </div>
                    </div>
                    <Switch
                      id="hrd-toggle"
                      checked={isHrdCorp}
                      onCheckedChange={setIsHrdCorp}
                    />
                  </div>
                </div>

                {/* Payment Methods (only show when not HRD) */}
                {!isHrdCorp && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-3 text-slate-400"
                  >
                    <CreditCard className="h-5 w-5" />
                    <span className="text-sm">Visa, Mastercard, FPX</span>
                  </motion.div>
                )}

                {/* CTA Button */}
                <Button 
                  size="lg" 
                  variant={isHrdCorp ? "gold" : "default"}
                  className="w-full"
                  onClick={() => router.push(`/book/${course.id}?hrd=${isHrdCorp}`)}
                >
                  {isHrdCorp ? 'Request Proforma Invoice' : 'Book Now'}
                  <ChevronRight className="h-4 w-4" />
                </Button>

                {/* WhatsApp Inquiry - Malaysian-First */}
                <a
                  href={generateWhatsAppUrl({
                    programName: course.title,
                    message: `Hi Flux! 👋\n\nI'm interested in the *${course.title}* programme.\n\n📅 Next session: ${formatDate(course.next_date)}\n💰 Fee: ${formatPrice(course.price)}\n\nCould you share:\n• The detailed brochure\n• Corporate group discounts\n${course.is_hrd_claimable ? '• HRD Corp claim process' : ''}\n\nTerima kasih!`
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all duration-200 group"
                >
                  <MessageCircle className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">WhatsApp Inquiry</span>
                </a>

                {/* Next Session */}
                <div className="pt-4 border-t border-slate-700/50">
                  <div className="text-sm text-slate-400 mb-2">Next Available Session</div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-indigo-400" />
                    <div>
                      <div className="font-medium text-slate-200">
                        {formatDate(course.next_date)}
                      </div>
                      <div className="text-sm text-slate-400">{course.location}</div>
                    </div>
                  </div>
                </div>

                {/* Contact */}
                <div className="text-center text-sm text-slate-400">
                  Need help?{' '}
                  <a 
                    href={generateWhatsAppUrl({ programName: course.title })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 cursor-pointer"
                  >
                    Chat with us on WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
