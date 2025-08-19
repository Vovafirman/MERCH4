'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'

export function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail('')
      // Здесь будет логика отправки email
    }
  }

  return (
    <section className="py-16 bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="stone-font-bold text-3xl md:text-4xl mb-4">
            ПОДПИСАТЬСЯ НА НОВОСТИ
          </h2>
          <p className="stone-font-light text-gray-300 mb-8 max-w-2xl mx-auto">
            Получайте первыми информацию о новых коллекциях, эксклюзивных предложениях и специальных событиях
          </p>

          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ваш email адрес"
                    className="w-full pl-10 pr-4 py-3 bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white stone-font"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="stone-font bg-white text-black px-8 py-3 text-sm uppercase tracking-wider hover:bg-gray-100 transition-colors duration-300 whitespace-nowrap"
                >
                  ПОДПИСАТЬСЯ
                </button>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-600 text-white px-6 py-4 rounded"
            >
              <p className="stone-font">Спасибо! Вы успешно подписались на новости.</p>
            </motion.div>
          )}

          <p className="stone-font-light text-xs text-gray-400 mt-4">
            Подписываясь, вы соглашаетесь с нашей{' '}
            <a href="/privacy" className="underline hover:text-white transition-colors">
              Политикой конфиденциальности
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
} 