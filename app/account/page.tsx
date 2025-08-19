'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { useAuth } from '@/hooks/use-auth'
import { User, LogOut, ShoppingBag, Heart, Settings } from 'lucide-react'

export default function AccountPage() {
  const { user, isAuthenticated, login, logout } = useAuth()
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isLogin) {
      // Простая имитация входа
      login({
        id: '1',
        email: formData.email,
        name: formData.name || 'Пользователь',
        role: 'user'
      })
    } else {
      // Простая имитация регистрации
      login({
        id: '1',
        email: formData.email,
        name: formData.name,
        role: 'user'
      })
    }
  }

  const handleLogout = () => {
    logout()
  }

  if (isAuthenticated && user) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 pt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="stone-font-bold text-3xl mb-8">МОЙ АККАУНТ</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Sidebar */}
              <div className="md:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="stone-font-bold">{user.name}</h3>
                      <p className="stone-font-light text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  
                  <nav className="space-y-2">
                    <a href="#" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <ShoppingBag className="h-5 w-5" />
                      <span className="stone-font">Мои заказы</span>
                    </a>
                    <a href="#" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <Heart className="h-5 w-5" />
                      <span className="stone-font">Избранное</span>
                    </a>
                    <a href="#" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <Settings className="h-5 w-5" />
                      <span className="stone-font">Настройки</span>
                    </a>
                  </nav>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-6 w-full"
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="stone-font">Выйти</span>
                  </button>
                </div>
              </div>

              {/* Main Content */}
              <div className="md:col-span-2">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="stone-font-bold text-xl mb-6">ПРОФИЛЬ</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block stone-font-light text-sm text-gray-600 mb-2">
                        Имя
                      </label>
                      <input
                        type="text"
                        value={user.name}
                        className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black stone-font"
                        readOnly
                      />
                    </div>
                    
                    <div>
                      <label className="block stone-font-light text-sm text-gray-600 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={user.email}
                        className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black stone-font"
                        readOnly
                      />
                    </div>
                    
                    <div>
                      <label className="block stone-font-light text-sm text-gray-600 mb-2">
                        Роль
                      </label>
                      <input
                        type="text"
                        value={user.role === 'admin' ? 'Администратор' : 'Пользователь'}
                        className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black stone-font"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </div>
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
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="text-center mb-8">
              <h1 className="stone-font-bold text-2xl mb-2">
                {isLogin ? 'ВОЙТИ В АККАУНТ' : 'СОЗДАТЬ АККАУНТ'}
              </h1>
              <p className="stone-font-light text-gray-600">
                {isLogin ? 'Войдите в свой аккаунт для продолжения' : 'Создайте аккаунт для начала покупок'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div>
                  <label className="block stone-font-light text-sm text-gray-600 mb-2">
                    Имя
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black stone-font"
                    required={!isLogin}
                  />
                </div>
              )}
              
              <div>
                <label className="block stone-font-light text-sm text-gray-600 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black stone-font"
                  required
                />
              </div>
              
              <div>
                <label className="block stone-font-light text-sm text-gray-600 mb-2">
                  Пароль
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black stone-font"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full stone-font bg-black text-white py-4 text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors duration-300"
              >
                {isLogin ? 'ВОЙТИ' : 'СОЗДАТЬ АККАУНТ'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="stone-font-light text-sm text-gray-600 hover:text-black transition-colors"
              >
                {isLogin ? 'Нет аккаунта? Создать' : 'Уже есть аккаунт? Войти'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
} 