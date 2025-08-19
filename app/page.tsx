import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { HeroSection } from '@/components/sections/hero-section'
import { FeaturedProducts } from '@/components/sections/featured-products'
import { NewsletterSection } from '@/components/sections/newsletter-section'
import { CategoryGrid } from '@/components/sections/category-grid'

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <HeroSection />
        <CategoryGrid />
        <FeaturedProducts />
        <NewsletterSection />
      </main>
      <Footer />
    </>
  )
} 