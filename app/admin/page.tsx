'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { useAuth } from '@/hooks/use-auth'
import { 
  BarChart3, 
  ShoppingBag, 
  Users, 
  DollarSign, 
  Upload, 
  Settings,
  TrendingUp,
  Package,
  Eye
} from 'lucide-react'

// Моковые данные для демонстрации
const mockOrders = [
  { id: 1, customer: 'Иван Петров', amount: 45000, status: 'Выполнен', date: '2024-01-15' },
  { id: 2, customer: 'Мария Сидорова', amount: 28000, status: 'В обработке', date: '2024-01-14' },
  { id: 3, customer: 'Алексей Козлов', amount: 65000, status: 'Отправлен', date: '2024-01-13' },
  { id: 4, customer: 'Елена Воробьева', amount: 32000, status: 'Выполнен', date: '2024-01-12' },
  { id: 5, customer: 'Дмитрий Соколов', amount: 18000, status: 'В обработке', date: '2024-01-11' },
]

const mockStats = {
  totalSales: 188000,
  totalOrders: 5,
  totalCustomers: 5,
  averageOrder: 37600
}

export default function AdminPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [uploadedImages, setUploadedImages] = useState<string[]>([])

  // Проверка на админа
  if (!user || user.role !== 'admin') {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 pt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="stone-font-bold text-3xl md:text-4xl mb-4">
                ДОСТУП ЗАПРЕЩЕН
              </h1>
              <p className="stone-font-light text-gray-600">
                У вас нет прав для доступа к админ панели
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file))
      setUploadedImages(prev => [...prev, ...newImages])
    }
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="stone-font-bold text-3xl mb-8">АДМИН ПАНЕЛЬ</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab('dashboard')}
                    className={`flex items-center gap-3 p-3 w-full rounded-lg transition-colors ${
                      activeTab === 'dashboard' ? 'bg-black text-white' : 'hover:bg-gray-50'
                    }`}
                  >
                    <BarChart3 className="h-5 w-5" />
                    <span className="stone-font">Дашборд</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className={`flex items-center gap-3 p-3 w-full rounded-lg transition-colors ${
                      activeTab === 'orders' ? 'bg-black text-white' : 'hover:bg-gray-50'
                    }`}
                  >
                    <ShoppingBag className="h-5 w-5" />
                    <span className="stone-font">Заказы</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('content')}
                    className={`flex items-center gap-3 p-3 w-full rounded-lg transition-colors ${
                      activeTab === 'content' ? 'bg-black text-white' : 'hover:bg-gray-50'
                    }`}
                  >
                    <Upload className="h-5 w-5" />
                    <span className="stone-font">Контент</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('customers')}
                    className={`flex items-center gap-3 p-3 w-full rounded-lg transition-colors ${
                      activeTab === 'customers' ? 'bg-black text-white' : 'hover:bg-gray-50'
                    }`}
                  >
                    <Users className="h-5 w-5" />
                    <span className="stone-font">Клиенты</span>
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="stone-font-light text-sm text-gray-600">Общие продажи</p>
                          <p className="stone-font-bold text-2xl">{formatPrice(mockStats.totalSales)} ₽</p>
                        </div>
                        <DollarSign className="h-8 w-8 text-green-600" />
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="stone-font-light text-sm text-gray-600">Заказы</p>
                          <p className="stone-font-bold text-2xl">{mockStats.totalOrders}</p>
                        </div>
                        <Package className="h-8 w-8 text-blue-600" />
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="stone-font-light text-sm text-gray-600">Клиенты</p>
                          <p className="stone-font-bold text-2xl">{mockStats.totalCustomers}</p>
                        </div>
                        <Users className="h-8 w-8 text-purple-600" />
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="stone-font-light text-sm text-gray-600">Средний заказ</p>
                          <p className="stone-font-bold text-2xl">{formatPrice(mockStats.averageOrder)} ₽</p>
                        </div>
                        <TrendingUp className="h-8 w-8 text-orange-600" />
                      </div>
                    </div>
                  </div>

                  {/* Recent Orders */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="stone-font-bold text-xl mb-6">ПОСЛЕДНИЕ ЗАКАЗЫ</h2>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left p-3 stone-font-light text-sm text-gray-600">ID</th>
                            <th className="text-left p-3 stone-font-light text-sm text-gray-600">Клиент</th>
                            <th className="text-left p-3 stone-font-light text-sm text-gray-600">Сумма</th>
                            <th className="text-left p-3 stone-font-light text-sm text-gray-600">Статус</th>
                            <th className="text-left p-3 stone-font-light text-sm text-gray-600">Дата</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mockOrders.slice(0, 5).map((order) => (
                            <tr key={order.id} className="border-b border-gray-100">
                              <td className="p-3 stone-font">#{order.id}</td>
                              <td className="p-3 stone-font">{order.customer}</td>
                              <td className="p-3 stone-font">{formatPrice(order.amount)} ₽</td>
                              <td className="p-3">
                                <span className={`px-2 py-1 rounded-full text-xs stone-font ${
                                  order.status === 'Выполнен' ? 'bg-green-100 text-green-800' :
                                  order.status === 'В обработке' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-blue-100 text-blue-800'
                                }`}>
                                  {order.status}
                                </span>
                              </td>
                              <td className="p-3 stone-font-light text-sm">{order.date}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="stone-font-bold text-xl mb-6">ВСЕ ЗАКАЗЫ</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left p-3 stone-font-light text-sm text-gray-600">ID</th>
                          <th className="text-left p-3 stone-font-light text-sm text-gray-600">Клиент</th>
                          <th className="text-left p-3 stone-font-light text-sm text-gray-600">Сумма</th>
                          <th className="text-left p-3 stone-font-light text-sm text-gray-600">Статус</th>
                          <th className="text-left p-3 stone-font-light text-sm text-gray-600">Дата</th>
                          <th className="text-left p-3 stone-font-light text-sm text-gray-600">Действия</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockOrders.map((order) => (
                          <tr key={order.id} className="border-b border-gray-100">
                            <td className="p-3 stone-font">#{order.id}</td>
                            <td className="p-3 stone-font">{order.customer}</td>
                            <td className="p-3 stone-font">{formatPrice(order.amount)} ₽</td>
                            <td className="p-3">
                              <span className={`px-2 py-1 rounded-full text-xs stone-font ${
                                order.status === 'Выполнен' ? 'bg-green-100 text-green-800' :
                                order.status === 'В обработке' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-blue-100 text-blue-800'
                              }`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="p-3 stone-font-light text-sm">{order.date}</td>
                            <td className="p-3">
                              <button className="p-1 text-blue-600 hover:text-blue-800 transition-colors">
                                <Eye className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'content' && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="stone-font-bold text-xl mb-6">УПРАВЛЕНИЕ КОНТЕНТОМ</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="stone-font-bold text-lg mb-4">Главная страница - Карусель изображений</h3>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="stone-font-light text-gray-600 mb-4">
                          Загрузите изображения для главной карусели
                        </p>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="image-upload"
                        />
                        <label
                          htmlFor="image-upload"
                          className="stone-font bg-black text-white px-6 py-3 text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors duration-300 cursor-pointer inline-block"
                        >
                          ВЫБРАТЬ ФАЙЛЫ
                        </label>
                      </div>
                    </div>

                    {uploadedImages.length > 0 && (
                      <div>
                        <h3 className="stone-font-bold text-lg mb-4">Загруженные изображения</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {uploadedImages.map((image, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={image}
                                alt={`Uploaded ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg"
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                                <button className="text-white hover:text-red-400 transition-colors">
                                  Удалить
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'customers' && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="stone-font-bold text-xl mb-6">КЛИЕНТЫ</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left p-3 stone-font-light text-sm text-gray-600">ID</th>
                          <th className="text-left p-3 stone-font-light text-sm text-gray-600">Имя</th>
                          <th className="text-left p-3 stone-font-light text-sm text-gray-600">Email</th>
                          <th className="text-left p-3 stone-font-light text-sm text-gray-600">Заказов</th>
                          <th className="text-left p-3 stone-font-light text-sm text-gray-600">Общая сумма</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockOrders.map((order) => (
                          <tr key={order.id} className="border-b border-gray-100">
                            <td className="p-3 stone-font">#{order.id}</td>
                            <td className="p-3 stone-font">{order.customer}</td>
                            <td className="p-3 stone-font-light">{order.customer.toLowerCase().replace(' ', '.')}@example.com</td>
                            <td className="p-3 stone-font">1</td>
                            <td className="p-3 stone-font">{formatPrice(order.amount)} ₽</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
} 