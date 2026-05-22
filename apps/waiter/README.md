# Mayda Waiter

A comprehensive mobile-first application designed for waitstaff to efficiently manage tables, take orders, coordinate with kitchen staff, and provide exceptional customer service.

## 🍽️ Overview

The Waiter Application empowers restaurant service staff to:
- Manage table assignments and customer seating
- Take orders digitally with menu integration
- Communicate with kitchen staff in real-time
- Handle special requests and dietary requirements
- Process payments and manage bills
- Track service performance and tips

## 🚀 Features

### Table Management
- **Interactive Floor Plan**: Visual table layout and status
- **Table Assignment**: Assign waiters to specific sections
- **Customer Seating**: Manage party sizes and special requests
- **Table Status Tracking**: Available, occupied, reserved, cleaning
- **Turn-time Optimization**: Efficient table turnover management

### Order Management
- **Digital Menu**: Browse complete menu with images and descriptions
- **Quick Order Entry**: Streamlined order taking interface
- **Customization Options**: Handle dish modifications and special requests
- **Order Splitting**: Split bills among multiple customers
- **Kitchen Communication**: Send orders directly to kitchen display

### Service Operations
- **Order Status Tracking**: Monitor preparation and delivery status
- **Special Requests**: Handle allergies, modifications, and preferences
- **Payment Processing**: Multiple payment methods support
- **Receipt Generation**: Digital and printed receipt options
- **Customer Communication**: Notes and service history

### Performance Tracking
- **Service Metrics**: Track order accuracy, speed, and customer satisfaction
- **Tips Management**: Record and track tip earnings
- **Shift Reports**: Daily performance summaries
- **Customer Feedback**: Collect and review service ratings

## 🛠 Tech Stack

- **Framework**: Next.js 14.2.16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom components
- **UI Components**: Radix UI primitives (latest versions)
- **Icons**: Lucide React
- **Forms**: React Hook Form with validation
- **State Management**: React Context API
- **Real-time Updates**: WebSocket integration
- **Package Manager**: pnpm

## 📋 Prerequisites

- Node.js 18.0 or higher
- pnpm 8.0 or higher
- Mobile device or tablet for optimal experience
- Restaurant staff credentials
- Kitchen integration system

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mayda-waiter
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

5. **Login with waiter credentials**
   Use provided staff login to access the application

## 📁 Project Structure

```
mayda-waiter/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Main dashboard
├── components/           # Reusable React components
│   ├── ui/              # Base UI components
│   ├── table-management.tsx    # Table operations
│   ├── order-taking.tsx        # Order entry system
│   ├── kitchen-communication.tsx # Kitchen interface
│   ├── payment-processing.tsx   # Payment handling
│   ├── customer-service.tsx     # Service tools
│   ├── floor-plan.tsx          # Restaurant layout
│   ├── menu-browser.tsx        # Menu navigation
│   └── performance-dashboard.tsx # Metrics display
├── hooks/               # Custom React hooks
│   ├── use-mobile.ts   # Mobile device detection
│   ├── use-toast.ts    # Toast notifications
│   ├── use-orders.ts   # Order management
│   └── use-tables.ts   # Table state management
├── lib/                # Utility libraries
│   ├── utils.ts       # Helper functions
│   ├── websocket.ts   # Real-time communication
│   └── payment.ts     # Payment processing
└── public/            # Static assets
    ├── floor-plan.svg # Restaurant layout
    └── *.png         # UI icons and images
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
NEXT_PUBLIC_ORDER_API=your_order_api_url
NEXT_PUBLIC_KITCHEN_API=your_kitchen_api_url
NEXT_PUBLIC_PAYMENT_API=your_payment_api_url

# Authentication
NEXT_PUBLIC_AUTH_URL=your_auth_service_url
NEXT_PUBLIC_STAFF_ROLES_API=your_roles_api

# Real-time Communication
NEXT_PUBLIC_WEBSOCKET_URL=your_websocket_server
NEXT_PUBLIC_KITCHEN_SOCKET=your_kitchen_socket

# Payment Processing
NEXT_PUBLIC_PAYMENT_PROCESSOR=your_payment_service
NEXT_PUBLIC_POS_INTEGRATION=your_pos_system_url

# Restaurant Configuration
NEXT_PUBLIC_RESTAURANT_ID=your_restaurant_id
NEXT_PUBLIC_LOCATION_ID=your_location_id

# Features
NEXT_PUBLIC_TIP_TRACKING=true
NEXT_PUBLIC_SPLIT_BILLING=true
NEXT_PUBLIC_ALLERGEN_ALERTS=true
```

