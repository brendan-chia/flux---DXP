'use client';

import Link from 'next/link';
import { 
  GraduationCap, 
  Linkedin, 
  Facebook, 
  Mail,
  MapPin,
  Phone
} from 'lucide-react';
import { DigitalSongket } from '@/components/ui/digital-songket';

const footerLinks = {
  programs: [
    { label: 'Leadership', href: '/programs?category=Leadership' },
    { label: 'Technology', href: '/programs?category=Technology' },
    { label: 'Finance', href: '/programs?category=Finance' },
    { label: 'Sustainability', href: '/programs?category=Sustainability' },
  ],
  company: [
    { label: 'About Us', href: '#' },
    { label: 'Our Trainers', href: '#' },
    { label: 'Corporate Training', href: '#' },
    { label: 'HRD Corp Info', href: '#' },
  ],
  resources: [
    { label: '2026 Calendar', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Case Studies', href: '#' },
    { label: 'FAQs', href: '#' },
  ],
};

export function Footer() {
  return (
    <footer className="relative bg-slate-950 border-t border-slate-800">
      <DigitalSongket opacity={0.03} color="#6366f1" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 cursor-pointer group mb-4">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-amber-500 rounded-lg opacity-50 blur group-hover:opacity-75 transition-opacity" />
                <div className="relative bg-slate-900 rounded-lg p-2">
                  <GraduationCap className="h-6 w-6 text-indigo-400" />
                </div>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-50">
                  Flux<span className="text-indigo-400">.</span>
                </span>
              </div>
            </Link>
            
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
              Empowering Malaysian corporations with future-ready skills since 2018. 
              HRD Corp Registered Training Provider.
            </p>

            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-indigo-400 shrink-0" />
                <span>Level 111, Menara City, Jalan Stesen Sentral , KL Sentral, 50470 Kuala Lumpur</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-indigo-400 shrink-0" />
                <span>+603 2288 8888</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-indigo-400 shrink-0" />
                <span>hello@flux.my</span>
              </div>
            </div>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-sm font-semibold text-slate-50 mb-4">Programs</h4>
            <ul className="space-y-3">
              {footerLinks.programs.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-indigo-400 transition-colors cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-slate-50 mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-indigo-400 transition-colors cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-slate-50 mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-indigo-400 transition-colors cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            © 2026 Flux Sdn. Bhd. (1234567-U). All rights reserved.
          </p>
          
          <div className="flex items-center gap-4">
            <a 
              href="#" 
              className="text-slate-500 hover:text-indigo-400 transition-colors cursor-pointer"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a 
              href="#" 
              className="text-slate-500 hover:text-indigo-400 transition-colors cursor-pointer"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a 
              href="#" 
              className="text-slate-500 hover:text-indigo-400 transition-colors cursor-pointer"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
