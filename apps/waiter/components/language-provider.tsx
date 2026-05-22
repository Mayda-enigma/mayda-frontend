"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "fr" | "ar"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translation dictionaries
const translations = {
  en: {
    // Navigation
    tables: "Tables",
    scanner: "Scanner",
    orders: "Orders",

    // Table Overview
    tableOverview: "Tables",
    needAttention: "need attention",
    free: "Free",
    occupied: "Occupied",
    waiting: "Waiting",
    served: "Served",
    guests: "guests",
    pending: "pending",
    availableForSeating: "Available for seating",
    viewDetails: "View Details",
    sortByUrgency: "By Urgency",
    sortByNewest: "Newest Orders",
    sortByLongest: "Longest Waiting",

    // Scanner
    scannerTitle: "Scanner",
    scanTableQR: "Scan table QR code or NFC tag",
    readyToScan: "Ready to Scan",
    pointCamera: "Point your camera at a table QR code or NFC tag to get started",
    startCamera: "Start Camera",
    manualEntry: "Manual Entry",
    enterTableNumber: "Enter table number (e.g., T01, T15)",
    scanSuccessful: "Scan Successful!",
    scanFailed: "Scan Failed",
    openingTableSession: "Opening table session...",
    tryAgain: "Please try scanning again or use manual entry",
    recentScans: "Recent Scans",

    // Order Management
    markServed: "Mark Served",
    delivered: "Delivered",
    needAssistance: "Need Assistance",
    voice: "Voice",
    stop: "Stop",
    addItem: "Add Item",
    messageKitchen: "Call Cook",
    orderSummary: "Order Summary",
    voiceCommand: "Voice command",

    // Orders Page
    ordersTitle: "Orders",
    addOrder: "Add Order",
    addManualOrder: "Add Manual Order",
    tableNumber: "Table Number",
    customerName: "Customer Name (Optional)",
    orderItems: "Order Items",
    specialRequests: "Special Requests",
    searchOrders: "Search orders, tables, or items...",
    allOrders: "All Orders",
    startPreparing: "Start Preparing",
    markReady: "Mark Ready",
    markServedAction: "Mark Served",
    cancelOrder: "Cancel",
    noOrdersFound: "No orders found",
    preparing: "preparing",
    ready: "ready",

    // Notifications
    notifications: "Notifications",
    unread: "unread",
    urgent: "urgent",
    markAllRead: "Mark All Read",
    noNotifications: "No notifications",
    orderReady: "Order Ready",
    urgentOrder: "Urgent Order",
    assistanceNeeded: "Assistance Needed",
    acknowledge: "Acknowledge",
    markRead: "Mark Read",
    justNow: "Just now",

    // Status
    pending: "Pending",
    cancelled: "Cancelled",

    // Common
    submit: "Submit",
    cancel: "Cancel",
    close: "Close",
    table: "Table",
    order: "Order",
    time: "Time",
    ago: "ago",
  },
  fr: {
    // Navigation
    tables: "Tables",
    scanner: "Scanner",
    orders: "Commandes",

    // Table Overview
    tableOverview: "Tables",
    needAttention: "nécessitent attention",
    free: "Libre",
    occupied: "Occupée",
    waiting: "En attente",
    served: "Servie",
    guests: "clients",
    pending: "en attente",
    availableForSeating: "Disponible pour placement",
    viewDetails: "Voir détails",
    sortByUrgency: "Par urgence",
    sortByNewest: "Commandes récentes",
    sortByLongest: "Attente la plus longue",

    // Scanner
    scannerTitle: "Scanner",
    scanTableQR: "Scanner le QR code ou tag NFC de la table",
    readyToScan: "Prêt à scanner",
    pointCamera: "Pointez votre caméra vers un QR code ou tag NFC de table",
    startCamera: "Démarrer caméra",
    manualEntry: "Saisie manuelle",
    enterTableNumber: "Entrez le numéro de table (ex: T01, T15)",
    scanSuccessful: "Scan réussi!",
    scanFailed: "Échec du scan",
    openingTableSession: "Ouverture session table...",
    tryAgain: "Veuillez réessayer ou utiliser la saisie manuelle",
    recentScans: "Scans récents",

    // Order Management
    markServed: "Marquer servi",
    delivered: "Livré",
    needAssistance: "Besoin d'aide",
    voice: "Voix",
    stop: "Arrêter",
    addItem: "Ajouter article",
    messageKitchen: "Appeler cuisinier",
    orderSummary: "Résumé commande",
    voiceCommand: "Commande vocale",

    // Orders Page
    ordersTitle: "Commandes",
    addOrder: "Ajouter Commande",
    addManualOrder: "Ajouter Commande Manuelle",
    tableNumber: "Numéro de Table",
    customerName: "Nom Client (Optionnel)",
    orderItems: "Articles de Commande",
    specialRequests: "Demandes Spéciales",
    searchOrders: "Rechercher commandes, tables, ou articles...",
    allOrders: "Toutes Commandes",
    startPreparing: "Commencer Préparation",
    markReady: "Marquer Prêt",
    markServedAction: "Marquer Servi",
    cancelOrder: "Annuler",
    noOrdersFound: "Aucune commande trouvée",
    preparing: "préparation",
    ready: "prêt",

    // Notifications
    notifications: "Notifications",
    unread: "non lues",
    urgent: "urgent",
    markAllRead: "Tout marquer lu",
    noNotifications: "Aucune notification",
    orderReady: "Commande prête",
    urgentOrder: "Commande urgente",
    assistanceNeeded: "Assistance requise",
    acknowledge: "Confirmer",
    markRead: "Marquer lu",
    justNow: "À l'instant",

    // Status
    pending: "En attente",
    cancelled: "Annulée",

    // Common
    submit: "Soumettre",
    cancel: "Annuler",
    close: "Fermer",
    table: "Table",
    order: "Commande",
    time: "Temps",
    ago: "il y a",
  },
  ar: {
    // Navigation
    tables: "الطاولات",
    scanner: "الماسح",
    orders: "الطلبات",

    // Table Overview
    tableOverview: "الطاولات",
    needAttention: "تحتاج انتباه",
    free: "فارغة",
    occupied: "مشغولة",
    waiting: "في الانتظار",
    served: "تم التقديم",
    guests: "ضيوف",
    pending: "معلق",
    availableForSeating: "متاحة للجلوس",
    viewDetails: "عرض التفاصيل",
    sortByUrgency: "حسب الأولوية",
    sortByNewest: "أحدث الطلبات",
    sortByLongest: "أطول انتظار",

    // Scanner
    scannerTitle: "الماسح",
    scanTableQR: "امسح رمز QR أو علامة NFC للطاولة",
    readyToScan: "جاهز للمسح",
    pointCamera: "وجه الكاميرا نحو رمز QR أو علامة NFC للطاولة",
    startCamera: "تشغيل الكاميرا",
    manualEntry: "إدخال يدوي",
    enterTableNumber: "أدخل رقم الطاولة (مثال: T01, T15)",
    scanSuccessful: "نجح المسح!",
    scanFailed: "فشل المسح",
    openingTableSession: "فتح جلسة الطاولة...",
    tryAgain: "يرجى المحاولة مرة أخرى أو استخدام الإدخال اليدوي",
    recentScans: "المسوحات الأخيرة",

    // Order Management
    markServed: "تم التقديم",
    delivered: "تم التوصيل",
    needAssistance: "بحاجة مساعدة",
    voice: "صوت",
    stop: "توقف",
    addItem: "إضافة عنصر",
    messageKitchen: "استدعاء الطباخ",
    orderSummary: "ملخص الطلب",
    voiceCommand: "أمر صوتي",

    // Orders Page
    ordersTitle: "الطلبات",
    addOrder: "إضافة طلب",
    addManualOrder: "إضافة طلب يدوي",
    tableNumber: "رقم الطاولة",
    customerName: "اسم العميل (اختياري)",
    orderItems: "عناصر الطلب",
    specialRequests: "طلبات خاصة",
    searchOrders: "البحث في الطلبات أو الطاولات أو العناصر...",
    allOrders: "جميع الطلبات",
    startPreparing: "بدء التحضير",
    markReady: "تحديد كجاهز",
    markServedAction: "تحديد كمقدم",
    cancelOrder: "إلغاء",
    noOrdersFound: "لم يتم العثور على طلبات",
    preparing: "قيد التحضير",
    ready: "جاهز",

    // Notifications
    notifications: "الإشعارات",
    unread: "غير مقروءة",
    urgent: "عاجل",
    markAllRead: "تحديد الكل كمقروء",
    noNotifications: "لا توجد إشعارات",
    orderReady: "الطلب جاهز",
    urgentOrder: "طلب عاجل",
    assistanceNeeded: "مساعدة مطلوبة",
    acknowledge: "تأكيد",
    markRead: "تحديد كمقروء",
    justNow: "الآن",

    // Status
    pending: "معلق",
    cancelled: "ملغى",

    // Common
    submit: "إرسال",
    cancel: "إلغاء",
    close: "إغلاق",
    table: "طاولة",
    order: "طلب",
    time: "وقت",
    ago: "منذ",
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  // Load saved language from localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem("waiter-app-language") as Language
    if (savedLang && translations[savedLang]) {
      setLanguage(savedLang)
    }
  }, [])

  // Save language to localStorage when changed
  useEffect(() => {
    localStorage.setItem("waiter-app-language", language)

    // Set document direction for Arabic
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr"
    document.documentElement.lang = language
  }, [language])

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
