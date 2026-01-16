'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Download, Calendar, Mail, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DigitalSongketGold } from '@/components/ui/digital-songket';
import { generateWhatsAppUrl } from '@/components/ui/floating-whatsapp';
import confetti from 'canvas-confetti';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const programName = searchParams.get('program') || 'your selected program';
  const userName = searchParams.get('name') || '';
  const companyName = searchParams.get('company') || '';
  
  const [showWhatsAppPrompt, setShowWhatsAppPrompt] = useState(false);
  const bookingRef = `NSK-2026-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;

  useEffect(() => {
    // Trigger confetti on mount
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        particleCount,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: randomInRange(0.1, 0.9),
          y: Math.random() - 0.2,
        },
        colors: ['#4f46e5', '#eab308', '#22c55e'],
      });
    }, 250);

    // Show WhatsApp prompt after confetti
    const whatsappTimer = setTimeout(() => {
      setShowWhatsAppPrompt(true);
    }, 3500);

    return () => {
      clearInterval(interval);
      clearTimeout(whatsappTimer);
    };
  }, []);

  const handleWhatsAppConnect = () => {
    const message = `Hi Flux! 👋

I just completed my booking (Ref: ${bookingRef}) for "${programName}".

${userName ? `Name: ${userName}` : ''}
${companyName ? `Company: ${companyName}` : ''}

Looking forward to the training! Can you confirm my registration?`;

    const url = generateWhatsAppUrl({ message });
    window.open(url, '_blank');
  };

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center">
      <DigitalSongketGold opacity={0.06} />
      
      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.2 
          }}
          className="mb-8"
        >
          <div className="relative inline-flex">
            <div className="absolute -inset-4 bg-emerald-500/20 rounded-full blur-xl animate-pulse" />
            <div className="relative h-24 w-24 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <CheckCircle2 className="h-12 w-12 text-emerald-400" />
            </div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-3xl sm:text-4xl font-bold text-slate-50 mb-4"
        >
          Booking Confirmed!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-lg text-slate-400 mb-8 max-w-md mx-auto"
        >
          Thank you for your registration. We&apos;ve sent a confirmation email with all the details.
        </motion.p>

        {/* WhatsApp Connect Card - Appears after confetti */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={showWhatsAppPrompt ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className={`mb-8 ${!showWhatsAppPrompt ? 'hidden' : ''}`}
        >
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#25D366] to-[#128C7E] p-1">
            <div className="absolute inset-0 bg-[url('/whatsapp-pattern.png')] opacity-10" />
            <div className="relative bg-slate-900/95 backdrop-blur rounded-xl p-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-[#25D366] flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-white font-semibold">Connect on WhatsApp</p>
                  <p className="text-emerald-300 text-sm">Get instant updates & support</p>
                </div>
              </div>
              
              <p className="text-slate-300 text-sm mb-4">
                💬 Chat with us directly for faster responses, course materials, and exclusive updates!
              </p>

              <Button 
                onClick={handleWhatsAppConnect}
                className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white gap-2"
                size="lg"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Continue on WhatsApp
              </Button>

              <p className="text-xs text-slate-500 mt-3">
                We typically respond within 5 minutes during business hours
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass rounded-2xl p-6 mb-8 text-left"
        >
          <h2 className="font-semibold text-slate-50 mb-4">What&apos;s Next?</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="h-8 w-8 rounded-full bg-[#25D366]/20 flex items-center justify-center shrink-0">
                <MessageCircle className="h-4 w-4 text-[#25D366]" />
              </div>
              <div>
                <p className="text-slate-200 font-medium">WhatsApp Confirmation</p>
                <p className="text-sm text-slate-400">
                  Connect on WhatsApp for instant confirmation and direct communication with our team.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="h-8 w-8 rounded-full bg-indigo-600/20 flex items-center justify-center shrink-0">
                <Mail className="h-4 w-4 text-indigo-400" />
              </div>
              <div>
                <p className="text-slate-200 font-medium">Check Your Email</p>
                <p className="text-sm text-slate-400">
                  You&apos;ll receive a confirmation email with your booking details and invoice.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="h-8 w-8 rounded-full bg-indigo-600/20 flex items-center justify-center shrink-0">
                <Calendar className="h-4 w-4 text-indigo-400" />
              </div>
              <div>
                <p className="text-slate-200 font-medium">Add to Calendar</p>
                <p className="text-sm text-slate-400">
                  Save the date! We&apos;ll send reminders closer to the training date.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="h-8 w-8 rounded-full bg-amber-600/20 flex items-center justify-center shrink-0">
                <Download className="h-4 w-4 text-amber-400" />
              </div>
              <div>
                <p className="text-slate-200 font-medium">Download Pre-Course Materials</p>
                <p className="text-sm text-slate-400">
                  Access your pre-course reading materials 7 days before the program.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Button size="lg" asChild>
            <Link href="/programs">
              Browse More Programs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/">
              Back to Home
            </Link>
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-sm text-slate-500"
        >
          Booking Reference: <span className="text-slate-400 font-mono">{bookingRef}</span>
        </motion.p>
      </div>
    </div>
  );
}

// WhatsApp Icon SVG Component
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
