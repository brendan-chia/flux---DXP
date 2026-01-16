'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Linkedin,
  Mail,
  Facebook,
  Twitter,
  Globe,
  Check,
  X,
  Settings,
  RefreshCw,
  Zap,
  Users,
  Clock,
  Send,
  Bell,
  ToggleLeft,
  ToggleRight,
  ExternalLink,
  Plus,
  Rss
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { BentoCard, BentoGrid } from '@/components/ui/bento-card';
import { DigitalSongket } from '@/components/ui/digital-songket';
import { DISTRIBUTION_CHANNELS, CONTENT_ITEMS } from '@/lib/mockData';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Linkedin,
  Mail,
  Facebook,
  Twitter,
  Globe
};

const SCHEDULED_POSTS = [
  {
    id: 1,
    title: 'Quick Tips: Preparing Your Team for ESG Audits',
    channel: 'LinkedIn',
    scheduledFor: '2026-01-20T09:00:00',
    status: 'scheduled'
  },
  {
    id: 2,
    title: 'January 2026 Training Calendar',
    channel: 'Email Newsletter',
    scheduledFor: '2026-01-18T08:00:00',
    status: 'scheduled'
  },
  {
    id: 3,
    title: 'AI for HR Managers - Early Bird Reminder',
    channel: 'LinkedIn',
    scheduledFor: '2026-01-22T10:00:00',
    status: 'draft'
  }
];

const RECENT_DISTRIBUTIONS = [
  {
    id: 1,
    title: 'ESG Reporting Workshop - Last 3 Seats',
    channel: 'LinkedIn',
    sentAt: '2026-01-15T14:30:00',
    reach: 4520,
    engagement: 234
  },
  {
    id: 2,
    title: 'December Newsletter',
    channel: 'Email Newsletter',
    sentAt: '2026-01-01T09:00:00',
    reach: 8920,
    engagement: 1245
  },
  {
    id: 3,
    title: 'New Year Promotion Post',
    channel: 'Facebook',
    sentAt: '2025-12-30T10:00:00',
    reach: 2340,
    engagement: 156
  }
];

