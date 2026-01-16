'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  User,
  Building2,
  FileText,
  Check,
  Loader2,
  Calendar,
  MapPin,
  Award,
  MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { DigitalSongket } from '@/components/ui/digital-songket';
import { generateWhatsAppUrl } from '@/components/ui/floating-whatsapp';
import { COURSES } from '@/lib/mockData';
import { formatPrice, formatDate, cn } from '@/lib/utils';

interface PageProps {
  params: Promise<{ id: string }>;
}

const steps = [
  { id: 1, label: 'Contact Info', icon: User },
  { id: 2, label: 'Company Details', icon: Building2 },
  { id: 3, label: 'Review', icon: FileText },
];

export default function BookingPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const isHrd = searchParams.get('hrd') === 'true';
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isCompany, setIsCompany] = useState(isHrd);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    companyReg: '',
    lhdnTin: '',
    designation: '',
    department: '',
    specialRequests: '',
  });

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

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    // Pass booking details to success page for WhatsApp integration
    const params = new URLSearchParams({
      program: course.title,
      name: formData.fullName,
      company: isCompany ? formData.companyName : '',
      isHrd: isHrd ? 'true' : 'false',
    });
    router.push(`/success?${params.toString()}`);
  };

  return (
    <div className="relative min-h-screen">
      <DigitalSongket opacity={0.02} color="#6366f1" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link 
            href={`/programs/${course.id}`}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Program
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-2xl p-6 sm:p-8"
            >
              {/* Progress Steps */}
              <div className="flex items-center justify-between mb-8">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div className={cn(
                      "flex items-center gap-2",
                      currentStep >= step.id ? "text-indigo-400" : "text-slate-500"
                    )}>
                      <div className={cn(
                        "h-10 w-10 rounded-full flex items-center justify-center border-2 transition-colors",
                        currentStep > step.id 
                          ? "bg-indigo-600 border-indigo-600 text-white"
                          : currentStep === step.id
                          ? "border-indigo-500 text-indigo-400"
                          : "border-slate-600 text-slate-500"
                      )}>
                        {currentStep > step.id ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          <step.icon className="h-5 w-5" />
                        )}
                      </div>
                      <span className="hidden sm:inline text-sm font-medium">
                        {step.label}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={cn(
                        "h-0.5 w-8 sm:w-16 mx-2",
                        currentStep > step.id ? "bg-indigo-500" : "bg-slate-700"
                      )} />
                    )}
                  </div>
                ))}
              </div>

              {/* Step Content */}
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="text-xl font-semibold text-slate-50">
                      Contact Information
                    </h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          placeholder="Enter your full name"
                          value={formData.fullName}
                          onChange={(e) => updateFormData('fullName', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@company.com"
                          value={formData.email}
                          onChange={(e) => updateFormData('email', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+60 12-345 6789"
                          value={formData.phone}
                          onChange={(e) => updateFormData('phone', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="designation">Designation</Label>
                        <Input
                          id="designation"
                          placeholder="e.g. Senior Manager"
                          value={formData.designation}
                          onChange={(e) => updateFormData('designation', e.target.value)}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="text-xl font-semibold text-slate-50">
                      Company Details
                    </h2>

                    {/* Company Toggle */}
                    <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                      <div className="flex items-center gap-3">
                        <Building2 className={cn(
                          "h-5 w-5 transition-colors",
                          isCompany ? "text-indigo-400" : "text-slate-500"
                        )} />
                        <div>
                          <Label htmlFor="company-toggle" className="cursor-pointer font-medium text-slate-200">
                            Corporate Registration
                          </Label>
                          <p className="text-xs text-slate-400">For HRD Corp claims & corporate invoicing</p>
                        </div>
                      </div>
                      <Switch
                        id="company-toggle"
                        checked={isCompany}
                        onCheckedChange={setIsCompany}
                      />
                    </div>

                    {isCompany && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                      >
                        <div className="space-y-2">
                          <Label htmlFor="companyName">Company Name *</Label>
                          <Input
                            id="companyName"
                            placeholder="Sdn. Bhd. / Bhd."
                            value={formData.companyName}
                            onChange={(e) => updateFormData('companyName', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="companyReg">SSM Registration No. *</Label>
                          <Input
                            id="companyReg"
                            placeholder="1234567-U"
                            value={formData.companyReg}
                            onChange={(e) => updateFormData('companyReg', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor="lhdnTin">LHDN TIN Number *</Label>
                          <Input
                            id="lhdnTin"
                            placeholder="C1234567890"
                            value={formData.lhdnTin}
                            onChange={(e) => updateFormData('lhdnTin', e.target.value)}
                          />
                          <p className="text-xs text-slate-500">
                            Required for e-Invoice compliance effective August 2024
                          </p>
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor="department">Department</Label>
                          <Input
                            id="department"
                            placeholder="e.g. Human Resources, Finance"
                            value={formData.department}
                            onChange={(e) => updateFormData('department', e.target.value)}
                          />
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="text-xl font-semibold text-slate-50">
                      Review Your Booking
                    </h2>

                    {/* Contact Summary */}
                    <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                      <h3 className="text-sm font-medium text-slate-400 mb-3">Contact Information</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-slate-500">Name:</span>
                          <p className="text-slate-200">{formData.fullName || '-'}</p>
                        </div>
                        <div>
                          <span className="text-slate-500">Email:</span>
                          <p className="text-slate-200">{formData.email || '-'}</p>
                        </div>
                        <div>
                          <span className="text-slate-500">Phone:</span>
                          <p className="text-slate-200">{formData.phone || '-'}</p>
                        </div>
                        <div>
                          <span className="text-slate-500">Designation:</span>
                          <p className="text-slate-200">{formData.designation || '-'}</p>
                        </div>
                      </div>
                    </div>

                    {/* Company Summary */}
                    {isCompany && (
                      <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                        <h3 className="text-sm font-medium text-slate-400 mb-3">Company Details</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-slate-500">Company:</span>
                            <p className="text-slate-200">{formData.companyName || '-'}</p>
                          </div>
                          <div>
                            <span className="text-slate-500">SSM No.:</span>
                            <p className="text-slate-200">{formData.companyReg || '-'}</p>
                          </div>
                          <div>
                            <span className="text-slate-500">LHDN TIN:</span>
                            <p className="text-slate-200">{formData.lhdnTin || '-'}</p>
                          </div>
                          <div>
                            <span className="text-slate-500">Department:</span>
                            <p className="text-slate-200">{formData.department || '-'}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Special Requests */}
                    <div className="space-y-2">
                      <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
                      <textarea
                        id="specialRequests"
                        rows={3}
                        placeholder="Any dietary requirements, accessibility needs, or other requests..."
                        className={cn(
                          'flex w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3',
                          'text-sm text-slate-100 placeholder:text-slate-500',
                          'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent',
                          'resize-none'
                        )}
                        value={formData.specialRequests}
                        onChange={(e) => updateFormData('specialRequests', e.target.value)}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-slate-700/50">
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                >
                  Back
                </Button>
                
                {currentStep < 3 ? (
                  <Button onClick={handleNext}>
                    Continue
                  </Button>
                ) : (
                  <Button 
                    variant="gold" 
                    onClick={handleSubmit}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      isHrd ? 'Request Proforma Invoice' : 'Complete Booking'
                    )}
                  </Button>
                )}
              </div>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="sticky top-28"
            >
              <div className="glass rounded-2xl p-6 space-y-4">
                <h3 className="font-semibold text-slate-50">Order Summary</h3>
                
                {/* Course Info */}
                <div className="space-y-3">
                  <h4 className="font-medium text-slate-200">{course.title}</h4>
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Calendar className="h-4 w-4 text-indigo-400" />
                    <span>{formatDate(course.next_date)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <MapPin className="h-4 w-4 text-indigo-400" />
                    <span>{course.location}</span>
                  </div>
                  {course.is_hrd_claimable && (
                    <Badge variant="gold" className="mt-2">
                      <Award className="h-3 w-3" />
                      HRD Corp Claimable
                    </Badge>
                  )}
                </div>

                <div className="border-t border-slate-700/50 pt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-400">Course Fee</span>
                    <span className="text-slate-200">{formatPrice(course.price)}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-400">SST (0%)</span>
                    <span className="text-slate-200">RM 0</span>
                  </div>
                </div>

                <div className="border-t border-slate-700/50 pt-4">
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-200">Total</span>
                    <span className="text-2xl font-bold text-slate-50">
                      {formatPrice(course.price)}
                    </span>
                  </div>
                </div>

                {/* WhatsApp Help */}
                <div className="pt-4 border-t border-slate-700/50">
                  <a
                    href={generateWhatsAppUrl({
                      programName: course.title,
                      message: `Hi! 👋 I have a question about my booking for the *${course.title}* programme.\n\nCould you help me with:`
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/40 transition-all duration-200 text-sm"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Need help? Chat with us</span>
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
