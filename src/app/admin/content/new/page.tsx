'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Save,
  Eye,
  Send,
  Calendar,
  Sparkles,
  FileText,
  Tag,
  Users,
  Building,
  Search,
  X,
  Plus,
  Image,
  Link2,
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Code
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { BentoCard } from '@/components/ui/bento-card';
import { DigitalSongket } from '@/components/ui/digital-songket';
import { CONTENT_TYPES, CONTENT_CATEGORIES, INDUSTRIES, SENIORITY_LEVELS } from '@/lib/mockData';

const EDITOR_TOOLS = [
  { icon: Bold, label: 'Bold' },
  { icon: Italic, label: 'Italic' },
  { icon: List, label: 'Bullet List' },
  { icon: ListOrdered, label: 'Numbered List' },
  { icon: Quote, label: 'Quote' },
  { icon: Code, label: 'Code' },
  { icon: Link2, label: 'Link' },
  { icon: Image, label: 'Image' }
];

export default function NewContentPage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [title, setTitle] = useState('');
  const [contentType, setContentType] = useState('article');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedSeniority, setSelectedSeniority] = useState<string[]>([]);
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [schedulePublish, setSchedulePublish] = useState(false);
  const [scheduledDate, setScheduledDate] = useState('');

  const addTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleSave = async (publish: boolean = false) => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    router.push('/admin/content');
  };

  return (
    <div className="relative min-h-screen">
      <DigitalSongket className="fixed inset-0" opacity={0.03} />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link 
              href="/admin/content" 
              className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 mb-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Content Hub
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-50">Create New Content</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/admin/content/ai-assistant">
              <Button variant="secondary" size="sm" className="gap-2">
                <Sparkles className="h-4 w-4 text-amber-400" />
                AI Assist
              </Button>
            </Link>
            <Button variant="outline" size="sm" className="gap-2" onClick={() => handleSave(false)}>
              <Save className="h-4 w-4" />
              Save Draft
            </Button>
            <Button size="sm" className="gap-2" onClick={() => handleSave(true)}>
              <Send className="h-4 w-4" />
              Publish
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Main Content Area */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* Basic Info */}
            <BentoCard className="p-6" glassEffect>
              <div className="space-y-6">
                <div>
                  <Label>Title</Label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter a compelling title..."
                    className="mt-2 text-lg font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Content Type</Label>
                    <select
                      value={contentType}
                      onChange={(e) => setContentType(e.target.value)}
                      className="w-full mt-2 h-11 rounded-xl bg-slate-800/50 border border-slate-700 text-slate-200 px-4 text-sm"
                    >
                      {CONTENT_TYPES.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label>Category</Label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full mt-2 h-11 rounded-xl bg-slate-800/50 border border-slate-700 text-slate-200 px-4 text-sm"
                    >
                      <option value="">Select category...</option>
                      {CONTENT_CATEGORIES.filter(c => c !== 'All').map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <Label>Excerpt / Summary</Label>
                  <textarea
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Write a brief summary that will appear in previews..."
                    className="w-full mt-2 h-24 rounded-xl bg-slate-800/50 border border-slate-700 text-slate-200 px-4 py-3 text-sm resize-none placeholder:text-slate-600"
                  />
                  <p className="text-xs text-slate-500 mt-1">{excerpt.length}/200 characters</p>
                </div>
              </div>
            </BentoCard>

            {/* Content Editor */}
            <BentoCard className="p-6" glassEffect>
              <Label className="mb-4 block">Content</Label>
              
              {/* Editor Toolbar */}
              <div className="flex items-center gap-1 p-2 rounded-t-xl bg-slate-800/50 border border-slate-700 border-b-0">
                {EDITOR_TOOLS.map((tool, idx) => (
                  <button
                    key={idx}
                    className="p-2 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                    title={tool.label}
                  >
                    <tool.icon className="h-4 w-4" />
                  </button>
                ))}
                <div className="flex-1" />
                <button className="px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-400 text-xs hover:bg-amber-500/20 transition-colors flex items-center gap-1 cursor-pointer">
                  <Sparkles className="h-3 w-3" />
                  AI Write
                </button>
              </div>

              {/* Editor Area */}
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start writing your content here...

You can use Markdown formatting:
- **bold** for emphasis
- *italic* for subtle emphasis
- ## Headings
- - Bullet points
- 1. Numbered lists"
                className="w-full h-96 rounded-b-xl bg-slate-800/50 border border-slate-700 border-t-0 text-slate-200 px-4 py-3 text-sm resize-none placeholder:text-slate-600 font-mono"
              />
            </BentoCard>

            {/* SEO Settings */}
            <BentoCard className="p-6" glassEffect>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-50 flex items-center gap-2">
                  <Search className="h-5 w-5 text-emerald-400" />
                  SEO Settings
                </h2>
                <button className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer">
                  <Sparkles className="h-3 w-3" />
                  Generate with AI
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>SEO Title</Label>
                  <Input
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    placeholder="Page title for search engines (50-60 characters)"
                    className="mt-2"
                  />
                  <p className="text-xs text-slate-500 mt-1">{seoTitle.length}/60 characters</p>
                </div>
                <div>
                  <Label>Meta Description</Label>
                  <textarea
                    value={seoDescription}
                    onChange={(e) => setSeoDescription(e.target.value)}
                    placeholder="Brief description for search results (150-160 characters)"
                    className="w-full mt-2 h-20 rounded-xl bg-slate-800/50 border border-slate-700 text-slate-200 px-4 py-3 text-sm resize-none placeholder:text-slate-600"
                  />
                  <p className="text-xs text-slate-500 mt-1">{seoDescription.length}/160 characters</p>
                </div>
              </div>
            </BentoCard>
          </div>

          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            {/* Publishing Options */}
            <BentoCard className="p-6" glassEffect>
              <h2 className="text-lg font-semibold text-slate-50 mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-indigo-400" />
                Publishing
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-200">Schedule for later</p>
                    <p className="text-xs text-slate-500">Set a publish date/time</p>
                  </div>
                  <Switch
                    checked={schedulePublish}
                    onCheckedChange={setSchedulePublish}
                  />
                </div>

                {schedulePublish && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                  >
                    <Label>Publish Date & Time</Label>
                    <Input
                      type="datetime-local"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      className="mt-2"
                    />
                  </motion.div>
                )}

                <hr className="border-slate-700" />

                <div className="flex flex-col gap-2">
                  <Button className="w-full gap-2" onClick={() => handleSave(true)} disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        >
                          <Send className="h-4 w-4" />
                        </motion.div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        {schedulePublish ? 'Schedule' : 'Publish Now'}
                      </>
                    )}
                  </Button>
                  <Button variant="outline" className="w-full gap-2" onClick={() => handleSave(false)}>
                    <Save className="h-4 w-4" />
                    Save Draft
                  </Button>
                  <Button variant="ghost" className="w-full gap-2">
                    <Eye className="h-4 w-4" />
                    Preview
                  </Button>
                </div>
              </div>
            </BentoCard>

            {/* Tags */}
            <BentoCard className="p-6" glassEffect>
              <h2 className="text-lg font-semibold text-slate-50 mb-4 flex items-center gap-2">
                <Tag className="h-5 w-5 text-purple-400" />
                Tags
              </h2>

              <div className="flex gap-2 mb-3">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Add a tag..."
                  onKeyDown={(e) => e.key === 'Enter' && addTag()}
                />
                <Button size="icon" variant="secondary" onClick={addTag}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs"
                  >
                    {tag}
                    <button onClick={() => removeTag(tag)} className="hover:text-purple-200 cursor-pointer">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
                {tags.length === 0 && (
                  <p className="text-xs text-slate-500">No tags added yet</p>
                )}
              </div>
            </BentoCard>

            {/* Target Audience */}
            <BentoCard className="p-6" glassEffect>
              <h2 className="text-lg font-semibold text-slate-50 mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-amber-400" />
                Target Audience
              </h2>

              <div className="space-y-4">
                <div>
                  <Label className="text-xs">Industries</Label>
                  <select
                    multiple
                    className="w-full mt-2 h-24 rounded-xl bg-slate-800/50 border border-slate-700 text-slate-200 px-3 py-2 text-sm"
                    value={selectedIndustries}
                    onChange={(e) => setSelectedIndustries(Array.from(e.target.selectedOptions, opt => opt.value))}
                  >
                    {INDUSTRIES.filter(i => i !== 'All Industries').map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                  <p className="text-xs text-slate-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
                </div>

                <div>
                  <Label className="text-xs">Seniority Level</Label>
                  <select
                    multiple
                    className="w-full mt-2 h-24 rounded-xl bg-slate-800/50 border border-slate-700 text-slate-200 px-3 py-2 text-sm"
                    value={selectedSeniority}
                    onChange={(e) => setSelectedSeniority(Array.from(e.target.selectedOptions, opt => opt.value))}
                  >
                    {SENIORITY_LEVELS.filter(s => s !== 'All Levels').map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
              </div>
            </BentoCard>

            {/* Distribution */}
            <BentoCard className="p-6" glassEffect>
              <h2 className="text-lg font-semibold text-slate-50 mb-4 flex items-center gap-2">
                <Send className="h-5 w-5 text-emerald-400" />
                Auto-Distribution
              </h2>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/30">
                  <span className="text-sm text-slate-300">LinkedIn</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/30">
                  <span className="text-sm text-slate-300">Newsletter</span>
                  <Switch />
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/30">
                  <span className="text-sm text-slate-300">Website Blog</span>
                  <Switch defaultChecked />
                </div>
              </div>

              <Link 
                href="/admin/content/distribution" 
                className="inline-flex items-center gap-1 mt-4 text-xs text-indigo-400 hover:text-indigo-300"
              >
                Manage distribution channels →
              </Link>
            </BentoCard>
          </div>
        </div>
      </div>
    </div>
  );
}
