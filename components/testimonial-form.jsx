'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Star, Send, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'

export function TestimonialForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    message: '',
    artworkType: '',
    wouldRecommend: true
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleRatingChange = (rating) => {
    setFormData(prev => ({ ...prev, rating }))
  }

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error('Please enter your name')
      return false
    }
    if (!formData.email.trim()) {
      toast.error('Please enter your email')
      return false
    }
    if (!formData.message.trim()) {
      toast.error('Please enter your testimonial message')
      return false
    }
    if (formData.message.length < 10) {
      toast.error('Testimonial message should be at least 10 characters long')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setIsSubmitted(true)
        toast.success('Thank you for your testimonial! It will be reviewed and published soon.')
        
        // Reset form after 2 seconds
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            rating: 5,
            message: '',
            artworkType: '',
            wouldRecommend: true
          })
          setIsSubmitted(false)
          if (onSuccess) onSuccess()
        }, 2000)
      } else {
        toast.error(data.error || 'Failed to submit testimonial. Please try again.')
      }
    } catch (error) {
      console.error('Testimonial submission error:', error)
      toast.error('Failed to submit testimonial. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-green-800 mb-2">
              Thank You!
            </h3>
            <p className="text-green-700">
              Your testimonial has been submitted successfully and will be reviewed before publication.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-playfair text-gold-700">
          Share Your Experience
        </CardTitle>
        <CardDescription>
          Help others discover the joy of commissioning custom artwork by sharing your experience
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Full Name *
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
                Email Address *
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
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              How would you rate your experience? *
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingChange(star)}
                  className={`p-1 transition-colors ${
                    star <= formData.rating
                      ? 'text-gold-500 hover:text-gold-600'
                      : 'text-gray-300 hover:text-gold-400'
                  }`}
                >
                  <Star className="w-8 h-8 fill-current" />
                </button>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {formData.rating === 5 && 'Excellent!'}
              {formData.rating === 4 && 'Very Good'}
              {formData.rating === 3 && 'Good'}
              {formData.rating === 2 && 'Fair'}
              {formData.rating === 1 && 'Poor'}
            </p>
          </div>

          <div>
            <label htmlFor="artworkType" className="block text-sm font-medium mb-2">
              What type of artwork did you commission?
            </label>
            <select
              id="artworkType"
              name="artworkType"
              value={formData.artworkType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select artwork type</option>
              <option value="portrait">Portrait</option>
              <option value="tshirt">T-Shirt Design</option>
              <option value="painting">Painting</option>
              <option value="sketch">Sketch</option>
              <option value="digital">Digital Art</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Your Testimonial *
            </label>
            <Textarea
              id="message"
              name="message"
              required
              value={formData.message}
              onChange={handleChange}
              placeholder="Share your experience working with me. What did you love about the process? How did the artwork turn out?"
              rows={5}
              className="w-full"
              minLength={10}
            />
            <p className="text-sm text-muted-foreground mt-1">
              {formData.message.length}/500 characters
            </p>
          </div>

          <div className="flex items-center gap-2">
            <input
              id="wouldRecommend"
              name="wouldRecommend"
              type="checkbox"
              checked={formData.wouldRecommend}
              onChange={handleChange}
              className="w-4 h-4 text-gold-600 bg-background border-input rounded focus:ring-gold-500"
            />
            <label htmlFor="wouldRecommend" className="text-sm text-muted-foreground">
              I would recommend this artist to others
            </label>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gold-600 hover:bg-gold-700"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Submit Testimonial
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}