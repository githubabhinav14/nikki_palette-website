'use client'

import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ChevronDown, Plus, Minus, Sparkles, Palette, Brush, Paintbrush, Mail, Phone, Instagram, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

// Custom debounce hook
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Blog Section Skeleton
function BlogSectionSkeleton() {
  return (
    <section id="blog" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="h-12 bg-gray-200 rounded-lg w-64 mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
              <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Lazy load heavy components
const BlogSection = lazy(() => import('@/components/blog-section').then(mod => ({ default: mod.BlogSection })));
const CommissionForm = lazy(() => import('@/components/commission-form').then(mod => ({ default: mod.CommissionForm })));
const NewsletterSubscription = lazy(() => import('@/components/newsletter').then(mod => ({ default: mod.NewsletterSubscription })));
const TestimonialForm = lazy(() => import('@/components/testimonial-form').then(mod => ({ default: mod.TestimonialForm })));


function App() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <GallerySection />
      <AboutSection />
      <ServicesSection />
      <BlogSection />
      <NewsletterSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
    </div>
  );
}

// Hero Section
function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted/50 to-background">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1634986666676-ec8fd927c23d)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/80" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-block mb-6"
        >
          <Sparkles className="w-12 h-12 text-gold-400 mx-auto" />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-5xl md:text-7xl font-playfair font-bold text-white mb-6"
        >
          Nikki Palette
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl md:text-2xl text-gold-200 font-medium mb-4"
        >
          Artist | Portraits | Paintings | T-Shirt Art | Sketches
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-lg text-gray-200 mb-10 max-w-2xl mx-auto"
        >
          Passionate artist bringing visions to life through diverse mediums, inspired by nature and human emotion.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a href="#gallery">
            <Button size="lg" className="bg-gold-600 text-white px-8 py-6 text-lg rounded-full shadow-xl">
              <Palette className="mr-2 h-5 w-5" />
              View My Work
            </Button>
          </a>
          <a href="#contact">
            <Button size="lg" variant="outline" className="border-2 border-white text-white bg-transparent px-8 py-6 text-lg rounded-full shadow-xl">
              <Brush className="mr-2 h-5 w-5" />
              Get a Custom Artwork
            </Button>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16"
        >
          <a href="#gallery" className="inline-block animate-bounce">
            <ChevronDown className="w-10 h-10 text-gold-400" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

