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
      setBlogPosts(data.data || [])
    } catch (error) {
      console.error('Error fetching blog posts:', error)
      // Fallback sample data
      setBlogPosts([
        {
          id: '1',
          title: 'The Art of Portrait Drawing: Techniques and Tips',
          excerpt: 'Learn the fundamental techniques for creating stunning portrait drawings that capture the essence of your subject.',
          content: 'Full article content here...',
          category: 'techniques',
          author: 'Nikkitha',
          imageUrl: 'https://images.unsplash.com/photo-1579783928621-7a13d66a62d1',
          readTime: '8 min read',
          tags: ['portrait', 'drawing', 'techniques'],
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'Finding Inspiration in Nature: A Creative Journey',
          excerpt: 'Discover how the natural world can inspire your artistic creations and bring new life to your work.',
          content: 'Full article content here...',
          category: 'inspiration',
          author: 'Nikkitha',
          imageUrl: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9',
          readTime: '6 min read',
          tags: ['nature', 'inspiration', 'creativity'],
          createdAt: new Date().toISOString(),
        },
        {
          id: '3',
          title: 'Digital Art vs Traditional: Finding Your Medium',
          excerpt: 'Explore the pros and cons of digital and traditional art mediums to find what works best for your style.',
          content: 'Full article content here...',
          category: 'art-business',
          author: 'Nikkitha',
          imageUrl: 'https://images.unsplash.com/photo-1635322966219-b75ed372eb01',
          readTime: '10 min read',
          tags: ['digital art', 'traditional', 'mediums'],
          createdAt: new Date().toISOString(),
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
                <Card className="h-full hover:shadow-xl transition-all group overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                        {categories.find(cat => cat.id === post.category)?.label}
                      </span>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl font-playfair text-primary group-hover:text-primary/80 transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
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
                    <div className="flex items-center gap-2 mb-4">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs">
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
                    <Button className="w-full group">
                      Read More
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
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