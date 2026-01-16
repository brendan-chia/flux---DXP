'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Calendar, 
  MapPin, 
  Clock,
  Users,
  Award,
  ChevronRight,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { DigitalSongket } from '@/components/ui/digital-songket';
import { COURSES, CATEGORIES, LOCATIONS, Course } from '@/lib/mockData';
import { formatPrice, formatDate, getSeatsStatus, cn } from '@/lib/utils';

export default function ProgramsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Filter courses (mock filtering - just for UI demonstration)
  const filteredCourses = COURSES.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesLocation = selectedLocation === 'All Locations' || course.location === selectedLocation;
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedLocation('All Locations');
  };

  const hasActiveFilters = searchQuery || selectedCategory !== 'All' || selectedLocation !== 'All Locations';

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
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-50 mb-2">
            Training Programs
          </h1>
          <p className="text-slate-400">
            Explore our HRD Corp registered professional development courses.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <Button 
              variant="outline" 
              onClick={() => setIsSidebarOpen(true)}
              className="w-full"
            >
              <Filter className="h-4 w-4" />
              Filters
              {hasActiveFilters && (
                <Badge variant="default" className="ml-2">Active</Badge>
              )}
            </Button>
          </div>

          {/* Sidebar Filters */}
          <AnimatePresence>
            {(isSidebarOpen || true) && (
              <>
                {/* Mobile Overlay */}
                {isSidebarOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/60 z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                  />
                )}
                
                <motion.aside
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={cn(
                    'lg:w-72 shrink-0',
                    isSidebarOpen 
                      ? 'fixed inset-y-0 left-0 z-50 w-80 p-6 bg-slate-900 lg:relative lg:p-0 lg:bg-transparent overflow-y-auto' 
                      : 'hidden lg:block'
                  )}
                >
                  <div className="sticky top-24 space-y-6">
                    {/* Mobile Close Button */}
                    <div className="flex items-center justify-between lg:hidden mb-4">
                      <h2 className="text-lg font-semibold text-slate-50">Filters</h2>
                      <button 
                        onClick={() => setIsSidebarOpen(false)}
                        className="p-2 text-slate-400 hover:text-slate-100 cursor-pointer"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    {/* Search */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">Search</label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                        <Input
                          placeholder="Search programs..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    {/* Category Filter */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">Category</label>
                      <div className="space-y-1">
                        {CATEGORIES.map((category) => (
                          <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={cn(
                              'w-full text-left px-4 py-2.5 rounded-xl text-sm transition-colors cursor-pointer',
                              selectedCategory === category
                                ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                            )}
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Location Filter */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">Location</label>
                      <div className="space-y-1">
                        {LOCATIONS.map((location) => (
                          <button
                            key={location}
                            onClick={() => setSelectedLocation(location)}
                            className={cn(
                              'w-full text-left px-4 py-2.5 rounded-xl text-sm transition-colors cursor-pointer',
                              selectedLocation === location
                                ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                            )}
                          >
                            {location}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Clear Filters */}
                    {hasActiveFilters && (
                      <Button 
                        variant="ghost" 
                        className="w-full"
                        onClick={clearFilters}
                      >
                        <X className="h-4 w-4" />
                        Clear Filters
                      </Button>
                    )}
                  </div>
                </motion.aside>
              </>
            )}
          </AnimatePresence>

          {/* Course Grid */}
          <div className="flex-1">
            {/* Results Count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-slate-400">
                Showing <span className="text-slate-200 font-medium">{filteredCourses.length}</span> programs
              </p>
              {hasActiveFilters && (
                <button 
                  onClick={clearFilters}
                  className="text-sm text-indigo-400 hover:text-indigo-300 cursor-pointer"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Course Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredCourses.map((course, index) => (
                  <CourseCard 
                    key={course.id} 
                    course={course} 
                    index={index}
                  />
                ))}
              </AnimatePresence>
            </div>

            {/* Empty State */}
            {filteredCourses.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="text-slate-500 mb-4">
                  <Search className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-slate-300 mb-2">
                  No programs found
                </h3>
                <p className="text-slate-400 mb-6">
                  Try adjusting your filters or search query.
                </p>
                <Button onClick={clearFilters}>
                  Clear Filters
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CourseCard({ course, index }: { course: Course; index: number }) {
  const seatsStatus = getSeatsStatus(course.seats_left);
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link 
        href={`/programs/${course.id}`}
        className="group block"
      >
        <div className={cn(
          'relative h-full p-6 rounded-2xl cursor-pointer',
          'bg-slate-800/50 backdrop-blur-xl',
          'border border-slate-700/50',
          'transition-all duration-300',
          'hover:scale-[1.02] hover:border-indigo-500/30',
          'hover:shadow-lg hover:shadow-indigo-500/10'
        )}>
          {/* Category & Badges */}
          <div className="flex items-start justify-between mb-4">
            <Badge variant="secondary">{course.category}</Badge>
            <Badge 
              variant={seatsStatus.variant === 'urgent' ? 'urgent' : seatsStatus.variant === 'warning' ? 'warning' : 'secondary'}
              pulse={seatsStatus.variant === 'urgent'}
            >
              {seatsStatus.label}
            </Badge>
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-slate-50 mb-2 group-hover:text-indigo-300 transition-colors">
            {course.title}
          </h3>

          {/* Description */}
          <p className="text-slate-400 text-sm mb-4 line-clamp-2">
            {course.description}
          </p>

          {/* Meta Info */}
          <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
            <div className="flex items-center gap-2 text-slate-400">
              <Calendar className="h-4 w-4 text-indigo-400" />
              <span>{formatDate(course.next_date)}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <MapPin className="h-4 w-4 text-indigo-400" />
              <span>{course.location}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Clock className="h-4 w-4 text-indigo-400" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Users className="h-4 w-4 text-indigo-400" />
              <span>{course.level}</span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
            <div>
              <span className="text-2xl font-bold text-slate-50">
                {formatPrice(course.price)}
              </span>
              {course.is_hrd_claimable && (
                <div className="flex items-center gap-1 mt-1">
                  <Award className="h-3 w-3 text-emerald-400" />
                  <span className="text-xs text-emerald-400">HRD Claimable</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-sm font-medium">View Details</span>
              <ChevronRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