// Gallery Section
function GallerySection() {
  const [artworks, setArtworks] = useState([]);
  const [filteredArtworks, setFilteredArtworks] = useState([]);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [loading, setLoading] = useState(true);
  const [isZoomed, setIsZoomed] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchArtworks();
  }, []);

  useEffect(() => {
    filterAndSortArtworks();
  }, [artworks, searchTerm, sortBy]);

  const filterAndSortArtworks = () => {
    let filtered = [...artworks];
    
    // Filter by search term
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(artwork => 
        artwork.title.toLowerCase().includes(searchLower) ||
        (artwork.description && artwork.description.toLowerCase().includes(searchLower)) ||
        artwork.category.toLowerCase().includes(searchLower)
      );
    }
    
    // Sort artworks
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'category':
        filtered.sort((a, b) => a.category.localeCompare(b.category));
        break;
      default:
        break;
    }
    
    setFilteredArtworks(filtered);
  };

  const fetchArtworks = async () => {
    setLoading(true);
    
    // Directly use images from Portfolio Gallery images folder
    const portfolioImages = [
      'IMG-20220901-WA0035.jpg',
      'IMG-20250730-WA0001.jpg',
      'IMG_20210522_143723.jpg',
      'IMG_20210617_171832_027.jpg',
      'IMG_20220131_152556-02.jpeg',
      'IMG_20220330_142352.jpg',
      'IMG_20220604_160829_107.jpg',
      'IMG_20220604_201440_113.jpg',
      'IMG_20220604_201511_382.jpg',
      'IMG_20221022_135924.jpg',
      'IMG_20221022_140441.jpg',
      'IMG_20221022_142121.jpg',
      'IMG_20221022_144905.jpg',
      'IMG_20221022_145856.jpg',
      'IMG_20221106_125129_724.jpg',
      'IMG_20221106_171120_582.jpg',
      'IMG_20221106_191620_625.jpg',
      'IMG_20221107_173133_545.jpg',
      'IMG_20221108_193022_059.jpg',
      'IMG_20221109_185234_818.jpg',
      'IMG_20221110_183351_400.jpg',
      'IMG_20221123_220753_842.jpg',
      'IMG_20221201_160135-02.jpeg',
      'IMG_20221206_131854.jpg',
      'IMG_20250627_170931.jpg',
      'IMG_20250627_171615.jpg'
    ];

    const artworks = portfolioImages.map((filename, index) => ({
      id: `artwork-${index + 1}`,
      title: `Artwork ${index + 1}`,
      description: `Portfolio piece ${index + 1}`,
      category: 'portfolio',
      imageUrl: `/Portfolio Gallery images/${filename}`,
      createdAt: new Date().toISOString(),
      medium: 'Mixed Media'
    }));

    setArtworks(artworks);
    setFilteredArtworks(artworks);
    setLoading(false);
  };

  const handleArtworkSelect = (artwork) => {
    setSelectedArtwork(artwork);
    const index = filteredArtworks.findIndex(art => art.id === artwork.id);
    setCurrentImageIndex(index);
    setIsZoomed(false);
  };

  const navigateArtwork = (direction) => {
    const newIndex = direction === 'next' 
      ? (currentImageIndex + 1) % filteredArtworks.length
      : (currentImageIndex - 1 + filteredArtworks.length) % filteredArtworks.length;
    
    setCurrentImageIndex(newIndex);
    setSelectedArtwork(filteredArtworks[newIndex]);
    setIsZoomed(false);
  };

  const handleKeyDown = (e) => {
    if (!selectedArtwork) return;
    
    switch (e.key) {
      case 'Escape':
        setSelectedArtwork(null);
        break;
      case 'ArrowLeft':
        navigateArtwork('prev');
        break;
      case 'ArrowRight':
        navigateArtwork('next');
        break;
      case ' ':
        e.preventDefault();
        setIsZoomed(!isZoomed);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (selectedArtwork) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [selectedArtwork, currentImageIndex, isZoomed]);

  return (
    <section id="gallery" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-primary mb-4">
            Portfolio Gallery
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore my diverse collection of artworks across various mediums and styles
          </p>
        </motion.div>

        {/* Search and Sort Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {/* Search and Sort Controls */}
          <div className="w-full max-w-4xl mb-8 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="Search artworks by title, description, or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 w-full"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title">Title A-Z</option>
              </select>
            </div>
            
            {/* Results Counter */}
            <div className="text-center text-muted-foreground">
              {searchTerm ? (
                <span>Found {filteredArtworks.length} artwork{filteredArtworks.length !== 1 ? 's' : ''} matching "{searchTerm}"</span>
              ) : (
                <span>Showing {filteredArtworks.length} artwork{filteredArtworks.length !== 1 ? 's' : ''}</span>
              )}
            </div>
          </div>
        </motion.div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-gold-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredArtworks.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-muted-foreground text-lg mb-4">
              {searchTerm ? (
                <span>No artworks found matching "{searchTerm}"</span>
              ) : (
                <span>No artworks found</span>
              )}
            </div>
            {searchTerm && (
              <Button 
                onClick={() => setSearchTerm('')}
                variant="outline"
              >
                Clear Search
              </Button>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredArtworks.map((artwork, index) => (
              <motion.div
                key={artwork.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-2xl transition-all cursor-pointer bg-card"
                onClick={() => handleArtworkSelect(artwork)}
              >
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={artwork.imageUrl}
                    alt={artwork.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 w-full">
                    <h3 className="text-white font-playfair font-semibold text-lg mb-1">
                      {artwork.title}
                    </h3>
                    {artwork.description && (
                      <p className="text-cream-200 text-sm">{artwork.description}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Artwork Modal */}
        <AnimatePresence>
          {selectedArtwork && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
              onClick={() => setSelectedArtwork(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative max-w-6xl w-full max-h-[95vh] bg-white rounded-lg overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedArtwork(null)}
                  className="absolute top-4 right-4 z-30 bg-white/90 hover:bg-white text-black p-3 rounded-full transition-all shadow-lg hover:shadow-xl"
                  title="Close (Esc)"
                >
                  <X size={28} />
                </button>

                {/* Navigation Buttons */}
                {filteredArtworks.length > 1 && (
                  <>
                    <button
                      onClick={() => navigateArtwork('prev')}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-black p-3 rounded-full transition-all shadow-lg hover:shadow-xl"
                      title="Previous Image (←)"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => navigateArtwork('next')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-black p-3 rounded-full transition-all shadow-lg hover:shadow-xl"
                      title="Next Image (→)"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}

                {/* Image Counter */}
                {filteredArtworks.length > 1 && (
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {filteredArtworks.length}
                  </div>
                )}

                <div className="flex flex-col lg:flex-row">
                  {/* Image Container */}
                  <div className="flex-1 bg-black flex items-center justify-center p-4 lg:p-8 relative overflow-hidden">
                    <motion.div
                      key={selectedArtwork.id}
                      className={`relative w-full h-full flex items-center justify-center cursor-zoom-in ${
                        isZoomed ? 'cursor-zoom-out' : ''
                      }`}
                      onClick={() => setIsZoomed(!isZoomed)}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className={`relative transition-transform duration-300 ${
                        isZoomed ? 'scale-150' : 'hover:scale-105'
                      }`}>
                        <img
                          src={selectedArtwork.imageUrl}
                          alt={selectedArtwork.title}
                          className="object-contain max-w-full max-h-[70vh] lg:max-h-[85vh]"
                          style={{ maxWidth: '100%', maxHeight: '100%' }}
                        />
                      </div>
                    </motion.div>
                    
                    {/* Zoom Controls */}
                    <div className="absolute bottom-4 right-4 flex gap-2 z-10">
                      <button
                        onClick={() => setIsZoomed(!isZoomed)}
                        className="bg-black/70 hover:bg-black/90 text-white p-2 rounded-full transition-all"
                        title={isZoomed ? 'Zoom Out' : 'Zoom In'}
                      >
                        {isZoomed ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="w-full md:w-80 p-6">
                    <h3 className="text-2xl font-playfair font-bold text-gold-700 mb-2">
                      {selectedArtwork.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 capitalize">
                      {selectedArtwork.category}
                    </p>
                    {selectedArtwork.description && (
                      <p className="text-foreground mb-6">{selectedArtwork.description}</p>
                    )}
                    <div className="mb-6">
                      <ShareButtons 
                        title={selectedArtwork.title}
                        description={selectedArtwork.description || `Check out this amazing ${selectedArtwork.category} artwork!`}
                        url={`${typeof window !== 'undefined' ? window.location.origin : ''}/#gallery`}
                        image={selectedArtwork.imageUrl}
                        size="sm"
                        variant="outline"
                      />
                    </div>
                    <a href="#contact">
                      <Button className="w-full bg-gold-600 hover:bg-gold-700">
                        Commission Similar Artwork
                      </Button>
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// Newsletter Section
function NewsletterSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-primary mb-4">
            Stay Connected
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Subscribe to our newsletter and never miss updates on new artworks, blog posts, and exclusive content.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <NewsletterSubscription variant="card" />
        </motion.div>
      </div>
    </section>
  );
}

// About Section
function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-cream-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-playfair font-bold text-gold-700 mb-4">
            About the Artist
          </h2>
          <div className="w-24 h-1 bg-gold-600 mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get to know the creative mind behind the artwork
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Artist Profile Image - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2 relative"
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-gold-400 to-gold-600 rounded-3xl blur-lg opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="relative rounded-3xl shadow-2xl w-full aspect-square border-4 border-white overflow-hidden">
                <Image
                  src="/images/artist/placeholder-profile.jpg"
                  alt="Nikkitha - Artist Profile"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 33vw"
                  quality={90}
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-gold-600 text-white p-4 rounded-full shadow-2xl border-4 border-white">
                <Paintbrush className="w-8 h-8" />
              </div>
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                <span className="text-gold-700 font-semibold text-sm">Professional Artist</span>
              </div>
            </div>
          </motion.div>

          {/* Content - Center */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="lg:col-span-3 space-y-8"
          >
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gold-100">
              <h3 className="text-3xl font-playfair font-bold text-gold-700 mb-4">Hello, I'm Nikkitha</h3>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                A passionate artist based in New York City, bringing visions to life through diverse mediums. 
                My journey began with a simple pencil and paper, evolving into a lifelong commitment to artistic expression.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Inspired by nature and human emotion, I specialize in creating custom portraits, paintings, 
                t-shirt designs, sketches, and digital art. Each piece tells a unique story.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-md border border-gold-50">
                <h4 className="text-xl font-playfair font-semibold text-gold-600 mb-4 flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Skills & Mediums
                </h4>
                <div className="space-y-2">
                  {['Oil Painting', 'Digital Illustration', 'Pencil Drawing', 'Watercolor', 'Portrait Art', 'T-Shirt Design'].map((skill) => (
                    <div key={skill} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gold-600 rounded-full"></div>
                      <span className="text-foreground font-medium text-sm">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-md border border-gold-50">
                <h4 className="text-xl font-playfair font-semibold text-gold-600 mb-4 flex items-center gap-2">
                  <Brush className="w-5 h-5" />
                  Tools I Use
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['Procreate', 'Photoshop', 'Canvas', 'Wacom', 'Oil & Acrylic'].map((tool) => (
                    <span key={tool} className="px-3 py-1 bg-cream-100 text-foreground rounded-full text-xs font-medium">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <a href="#contact">
                <Button size="lg" className="bg-gradient-to-r from-gold-600 to-gold-700 hover:from-gold-700 hover:to-gold-800 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                  Let's Create Something Beautiful Together
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Artwork Showcase - Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="relative group">
            <div className="absolute -inset-8 bg-gradient-to-r from-gold-200/20 to-transparent rounded-3xl"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gold-100">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-1">
                  <h3 className="text-2xl font-playfair font-bold text-gold-700 mb-4">My Creative Space</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Every masterpiece begins in a space filled with inspiration. This is where magic happens, 
                    where ideas transform into tangible art that speaks to the soul.
                  </p>
                </div>
                <div className="lg:col-span-2">
                  <div className="relative rounded-2xl shadow-2xl w-full h-64 overflow-hidden">
                    <Image
                      src="/images/artworks/IMG_20221110_183351_400.jpg"
                      alt="Artist workspace with paintings and creative tools"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 33vw"
                      quality={85}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Services Section
function ServicesSection() {
  const [services, setServices] = useState([]);
  const [showCommissionForm, setShowCommissionForm] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services');
      const data = await response.json();
      setServices(data.data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  return (
    <section id="services" className="py-20 bg-cream-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gold-700 mb-4">
            Commission Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Bring your vision to life with custom artwork tailored to your needs
          </p>
          <Button 
            onClick={() => setShowCommissionForm(true)}
            className="bg-gold-600 hover:bg-gold-700 text-white px-8 py-3 text-lg"
          >
            Request Custom Commission
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl transition-shadow group overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-gold-600 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                    {service.price}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl font-playfair text-gold-700">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-6">
                    {service.description}
                  </CardDescription>
                  <Button 
                    onClick={() => setShowCommissionForm(true)}
                    className="w-full bg-gold-600 hover:bg-gold-700"
                  >
                    Request This Service
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* Commission Form Modal */}
        <CommissionForm 
          isOpen={showCommissionForm}
          onClose={() => setShowCommissionForm(false)}
        />
      </div>
    </section>
  );
}

// Testimonials Section
function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/testimonials');
      const data = await response.json();
      const realTestimonials = data.data || [];
      
      // Add a mock testimonial if there are no real testimonials
      if (realTestimonials.length === 0) {
        const mockTestimonial = {
          id: 'mock-1',
          name: 'Sarah Johnson',
          rating: 5,
          message: 'Nikkitha created the most beautiful custom portrait of my family. Her attention to detail and artistic vision exceeded all my expectations. The entire process was smooth and professional. I highly recommend her services!',
          artworkType: 'portrait',
          createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days ago
        };
        setTestimonials([mockTestimonial]);
      } else {
        setTestimonials(realTestimonials);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      // Add mock testimonial if API fails
      const mockTestimonial = {
        id: 'mock-1',
        name: 'Sarah Johnson',
        rating: 5,
        message: 'Nikkitha created the most beautiful custom portrait of my family. Her attention to detail and artistic vision exceeded all my expectations. The entire process was smooth and professional. I highly recommend her services!',
        artworkType: 'portrait',
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days ago
      };
      setTestimonials([mockTestimonial]);
    }
  };

  const handleTestimonialSuccess = () => {
    setShowForm(false);
    // Optionally refresh testimonials
    fetchTestimonials();
  };

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gold-700 mb-4">
            Client Testimonials
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            What my clients say about working with me
          </p>
        </motion.div>

        {/* Testimonial Submission Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-playfair font-semibold text-gold-700 mb-4">
              Share Your Experience
            </h3>
            <p className="text-muted-foreground mb-6">
              Had a great experience working with me? Help others discover the joy of custom artwork by sharing your story.
            </p>
            <Button
              onClick={() => setShowForm(!showForm)}
              className="bg-gold-600 hover:bg-gold-700"
            >
              {showForm ? 'Hide Form' : 'Write a Testimonial'}
            </Button>
          </div>

          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <TestimonialForm onSuccess={handleTestimonialSuccess} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-gold-500 text-gold-500" />
                    ))}
                  </div>
                  <p className="text-foreground mb-6 italic leading-relaxed">
                    "{testimonial.message}"
                  </p>
                  <div className="font-semibold text-gold-700">
                    — {testimonial.name}
                  </div>
                  {testimonial.artworkType && (
                    <div className="text-sm text-muted-foreground mt-2 capitalize">
                      {testimonial.artworkType} Commission
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {testimonials.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground text-lg">
              No testimonials yet. Be the first to share your experience!
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// FAQ Section
function FAQSection() {
  const faqs = [
    {
      question: 'How long does a commission take?',
      answer: 'Typical commissions take 2-4 weeks depending on the complexity and medium. Rush orders may be available for an additional fee.',
    },
    {
      question: 'What information do you need to start a commission?',
      answer: 'I need reference photos or detailed descriptions of what you want, preferred size/dimensions, medium choice, and any specific style preferences you have.',
    },
    {
      question: 'Do you offer revisions?',
      answer: 'Yes! I provide up to 2 rounds of revisions for all commissions to ensure you\'re completely satisfied with the final piece.',
    },
    {
      question: 'Can I purchase prints of existing work?',
      answer: 'Absolutely! Contact me for print pricing and available sizes. Original pieces may also be available for purchase.',
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Yes, I ship worldwide! Shipping costs vary based on location and artwork size. Digital files are available for instant download.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'I accept PayPal, Venmo, bank transfers, and major credit cards. A 50% deposit is required to begin work on commissions.',
    },
  ];

  return (
    <section id="faq" className="py-20 bg-cream-100">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gold-700 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about commissioning artwork
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="bg-white rounded-lg shadow-md">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-cream-200 last:border-b-0">
                <AccordionTrigger className="px-6 py-4 hover:bg-cream-50 text-left font-semibold text-foreground">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}

// Contact Section
function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: 'idle', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: 'Message sent successfully! I\'ll get back to you soon.' });
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatus({ type: 'error', message: data.error || 'Failed to send message. Please try again.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'An error occurred. Please try again.' });
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gold-700 mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to commission a custom artwork? Let's discuss your project!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-playfair text-gold-700">Send a Message</CardTitle>
                <CardDescription>Fill out the form and I'll respond within 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Phone (Optional)
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (234) 567-8900"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project ideas, preferred style, timeline, etc."
                      rows={6}
                      className="w-full"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={status.type === 'loading'}
                    className="w-full bg-gold-600 hover:bg-gold-700 py-6 text-lg"
                  >
                    {status.type === 'loading' ? 'Sending...' : 'Send Message'}
                  </Button>

                  {status.message && (
                    <div
                      className={`mt-4 p-4 rounded-lg ${
                        status.type === 'success'
                          ? 'bg-green-50 text-green-800 border border-green-200'
                          : 'bg-red-50 text-red-800 border border-red-200'
                      }`}
                    >
                      {status.message}
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="bg-gold-100 p-3 rounded-full">
                    <Mail className="w-6 h-6 text-gold-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Email</h3>
                    <a href="mailto:artist.contact@example.com" className="text-gold-600 hover:text-gold-700">
                      artist.contact@example.com
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="bg-gold-100 p-3 rounded-full">
                    <Phone className="w-6 h-6 text-gold-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Phone</h3>
                    <a href="tel:+1234567890" className="text-gold-600 hover:text-gold-700">
                      +123-456-7890
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="bg-gold-100 p-3 rounded-full">
                    <Instagram className="w-6 h-6 text-gold-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Instagram</h3>
                    <a 
                      href="https://instagram.com/MyArtGallery" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gold-600 hover:text-gold-700"
                    >
                      @MyArtGallery
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="bg-gold-100 p-3 rounded-full">
                    <MessageCircle className="w-6 h-6 text-gold-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">WhatsApp</h3>
                    <a 
                      href="https://wa.me/1234567890" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gold-600 hover:text-gold-700"
                    >
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gold-50 to-cream-100 shadow-lg">
              <CardContent className="pt-6">
                <h3 className="font-playfair font-semibold text-xl text-gold-700 mb-3">
                  📍 Location
                </h3>
                <p className="text-foreground">
                  Based in <span className="font-semibold">New York City</span>
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Available for local meetings and worldwide shipping
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default App;