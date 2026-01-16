'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Users,
  FileText,
  TrendingUp,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Linkedin,
  Globe,
  Mail,
  MousePointerClick,
  Sparkles,
  PenSquare
} from 'lucide-react';
import { DigitalSongket } from '@/components/ui/digital-songket';
import { BentoCard, BentoGrid } from '@/components/ui/bento-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DASHBOARD_STATS } from '@/lib/mockData';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
  return (
    <div className="relative min-h-screen">
      <DigitalSongket opacity={0.02} color="#6366f1" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-50 mb-2">
                Analytics Dashboard
              </h1>
              <p className="text-slate-400">
                Overview of your training platform performance
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/admin/content">
                <Button variant="secondary" className="gap-2">
                  <PenSquare className="h-4 w-4" />
                  Content Hub
                </Button>
              </Link>
              <Link href="/admin/content/ai-assistant">
                <Button variant="outline" className="gap-2">
                  <Sparkles className="h-4 w-4 text-amber-400" />
                  AI Assistant
                </Button>
              </Link>
              <Badge variant="gold">Preview Mode</Badge>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <BentoGrid className="auto-rows-[140px] mb-8">
          <StatCard
            title="Total Leads"
            value={DASHBOARD_STATS.totalLeads.toLocaleString()}
            change={+12.5}
            icon={Users}
            color="indigo"
            delay={0.1}
            className="col-span-6 md:col-span-3"
          />
          <StatCard
            title="Proforma Generated"
            value={DASHBOARD_STATS.proformaGenerated.toLocaleString()}
            change={+8.2}
            icon={FileText}
            color="amber"
            delay={0.2}
            className="col-span-6 md:col-span-3"
          />
          <StatCard
            title="Conversion Rate"
            value={`${DASHBOARD_STATS.conversionRate}%`}
            change={+3.1}
            icon={TrendingUp}
            color="emerald"
            delay={0.3}
            className="col-span-6 md:col-span-3"
          />
          <StatCard
            title="Revenue (YTD)"
            value={`RM ${(DASHBOARD_STATS.revenue / 1000).toFixed(0)}K`}
            change={+15.8}
            icon={DollarSign}
            color="purple"
            delay={0.4}
            className="col-span-6 md:col-span-3"
          />
        </BentoGrid>

        <div className="grid grid-cols-12 gap-6">
          {/* Leads Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="col-span-12 lg:col-span-8"
          >
            <div className="glass rounded-2xl p-6 h-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-50">Monthly Leads</h3>
                <Badge variant="secondary">Last 6 Months</Badge>
              </div>
              
              {/* Simple Bar Chart */}
              <div className="flex items-end justify-between h-48 gap-4">
                {DASHBOARD_STATS.monthlyLeads.map((item, index) => (
                  <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(item.leads / 200) * 100}%` }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                      className="w-full bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-lg relative group cursor-pointer"
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-xs font-medium text-slate-200 bg-slate-800 px-2 py-1 rounded">
                          {item.leads}
                        </span>
                      </div>
                    </motion.div>
                    <span className="text-xs text-slate-400">{item.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Traffic Sources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="col-span-12 lg:col-span-4"
          >
            <div className="glass rounded-2xl p-6 h-full">
              <h3 className="text-lg font-semibold text-slate-50 mb-6">Traffic Sources</h3>
              
              <div className="space-y-4">
                {DASHBOARD_STATS.trafficSources.map((source, index) => {
                  const icons: Record<string, typeof Linkedin> = {
                    'LinkedIn': Linkedin,
                    'Google Organic': Globe,
                    'Direct': MousePointerClick,
                    'Email Campaign': Mail,
                    'Facebook': Globe,
                  };
                  const Icon = icons[source.source] || Globe;
                  const maxLeads = Math.max(...DASHBOARD_STATS.trafficSources.map(s => s.leads));
                  const percentage = (source.leads / maxLeads) * 100;
                  
                  return (
                    <motion.div
                      key={source.source}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.05 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-indigo-400" />
                          <span className="text-slate-300">{source.source}</span>
                        </div>
                        <span className="text-slate-400">{source.leads} leads</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ delay: 0.8 + index * 0.05, duration: 0.5 }}
                          className="h-full bg-gradient-to-r from-indigo-600 to-indigo-400 rounded-full"
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Top Courses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="col-span-12"
          >
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-slate-50 mb-6">Top Performing Courses</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-slate-400 border-b border-slate-700/50">
                      <th className="pb-4 font-medium">Course Name</th>
                      <th className="pb-4 font-medium text-right">Enrollments</th>
                      <th className="pb-4 font-medium text-right">Performance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DASHBOARD_STATS.topCourses.map((course, index) => {
                      const maxEnrollments = Math.max(...DASHBOARD_STATS.topCourses.map(c => c.enrollments));
                      const percentage = (course.enrollments / maxEnrollments) * 100;
                      
                      return (
                        <motion.tr
                          key={course.name}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8 + index * 0.05 }}
                          className="border-b border-slate-700/30 last:border-0"
                        >
                          <td className="py-4">
                            <div className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded-lg bg-indigo-600/20 flex items-center justify-center text-indigo-400 font-semibold text-sm">
                                {index + 1}
                              </div>
                              <span className="text-slate-200 font-medium">{course.name}</span>
                            </div>
                          </td>
                          <td className="py-4 text-right">
                            <span className="text-slate-300">{course.enrollments}</span>
                          </td>
                          <td className="py-4 text-right w-48">
                            <div className="flex items-center gap-3 justify-end">
                              <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden max-w-32">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${percentage}%` }}
                                  transition={{ delay: 0.9 + index * 0.05, duration: 0.5 }}
                                  className={cn(
                                    "h-full rounded-full",
                                    index === 0 ? "bg-gradient-to-r from-amber-500 to-yellow-400" :
                                    index === 1 ? "bg-gradient-to-r from-emerald-500 to-emerald-400" :
                                    "bg-gradient-to-r from-indigo-500 to-indigo-400"
                                  )}
                                />
                              </div>
                              <span className="text-xs text-slate-400 w-10">{Math.round(percentage)}%</span>
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Preview Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-slate-500">
            This is a visual preview of the analytics dashboard. 
            <span className="text-indigo-400"> Data shown is for demonstration purposes.</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: typeof Users;
  color: 'indigo' | 'amber' | 'emerald' | 'purple';
  delay: number;
  className?: string;
}

function StatCard({ title, value, change, icon: Icon, color, delay, className }: StatCardProps) {
  const isPositive = change >= 0;
  
  const colorClasses = {
    indigo: 'text-indigo-400 bg-indigo-600/20',
    amber: 'text-amber-400 bg-amber-600/20',
    emerald: 'text-emerald-400 bg-emerald-600/20',
    purple: 'text-purple-400 bg-purple-600/20',
  };

  return (
    <BentoCard className={cn("p-6", className)} delay={delay}>
      <div className="h-full flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center", colorClasses[color])}>
            <Icon className="h-5 w-5" />
          </div>
          <div className={cn(
            "flex items-center gap-1 text-xs font-medium",
            isPositive ? "text-emerald-400" : "text-red-400"
          )}>
            {isPositive ? (
              <ArrowUpRight className="h-3 w-3" />
            ) : (
              <ArrowDownRight className="h-3 w-3" />
            )}
            {Math.abs(change)}%
          </div>
        </div>
        <div>
          <div className="text-2xl font-bold text-slate-50">{value}</div>
          <div className="text-sm text-slate-400">{title}</div>
        </div>
      </div>
    </BentoCard>
  );
}
