'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const heroSlides = [
  {
    id: 1,
    title: 'НОВИНКИ СЕЗОНА',
    subtitle: 'Откройте для себя последние коллекции',
    cta: 'СМОТРЕТЬ КОЛЛЕКЦИЮ',
    imageNumber: 1
  },
  {
    id: 2,
    title: 'ПРЕМИУМ КАЧЕСТВО',
    subtitle: 'Инновационные материалы и технологии',
    cta: 'ИЗУЧИТЬ ТЕХНОЛОГИИ',
    imageNumber: 2
  },
  {
    id: 3,
    title: 'ЭКСКЛЮЗИВНЫЕ МОДЕЛИ',
    subtitle: 'Ограниченные серии для истинных ценителей',
    cta: 'НАЙТИ ЭКСКЛЮЗИВ',
    imageNumber: 3
  }
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  return (
    <section className="relative h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {/* Image Placeholder */}
          <div className="absolute inset-0 image-placeholder">
            <span className="text-6xl font-bold text-gray-400">
              {heroSlides[currentSlide].imageNumber}
            </span>
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-20" />

          {/* Content */}
          <div className="relative h-full flex items-center justify-center">
            <div className="text-center text-white max-w-4xl mx-auto px-4">
              <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="stone-font-bold text-4xl md:text-6xl lg:text-7xl mb-6"
              >
                {heroSlides[currentSlide].title}
              </motion.h1>
              
              <motion.p
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="stone-font-light text-lg md:text-xl lg:text-2xl mb-8 text-gray-200"
              >
                {heroSlides[currentSlide].subtitle}
              </motion.p>
              
              <motion.button
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="stone-font bg-white text-black px-8 py-4 text-sm uppercase tracking-wider hover:bg-gray-100 transition-colors duration-300"
              >
                {heroSlides[currentSlide].cta}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 p-3 transition-all duration-300"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 p-3 transition-all duration-300"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white' 
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
          />
        ))}
      </div>
    </section>
  )
} 