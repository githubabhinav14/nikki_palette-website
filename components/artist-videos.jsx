'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, Maximize, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const videos = [
  {
    id: 1,
    title: "Creating Custom Portraits",
    description: "Watch the intricate process of bringing portraits to life with attention to detail and artistic precision. Every stroke captures the essence of the subject.",
    videoUrl: "videos/1.mp4",
    thumbnail: "images/artworks/IMG_20221110_183351_400.jpg",
    duration: "2:30",
    category: "Portrait Art"
  },
  {
    id: 2,
    title: "Digital Art Creation Process",
    description: "Explore the digital realm where technology meets creativity. See how digital tools transform ideas into stunning visual art.",
    videoUrl: "videos/2.mp4",
    thumbnail: "images/artworks/IMG_20221022_135924.jpg",
    duration: "3:15",
    category: "Digital Art"
  },
  {
    id: 3,
    title: "Painting Techniques & Methods",
    description: "Discover traditional painting techniques that have been refined over years of practice. Learn about color mixing, brushwork, and composition.",
    videoUrl: "videos/3.mp4",
    thumbnail: "images/artworks/IMG_20221106_125129_724.jpg",
    duration: "4:20",
    category: "Traditional Painting"
  }
]

function VideoPlayer({ video, index }) {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const controls = useAnimation()
  const isInView = useInView(videoRef, { margin: "-20%", once: false })

  useEffect(() => {
    if (isInView && !isPlaying && isVideoLoaded) {
      // Auto-play when in view and video is loaded
      const playPromise = videoRef.current?.play()
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setIsPlaying(true)
        }).catch(() => {
          console.log('Auto-play prevented by browser')
          // Still show play button even if autoplay is prevented
        })
      }
    } else if (!isInView && isPlaying) {
      // Pause when out of view
      videoRef.current?.pause()
      setIsPlaying(false)
    }
  }, [isInView, isPlaying, isVideoLoaded])

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current?.pause()
      setIsPlaying(false)
    } else {
      videoRef.current?.play()
      setIsPlaying(true)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
      setIsVideoLoaded(true)
    }
  }

  const handleCanPlay = () => {
    setIsVideoLoaded(true)
  }

  const handleVideoError = () => {
    console.log('Video failed to load:', video.videoUrl)
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true, margin: "-10%" }}
      className="relative group"
    >
      <Card className="overflow-hidden bg-white/95 backdrop-blur-sm border border-gray-200/50 shadow-2xl hover:shadow-4xl transition-all duration-700 hover:scale-105">
        <CardContent className="p-0">
          <div className="relative">
            {/* Video Player */}
            <div className="relative w-full h-64 md:h-80 lg:h-96 bg-gradient-to-br from-gray-900 to-gray-700 overflow-hidden">
              <video
                ref={videoRef}
                src={video.videoUrl}
                poster={video.thumbnail}
                className="w-full h-full object-cover"
                muted={isMuted}
                loop
                playsInline
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onCanPlay={handleCanPlay}
                onError={handleVideoError}
                preload="metadata"
              />
              
              {/* Loading State */}
              {!isVideoLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white/80 text-sm">Loading video...</p>
                  </div>
                </div>
              )}

              {/* Fallback/Poster Image */}
              {!isVideoLoaded && (
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Play/Pause Button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  onClick={togglePlay}
                  size="lg"
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 rounded-full w-16 h-16 flex items-center justify-center shadow-xl"
                >
                  {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                </Button>
              </div>

              {/* Controls */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center gap-3">
                  {/* Progress Bar */}
                  <div className="flex-1 bg-white/20 rounded-full h-1 overflow-hidden">
                    <div 
                      className="bg-white h-full transition-all duration-100"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  
                  {/* Time Display */}
                  <span className="text-white text-xs font-medium">
                    {formatTime(videoRef.current?.currentTime || 0)} / {formatTime(duration)}
                  </span>
                  
                  {/* Mute Button */}
                  <Button
                    onClick={toggleMute}
                    size="sm"
                    variant="ghost"
                    className="text-white hover:text-white hover:bg-white/20 p-1"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                  {video.category}
                </span>
              </div>

              {/* Duration Badge */}
              <div className="absolute top-4 right-4">
                <span className="bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-medium">
                  {video.duration}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-playfair font-bold text-gray-800 mb-3 group-hover:text-primary transition-colors">
                {video.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {video.description}
              </p>
              
              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={togglePlay}
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-white flex-1"
                >
                  {isPlaying ? (
                    <><Pause className="w-4 h-4 mr-2" /> Pause</>
                  ) : (
                    <><Play className="w-4 h-4 mr-2" /> Play</>
                  )}
                </Button>
                
                <Button
                  onClick={toggleMute}
                  size="sm"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-white"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function ArtistVideosSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gold-50/30 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-gold-500/10 px-6 py-2 rounded-full mb-6">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-primary font-medium text-sm">Behind the Scenes</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-playfair font-bold text-gray-800 mb-6 leading-tight">
            Watch My Creative Process
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Step into my studio and witness the transformation of ideas into art. 
            Each video captures a different aspect of my artistic journey.
          </p>
          
          {/* Decorative Elements */}
          <div className="flex justify-center items-center gap-6 mt-12">
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-gold-500 rounded-full animate-pulse delay-100"></div>
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse delay-200"></div>
            </div>
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          </div>
        </motion.div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
          {videos.map((video, index) => (
            <VideoPlayer key={video.id} video={video} index={index} />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-r from-primary/5 to-gold-500/5 rounded-2xl p-8 max-w-2xl mx-auto">
            <p className="text-gray-700 text-lg mb-6 font-medium">
              Want to see more behind-the-scenes content?
            </p>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-primary to-gold-500 hover:from-primary/90 hover:to-gold-500/90 text-white px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              Follow My Journey
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}