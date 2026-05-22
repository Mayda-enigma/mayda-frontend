"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { QrCode, Globe, Utensils, Clock, Star, ChefHat, Award, Users } from "lucide-react"
import Link from "next/link"
import { BurgerMenu } from "@/components/burger-menu"

export default function RestaurantLanding() {
  const [language, setLanguage] = useState("en")
  const [tableNumber] = useState("12") // Simulated table number from QR scan

  const languages = {
    en: {
      welcome: "Welcome to",
      restaurantName: "Bella Vista",
      tableNumber: "Table",
      subtitle: "Premium Digital Dining Experience",
      scanMessage: "QR Code Detected - Table 12",
      viewMenu: "View Menu",
      orderNow: "Start Ordering",
      aboutTitle: "About Bella Vista",
      aboutDescription:
        "Experience culinary excellence in the heart of the city. Our award-winning chefs craft each dish with passion, using only the finest locally-sourced ingredients.",
      features: {
        instant: "Instant Ordering",
        realTime: "Real-time Updates",
        premium: "Premium Experience",
      },
      stats: {
        experience: "25+ Years Experience",
        awards: "15 Culinary Awards",
        customers: "50K+ Happy Customers",
      },
    },
    fr: {
      welcome: "Bienvenue à",
      restaurantName: "Bella Vista",
      tableNumber: "Table",
      subtitle: "Expérience Culinaire Numérique Premium",
      scanMessage: "QR Code Détecté - Table 12",
      viewMenu: "Voir le Menu",
      orderNow: "Commencer",
      aboutTitle: "À propos de Bella Vista",
      aboutDescription:
        "Découvrez l'excellence culinaire au cœur de la ville. Nos chefs primés préparent chaque plat avec passion, en utilisant uniquement les meilleurs ingrédients locaux.",
      features: {
        instant: "Commande Instantanée",
        realTime: "Mises à Jour en Temps Réel",
        premium: "Expérience Premium",
      },
      stats: {
        experience: "25+ Années d'Expérience",
        awards: "15 Prix Culinaires",
        customers: "50K+ Clients Satisfaits",
      },
    },
    ar: {
      welcome: "مرحباً بكم في",
      restaurantName: "بيلا فيستا",
      tableNumber: "طاولة",
      subtitle: "تجربة طعام رقمية فاخرة",
      scanMessage: "تم اكتشاف رمز QR - طاولة 12",
      viewMenu: "عرض القائمة",
      orderNow: "ابدأ الطلب",
      aboutTitle: "حول بيلا فيستا",
      aboutDescription:
        "اختبر التميز الطهي في قلب المدينة. يصنع طهاتنا الحائزون على جوائز كل طبق بشغف، باستخدام أجود المكونات المحلية فقط.",
      features: {
        instant: "طلب فوري",
        realTime: "تحديثات فورية",
        premium: "تجربة فاخرة",
      },
      stats: {
        experience: "25+ سنة خبرة",
        awards: "15 جائزة طهي",
        customers: "50K+ عميل سعيد",
      },
    },
  }

  const currentLang = languages[language as keyof typeof languages]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted">
      {/* Header with Language Selector */}
      <header className="flex flex-row justify-between items-center h-30 p-2 px-6">
        <div className="flex items-center gap-2">
          <BurgerMenu currentPage="home" />
          <Image
            src="/LogoOnSite.svg"
            alt="Bella Vista Logo"
            width={200}
            height={200}
            className="max-md:hidden"
          />
        </div>

        <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent border border-border rounded-md px-1 sm:px-2 py-1 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="en">EN</option>
              <option value="fr">FR</option>
              <option value="ar">AR</option>
            </select>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-2 sm:px-3 md:px-4 lg:px-6  flex flex-col items-center">
        {/* QR Scan Confirmation */}
      

        {/* Welcome Section */}
        <div className="text-center mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {currentLang.welcome}
          </h1>
          <h2 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 md:mb-4 text-foreground">
            {currentLang.restaurantName}
          </h2>
          <p className="text-xs sm:text-sm md:text-lg text-muted-foreground mb-2 sm:mb-3 md:mb-4">
            {currentLang.subtitle}
          </p>

          <Badge
            variant="outline"
            className="text-xs sm:text-sm md:text-lg px-2 sm:px-3 md:px-4 py-1 sm:py-2 border-primary text-primary"
          >
            QR Code Detected - Table {currentLang.tableNumber} {tableNumber}
          </Badge>
        </div>
         {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 max-w-md mx-auto mb-6">
          <Link href="/menu" className="flex-1">
            <Button
              size="lg"
              className="w-full restaurant-gradient text-white font-semibold py-3 sm:py-4 md:py-6 text-sm sm:text-base md:text-lg hover:opacity-90 transition-opacity"
            >
              {currentLang.viewMenu}
            </Button>
          </Link>
          <Link href="/menu" className="flex-1">
            <Button
              size="lg"
              variant="outline"
              className="w-full border-primary text-primary hover:bg-primary hover:text-white py-3 sm:py-4 md:py-6 text-sm sm:text-base md:text-lg transition-colors bg-transparent"
            >
              {currentLang.orderNow}
            </Button>
          </Link>
        </div>
      </main>

      {/* Hero Image - Full Width */}
      <div className="mb-4 sm:m-6 md:m-8 relative">
        <img
          src="/elegant-restaurant-interior-with-warm-lighting-and.jpg"
          alt="Restaurant Interior"
          className="w-full h-32 sm:h-48 md:h-64 lg:h-80 object-cover object-center rounded-lg mt-0"
        />
        <div className="absolute inset-0 restaurant-gradient opacity-20"></div>
      </div>

      <main className="px-2 sm:px-3 md:px-4 lg:px-6 pb-4 sm:pb-6 md:pb-8 flex flex-col items-center">
        <section className="mb-6 sm:mb-8 max-w-5xl">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="flex flex-col justify-between p-4 sm:p-6 md:p-8">
                  <div>
                     <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl  font-bold mb-3 sm:mb-4">{currentLang.aboutTitle}</h2>
                     <p className="  text-xl text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                     {currentLang.aboutDescription}
                     </p>
                  </div>
                  {/* Restaurant Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <div className="text-center p-3 sm:p-4 bg-muted/50 rounded-lg">
                      <Award className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 text-primary" />
                      <p className="text-xs sm:text-sm font-semibold">{currentLang.stats.experience}</p>
                    </div>
                    <div className="text-center p-3 sm:p-4 bg-muted/50 rounded-lg">
                      <Star className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 text-primary" />
                      <p className="text-xs sm:text-sm font-semibold">{currentLang.stats.awards}</p>
                    </div>
                    <div className="text-center p-3 sm:p-4 bg-muted/50 rounded-lg">
                      <Users className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 text-primary" />
                      <p className="text-xs sm:text-sm font-semibold">{currentLang.stats.customers}</p>
                    </div>
                  </div>
                </div>

                <div className="relative h-48 sm:h-64 md:h-auto m-4 sm:m-6 md:m-8 bg-gradient-to-br from-background via-card to-muted rounded-lg">
                  <img src="/chef-cooking-restaurant.jpg" alt="Chef cooking" className="rounded-lg w-full h-full object-cover object-center mix-blend-multiply opacity-80" />
                  <div className="absolute inset-0 restaurant-gradient opacity-10 rounded-lg"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-sm:w-[90%] sm:gap-3 md:gap-4 mb-20 sm:mb-20 md:mb-20 ">
          <Card className="text-center p-3 sm:p-4 md:p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="p-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 restaurant-gradient rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <Utensils className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-1 sm:mb-2 text-xs sm:text-sm md:text-base">
                {currentLang.features.instant}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Order directly from your table</p>
            </CardContent>
          </Card>

          <Card className="text-center p-3 sm:p-4 md:p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="p-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 restaurant-gradient rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-1 sm:mb-2 text-xs sm:text-sm md:text-base">
                {currentLang.features.realTime}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Track your order status live</p>
            </CardContent>
          </Card>

          <Card className="text-center p-3 sm:p-4 md:p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 sm:col-span-2 md:col-span-1">
            <CardContent className="p-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 restaurant-gradient rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-1 sm:mb-2 text-xs sm:text-sm md:text-base">
                {currentLang.features.premium}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Luxury dining made simple</p>
            </CardContent>
          </Card>
        </div>

        
      </main>
    </div>
  )
}
