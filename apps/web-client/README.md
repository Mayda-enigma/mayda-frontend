# Mayda Web Client

A modern, intuitive self-service ordering system designed for customers dining at the restaurant. This application provides a seamless digital menu experience with smart recommendations and easy ordering capabilities.

## 🍽️ Overview

The Onsite Client Application enables restaurant customers to:
- Browse an interactive digital menu with rich visuals
- Place orders directly from their table
- Customize dishes and add special instructions
- Track order status in real-time
- Provide feedback and ratings
- Access smart recommendations based on preferences

## 🚀 Features

### Digital Menu Experience
- **Interactive Menu**: Browse categories with beautiful food imagery
- **Dish Details**: Detailed descriptions, ingredients, allergen information
- **Web AR Preview**: View supported dishes in AR from the dish detail screen
- **Smart Search**: Find dishes quickly with intelligent search
- **Filtering**: Filter by dietary preferences, price range, categories
- **Recommendations**: AI-powered dish suggestions based on preferences

### Ordering System
- **Shopping Cart**: Add, remove, and modify items easily
- **Customization**: Modify dishes with available options
- **Special Instructions**: Add custom notes for kitchen staff
- **Order Summary**: Review complete order before confirmation
- **Payment Integration**: Secure payment processing

### User Experience
- **Responsive Design**: Optimized for tablets and mobile devices
- **Touch-Friendly**: Large buttons and intuitive gestures
- **Multi-language**: Support for multiple languages
- **Accessibility**: Screen reader compatible and keyboard navigation
- **Theme Support**: Light and dark mode options

### Additional Features
- **Order Tracking**: Real-time updates on order preparation
- **Feedback System**: Rate dishes and provide reviews
- **Nutritional Info**: Calorie counts and dietary information
- **Promotional Banners**: Special offers and seasonal promotions
- **Table Integration**: Seamless table-specific ordering

## 🛠 Tech Stack

- **Framework**: Next.js 14.2.16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom components
- **UI Components**: Radix UI primitives
- **State Management**: React Context API for cart and user preferences
- **Icons**: Lucide React
- **Image Optimization**: Next.js Image component
- **Forms**: React Hook Form with validation
- **Package Manager**: pnpm

## 📋 Prerequisites

- Node.js 18.0 or higher
- pnpm 8.0 or higher
- Modern web browser
- Touch-capable device (tablet/smartphone) for optimal experience

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mayda-web-client
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
mayda-web-client/
├── app/                    # Next.js app directory
│   ├── cart/              # Shopping cart pages
│   ├── filters/           # Menu filtering pages
│   ├── menu/              # Menu browsing pages
│   ├── orders/            # Order tracking pages
│   └── globals.css        # Global styles
├── components/            # Reusable React components
│   ├── ui/               # Base UI components
│   ├── bottom-navigation.tsx # Mobile navigation
│   ├── burger-menu.tsx   # Menu toggle
│   ├── cart-context.tsx  # Shopping cart state
│   ├── cart-sidebar.tsx  # Cart display
│   ├── dish-detail-modal.tsx # Dish information modal
│   ├── feedback-modal.tsx # Customer feedback
│   ├── smart-recommendations.tsx # AI recommendations
│   ├── ramadan-banner.tsx # Seasonal promotions
│   └── notification-system.tsx # Order notifications
├── hooks/                # Custom React hooks
│   ├── use-mobile.ts    # Mobile device detection
│   └── use-toast.ts     # Toast notifications
├── lib/                 # Utility libraries
│   └── utils.ts         # Helper functions
└── public/              # Static assets
    └── *.png           # Food images and icons
```

## 🎮 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production  
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file with:

```env
# API Endpoints
NEXT_PUBLIC_API_URL=your_api_url_here
NEXT_PUBLIC_MENU_API=your_menu_api_url
NEXT_PUBLIC_ORDER_API=your_order_api_url

# Payment Integration
NEXT_PUBLIC_PAYMENT_PROCESSOR=your_payment_service
NEXT_PUBLIC_PAYMENT_KEY=your_payment_public_key

# Table Integration
NEXT_PUBLIC_TABLE_SERVICE=your_table_management_url

# Analytics
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id

