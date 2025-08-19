'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingBag, User, Search, Menu, X } from 'lucide-react'
import { useCart } from '@/hooks/use-cart'
import { useAuth } from '@/hooks/use-auth'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { items } = useCart()
  const { user } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const cartItemsCount = items.length

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="text-2xl lg:text-3xl font-bold stone-font">
              STONE ISLAND
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/men" className="stone-font text-sm hover:text-gray-600 transition-colors">
              МУЖЧИНАМ
            </Link>
            <Link href="/women" className="stone-font text-sm hover:text-gray-600 transition-colors">
              ЖЕНЩИНАМ
            </Link>
            <Link href="/new-arrivals" className="stone-font text-sm hover:text-gray-600 transition-colors">
              НОВИНКИ
            </Link>
            <Link href="/sale" className="stone-font text-sm hover:text-gray-600 transition-colors">
              РАСПРОДАЖА
            </Link>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Search className="h-5 w-5" />
            </button>
            
            <Link href="/account" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <User className="h-5 w-5" />
            </Link>
            
            <Link href="/cart" className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
              <ShoppingBag className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            <nav className="px-4 py-6 space-y-4">
              <Link 
                href="/men" 
                className="block stone-font text-sm hover:text-gray-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                МУЖЧИНАМ
              </Link>
              <Link 
                href="/women" 
                className="block stone-font text-sm hover:text-gray-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                ЖЕНЩИНАМ
              </Link>
              <Link 
                href="/new-arrivals" 
                className="block stone-font text-sm hover:text-gray-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                НОВИНКИ
              </Link>
              <Link 
                href="/sale" 
                className="block stone-font text-sm hover:text-gray-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                РАСПРОДАЖА
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
} 