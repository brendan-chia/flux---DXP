'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  ArrowLeft,
  Send,
  Copy,
  Check,
  RefreshCw,
  FileText,
  Linkedin,
  Mail,
  BookOpen,
  Lightbulb,
  Wand2,
  ChevronRight,
  Loader2,
  History,
  Star,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BentoCard } from '@/components/ui/bento-card';
import { DigitalSongketGold } from '@/components/ui/digital-songket';
import { AI_PROMPT_TEMPLATES, CONTENT_ITEMS } from '@/lib/mockData';

const QUICK_ACTIONS = [
  {
    id: 'linkedin',
    icon: Linkedin,
    title: 'LinkedIn Post',
    description: 'Convert article to engaging LinkedIn post',
    color: 'bg-blue-600/20 text-blue-400'
  },
  {
    id: 'seo',
    icon: Zap,
    title: 'SEO Meta',
    description: 'Generate SEO title & meta description',
    color: 'bg-emerald-600/20 text-emerald-400'
  },
  {
    id: 'titles',
    icon: Lightbulb,
    title: 'Title Ideas',
    description: 'Brainstorm 5 engaging article titles',
    color: 'bg-amber-600/20 text-amber-400'
  },
  {
    id: 'summary',
    icon: FileText,
    title: 'Newsletter Summary',
    description: 'Summarize content for newsletter',
    color: 'bg-purple-600/20 text-purple-400'
  }
];

const MOCK_RESPONSES: Record<string, string> = {
  linkedin: `🌱 **ESG isn't just compliance—it's competitive advantage.**

After working with 50+ Malaysian PLCs on their sustainability journey, here's what separates leaders from laggards:

✅ Start with materiality—not metrics
✅ Engage stakeholders BEFORE reporting season
✅ Make data collection a continuous process, not annual panic
✅ Link ESG KPIs to executive compensation
✅ Tell stories, not just numbers

The new Bursa Malaysia requirements are pushing boards to take ESG seriously. But the real winners? They were already ahead.

Our ESG Reporting Workshop (15 Feb, KL) still has 3 seats. DM me for the proforma invoice.

#ESG #Sustainability #BursaMalaysia #CorporateGovernance #Malaysia`,

  seo: `**SEO Meta Title:**
ESG Reporting Guide 2026 | Malaysian PLCs | Bursa Compliance

**SEO Meta Description:**
Master ESG reporting for Malaysian PLCs with our comprehensive guide. Learn Bursa Malaysia requirements, GRI Standards, TCFD frameworks. Free templates included. 160 chars.

**Focus Keywords:**
- ESG reporting Malaysia
- Bursa Malaysia sustainability
- GRI Standards guide
- TCFD reporting`,

  titles: `Here are 5 engaging title options for your article:

1. **"The 2026 ESG Playbook: What Every Malaysian PLC Board Must Know"**
   - Why it works: Urgency + specificity + target audience

2. **"From Greenwashing to Genuine Impact: A Malaysian ESG Journey"**
   - Why it works: Contrarian hook + transformation narrative

3. **"ESG Reporting Decoded: A Plain-English Guide for Malaysian Boards"**
   - Why it works: Accessibility + clear value proposition

4. **"5 ESG Mistakes That Cost Malaysian Companies Millions"**
   - Why it works: Loss aversion + specific number

5. **"The CFO's Guide to ESG: Numbers That Actually Matter"**
   - Why it works: Role-specific + practical focus`,

  summary: `**Newsletter Summary:**

📊 New resource alert! Our comprehensive ESG Reporting Guide for Malaysian PLCs is now live.

Whether you're preparing for your first sustainability report or looking to enhance your current disclosures, this guide covers everything from Bursa Malaysia requirements to TCFD implementation.

**Key highlights:**
• Step-by-step materiality assessment framework
• GRI Standards quick reference
• Real examples from Malaysian PLCs
• Downloadable templates

👉 [Read the full guide]`
};

