'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, ShoppingBag } from 'lucide-react'
import { useCart } from '@/hooks/use-cart'

const featuredProducts = [
  {
    id: 1,
    name: 'Куртка Stone Island',
    price: 45000,
    originalPrice: 55000,
    category: 'Верхняя одежда',
    imageNumber: 8,
    isNew: true,
    isSale: false
  },
  {
    id: 2,
    name: 'Свитер из мериноса',
    price: 28000,
    originalPrice: 28000,
    category: 'Свитера',
    imageNumber: 9,
    isNew: false,
    isSale: false
  },
  {
    id: 3,
    name: 'Джинсы с технологией',
    price: 32000,
    originalPrice: 40000,
    category: 'Джинсы',
    imageNumber: 10,
    isNew: false,
    isSale: true
  },
  {
    id: 4,
    name: 'Футболка премиум',
    price: 15000,
    originalPrice: 15000,
    category: 'Футболки',
    imageNumber: 11,
    isNew: true,
    isSale: false
  },
  {
    id: 5,
    name: 'Брюки классические',
    price: 22000,
    originalPrice: 28000,
    category: 'Брюки',
    imageNumber: 12,
    isNew: false,
    isSale: true
  },
  {
    id: 6,
    name: 'Пальто зимнее',
    price: 65000,
    originalPrice: 65000,
    category: 'Пальто',
    imageNumber: 13,
    isNew: true,
    isSale: false
  },
  {
    id: 7,
    name: 'Рубашка хлопковая',
    price: 18000,
    originalPrice: 22000,
    category: 'Рубашки',
    imageNumber: 14,
    isNew: false,
    isSale: true
  },
  {
    id: 8,
    name: 'Шарф кашемировый',
    price: 12000,
    originalPrice: 12000,
    category: 'Аксессуары',
    imageNumber: 15,
    isNew: false,
    isSale: false
  }
]

export function FeaturedProducts() {
  const { addItem } = useCart()
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price)
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="stone-font-bold text-3xl md:text-4xl mb-4">
            ИЗБРАННЫЕ ТОВАРЫ
          </h2>
          <p className="stone-font-light text-gray-600 max-w-2xl mx-auto">
            Откройте для себя наши самые популярные и новые поступления
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="relative overflow-hidden aspect-[3/4]">
                {/* Image Placeholder */}
                <div className="absolute inset-0 image-placeholder group-hover:scale-105 transition-transform duration-500">
                  <span className="text-3xl font-bold text-gray-400">
                    {product.imageNumber}
                  </span>
                </div>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.isNew && (
                    <span className="bg-black text-white px-2 py-1 text-xs stone-font">
                      НОВИНКА
                    </span>
                  )}
                  {product.isSale && (
                    <span className="bg-red-600 text-white px-2 py-1 text-xs stone-font">
                      СКИДКА
                    </span>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-white p-2 hover:bg-gray-100 transition-colors">
                    <Heart className="h-4 w-4" />
                  </button>
                  <button 
                    className="bg-white p-2 hover:bg-gray-100 transition-colors"
                    onClick={() => addItem(product)}
                  >
                    <ShoppingBag className="h-4 w-4" />
                  </button>
                </div>

                {/* Quick Add Button */}
                <div className={`absolute bottom-4 left-4 right-4 transition-all duration-300 ${
                  hoveredProduct === product.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  <button 
                    className="w-full bg-black text-white py-3 text-sm stone-font hover:bg-gray-800 transition-colors"
                    onClick={() => addItem(product)}
                  >
                    ДОБАВИТЬ В КОРЗИНУ
                  </button>
                </div>
              </div>

              <div className="p-4">
                <p className="stone-font-light text-sm text-gray-500 mb-1">
                  {product.category}
                </p>
                <h3 className="stone-font text-lg mb-2 group-hover:text-gray-600 transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="stone-font-bold text-lg">
                    {formatPrice(product.price)} ₽
                  </span>
                  {product.originalPrice !== product.price && (
                    <span className="stone-font-light text-sm text-gray-500 line-through">
                      {formatPrice(product.originalPrice)} ₽
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/products" 
            className="stone-font bg-black text-white px-8 py-4 text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors duration-300 inline-block"
          >
            СМОТРЕТЬ ВСЕ ТОВАРЫ
          </Link>
        </div>
      </div>
    </section>
  )
} 