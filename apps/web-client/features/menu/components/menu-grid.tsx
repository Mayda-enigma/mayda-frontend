'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';
import { Input } from '@/shared/ui/input';
import { useCart } from '@/features/cart';
import { useMenu } from '../api/queries';
import { DishDetailModal } from './dish-detail-modal';
import { MenuCard } from './menu-card';
import { SmartRecommendations } from '@/components/smart-recommendations';
import { RamadanBanner } from '@/components/ramadan-banner';
import { NotificationSystem } from '@/components/notification-system';
import { FeedbackModal } from '@/components/feedback-modal';
import { Search, Filter, Mic, MicOff, ArrowLeft, Leaf, Wheat, Heart, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { BurgerMenu } from '@/components/burger-menu';
import type { MenuItem } from '../types';

const categories = [
  { id: 'all', name: 'All', icon: '🍽️' },
  { id: 'starters', name: 'Starters', icon: '🥗' },
  { id: 'mains', name: 'Mains', icon: '🍖' },
  { id: 'desserts', name: 'Desserts', icon: '🍰' },
  { id: 'drinks', name: 'Drinks', icon: '🍷' },
];

const dietaryFilters = [
  { id: 'vegetarian', name: 'Vegetarian', icon: Leaf, color: 'text-restaurant-green' },
  { id: 'vegan', name: 'Vegan', icon: Heart, color: 'text-restaurant-green' },
  { id: 'gluten-free', name: 'Gluten Free', icon: Wheat, color: 'text-amber-600' },
  { id: 'halal', name: 'Halal', icon: Heart, color: 'text-blue-600' },
];

export function MenuGrid() {
  const { state, dispatch } = useCart();
  const { data: menuItems } = useMenu('default');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedbackOrderId, setFeedbackOrderId] = useState<string | null>(null);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  const items = menuItems ?? [];

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesDietary = selectedDietary.length === 0 || selectedDietary.some((diet) => item.dietary.includes(diet));
      const matchesSearch =
        searchQuery === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesDietary && matchesSearch;
    });
  }, [items, selectedCategory, selectedDietary, searchQuery]);

  const toggleDietaryFilter = (dietary: string) => {
    setSelectedDietary((prev) => (prev.includes(dietary) ? prev.filter((d) => d !== dietary) : [...prev, dietary]));
  };

  const startVoiceSearch = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      setSearchQuery('sea bass');
    }, 2000);
  };

  const openDishDetail = (dish: MenuItem) => {
    setSelectedDish(dish);
    setIsModalOpen(true);
  };

  const closeDishDetail = () => {
    setIsModalOpen(false);
    setSelectedDish(null);
  };

  const quickAddToCart = (item: MenuItem) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
      },
    });
  };

  const handleRamadanPreOrder = () => {
    setSelectedDietary(['halal']);
    setSelectedCategory('mains');
  };

  const handleFeedbackRequest = (orderId: string) => {
    setFeedbackOrderId(orderId);
    setIsFeedbackModalOpen(true);
  };

  const closeFeedbackModal = () => {
    setIsFeedbackModalOpen(false);
    setFeedbackOrderId(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <BurgerMenu currentPage="menu" />
            <Link href="/" className="hidden md:block">
              <Button variant="ghost" size="sm" className="p-2 hover:scale-110 transition-transform duration-200">
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-lg sm:text-xl font-bold">Menu</h1>
              <p className="text-xs sm:text-sm text-muted-foreground">Table 12</p>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            <Link href="/filters">
              <Button
                variant="outline"
                size="sm"
                className="hover:scale-105 transition-all duration-200 hover:shadow-md bg-transparent text-xs sm:text-sm px-2 sm:px-3"
              >
                <Filter className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Filter</span>
              </Button>
            </Link>
            <NotificationSystem onFeedbackRequest={handleFeedbackRequest} />
            <Link href="/cart">
              <Button
                variant="outline"
                size="sm"
                className="relative bg-transparent hover:scale-105 transition-all duration-200 hover:shadow-md p-2 sm:px-3"
              >
                <ShoppingBag className="w-3 h-3 sm:w-4 sm:h-4" />
                {state.items.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-5 sm:h-5 p-0 flex items-center justify-center text-xs restaurant-gradient text-white animate-pulse">
                    {state.items.length}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>
        </div>

        <div className="px-3 sm:px-4 pb-3 sm:pb-4">
          <div className="relative">
            <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground transition-colors duration-200" />
            <Input
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 sm:pl-10 pr-10 sm:pr-12 h-10 sm:h-12 text-sm sm:text-base focus:ring-2 focus:ring-primary/20 transition-all duration-200 hover:shadow-sm"
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 p-1 sm:p-2 hover:scale-110 transition-transform duration-200"
              onClick={startVoiceSearch}
            >
              {isListening ? (
                <MicOff className="w-3 h-3 sm:w-4 sm:h-4 text-primary animate-pulse" />
              ) : (
                <Mic className="w-3 h-3 sm:w-4 sm:h-4 hover:text-primary transition-colors duration-200" />
              )}
            </Button>
          </div>
        </div>
      </header>

      <div className="px-3 sm:px-4 py-2 sm:py-3 border-b border-border">
        <div className="flex gap-1 sm:gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className={`whitespace-nowrap hover:scale-105 transition-all duration-200 hover:shadow-md text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 ${
                selectedCategory === category.id ? 'restaurant-gradient text-white' : 'bg-transparent hover:bg-accent'
              }`}
            >
              <span className="mr-1 sm:mr-2 transition-transform duration-200 hover:scale-110 text-xs sm:text-sm">
                {category.icon}
              </span>
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      <div className="px-3 sm:px-4 py-2 sm:py-3 border-b border-border">
        <div className="flex gap-1 sm:gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {dietaryFilters.map((filter) => {
            const Icon = filter.icon;
            const isSelected = selectedDietary.includes(filter.id);
            return (
              <Button
                key={filter.id}
                variant={isSelected ? 'default' : 'outline'}
                size="sm"
                onClick={() => toggleDietaryFilter(filter.id)}
                className={`whitespace-nowrap hover:scale-105 transition-all duration-200 hover:shadow-md text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 ${
                  isSelected ? 'bg-restaurant-green text-white' : 'bg-transparent hover:bg-accent'
                }`}
              >
                <Icon className="w-2 h-2 sm:w-3 sm:h-3 mr-1 sm:mr-2 transition-transform duration-200 hover:rotate-12" />
                {filter.name}
              </Button>
            );
          })}
        </div>
      </div>

      <div className="p-4">
        <RamadanBanner onPreOrder={handleRamadanPreOrder} />
        <SmartRecommendations menuItems={items} cartItems={state.items} />

        {filteredItems.length > 0 && (
          <div className="mt-6 mb-4">
            <h2 className="text-lg font-semibold mb-4">All Dishes</h2>
          </div>
        )}
      </div>

      <div className="px-3 sm:px-4 pb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {filteredItems.map((item, index) => (
            <MenuCard
              key={item.id}
              item={item}
              index={index}
              onViewDetails={() => openDishDetail(item)}
              onAddToCart={() => quickAddToCart(item)}
            />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No dishes found</p>
            <p className="text-muted-foreground text-sm">Try adjusting your filters or search</p>
          </div>
        )}
      </div>

      <div className="h-16 sm:h-20"></div>

      <DishDetailModal dish={selectedDish} isOpen={isModalOpen} onClose={closeDishDetail} />
      <FeedbackModal isOpen={isFeedbackModalOpen} onClose={closeFeedbackModal} orderId={feedbackOrderId || ''} />
    </div>
  );
}
