import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="stone-font-bold text-lg mb-4">STONE ISLAND</h3>
            <p className="stone-font-light text-sm text-gray-300 mb-4">
              Премиальный бренд одежды, известный своими инновационными материалами и технологиями.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="stone-font-bold text-sm mb-4">МАГАЗИН</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/men" className="stone-font-light text-sm text-gray-300 hover:text-white transition-colors">
                  Мужчинам
                </Link>
              </li>
              <li>
                <Link href="/women" className="stone-font-light text-sm text-gray-300 hover:text-white transition-colors">
                  Женщинам
                </Link>
              </li>
              <li>
                <Link href="/new-arrivals" className="stone-font-light text-sm text-gray-300 hover:text-white transition-colors">
                  Новинки
                </Link>
              </li>
              <li>
                <Link href="/sale" className="stone-font-light text-sm text-gray-300 hover:text-white transition-colors">
                  Распродажа
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="stone-font-bold text-sm mb-4">ПОДДЕРЖКА</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="stone-font-light text-sm text-gray-300 hover:text-white transition-colors">
                  Контакты
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="stone-font-light text-sm text-gray-300 hover:text-white transition-colors">
                  Доставка
                </Link>
              </li>
              <li>
                <Link href="/returns" className="stone-font-light text-sm text-gray-300 hover:text-white transition-colors">
                  Возврат
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="stone-font-light text-sm text-gray-300 hover:text-white transition-colors">
                  Размеры
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="stone-font-bold text-sm mb-4">ПРАВОВАЯ ИНФОРМАЦИЯ</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="stone-font-light text-sm text-gray-300 hover:text-white transition-colors">
                  Политика конфиденциальности
                </Link>
              </li>
              <li>
                <Link href="/terms" className="stone-font-light text-sm text-gray-300 hover:text-white transition-colors">
                  Условия использования
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="stone-font-light text-sm text-gray-300 hover:text-white transition-colors">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="stone-font-light text-sm text-gray-300">
              © 2024 Stone Island Clone. Все права защищены.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <img src="/visa.svg" alt="Visa" className="h-6" />
              <img src="/mastercard.svg" alt="Mastercard" className="h-6" />
              <img src="/paypal.svg" alt="PayPal" className="h-6" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 