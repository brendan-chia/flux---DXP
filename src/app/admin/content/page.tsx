'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Share2,
  Users,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Edit3,
  Trash2,
  Send,
  TrendingUp,
  RefreshCw,
  Sparkles,
  ChevronDown,
  ExternalLink,
  BarChart3,
  Zap,
  Bell,
  Archive
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BentoCard, BentoGrid } from '@/components/ui/bento-card';
import { DigitalSongket } from '@/components/ui/digital-songket';
import {
  CONTENT_ITEMS,
  CMS_STATS,
  CONTENT_CATEGORIES,
  CONTENT_TYPES,
  CONTENT_STATUSES,
  type ContentItem,
  type ContentStatus,
  type ContentFreshness
} from '@/lib/mockData';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const statusColors: Record<ContentStatus, string> = {
  draft: 'bg-slate-500',
  review: 'bg-amber-500',
  scheduled: 'bg-blue-500',
  published: 'bg-emerald-500',
  archived: 'bg-gray-500'
};

const freshnessConfig: Record<ContentFreshness, { color: string; icon: React.ReactNode; label: string }> = {
  fresh: { color: 'text-emerald-400', icon: <CheckCircle2 className="h-4 w-4" />, label: 'Fresh' },
  aging: { color: 'text-amber-400', icon: <Clock className="h-4 w-4" />, label: 'Aging' },
  stale: { color: 'text-red-400', icon: <AlertTriangle className="h-4 w-4" />, label: 'Needs Update' },
  evergreen: { color: 'text-blue-400', icon: <RefreshCw className="h-4 w-4" />, label: 'Evergreen' }
};

const CHART_COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

