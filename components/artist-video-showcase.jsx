'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, ChevronDown } from 'lucide-react';

const allVideoData = [
  {
    id: 1,
    title: "Creating Digital Masterpieces",
    description: "Watch as I transform blank canvases into stunning digital artworks using advanced techniques and creative vision.",
    videoUrl: "/videos/1.mp4",
    category: "Digital Art",
    duration: "2:30"
  },
  {
    id: 2,
    title: "Portrait Painting Process",
    description: "Step-by-step journey through creating lifelike portraits that capture the essence and emotion of the subject.",
    videoUrl: "/videos/2.mp4",
    category: "Portraits",
    duration: "3:15"
  },
  {
    id: 3,
    title: "Custom T-Shirt Design",
    description: "From concept to wearable art - see how unique t-shirt designs come to life with vibrant colors and creative patterns.",
    videoUrl: "/videos/3.mp4",
    category: "Fashion Design",
    duration: "1:45"
  },
  {
    id: 4,
    title: "Abstract Art Creation",
    description: "Explore the world of abstract expressionism through dynamic brushwork and color theory.",
    videoUrl: "/videos/4.mp4",
    category: "Abstract Art",
    duration: "4:20"
  },
  {
    id: 5,
    title: "Watercolor Techniques",
    description: "Master the delicate art of watercolor painting with professional techniques and tips.",
    videoUrl: "/videos/5.mp4",
    category: "Watercolor",
    duration: "2:45"
  },
  {
    id: 6,
    title: "Digital Illustration",
    description: "Create stunning digital illustrations using modern tools and artistic expertise.",
    videoUrl: "/videos/6.mp4",
    category: "Digital Illustration",
    duration: "3:30"
  }
];

export default function ArtistVideoShowcase() {
  const [showAllVideos, setShowAllVideos] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRefs = useRef([]);
  const sectionRef = useRef(null);

  const displayedVideos = showAllVideos ? allVideoData : allVideoData.slice(0, 3);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRefs.current.forEach((video, index) => {
              if (video && index === currentVideo) {
                video.play().catch(() => {
                  console.log('Autoplay prevented');
                });
                setIsPlaying(true);
              }
            });
          } else {
            videoRefs.current.forEach((video) => {
              if (video) {
                video.pause();
                setIsPlaying(false);
              }
            });
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [currentVideo]);

  const handleVideoEnd = () => {
    const nextVideo = (currentVideo + 1) % displayedVideos.length;
    setCurrentVideo(nextVideo);
  };

  const togglePlayPause = (index) => {
    const video = videoRefs.current[index];
    if (video) {
      if (video.paused) {
        video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.muted = !isMuted;
      }
    });
    setIsMuted(!isMuted);
  };

  const updateProgress = (index) => {
    const video = videoRefs.current[index];
    if (video) {
      const progress = (video.currentTime / video.duration) * 100;
      setProgress(progress);
    }
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-yellow-50 via-white to-orange-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-yellow-200/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-orange-200/20 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-yellow-300/10 to-orange-300/10 rounded-full blur-2xl animate-bounce" style={{animationDuration: '4s'}}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-playfair font-bold bg-gradient-to-r from-yellow-600 via-orange-600 to-yellow-700 bg-clip-text text-transparent mb-4">
              Art in Motion
            </h2>
          </motion.div>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="w-24 h-1 bg-gradient-to-r from-yellow-600 to-orange-600 mx-auto mb-6"
          ></motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Step into my creative world through these exclusive behind-the-scenes videos. 
            Witness the transformation of ideas into stunning artworks that speak to the soul.
          </motion.p>
        </motion.div>

        <div className="space-y-24">
          {displayedVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              <div className={`relative ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="relative group">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80 backdrop-blur-sm bg-white/10 transform hover:scale-105 transition-transform duration-500">
                    <video
                      ref={(el) => (videoRefs.current[index] = el)}
                      src={video.videoUrl}
                      className="w-full aspect-video object-cover"
                      muted={isMuted}
                      loop={false}
                      playsInline
                      autoPlay
                      onEnded={handleVideoEnd}
                      onTimeUpdate={() => updateProgress(index)}
                      poster="/images/artworks/placeholder-artwork.jpg"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="absolute bottom-0 left-0 right-0 h-2 bg-black/40">
                        <div 
                          className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-100 rounded-full"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      
                      <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                        <button
                          onClick={() => togglePlayPause(index)}
                          className="bg-white/95 hover:bg-white text-yellow-700 p-4 rounded-full shadow-xl transition-all duration-200 hover:scale-110 backdrop-blur-sm"
                        >
                          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                        </button>
                        
                        <button
                          onClick={toggleMute}
                          className="bg-white/95 hover:bg-white text-yellow-700 p-4 rounded-full shadow-xl transition-all duration-200 hover:scale-110 backdrop-blur-sm"
                        >
                          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                        </button>
                      </div>
                      
                      <div className="absolute top-6 right-6 bg-black/80 text-white px-4 py-2 rounded-full text-sm font-bold backdrop-blur-sm">
                        {video.duration}
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full opacity-20 blur-xl"></div>
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full opacity-20 blur-xl"></div>
                </div>
              </div>

              <div className={`space-y-8 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="inline-block"
                >
                  <span className="px-6 py-3 bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-700 font-bold text-sm rounded-full border-2 border-yellow-200 shadow-sm">
                    {video.category}
                  </span>
                </motion.div>
                
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="text-4xl md:text-5xl font-playfair font-bold bg-gradient-to-r from-yellow-800 to-orange-800 bg-clip-text text-transparent leading-tight"
                >
                  {video.title}
                </motion.h3>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="text-xl text-muted-foreground leading-relaxed"
                >
                  {video.description}
                </motion.p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-3 gap-6 pt-6"
                >
                  <div className="text-center bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-yellow-100">
                    <div className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-2">{index + 1}</div>
                    <div className="text-sm font-semibold text-yellow-700">Video</div>
                  </div>
                  <div className="text-center bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-yellow-100">
                    <div className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-2">{video.duration}</div>
                    <div className="text-sm font-semibold text-yellow-700">Duration</div>
                  </div>
                  <div className="text-center bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-yellow-100">
                    <div className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-2">4K</div>
                    <div className="text-sm font-semibold text-yellow-700">Quality</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {!showAllVideos && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAllVideos(true)}
              className="bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-600 hover:from-yellow-600 hover:via-orange-600 hover:to-yellow-700 text-white px-10 py-5 rounded-full font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-yellow-500/25 flex items-center gap-4 mx-auto"
            >
              <span>Watch More Videos</span>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <ChevronDown size={24} />
              </motion.div>
            </motion.button>
          </motion.div>
        )}

        {showAllVideos && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-20"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-600 hover:from-yellow-600 hover:via-orange-600 hover:to-yellow-700 text-white px-10 py-5 rounded-full font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-yellow-500/25"
            >
              Want to See More?
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
}