export default function DistributionPage() {
  const [channels, setChannels] = useState(DISTRIBUTION_CHANNELS);

  const toggleAutoPublish = (channelId: string) => {
    setChannels(prev => prev.map(ch => 
      ch.id === channelId ? { ...ch, autoPublish: !ch.autoPublish } : ch
    ));
  };

  const connectedChannels = channels.filter(ch => ch.connected);
  const totalFollowers = connectedChannels.reduce((sum, ch) => sum + (ch.followers || 0), 0);

  return (
    <div className="relative min-h-screen">
      <DigitalSongket className="fixed inset-0" opacity={0.03} />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/admin/content" 
            className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Content Hub
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-50">Distribution Channels</h1>
              <p className="text-slate-400 mt-1">Manage automated publishing and content distribution</p>
            </div>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Connect Channel
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <BentoGrid className="mb-8">
          <BentoCard className="col-span-12 md:col-span-4 p-6" delay={0}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Connected Channels</p>
                <p className="text-3xl font-bold text-slate-50 mt-1">{connectedChannels.length}</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-emerald-600/20 flex items-center justify-center">
                <Check className="h-6 w-6 text-emerald-400" />
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-3">
              {channels.length - connectedChannels.length} pending connection
            </p>
          </BentoCard>

          <BentoCard className="col-span-12 md:col-span-4 p-6" delay={0.1}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Reach</p>
                <p className="text-3xl font-bold text-slate-50 mt-1">{totalFollowers.toLocaleString()}</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-indigo-600/20 flex items-center justify-center">
                <Users className="h-6 w-6 text-indigo-400" />
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-3">Combined followers/subscribers</p>
          </BentoCard>

          <BentoCard className="col-span-12 md:col-span-4 p-6" delay={0.2}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Scheduled Posts</p>
                <p className="text-3xl font-bold text-slate-50 mt-1">{SCHEDULED_POSTS.length}</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-amber-600/20 flex items-center justify-center">
                <Clock className="h-6 w-6 text-amber-400" />
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-3">Queued for publishing</p>
          </BentoCard>
        </BentoGrid>

        <div className="grid grid-cols-12 gap-6">
          {/* Connected Channels */}
          <div className="col-span-12 lg:col-span-7">
            <BentoCard className="p-6" glassEffect>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-slate-50 flex items-center gap-2">
                  <Rss className="h-5 w-5 text-indigo-400" />
                  Distribution Channels
                </h2>
                <Button size="sm" variant="ghost" className="text-xs">
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Sync All
                </Button>
              </div>

              <div className="space-y-4">
                {channels.map((channel, index) => {
                  const IconComponent = iconMap[channel.icon] || Globe;
                  return (
                    <motion.div
                      key={channel.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded-xl border transition-all ${
                        channel.connected
                          ? 'bg-slate-800/30 border-slate-700/50'
                          : 'bg-slate-800/10 border-slate-700/30 opacity-60'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                            channel.connected ? 'bg-indigo-600/20' : 'bg-slate-700/50'
                          }`}>
                            <IconComponent className={`h-6 w-6 ${
                              channel.connected ? 'text-indigo-400' : 'text-slate-500'
                            }`} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-slate-200">{channel.name}</p>
                              {channel.connected ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-xs text-emerald-400">
                                  <Check className="h-3 w-3" />
                                  Connected
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-500/10 text-xs text-slate-400">
                                  <X className="h-3 w-3" />
                                  Not Connected
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                              {channel.followers && (
                                <span className="flex items-center gap-1">
                                  <Users className="h-3 w-3" />
                                  {channel.followers.toLocaleString()} {channel.type === 'email' ? 'subscribers' : 'followers'}
                                </span>
                              )}
                              {channel.lastSynced && (
                                <span className="flex items-center gap-1">
                                  <RefreshCw className="h-3 w-3" />
                                  Synced {new Date(channel.lastSynced).toLocaleTimeString()}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          {channel.connected && (
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-slate-400">Auto-publish</span>
                              <Switch
                                checked={channel.autoPublish}
                                onCheckedChange={() => toggleAutoPublish(channel.id)}
                              />
                            </div>
                          )}
                          <Button size="sm" variant="ghost">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {channel.autoPublish && channel.connected && (
                        <div className="mt-3 pt-3 border-t border-slate-700/50">
                          <div className="flex items-center gap-2 text-xs text-amber-400">
                            <Zap className="h-3 w-3" />
                            <span>New content will be automatically published to this channel</span>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </BentoCard>
          </div>

          {/* Right Column */}
          <div className="col-span-12 lg:col-span-5 space-y-6">
            {/* Scheduled Queue */}
            <BentoCard className="p-6" glassEffect>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-50 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-amber-400" />
                  Scheduled Queue
                </h2>
                <Link href="/admin/content" className="text-xs text-indigo-400 hover:text-indigo-300">
                  View all
                </Link>
              </div>

              <div className="space-y-3">
                {SCHEDULED_POSTS.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/50"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-200 truncate">{post.title}</p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            {post.channel === 'LinkedIn' ? <Linkedin className="h-3 w-3" /> : <Mail className="h-3 w-3" />}
                            {post.channel}
                          </span>
                          <span>•</span>
                          <span>{new Date(post.scheduledFor).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost" className="shrink-0">
                        <Send className="h-3 w-3" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </BentoCard>

            {/* Recent Distributions */}
            <BentoCard className="p-6" glassEffect>
              <h2 className="text-lg font-semibold text-slate-50 mb-4 flex items-center gap-2">
                <Send className="h-5 w-5 text-emerald-400" />
                Recent Distributions
              </h2>

              <div className="space-y-3">
                {RECENT_DISTRIBUTIONS.map((dist, index) => (
                  <motion.div
                    key={dist.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 rounded-lg bg-slate-800/30"
                  >
                    <p className="text-sm text-slate-200 truncate">{dist.title}</p>
                    <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
                      <span>{dist.channel}</span>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {dist.reach.toLocaleString()}
                        </span>
                        <span className="text-emerald-400">{dist.engagement} engagements</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </BentoCard>

            {/* Automation Settings */}
            <BentoCard className="p-6" glassEffect>
              <h2 className="text-lg font-semibold text-slate-50 mb-4 flex items-center gap-2">
                <Bell className="h-5 w-5 text-purple-400" />
                Automation Rules
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30">
                  <div>
                    <p className="text-sm text-slate-200">Auto-share new articles</p>
                    <p className="text-xs text-slate-500">Share to LinkedIn when published</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30">
                  <div>
                    <p className="text-sm text-slate-200">Weekly digest email</p>
                    <p className="text-xs text-slate-500">Send newsletter every Monday</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30">
                  <div>
                    <p className="text-sm text-slate-200">Course reminders</p>
                    <p className="text-xs text-slate-500">Notify 7 days before program</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </BentoCard>
          </div>
        </div>
      </div>
    </div>
  );
}
