export type Language = "en" | "fr" | "ar"

export interface Translations {
  // Navigation
  dashboard: string
  stock: string
  analytics: string

  // Dashboard
  kitchenDashboard: string
  activeOrders: string
  totalOrders: string
  stockAlerts: string
  newOrderReceived: string
  sortByTime: string
  sortByComplexity: string
  noActiveOrders: string
  kitchenCaughtUp: string

  // Order statuses
  pending: string
  inProgress: string
  completed: string
  delayed: string

  // Order actions
  startOrder: string
  markReady: string
  viewDetails: string

  // Stock
  currentStock: string
  threshold: string
  reorderSuggested: string

  // Analytics
  kitchenAnalytics: string
  performanceInsights: string
  totalOrdersKpi: string
  revenue: string
  avgPrepTime: string
  customerSatisfaction: string
  orderVolumeToday: string
  orderStatusDistribution: string
  topPerformingDishes: string
  kitchenEfficiency: string
  revenueTrend: string

  // Time ranges
  today: string
  week: string
  month: string

  // Common
  table: string
  priority: string
  urgent: string
  normal: string
  high: string
  medium: string
  low: string
  complexity: string
  allergens: string
  specialRequests: string
  notes: string
}

export const translations: Record<Language, Translations> = {
  en: {
    // Navigation
    dashboard: "Dashboard",
    stock: "Stock",
    analytics: "Analytics",

    // Dashboard
    kitchenDashboard: "Kitchen Dashboard",
    activeOrders: "Active Orders",
    totalOrders: "Total Orders",
    stockAlerts: "Stock Alerts",
    newOrderReceived: "New urgent order received",
    sortByTime: "Sort by Time",
    sortByComplexity: "Sort by Complexity",
    noActiveOrders: "No Active Orders",
    kitchenCaughtUp: "Kitchen is all caught up!",

    // Order statuses
    pending: "Pending",
    inProgress: "In Progress",
    completed: "Completed",
    delayed: "Delayed",

    // Order actions
    startOrder: "Start Order",
    markReady: "Mark Ready",
    viewDetails: "View Details",

    // Stock
    currentStock: "Current Stock",
    threshold: "Threshold",
    reorderSuggested: "Reorder Suggested",

    // Analytics
    kitchenAnalytics: "Kitchen Analytics",
    performanceInsights: "Performance insights and operational metrics",
    totalOrdersKpi: "Total Orders",
    revenue: "Revenue",
    avgPrepTime: "Avg Prep Time",
    customerSatisfaction: "Customer Satisfaction",
    orderVolumeToday: "Order Volume Today",
    orderStatusDistribution: "Order Status Distribution",
    topPerformingDishes: "Top Performing Dishes",
    kitchenEfficiency: "Kitchen Efficiency",
    revenueTrend: "Revenue Trend",

    // Time ranges
    today: "Today",
    week: "Week",
    month: "Month",

    // Common
    table: "Table",
    priority: "Priority",
    urgent: "Urgent",
    normal: "Normal",
    high: "High",
    medium: "Medium",
    low: "Low",
    complexity: "Complexity",
    allergens: "Allergens",
    specialRequests: "Special Requests",
    notes: "Notes",
  },
  fr: {
    // Navigation
    dashboard: "Tableau de Bord",
    stock: "Stock",
    analytics: "Analyses",

    // Dashboard
    kitchenDashboard: "Tableau de Bord Cuisine",
    activeOrders: "Commandes Actives",
    totalOrders: "Total des Commandes",
    stockAlerts: "Alertes de Stock",
    newOrderReceived: "Nouvelle commande urgente reçue",
    sortByTime: "Trier par Temps",
    sortByComplexity: "Trier par Complexité",
    noActiveOrders: "Aucune Commande Active",
    kitchenCaughtUp: "La cuisine est à jour!",

    // Order statuses
    pending: "En Attente",
    inProgress: "En Cours",
    completed: "Terminé",
    delayed: "Retardé",

    // Order actions
    startOrder: "Commencer",
    markReady: "Marquer Prêt",
    viewDetails: "Voir Détails",

    // Stock
    currentStock: "Stock Actuel",
    threshold: "Seuil",
    reorderSuggested: "Réapprovisionnement Suggéré",

    // Analytics
    kitchenAnalytics: "Analyses de Cuisine",
    performanceInsights: "Aperçus de performance et métriques opérationnelles",
    totalOrdersKpi: "Total des Commandes",
    revenue: "Revenus",
    avgPrepTime: "Temps Moyen",
    customerSatisfaction: "Satisfaction Client",
    orderVolumeToday: "Volume de Commandes Aujourd'hui",
    orderStatusDistribution: "Distribution du Statut des Commandes",
    topPerformingDishes: "Plats les Plus Performants",
    kitchenEfficiency: "Efficacité de la Cuisine",
    revenueTrend: "Tendance des Revenus",

    // Time ranges
    today: "Aujourd'hui",
    week: "Semaine",
    month: "Mois",

    // Common
    table: "Table",
    priority: "Priorité",
    urgent: "Urgent",
    normal: "Normal",
    high: "Élevé",
    medium: "Moyen",
    low: "Faible",
    complexity: "Complexité",
    allergens: "Allergènes",
    specialRequests: "Demandes Spéciales",
    notes: "Notes",
  },
  ar: {
    // Navigation
    dashboard: "لوحة التحكم",
    stock: "المخزون",
    analytics: "التحليلات",

    // Dashboard
    kitchenDashboard: "لوحة تحكم المطبخ",
    activeOrders: "الطلبات النشطة",
    totalOrders: "إجمالي الطلبات",
    stockAlerts: "تنبيهات المخزون",
    newOrderReceived: "تم استلام طلب عاجل جديد",
    sortByTime: "ترتيب حسب الوقت",
    sortByComplexity: "ترتيب حسب التعقيد",
    noActiveOrders: "لا توجد طلبات نشطة",
    kitchenCaughtUp: "المطبخ مواكب للطلبات!",

    // Order statuses
    pending: "في الانتظار",
    inProgress: "قيد التنفيذ",
    completed: "مكتمل",
    delayed: "متأخر",

    // Order actions
    startOrder: "بدء الطلب",
    markReady: "تحديد كجاهز",
    viewDetails: "عرض التفاصيل",

    // Stock
    currentStock: "المخزون الحالي",
    threshold: "الحد الأدنى",
    reorderSuggested: "إعادة الطلب مقترحة",

    // Analytics
    kitchenAnalytics: "تحليلات المطبخ",
    performanceInsights: "رؤى الأداء والمقاييس التشغيلية",
    totalOrdersKpi: "إجمالي الطلبات",
    revenue: "الإيرادات",
    avgPrepTime: "متوسط وقت التحضير",
    customerSatisfaction: "رضا العملاء",
    orderVolumeToday: "حجم الطلبات اليوم",
    orderStatusDistribution: "توزيع حالة الطلبات",
    topPerformingDishes: "الأطباق الأكثر أداءً",
    kitchenEfficiency: "كفاءة المطبخ",
    revenueTrend: "اتجاه الإيرادات",

    // Time ranges
    today: "اليوم",
    week: "الأسبوع",
    month: "الشهر",

    // Common
    table: "الطاولة",
    priority: "الأولوية",
    urgent: "عاجل",
    normal: "عادي",
    high: "عالي",
    medium: "متوسط",
    low: "منخفض",
    complexity: "التعقيد",
    allergens: "المواد المسببة للحساسية",
    specialRequests: "الطلبات الخاصة",
    notes: "الملاحظات",
  },
}

export function getTranslations(language: Language): Translations {
  return translations[language] || translations.en
}
