import type { Order, OrderDetail, StockAlert } from '../types';

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    tableNumber: 12,
    timeReceived: new Date(Date.now() - 15 * 60 * 1000),
    status: 'pending',
    complexity: 'high',
    dishes: [
      {
        name: 'Grilled Salmon',
        notes: 'Medium rare, no sauce',
        allergens: ['fish'],
        image: '/grilled-salmon-dish.jpg',
      },
      {
        name: 'Caesar Salad',
        notes: 'Extra croutons',
        allergens: ['gluten', 'dairy'],
        image: '/caesar-salad.png',
      },
    ],
    specialRequests: 'Customer has severe nut allergy',
    priority: 'urgent',
  },
  {
    id: 'ORD-002',
    tableNumber: 8,
    timeReceived: new Date(Date.now() - 8 * 60 * 1000),
    status: 'in-progress',
    complexity: 'medium',
    dishes: [
      {
        name: 'Margherita Pizza',
        notes: 'Extra basil',
        allergens: ['gluten', 'dairy'],
        image: '/margherita-pizza.png',
      },
      {
        name: 'Garlic Bread',
        notes: 'Light garlic',
        allergens: ['gluten'],
        image: '/garlic-bread.png',
      },
    ],
    specialRequests: '',
    priority: 'normal',
  },
  {
    id: 'ORD-003',
    tableNumber: 5,
    timeReceived: new Date(Date.now() - 3 * 60 * 1000),
    status: 'pending',
    complexity: 'low',
    dishes: [
      {
        name: 'House Salad',
        notes: 'Dressing on side',
        allergens: [],
        image: '/house-salad.jpg',
      },
    ],
    specialRequests: 'Vegan customer',
    priority: 'normal',
  },
];

export const mockOrderDetails: Record<string, OrderDetail> = {
  'ORD-001': {
    id: 'ORD-001',
    tableNumber: 12,
    timeReceived: new Date(Date.now() - 15 * 60 * 1000),
    status: 'in-progress',
    complexity: 'high',
    dishes: [
      {
        name: 'Grilled Salmon',
        notes: 'Medium rare, no sauce',
        allergens: ['fish'],
        prepTime: 18,
        steps: [
          'Season salmon with salt and pepper',
          'Heat grill to medium-high',
          'Grill for 6-8 minutes per side',
          'Check internal temperature (145°F)',
          'Rest for 2 minutes before plating',
        ],
        currentStep: 2,
      },
      {
        name: 'Caesar Salad',
        notes: 'Extra croutons',
        allergens: ['gluten', 'dairy'],
        prepTime: 8,
        steps: [
          'Wash and chop romaine lettuce',
          'Prepare Caesar dressing',
          'Toast croutons until golden',
          'Toss lettuce with dressing',
          'Top with croutons and parmesan',
        ],
        currentStep: 4,
      },
    ],
    specialRequests: 'Customer has severe nut allergy',
    priority: 'urgent',
    customerNotes: 'Anniversary dinner - please make it special',
    estimatedCompletion: new Date(Date.now() + 8 * 60 * 1000),
  },
};

export const mockStockAlerts: StockAlert[] = [
  { ingredient: 'Tomatoes', currentStock: 8, threshold: 10, unit: '%', category: 'vegetable' },
  { ingredient: 'Salmon Fillets', currentStock: 3, threshold: 5, unit: 'pieces', category: 'protein' },
];
