# Mayda Chef

A modern, responsive web application designed specifically for kitchen staff and chefs to manage orders, track inventory, and coordinate kitchen operations efficiently.

## 🍳 Overview

The Chef Application provides an intuitive interface for kitchen staff to:
- View and manage incoming orders in real-time
- Track order status from preparation to completion
- Monitor stock levels and receive low-stock alerts
- Coordinate kitchen workflow with voice commands
- Access analytics and performance metrics

## 🚀 Features

### Order Management
- **Real-time Order Dashboard**: View all incoming orders with priority indicators
- **Order Timeline**: Track each order's progress through different preparation stages
- **Status Updates**: Update order status (pending → in-progress → ready)
- **Priority Management**: Handle urgent orders with visual indicators
- **Dish Details**: View complete dish information with ingredients and allergens

### Kitchen Operations
- **Voice Control**: Hands-free operation with voice commands for status updates
- **Stock Management**: Monitor ingredient levels and receive alerts
- **Notification System**: Real-time notifications for new orders and stock alerts
- **Multi-language Support**: Internationalization with language selector

### User Interface
- **Dark/Light Theme**: Toggle between themes for comfortable viewing
- **Responsive Design**: Optimized for tablets and kitchen display screens
- **Accessibility**: Voice control and keyboard navigation support
- **Analytics**: Kitchen performance metrics and order analytics

## 🛠 Tech Stack

- **Framework**: Next.js 14.2.16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom components
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **State Management**: React Context API
- **Voice Control**: Web Speech API integration
- **Internationalization**: Custom i18n implementation
- **Package Manager**: pnpm

## 📋 Prerequisites

- Node.js 18.0 or higher
- pnpm 8.0 or higher
- Modern web browser with Web Speech API support (for voice features)

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mayda-chef
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
mayda-chef/
├── app/                    # Next.js app directory
│   ├── analytics/         # Analytics dashboard pages
│   ├── order/            # Order management pages
│   ├── stock/            # Stock management pages
│   └── globals.css       # Global styles
├── components/           # Reusable React components
│   ├── ui/              # Base UI components
│   ├── order-card.tsx   # Order display component
│   ├── stock-alert.tsx  # Stock monitoring component
│   ├── voice-control.tsx # Voice command interface
│   └── navigation.tsx   # App navigation
├── hooks/               # Custom React hooks
│   ├── use-voice-commands.ts # Voice control logic
│   └── use-mobile.ts    # Mobile detection
├── lib/                 # Utility libraries
│   ├── i18n.ts         # Internationalization
│   └── utils.ts        # Helper functions
└── public/             # Static assets
    └── *.png           # Food and UI images
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

# Analytics
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id

# Voice Control Settings
NEXT_PUBLIC_VOICE_ENABLED=true
```

### Voice Commands

The application supports the following voice commands:
- "Start order [number]" - Begin preparing an order
- "Complete order [number]" - Mark order as ready
- "Show stock" - Display current inventory levels
- "Priority order [number]" - Mark order as urgent

## 📱 Usage

### Order Management
1. **View Orders**: All active orders appear on the main dashboard
2. **Start Cooking**: Click "Start" or use voice command to begin preparation
3. **Update Status**: Move orders through preparation stages
4. **Mark Ready**: Complete orders when ready for service

### Stock Monitoring
1. **Check Levels**: Monitor ingredient quantities in real-time
2. **Receive Alerts**: Get notifications when items are running low
3. **Update Inventory**: Mark items as used during preparation

### Voice Control
1. **Enable**: Click the microphone icon to activate voice control
2. **Commands**: Use supported voice commands for hands-free operation
3. **Feedback**: Visual confirmation shows when commands are recognized

## 🎨 Customization

### Themes
The application supports light and dark themes. Users can toggle between themes using the theme selector in the navigation bar.

### Languages
Multi-language support is built-in. Add new languages by:
1. Creating translation files in `lib/i18n.ts`
2. Adding language options to the language selector

## 🔍 API Integration

The application expects REST API endpoints for:
- `GET /api/orders` - Fetch active orders
- `PUT /api/orders/:id` - Update order status
- `GET /api/stock` - Get current inventory levels
- `POST /api/stock/alert` - Send low stock alerts

## 🧪 Testing

The application includes components for testing kitchen workflows:
- Mock order data for development
- Voice command simulation
- Stock level testing scenarios

## 📈 Performance

- **Bundle Size**: Optimized with Next.js automatic code splitting
- **Loading**: Skeleton screens for smooth user experience
- **Updates**: Real-time data updates without page refresh
- **Offline**: Service worker for offline functionality (if configured)

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

### Docker
```bash
# Build Docker image
docker build -t chef-app .

# Run container
docker run -p 3000:3000 chef-app
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is proprietary and confidential. All rights reserved.

## 🆘 Support

For technical support or questions:
- Check the documentation
- Review existing issues
- Contact the development team

---

Built with ❤️ for efficient kitchen operations