export default function AIAssistantPage() {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [inputContent, setInputContent] = useState('');
  const [topic, setTopic] = useState('');
  const [audience, setAudience] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [selectedSource, setSelectedSource] = useState<string>('');

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGeneratedContent(null);
    
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (selectedAction && MOCK_RESPONSES[selectedAction]) {
      setGeneratedContent(MOCK_RESPONSES[selectedAction]);
    }
    setIsGenerating(false);
  };

  const handleCopy = () => {
    if (generatedContent) {
      navigator.clipboard.writeText(generatedContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRegenerate = () => {
    handleGenerate();
  };

  return (
    <div className="relative min-h-screen">
      <DigitalSongketGold className="fixed inset-0" opacity={0.04} />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/admin/content" 
            className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Content Hub
          </Link>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-amber-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-50">AI Content Assistant</h1>
              <p className="text-slate-400">Transform your ideas into polished content with AI</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Left Panel - Source & Actions */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            {/* Source Content Selection - First Step */}
            <BentoCard className="p-6" glassEffect>
              <h2 className="text-lg font-semibold text-slate-50 mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-emerald-400" />
                <span className="flex items-center gap-2">
                  <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">1</span>
                  Source Content
                </span>
              </h2>
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-slate-400">Select existing content</Label>
                  <select
                    value={selectedSource}
                    onChange={(e) => setSelectedSource(e.target.value)}
                    className="w-full mt-2 h-10 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-200 px-3 text-sm"
                  >
                    <option value="">Choose content...</option>
                    {CONTENT_ITEMS.filter(c => c.status === 'published').map(content => (
                      <option key={content.id} value={content.id}>
                        {content.title.substring(0, 50)}...
                      </option>
                    ))}
                  </select>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-700"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-2 bg-slate-900 text-slate-500">or paste content</span>
                  </div>
                </div>
                <textarea
                  value={inputContent}
                  onChange={(e) => setInputContent(e.target.value)}
                  placeholder="Paste your content here..."
                  className="w-full h-32 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-200 px-3 py-2 text-sm resize-none placeholder:text-slate-600"
                />
              </div>
            </BentoCard>

            {/* Quick Actions - Second Step */}
            <BentoCard className="p-6" glassEffect>
              <h2 className="text-lg font-semibold text-slate-50 mb-4 flex items-center gap-2">
                <Wand2 className="h-5 w-5 text-indigo-400" />
                <span className="flex items-center gap-2">
                  <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold">2</span>
                  Choose Action
                </span>
              </h2>
              <div className="space-y-3">
                {QUICK_ACTIONS.map((action) => (
                  <motion.button
                    key={action.id}
                    onClick={() => setSelectedAction(action.id)}
                    className={`w-full p-4 rounded-xl text-left transition-all ${
                      selectedAction === action.id
                        ? 'bg-indigo-600/20 border-indigo-500/50'
                        : 'bg-slate-800/30 border-slate-700/50 hover:bg-slate-800/50'
                    } border`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`h-10 w-10 rounded-lg ${action.color} flex items-center justify-center shrink-0`}>
                        <action.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-200">{action.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{action.description}</p>
                      </div>
                      {selectedAction === action.id && (
                        <ChevronRight className="h-5 w-5 text-indigo-400 ml-auto" />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </BentoCard>

            {/* Additional Inputs */}
            {selectedAction === 'titles' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <BentoCard className="p-6" glassEffect>
                  <h2 className="text-lg font-semibold text-slate-50 mb-4">Title Generation Options</h2>
                  <div className="space-y-4">
                    <div>
                      <Label>Topic/Subject</Label>
                      <Input
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="e.g., ESG reporting for Malaysian companies"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>Target Audience</Label>
                      <Input
                        value={audience}
                        onChange={(e) => setAudience(e.target.value)}
                        placeholder="e.g., CFOs, Sustainability Officers"
                        className="mt-2"
                      />
                    </div>
                  </div>
                </BentoCard>
              </motion.div>
            )}
          </div>

          {/* Right Panel - Output */}
          <div className="col-span-12 lg:col-span-8">
            <BentoCard className="p-6 min-h-[600px]" glassEffect>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-slate-50 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-amber-400" />
                  Generated Content
                </h2>
                {generatedContent && (
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={handleRegenerate}
                      disabled={isGenerating}
                    >
                      <RefreshCw className={`h-4 w-4 mr-1 ${isGenerating ? 'animate-spin' : ''}`} />
                      Regenerate
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={handleCopy}
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4 mr-1 text-emerald-400" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-1" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>

              {!selectedAction && !generatedContent && (
                <div className="flex flex-col items-center justify-center h-96 text-center">
                  <div className="h-16 w-16 rounded-2xl bg-slate-800/50 flex items-center justify-center mb-4">
                    <Wand2 className="h-8 w-8 text-slate-600" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-400 mb-2">
                    Select an action to get started
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md">
                    Choose a quick action from the left panel, then provide your source content or topic to generate AI-powered content.
                  </p>
                </div>
              )}

              {selectedAction && !generatedContent && !isGenerating && (
                <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-indigo-600/10 border border-indigo-500/30">
                    <p className="text-sm text-indigo-300">
                      <strong>Selected:</strong> {QUICK_ACTIONS.find(a => a.id === selectedAction)?.title}
                    </p>
                    <p className="text-xs text-indigo-400/70 mt-1">
                      {QUICK_ACTIONS.find(a => a.id === selectedAction)?.description}
                    </p>
                  </div>

                  <div className="flex flex-col items-center justify-center py-12">
                    <Button
                      size="lg"
                      onClick={handleGenerate}
                      className="gap-2"
                    >
                      <Sparkles className="h-5 w-5" />
                      Generate Content
                    </Button>
                    <p className="text-xs text-slate-500 mt-4">
                      AI will generate content based on your selection
                    </p>
                  </div>
                </div>
              )}

              {isGenerating && (
                <div className="flex flex-col items-center justify-center h-96">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="h-16 w-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center mb-4"
                  >
                    <Sparkles className="h-8 w-8 text-indigo-400" />
                  </motion.div>
                  <p className="text-slate-400">Generating your content...</p>
                  <p className="text-xs text-slate-600 mt-2">This usually takes a few seconds</p>
                </div>
              )}

              {generatedContent && !isGenerating && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
                    <pre className="whitespace-pre-wrap text-sm text-slate-200 font-sans leading-relaxed">
                      {generatedContent}
                    </pre>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                    <div className="flex items-center gap-4">
                      <button className="text-xs text-slate-500 hover:text-slate-300 flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        Save as template
                      </button>
                      <button className="text-xs text-slate-500 hover:text-slate-300 flex items-center gap-1">
                        <History className="h-3 w-3" />
                        View history
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <FileText className="h-4 w-4 mr-1" />
                        Create as Draft
                      </Button>
                      <Button size="sm">
                        <Send className="h-4 w-4 mr-1" />
                        Publish Now
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </BentoCard>

           
          </div>
        </div>
      </div>
    </div>
  );
}