export default function ContentManagementPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredContent = CONTENT_ITEMS.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const staleContent = CONTENT_ITEMS.filter(item => item.freshness === 'stale');

  return (
    <div className="relative min-h-screen">
      <DigitalSongket className="fixed inset-0" opacity={0.03} />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-50">Content Hub</h1>
            <p className="text-slate-400 mt-1">Manage, publish, and track your thought leadership content</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/admin/content/ai-assistant">
              <Button variant="secondary" className="gap-2">
                <Sparkles className="h-4 w-4 text-amber-400" />
                AI Assistant
              </Button>
            </Link>
            <Link href="/admin/content/new">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Content
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        <BentoGrid className="mb-8">
          <BentoCard className="col-span-12 md:col-span-3 p-6" delay={0}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Content</p>
                <p className="text-3xl font-bold text-slate-50 mt-1">{CMS_STATS.totalContent}</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-indigo-600/20 flex items-center justify-center">
                <FileText className="h-6 w-6 text-indigo-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-4 text-xs">
              <span className="text-emerald-400">{CMS_STATS.publishedContent} published</span>
              <span className="text-amber-400">{CMS_STATS.drafts} drafts</span>
            </div>
          </BentoCard>

          <BentoCard className="col-span-12 md:col-span-3 p-6" delay={0.1}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Views</p>
                <p className="text-3xl font-bold text-slate-50 mt-1">{CMS_STATS.totalViews.toLocaleString()}</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-emerald-600/20 flex items-center justify-center">
                <Eye className="h-6 w-6 text-emerald-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-emerald-400">
              <TrendingUp className="h-3 w-3" />
              <span>+12% from last month</span>
            </div>
          </BentoCard>

          <BentoCard className="col-span-12 md:col-span-3 p-6" delay={0.2}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Leads Generated</p>
                <p className="text-3xl font-bold text-slate-50 mt-1">{CMS_STATS.totalLeads}</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-amber-600/20 flex items-center justify-center">
                <Users className="h-6 w-6 text-amber-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-amber-400">
              <Zap className="h-3 w-3" />
              <span>{CMS_STATS.avgEngagement}% avg. engagement</span>
            </div>
          </BentoCard>

          <BentoCard className="col-span-12 md:col-span-3 p-6" delay={0.3}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Stale Content</p>
                <p className="text-3xl font-bold text-red-400 mt-1">{CMS_STATS.staleContent}</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-red-600/20 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-400" />
              </div>
            </div>
            <div className="mt-4">
              <Link href="#stale-alerts" className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1">
                <Bell className="h-3 w-3" />
                Review needed
              </Link>
            </div>
          </BentoCard>
        </BentoGrid>

        {/* Charts Row */}
        <div className="grid grid-cols-12 gap-6 mb-8">
          <BentoCard className="col-span-12 lg:col-span-8 p-6" delay={0.4}>
            <h3 className="text-lg font-semibold text-slate-50 mb-4">Content Performance</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={CMS_STATS.contentPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px'
                  }}
                />
                <Line type="monotone" dataKey="views" stroke="#6366f1" strokeWidth={2} dot={{ fill: '#6366f1' }} name="Views" />
                <Line type="monotone" dataKey="leads" stroke="#f59e0b" strokeWidth={2} dot={{ fill: '#f59e0b' }} name="Leads" />
              </LineChart>
            </ResponsiveContainer>
          </BentoCard>

          <BentoCard className="col-span-12 lg:col-span-4 p-6" delay={0.5}>
            <h3 className="text-lg font-semibold text-slate-50 mb-4">Content by Type</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={CMS_STATS.contentByType}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="count"
                  nameKey="type"
                >
                  {CMS_STATS.contentByType.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-2 mt-2">
              {CMS_STATS.contentByType.map((item, index) => (
                <div key={item.type} className="flex items-center gap-1 text-xs text-slate-400">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }} />
                  {item.type}
                </div>
              ))}
            </div>
          </BentoCard>
        </div>

        {/* Stale Content Alerts */}
        {staleContent.length > 0 && (
          <motion.div
            id="stale-alerts"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 rounded-xl bg-red-950/30 border border-red-500/30"
          >
            <div className="flex items-center gap-3 mb-3">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              <h3 className="font-semibold text-red-400">Content Refresh Needed</h3>
            </div>
            <div className="space-y-2">
              {staleContent.map(item => (
                <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50">
                  <div className="flex items-center gap-3">
                    <div className="text-sm">
                      <p className="text-slate-200">{item.title}</p>
                      <p className="text-xs text-slate-500">Last updated: {item.lastUpdated}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-red-400 bg-red-400/10 px-2 py-1 rounded">
                      {item.freshnessScore}% fresh
                    </span>
                    <Button size="sm" variant="outline" className="text-xs">
                      <Edit3 className="h-3 w-3 mr-1" />
                      Update
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <Input
              placeholder="Search content by title or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
            <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </Button>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 overflow-hidden"
            >
              <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/50">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="text-xs text-slate-400 mb-2 block">Category</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full h-10 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 px-3 text-sm"
                    >
                      {CONTENT_CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 mb-2 block">Status</label>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="w-full h-10 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 px-3 text-sm"
                    >
                      <option value="all">All Status</option>
                      {CONTENT_STATUSES.map(status => (
                        <option key={status.value} value={status.value}>{status.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 mb-2 block">Content Type</label>
                    <select className="w-full h-10 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 px-3 text-sm">
                      <option value="all">All Types</option>
                      {CONTENT_TYPES.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 mb-2 block">Freshness</label>
                    <select className="w-full h-10 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 px-3 text-sm">
                      <option value="all">All</option>
                      <option value="fresh">Fresh</option>
                      <option value="aging">Aging</option>
                      <option value="stale">Stale</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content List */}
        <div className="space-y-4">
          {filteredContent.map((item, index) => (
            <ContentCard key={item.id} item={item} index={index} />
          ))}
        </div>

        {filteredContent.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">No content found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ContentCard({ item, index }: { item: ContentItem; index: number }) {
  const [showMenu, setShowMenu] = useState(false);
  const freshness = freshnessConfig[item.freshness];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group p-4 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:border-indigo-500/30 transition-all cursor-pointer"
    >
      <div className="flex items-start gap-4">
        {/* Content Type Icon */}
        <div className="hidden sm:flex h-12 w-12 rounded-xl bg-slate-700/50 items-center justify-center shrink-0">
          <FileText className="h-6 w-6 text-slate-400" />
        </div>

        {/* Content Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`inline-flex h-2 w-2 rounded-full ${statusColors[item.status]}`} />
                <span className="text-xs text-slate-500 capitalize">{item.status}</span>
                <span className="text-xs text-slate-600">•</span>
                <span className="text-xs text-slate-500">{item.type.replace('-', ' ')}</span>
                {item.aiGenerated && (
                  <>
                    <span className="text-xs text-slate-600">•</span>
                    <span className="text-xs text-amber-400 flex items-center gap-1">
                      <Sparkles className="h-3 w-3" />
                      AI
                    </span>
                  </>
                )}
              </div>
              <h3 className="text-slate-100 font-medium group-hover:text-indigo-400 transition-colors line-clamp-1">
                {item.title}
              </h3>
              <p className="text-sm text-slate-500 mt-1 line-clamp-1">{item.excerpt}</p>
            </div>

            {/* Actions */}
            <div className="relative shrink-0">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setShowMenu(!showMenu)}
                className="h-8 w-8"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
              {showMenu && (
                <div className="absolute right-0 top-full mt-1 w-48 rounded-lg bg-slate-800 border border-slate-700 shadow-xl z-10">
                  <div className="p-1">
                    <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 rounded-md">
                      <Edit3 className="h-4 w-4" /> Edit
                    </button>
                    <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 rounded-md">
                      <Eye className="h-4 w-4" /> Preview
                    </button>
                    <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 rounded-md">
                      <Send className="h-4 w-4" /> Distribute
                    </button>
                    <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 rounded-md">
                      <Archive className="h-4 w-4" /> Archive
                    </button>
                    <hr className="my-1 border-slate-700" />
                    <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-slate-700 rounded-md">
                      <Trash2 className="h-4 w-4" /> Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Meta Row */}
          <div className="flex items-center flex-wrap gap-x-4 gap-y-2 mt-3 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {item.lastUpdated}
            </span>
            <span className="flex items-center gap-1">
              {item.author}
            </span>
            {item.status === 'published' && (
              <>
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {item.views.toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <Share2 className="h-3 w-3" />
                  {item.shares}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {item.leads} leads
                </span>
              </>
            )}
            {item.scheduledAt && (
              <span className="flex items-center gap-1 text-blue-400">
                <Calendar className="h-3 w-3" />
                Scheduled: {new Date(item.scheduledAt).toLocaleDateString()}
              </span>
            )}
          </div>

          {/* Tags and Freshness */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2 flex-wrap">
              {item.tags.slice(0, 3).map(tag => (
                <span key={tag} className="px-2 py-0.5 rounded-full bg-slate-700/50 text-xs text-slate-400">
                  {tag}
                </span>
              ))}
              {item.tags.length > 3 && (
                <span className="text-xs text-slate-500">+{item.tags.length - 3}</span>
              )}
            </div>
            <div className={`flex items-center gap-1.5 text-xs ${freshness.color}`}>
              {freshness.icon}
              <span>{freshness.label}</span>
              <span className="text-slate-600">({item.freshnessScore}%)</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
