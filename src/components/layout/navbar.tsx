'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Menu, 
  X, 
  LayoutDashboard,
  BookOpen,
  Phone
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/programs', label: 'Programs' },
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
];

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-4 left-4 right-4 z-50"
    >
      <nav className={cn(
        'mx-auto max-w-7xl rounded-2xl',
        'bg-slate-900/80 backdrop-blur-xl',
        'border border-slate-700/50',
        'shadow-lg shadow-black/20'
      )}>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-amber-500 rounded-lg opacity-50 blur group-hover:opacity-75 transition-opacity" />
                <div className="relative bg-slate-900 rounded-lg p-2">
                  <GraduationCap className="h-6 w-6 text-indigo-400" />
                </div>
              </div>
              <div className="hidden sm:block">
                <span className="font-bold tracking-tight text-slate-900 dark:text-white">
                  Flux<span className="text-indigo-500">.</span>
                </span>
                <span className="block text-[10px] text-slate-500 -mt-1">
                  Corporate Training Excellence
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200 cursor-pointer',
                      isActive 
                        ? 'bg-indigo-600/20 text-indigo-300' 
                        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
                    )}
                  >
                    <span className="flex items-center gap-2">
                      {link.icon && <link.icon className="h-4 w-4" />}
                      {link.label}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Button variant="ghost" size="sm" className="gap-2">
                <Phone className="h-4 w-4" />
                <span className="hidden lg:inline">Contact</span>
              </Button>
              <Button variant="gold" size="sm" asChild>
                <Link href="/programs">
                  <BookOpen className="h-4 w-4" />
                  <span>Explore Programs</span>
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-slate-100 cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-700/50"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      'block px-4 py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer',
                      isActive 
                        ? 'bg-indigo-600/20 text-indigo-300' 
                        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
                    )}
                  >
                    <span className="flex items-center gap-2">
                      {link.icon && <link.icon className="h-4 w-4" />}
                      {link.label}
                    </span>
                  </Link>
                );
              })}
              <div className="pt-2 border-t border-slate-700/50">
                <Button variant="gold" className="w-full" asChild>
                  <Link href="/programs">
                    <BookOpen className="h-4 w-4" />
                    <span>Explore Programs</span>
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
}
