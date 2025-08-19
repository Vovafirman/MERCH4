'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { useCart } from '@/hooks/use-cart'
import { Trash2, Minus, Plus, ArrowLeft } from 'lucide-react'

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price)
  }

  const handleCheckout = () => {
    setIsCheckingOut(true)
    // Здесь будет интеграция с ЮKassa
    setTimeout(() => {
      setIsCheckingOut(false)
      alert('Интеграция с ЮKassa будет добавлена позже')
    }, 1000)
  }

  if (items.length === 0) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 pt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="stone-font-bold text-3xl md:text-4xl mb-4">
                КОРЗИНА ПУСТА
              </h1>
              <p className="stone-font-light text-gray-600 mb-8">
                Добавьте товары в корзину, чтобы продолжить покупки
              </p>
              <Link 
                href="/"
                className="stone-font bg-black text-white px-8 py-4 text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors duration-300 inline-flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                ПРОДОЛЖИТЬ ПОКУПКИ
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-2 mb-8">
            <Link href="/" className="text-gray-600 hover:text-black transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="stone-font-bold text-3xl">КОРЗИНА</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="stone-font-bold text-xl">
                    Товары ({items.length})
                  </h2>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <div key={item.id} className="p-6 flex items-center gap-4">
                      {/* Product Image */}
                      <div className="w-24 h-24 bg-gray-100 image-placeholder flex-shrink-0">
                        <span className="text-lg font-bold text-gray-400">
                          {item.imageNumber}
                        </span>
                      </div>

                      {/* Product Info */}
                      <div className="flex-1">
                        <h3 className="stone-font text-lg mb-1">{item.name}</h3>
                        <p className="stone-font-light text-sm text-gray-500 mb-2">
                          {item.category}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="stone-font-bold text-lg">
                            {formatPrice(item.price)} ₽
                          </span>
                          {item.originalPrice && item.originalPrice !== item.price && (
                            <span className="stone-font-light text-sm text-gray-500 line-through">
                              {formatPrice(item.originalPrice)} ₽
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100 transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="stone-font w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="p-6 border-t border-gray-200">
                  <button
                    onClick={clearCart}
                    className="stone-font-light text-sm text-gray-500 hover:text-red-500 transition-colors"
                  >
                    Очистить корзину
                  </button>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="stone-font-bold text-xl mb-6">ИТОГО ЗАКАЗА</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="stone-font-light text-gray-600">Товары ({items.length})</span>
                    <span className="stone-font">{formatPrice(getTotal())} ₽</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="stone-font-light text-gray-600">Доставка</span>
                    <span className="stone-font">Бесплатно</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between">
                      <span className="stone-font-bold text-lg">Итого</span>
                      <span className="stone-font-bold text-lg">{formatPrice(getTotal())} ₽</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full stone-font bg-black text-white py-4 text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCheckingOut ? 'ОБРАБОТКА...' : 'ОФОРМИТЬ ЗАКАЗ'}
                </button>

                <p className="stone-font-light text-xs text-gray-500 mt-4 text-center">
                  Нажимая "Оформить заказ", вы соглашаетесь с условиями покупки
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
} 