### Device Configuration

For mobile deployment:
```env
# Mobile App Configuration
NEXT_PUBLIC_APP_MODE=mobile
NEXT_PUBLIC_OFFLINE_MODE=true
NEXT_PUBLIC_PRINTER_INTEGRATION=true
```

## 📱 Core Features

### Table Management Interface

```typescript
interface Table {
  id: string
  number: number
  capacity: number
  status: 'available' | 'occupied' | 'reserved' | 'cleaning'
  waiter: string
  customers: number
  orderTotal: number
  timeSeated: Date
}
```

### Order Management System

```typescript
interface Order {
  id: string
  tableId: string
  waiterId: string
  items: OrderItem[]
  status: 'pending' | 'sent' | 'preparing' | 'ready' | 'delivered'
  specialRequests: string[]
  total: number
  timestamp: Date
}
```

## 🍽️ Usage Guide

### Daily Operations

1. **Clock In**
   - Login with staff credentials
   - Select assigned section
   - Review table assignments

2. **Table Management**
   - Check table status on floor plan
   - Seat incoming customers
   - Update customer count and special needs

3. **Taking Orders**
   - Navigate to customer's table
   - Browse menu with customer
   - Add items with modifications
   - Confirm order details
   - Send to kitchen

4. **Service Delivery**
   - Monitor order status
   - Deliver food when ready
   - Handle customer requests
   - Process payment

### Order Taking Workflow

1. **Approach Table**
   - Select table from floor plan
   - View customer information
   - Start new order

2. **Menu Navigation**
   - Browse categories efficiently
   - Show item details to customers
   - Handle dietary restrictions
   - Add special instructions

3. **Order Confirmation**
   - Review complete order
   - Verify special requests
   - Calculate total
   - Send to kitchen display

## 🔍 API Integration

### Core API Endpoints

```javascript
// Table Management
GET /api/tables - Fetch all tables
PUT /api/tables/:id - Update table status
POST /api/tables/:id/seat - Seat customers

// Order Management
POST /api/orders - Create new order
GET /api/orders/:id - Get order details
PUT /api/orders/:id/status - Update order status

// Menu System
GET /api/menu/categories - Menu categories
GET /api/menu/items - Menu items
GET /api/menu/items/:id - Item details

// Kitchen Communication
POST /api/kitchen/orders - Send order to kitchen
GET /api/kitchen/status/:orderId - Check preparation status

// Payment Processing
POST /api/payments/process - Process payment
GET /api/payments/:orderId - Payment status
```

### Real-time Updates

```javascript
// WebSocket Events
socket.on('order_ready', (orderId) => {
  // Notify waiter order is ready
})

socket.on('table_update', (tableData) => {
  // Update table status
})

socket.on('kitchen_request', (message) => {
  // Handle kitchen communication
})
```

## 💳 Payment Processing

### Supported Payment Methods
- **Cash**: Traditional cash handling
- **Credit/Debit Cards**: POS terminal integration
- **Mobile Payments**: Apple Pay, Google Pay, Samsung Pay
- **Digital Wallets**: Restaurant-specific wallets
- **Split Payments**: Multiple payment methods per table

### Bill Management
- **Itemized Bills**: Detailed breakdown of orders
- **Split Bills**: Divide by person or custom amounts
- **Group Bills**: Single bill for entire table
- **Tip Calculation**: Automatic tip suggestions
- **Receipt Options**: Digital, printed, or both

## 📊 Performance Analytics

### Service Metrics
- **Order Accuracy**: Percentage of orders without errors
- **Service Speed**: Time from order to delivery
- **Table Turnover**: Tables served per shift
- **Customer Satisfaction**: Ratings and feedback
- **Tip Performance**: Average tips and tip percentage

