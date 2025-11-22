'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, CheckCircle, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'

export function NewsletterSubscription({ variant = 'footer' }) {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email.trim()) {
      toast.error('Please enter your email address')
      return
    }
    
    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsSubscribed(true)
        toast.success('Successfully subscribed to newsletter!')
        setEmail('')
        
        // Reset success state after 3 seconds
        setTimeout(() => {
          setIsSubscribed(false)
        }, 3000)
      } else {
        toast.error(data.error || 'Failed to subscribe. Please try again.')
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error)
      toast.error('Failed to subscribe. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (variant === 'card') {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-playfair">Stay Updated</CardTitle>
          <CardDescription>
            Get the latest updates on new artworks, blog posts, and exclusive content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                disabled={isSubmitting || isSubscribed}
              />
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
            
            <AnimatePresence mode="wait">
              {isSubscribed ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-center p-3 bg-green-50 text-green-700 rounded-lg flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Successfully subscribed!</span>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isSubmitting || isSubscribed}
                  >
                    {isSubmitting ? 'Subscribing...' : 'Subscribe to Newsletter'}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
            
            <p className="text-xs text-muted-foreground text-center">
              By subscribing, you agree to receive our newsletter. Unsubscribe at any time.
            </p>
          </form>
        </CardContent>
      </Card>
    )
  }

  // Footer variant (default)
  return (
    <div className="bg-muted/50 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-3">
        <Mail className="w-5 h-5 text-gold-600" />
        <h4 className="text-lg font-playfair font-semibold">Newsletter</h4>
      </div>
      <p className="text-muted-foreground text-sm mb-4">
        Get updates on new artworks, blog posts, and exclusive content delivered to your inbox.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <Input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 text-sm"
            disabled={isSubmitting || isSubscribed}
          />
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        </div>
        
        <AnimatePresence mode="wait">
          {isSubscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex items-center gap-2 text-green-600 text-sm bg-green-50 p-2 rounded"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Subscribed!</span>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <Button 
                type="submit" 
                className="w-full text-sm py-2" 
                size="sm"
                disabled={isSubmitting || isSubscribed}
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
      
      <p className="text-xs text-muted-foreground mt-3">
        Unsubscribe anytime. We respect your privacy.
      </p>
    </div>
  )
}

export default NewsletterSubscription