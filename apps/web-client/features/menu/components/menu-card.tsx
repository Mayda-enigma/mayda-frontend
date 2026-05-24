'use client';

import { Card, CardContent } from '@/shared/ui/card';
import Image from "next/image"
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Leaf, Wheat, Heart, Plus } from 'lucide-react';
import type { MenuItem } from '../types';

const dietaryIcons: Record<string, { icon: React.ElementType; color: string }> = {
  vegetarian: { icon: Leaf, color: 'text-success' },
  vegan: { icon: Heart, color: 'text-success' },
  'gluten-free': { icon: Wheat, color: 'text-amber-600' },
  halal: { icon: Heart, color: 'text-blue-600' },
};

interface MenuCardProps {
  item: MenuItem;
  index?: number;
  onViewDetails: () => void;
  onAddToCart: () => void;
}

export function MenuCard({ item, index = 0, onViewDetails, onAddToCart }: MenuCardProps) {
  return (
    <Card
      className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group hover:-translate-y-1 hover:scale-[1.02]"
      style={{
        animationDelay: `${index * 100}ms`,
        animation: 'fadeInUp 0.6s ease-out forwards',
      }}
    >
      <div className="relative overflow-hidden" onClick={onViewDetails}>
        <Image
          src={item.image || '/placeholder.svg'}
          alt={item.name}
          width={400} height={200} className="w-full h-32 sm:h-40 md:h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {item.popular && (
          <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground animate-bounce">Popular</Badge>
        )}
        <div className="absolute top-2 right-2 flex gap-1">
          {item.dietary.map((diet) => {
            const entry = dietaryIcons[diet];
            if (!entry) return null;
            const Icon = entry.icon;
            return (
              <div
                key={diet}
                className="w-6 h-6 bg-white/90 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200"
              >
                <Icon className={`w-3 h-3 ${entry.color}`} />
              </div>
            );
          })}
        </div>
      </div>

      <CardContent className="p-3 sm:p-4">
        <div className="flex justify-between items-start mb-2" onClick={onViewDetails}>
          <h3 className="font-semibold text-sm sm:text-lg leading-tight group-hover:text-primary transition-colors duration-200">
            {item.name}
          </h3>
          <span className="text-sm sm:text-lg font-bold text-primary ml-2 group-hover:scale-110 transition-transform duration-200">
            ${item.price.toFixed(2)}
          </span>
        </div>

        <p
          className="text-muted-foreground text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2"
          onClick={onViewDetails}
        >
          {item.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-3" onClick={onViewDetails}>
          {item.dietary.map((diet) => (
            <Badge key={diet} variant="outline" className="text-xs hover:scale-105 transition-transform duration-200">
              {diet}
            </Badge>
          ))}
        </div>

        <div className="flex gap-1 sm:gap-2">
          <Button
            className="flex-1 bg-primary text-primary-foreground hover:opacity-90 hover:scale-105 transition-all duration-200 hover:shadow-lg text-xs sm:text-sm py-1 sm:py-2"
            size="sm"
            onClick={onViewDetails}
          >
            View Details
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="px-2 sm:px-3 bg-transparent hover:scale-110 hover:bg-primary hover:text-white transition-all duration-200 hover:shadow-md"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart();
            }}
          >
            <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
