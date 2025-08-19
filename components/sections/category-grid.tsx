'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const categories = [
  {
    id: 1,
    title: 'МУЖЧИНАМ',
    subtitle: 'Коллекция для мужчин',
    imageNumber: 4,
    href: '/men'
  },
  {
    id: 2,
    title: 'ЖЕНЩИНАМ',
    subtitle: 'Коллекция для женщин',
    imageNumber: 5,
    href: '/women'
  },
  {
    id: 3,
    title: 'НОВИНКИ',
    subtitle: 'Последние поступления',
    imageNumber: 6,
    href: '/new-arrivals'
  },
  {
    id: 4,
    title: 'РАСПРОДАЖА',
    subtitle: 'Специальные предложения',
    imageNumber: 7,
    href: '/sale'
  }
]

export function CategoryGrid() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="stone-font-bold text-3xl md:text-4xl mb-4">
            КАТЕГОРИИ
          </h2>
          <p className="stone-font-light text-gray-600 max-w-2xl mx-auto">
            Исследуйте наши коллекции и найдите свой уникальный стиль
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={category.href} className="group block">
                <div className="relative overflow-hidden bg-gray-100 aspect-[4/5]">
                  {/* Image Placeholder */}
                  <div className="absolute inset-0 image-placeholder group-hover:scale-105 transition-transform duration-500">
                    <span className="text-4xl font-bold text-gray-400">
                      {category.imageNumber}
                    </span>
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <div className="text-white">
                      <h3 className="stone-font-bold text-2xl md:text-3xl mb-2 group-hover:translate-y-[-4px] transition-transform duration-300">
                        {category.title}
                      </h3>
                      <p className="stone-font-light text-sm opacity-90 group-hover:translate-y-[-2px] transition-transform duration-300">
                        {category.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 