### Reporting Features
- **Daily Reports**: Shift performance summary
- **Weekly Analysis**: Trends and improvements
- **Monthly Reviews**: Comprehensive performance data
- **Comparative Analytics**: Performance vs. team average

## 🎨 User Interface

### Mobile-First Design
- **Touch Optimized**: Large buttons and gestures
- **Quick Actions**: Common tasks easily accessible
- **Intuitive Navigation**: Simple, clear interface
- **Visual Feedback**: Clear status indicators
- **Dark Mode**: Easy viewing in restaurant lighting

### Accessibility Features
- **Large Text Options**: Adjustable font sizes
- **High Contrast**: Better visibility options
- **Voice Commands**: Hands-free operation support
- **Haptic Feedback**: Touch confirmation

## 🔐 Security & Privacy

### Staff Authentication
- **Secure Login**: Multi-factor authentication
- **Role-based Access**: Permissions by job role
- **Session Management**: Automatic logout for security
- **Activity Logging**: Track all actions

### Data Protection
- **Customer Privacy**: Secure customer information
- **Payment Security**: PCI-compliant transactions
- **Order Encryption**: Secure order transmission
- **Audit Trails**: Complete action history

## 🚀 Deployment

### Mobile Device Deployment
```bash
# Build for mobile devices
pnpm build

# Configure for tablets/phones
# Set up offline capabilities
# Install on staff devices
```

### Restaurant Network
```bash
# Deploy to local network
pnpm dev -- --hostname 0.0.0.0 --port 3000

# Configure for restaurant WiFi
# Set up printer integration
# Connect to POS system
```

## 🧪 Testing

### Functionality Testing
```bash
# Run test suite
pnpm test

# Test payment integration
pnpm test:payments

# Test kitchen communication
pnpm test:kitchen
```

### User Experience Testing
- Test with actual waitstaff
- Verify mobile responsiveness
- Test in restaurant environment
- Validate workflow efficiency

## 📱 Offline Capabilities

### Offline Features
- **Order Storage**: Save orders when offline
- **Menu Caching**: Local menu storage
- **Sync on Reconnect**: Automatic data synchronization
- **Conflict Resolution**: Handle offline conflicts

### Implementation
```javascript
// Service Worker for offline functionality
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
}

// Cache critical data
const cacheMenu = async () => {
  const cache = await caches.open('menu-cache')
  await cache.addAll(['/api/menu/items'])
}
```

## 🔧 Maintenance

### Regular Tasks
- **Device Updates**: Keep apps updated on all devices
- **Performance Monitoring**: Track app performance
- **User Training**: Regular staff training sessions
- **System Integration**: Maintain POS and kitchen connections

### Technical Maintenance
- **Database Cleanup**: Archive old orders and data
- **Security Updates**: Regular security patches
- **Backup Systems**: Daily data backups
- **Performance Optimization**: Regular performance reviews

## 🆘 Troubleshooting

### Common Issues

1. **Connection Problems**
   - Check WiFi connectivity
   - Verify API endpoints
   - Test kitchen communication

2. **Payment Issues**
   - Verify POS system connection
   - Check payment processor status
   - Test card reader functionality

3. **Order Sync Problems**
   - Check kitchen display system
   - Verify order transmission
   - Test real-time updates

### Emergency Procedures
- **System Outage**: Fallback to paper orders
- **Payment Failure**: Alternative payment methods
- **Kitchen Communication**: Direct communication protocols

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Test with restaurant staff
4. Document changes thoroughly
5. Submit pull request

## 📄 License

This project is proprietary and confidential. All rights reserved.

## 🆘 Support

For technical support:
- Contact IT support team
- Check staff training materials
- Review troubleshooting guides
- Submit support tickets through staff portal

## 📚 Training Resources

- **Staff Training Videos**: Step-by-step operation guides
- **Quick Reference Cards**: Essential function summaries
- **Best Practices Guide**: Efficient service techniques
- **FAQ Document**: Common questions and solutions

---

Built to enhance restaurant service excellence 🍽️⭐