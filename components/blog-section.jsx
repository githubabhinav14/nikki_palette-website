'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, User, ArrowRight, Search, Tag } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ShareButtons } from '@/components/social-share'

export function BlogSection() {
  const [blogPosts, setBlogPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', label: 'All Posts' },
    { id: 'techniques', label: 'Art Techniques' },
    { id: 'inspiration', label: 'Inspiration' },
    { id: 'tutorials', label: 'Tutorials' },
    { id: 'behind-scenes', label: 'Behind the Scenes' },
    { id: 'art-business', label: 'Art Business' },
  ]

  useEffect(() => {
    fetchBlogPosts()
  }, [])

  const fetchBlogPosts = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/blog')
      const data = await response.json()
      // Map API data to component format
      const mappedPosts = (data.data || []).map(post => ({
        id: post._id,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        category: post.tags[0] || 'techniques',
        author: post.author,
        imageUrl: post.featuredImage,
        readTime: post.readTime,
        tags: post.tags,
        createdAt: post.publishedAt,
        slug: post.slug
      }))
      setBlogPosts(mappedPosts)
    } catch (error) {
      console.error('Error fetching blog posts:', error)
      // Fallback mock blog posts for better visual appeal
      setBlogPosts([
        {
          id: '1',
          title: 'Mastering the Art of Color Theory in Portrait Painting',
          excerpt: 'Discover how understanding color relationships can transform your portrait paintings from good to breathtaking. Learn the secrets of warm and cool tones.',
          content: 'Full article content here...',
          category: 'techniques',
          author: 'Nikitha',
          imageUrl: '/images/blog/placeholder-blog.jpg',
          readTime: '12 min read',
          tags: ['color theory', 'portrait', 'painting', 'masterclass'],
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
        },
        {
          id: '2',
          title: 'From Sketch to Masterpiece: My Creative Process Revealed',
          excerpt: 'Take a journey through my artistic process, from initial concept sketches to finished artwork. See how ideas evolve into stunning creations.',
          content: 'Full article content here...',
          category: 'behind-scenes',
          author: 'Nikitha',
          imageUrl: '/images/blog/placeholder-blog.jpg',
          readTime: '8 min read',
          tags: ['process', 'sketching', 'creation', 'workflow'],
          createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
        },
        {
          id: '3',
          title: 'The Psychology of Art: How Colors Affect Emotions',
          excerpt: 'Explore the fascinating connection between colors and human emotions. Learn how to use this knowledge to create more impactful artwork.',
          content: 'Full article content here...',
          category: 'inspiration',
          author: 'Nikitha',
          imageUrl: '/images/blog/placeholder-blog.jpg',
          readTime: '10 min read',
          tags: ['psychology', 'emotions', 'color', 'impact'],
          createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(), // 21 days ago
        },
        {
          id: '4',
          title: 'T-Shirt Design Trends 2024: What\'s Hot in Wearable Art',
          excerpt: 'Stay ahead of the curve with the latest t-shirt design trends. From minimalist graphics to bold statements, discover what\'s trending now.',
          content: 'Full article content here...',
          category: 'art-business',
          author: 'Nikitha',
          imageUrl: '/images/blog/placeholder-blog.jpg',
          readTime: '6 min read',
          tags: ['t-shirt design', 'trends', 'fashion', '2024'],
          createdAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(), // 28 days ago
        },
        {
          id: '5',
          title: 'Digital vs Traditional: Why I Choose Both Mediums',
          excerpt: 'As an artist who works in both digital and traditional mediums, I share my insights on when to use each and why both are essential.',
          content: 'Full article content here...',
          category: 'techniques',
          author: 'Nikitha',
          imageUrl: '/images/blog/placeholder-blog.jpg',
          readTime: '9 min read',
          tags: ['digital art', 'traditional', 'comparison', 'mediums'],
          createdAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(), // 35 days ago
        },
        {
          id: '6',
          title: 'Finding Your Artistic Voice: A Journey of Self-Discovery',
          excerpt: 'Every artist has a unique voice. Learn how to discover and develop your own artistic style that sets your work apart from others.',
          content: 'Full article content here...',
          category: 'inspiration',
          author: 'Nikitha',
          imageUrl: '/images/blog/placeholder-blog.jpg',
          readTime: '11 min read',
          tags: ['artistic voice', 'style', 'journey', 'self-discovery'],
          createdAt: new Date(Date.now() - 42 * 24 * 60 * 60 * 1000).toISOString(), // 42 days ago
        },
      ])
    }
    setLoading(false)
  }

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <section id="blog" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-primary mb-4">
            Art Blog & Insights
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover art techniques, inspiration, and behind-the-scenes insights from my creative journey
          </p>
        </motion.div>

        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-background text-foreground hover:bg-muted'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-300 group overflow-hidden border-0">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                      onError={(e) => {
                        e.target.src = '/images/blog/placeholder-blog.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary/90 backdrop-blur-sm text-primary-foreground px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                        {categories.find(cat => cat.id === post.category)?.label}
                      </span>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl font-playfair text-primary group-hover:text-primary/80 transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3 text-sm leading-relaxed">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(post.createdAt)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-4 flex-wrap">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="bg-gradient-to-r from-primary/10 to-primary/5 text-primary px-3 py-1 rounded-full text-xs font-medium border border-primary/20">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="mb-4">
                      <ShareButtons 
                        title={post.title}
                        description={post.excerpt}
                        url={`${typeof window !== 'undefined' ? window.location.origin : ''}/blog/${post.slug}`}
                        size="sm"
                        variant="ghost"
                      />
                    </div>
                    <Button className="w-full group bg-gradient-to-r from-primary to-primary/80 hover:from-primary hover:to-primary/90 text-white font-medium py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg">
                      Read More
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {filteredPosts.length === 0 && !loading && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No blog posts found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  )
}