# Features
NEXT_PUBLIC_RECOMMENDATIONS_ENABLED=true
NEXT_PUBLIC_FEEDBACK_ENABLED=true
NEXT_PUBLIC_MULTILANG_ENABLED=true
```

### Table Configuration

For table-specific deployment, configure:

```env
# Table Identification
NEXT_PUBLIC_TABLE_NUMBER=1
NEXT_PUBLIC_RESTAURANT_ID=your_restaurant_id
NEXT_PUBLIC_QR_CODE_ENABLED=true
```

## Web AR Experience

The customer-facing AR flow is web-first: a customer scans the table QR code, opens the web menu, chooses a dish, and taps **Voir en AR** from the dish detail screen when that dish is supported.

The web client uses `<model-viewer>` through `@google/model-viewer` because it runs directly in the browser and fits the QR-to-web menu flow. Viro remains native-only and belongs in the React Native app, not this Next.js client.

Backend menu data remains unchanged. Dishes still come from `GET /menus/restaurant/{restaurantId}` and do not include AR model URLs. For now, supported AR dishes are resolved through a local static registry in `features/ar/constants/staticArModels.ts`.

Supported demo dishes:
- Gourmet Burger
- Croissant

Limitations:
- The backend does not manage AR model URLs yet.
- iOS Quick Look requires real USDZ files later.
- The current AR registry is local/static for the demo, with temporary name-based matching when stable dish IDs are not available.

## 📱 Usage Guide

### For Customers

1. **Browse Menu**
   - Scan QR code or navigate to the app
   - Browse categories or use search
   - View dish details and images

2. **Place Order**
   - Add items to cart
   - Customize dishes as needed
   - Add special instructions
   - Review order summary

3. **Payment**
   - Choose payment method
   - Complete secure payment
   - Receive order confirmation

4. **Track Order**
   - Monitor preparation status
   - Receive notifications
   - Provide feedback when ready

### For Restaurant Staff

1. **Table Setup**
   - Generate unique QR codes per table
   - Configure table numbers
   - Test ordering workflow

2. **Menu Management**
   - Update menu items via admin panel
   - Upload food images
   - Set availability status

## 🛍️ Cart Management

The shopping cart provides:
- **Persistent Storage**: Items saved across sessions
- **Quantity Management**: Easy increment/decrement controls
- **Customization Tracking**: Remembers dish modifications
- **Price Calculation**: Real-time total updates
- **Special Instructions**: Customer notes for each item

## 🔍 API Integration

### Menu API
```javascript
// Fetch menu categories
GET /api/menu/categories

// Get dishes by category
GET /api/menu/dishes?category=appetizers

// Get dish details
GET /api/menu/dishes/:id

// Search dishes
GET /api/menu/search?q=chicken
```

### Order API
```javascript
// Create new order
POST /api/orders
{
  tableNumber: 1,
  items: [...],
  specialInstructions: "...",
  customerInfo: {...}
}

// Track order status
GET /api/orders/:id/status

// Submit feedback
POST /api/orders/:id/feedback
```

## 🎨 Customization

### Branding
- Replace logo in `public/` directory
- Update colors in `tailwind.config.js`
- Customize fonts in `app/layout.tsx`

### Menu Display
- Modify dish card layout in components
- Update category organization
- Customize filtering options

### Promotions
- Update promotional banners
- Configure seasonal themes
- Set special offer displays

## 📊 Analytics & Tracking

The application tracks:
- **Menu Interactions**: Most viewed dishes, categories
- **Order Patterns**: Popular combinations, order times
- **User Behavior**: Session duration, abandonment points
- **Performance**: Load times, conversion rates

## 🔐 Security Features

- **Secure Payments**: PCI-compliant payment processing
- **Data Protection**: Customer information encryption
- **Session Management**: Secure table session handling
- **Input Validation**: Protection against malicious input

## 📱 Mobile Optimization

### Touch Interface
- Large, touch-friendly buttons
- Gesture-based navigation
- Optimized scroll areas
- Quick access toolbar

### Performance
- Image lazy loading
- Optimized bundle size
- Fast initial page load
- Smooth animations

## 🌐 Multi-language Support

Supported languages:
- English (default)
- Arabic
- French
- Add more in `lib/i18n.ts`

Language selection:
- Automatic browser detection
- Manual language switcher
- Persistent language preference

## 🍽️ Special Features

### Smart Recommendations
- Machine learning-powered suggestions
- Based on order history and preferences
- Seasonal and popularity-based recommendations
- Dietary restriction awareness

### Nutritional Information
- Calorie counts per dish
- Allergen warnings
- Dietary labels (vegan, gluten-free, etc.)
- Ingredient listings

### Accessibility
- Screen reader support
- High contrast themes
- Large text options
- Voice navigation (where supported)

## 🚀 Deployment

### Tablet Deployment
```bash
# Build for production
pnpm build

# Deploy to tablet kiosks
# Configure auto-start in kiosk mode
```

### Cloud Deployment
```bash
# Deploy to Vercel
vercel --prod

# Or deploy to your cloud provider
```

### Local Network
```bash
# Run on local network for testing
pnpm dev -- --hostname 0.0.0.0
```

## 🧪 Testing

### User Testing
- Test on actual tablets/devices
- Verify touch interactions
- Test payment flow
- Validate order workflow

### Performance Testing
- Load time optimization
- Image optimization
- Network resilience
- Offline functionality

## 📈 Performance Optimization

- **Image Optimization**: WebP format, responsive sizing
- **Code Splitting**: Route-based and component-based splitting
- **Caching**: Static assets and API responses
- **Compression**: Gzip compression enabled
- **CDN**: Static asset delivery optimization

## 🔧 Maintenance

### Regular Tasks
- Update menu items and prices
- Monitor order conversion rates
- Review customer feedback
- Update promotional content

### Technical Maintenance
- Monitor application performance
- Update dependencies
- Review security settings
- Backup order data

## 🆘 Troubleshooting

### Common Issues

1. **Slow Loading**
   - Check network connection
   - Optimize images
   - Review API response times

2. **Payment Issues**
   - Verify payment processor configuration
   - Check SSL certificate
   - Review payment logs

3. **Cart Problems**
   - Clear local storage
   - Check cart context implementation
   - Verify API connectivity

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Implement changes with tests
4. Submit pull request
5. Follow code review process

## 📄 License

This project is proprietary and confidential. All rights reserved.

## 🆘 Support

For technical support:
- Check documentation first
- Test on reference devices
- Contact development team
- Submit detailed bug reports

---

Designed for delightful dining experiences 🍴✨
