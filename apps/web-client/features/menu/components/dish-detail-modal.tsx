'use client';

import { useState } from 'react';
import Image from "next/image"
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { Textarea } from '@/shared/ui/textarea';
import { ModelViewer, getStaticArModelForDish } from '@/features/ar';
import { useCart } from '@/features/cart';
import { X, Plus, Minus, Heart, Leaf, Wheat, AlertTriangle, ScanLine } from 'lucide-react';
import type { MenuItem } from '../types';

interface DishDetailModalProps {
  dish: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const dietaryIcons: Record<string, { icon: typeof Leaf; color: string }> = {
  vegetarian: { icon: Leaf, color: 'text-success' },
  vegan: { icon: Heart, color: 'text-success' },
  'gluten-free': { icon: Wheat, color: 'text-amber-600' },
  halal: { icon: Heart, color: 'text-blue-600' },
};

export function DishDetailModal({ dish, isOpen, onClose }: DishDetailModalProps) {
  const { dispatch } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isArOpen, setIsArOpen] = useState(false);

  if (!isOpen || !dish) return null;

  const arModel = getStaticArModelForDish(dish);

  const addToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: dish.id,
        name: dish.name,
        price: dish.price,
        image: dish.image,
        quantity,
        specialInstructions: specialInstructions.trim() || undefined,
      },
    });
    dispatch({ type: 'OPEN_CART' });
    onClose();
    setQuantity(1);
    setSpecialInstructions('');
    setIsArOpen(false);
  };

  const closeModal = () => {
    setIsArOpen(false);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50 animate-in fade-in-0 duration-300" onClick={closeModal} />

      <div className="fixed inset-4 md:inset-8 lg:inset-16 bg-background rounded-xl z-50 overflow-hidden flex flex-col max-w-2xl mx-auto animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        <div className="flex-1 overflow-y-auto">
          <div className="relative overflow-hidden">
            <Image
              src={dish.image || '/placeholder.svg'}
              alt={dish.name}
              width={800} height={400} className="w-full h-48 md:h-64 object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 bg-white/90 hover:bg-white text-black hover:scale-110 transition-all duration-200 hover:shadow-lg"
        
              onClick={closeModal}
            >
              <X className="w-5 h-5" />
            </Button>

            {dish.popular && (
              <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground animate-bounce">Populaire</Badge>
            )}

            {arModel && (
              <Badge className="absolute top-14 left-4 bg-background/90 text-foreground shadow-sm">
                AR disponible
              </Badge>
            )}

            <div className="absolute bottom-4 right-4 flex gap-2">
              {dish.dietary.map((diet, index) => {
                const dietInfo = dietaryIcons[diet];
                if (!dietInfo) return null;
                const Icon = dietInfo.icon;
                return (
                  <div
                    key={diet}
                    className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:scale-110 hover:bg-white transition-all duration-200 hover:shadow-md"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Icon className={`w-4 h-4 ${dietInfo.color}`} />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold mb-2 animate-in slide-in-from-left-4 duration-500">{dish.name}</h2>
                <p className="text-muted-foreground mb-3 animate-in slide-in-from-left-4 duration-500 delay-100">
                  {dish.description}
                </p>
              </div>
              <span className="text-2xl font-bold text-primary ml-4 animate-in slide-in-from-right-4 duration-500 hover:scale-110 transition-transform">
                {dish.price.toFixed(2)} DZD
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {dish.dietary.map((diet, index) => (
                <Badge
                  key={diet}
                  variant="outline"
                  className="capitalize hover:scale-105 transition-transform duration-200 animate-in fade-in-0 slide-in-from-bottom-2 duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {diet.replace('-', ' ')}
                </Badge>
              ))}
            </div>

            <div className="mb-4 animate-in slide-in-from-bottom-4 duration-500 delay-150">
              {arModel ? (
                <div className="rounded-xl border border-border bg-card p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="font-semibold">Visualisez ce plat sur votre table</h3>
                      <p className="text-sm text-muted-foreground">Disponible pour ce plat.</p>
                    </div>
                    <Button
                      className="restaurant-gradient text-white hover:opacity-90"
                      onClick={() => setIsArOpen(true)}
                    >
                      <ScanLine className="w-4 h-4" />
                      Voir en AR
                    </Button>
                  </div>
                </div>
              ) : (
                <Badge variant="outline" className="text-muted-foreground">
                  AR bientôt disponible
                </Badge>
              )}
            </div>

            <Card className="mb-4 hover:shadow-md transition-shadow duration-200 animate-in slide-in-from-bottom-4 duration-500 delay-200">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Ingrédients</h3>
                <p className="text-sm text-muted-foreground">{dish.ingredients.join(', ')}</p>
              </CardContent>
            </Card>

            {dish.allergens.length > 0 && (
              <Card className="mb-4 border-amber-200 bg-amber-50 hover:shadow-md transition-shadow duration-200 animate-in slide-in-from-bottom-4 duration-500 delay-300">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 animate-pulse" />
                    <h3 className="font-semibold text-amber-800">Informations allergènes</h3>
                  </div>
                  <p className="text-sm text-amber-700">Contient : {dish.allergens.join(', ')}</p>
                </CardContent>
              </Card>
            )}

            <div className="mb-6 animate-in slide-in-from-bottom-4 duration-500 delay-400">
              <label className="block text-sm font-medium mb-2">Instructions spéciales (optionnel)</label>
              <Textarea
                placeholder="Régimes alimentaires, préférences de cuisson..."
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="resize-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 hover:shadow-sm"
                rows={3}
              />
            </div>
          </div>
        </div>

        <div className="border-t border-border p-6 bg-background animate-in slide-in-from-bottom-4 duration-500 delay-500">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="font-medium">Quantité :</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-10 h-10 p-0 bg-transparent hover:scale-110 hover:bg-primary hover:text-white transition-all duration-200"
                  aria-label="Decrease quantity" onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-10 h-10 p-0 bg-transparent hover:scale-110 hover:bg-primary hover:text-white transition-all duration-200"
                  aria-label="Increase quantity" onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-xl font-bold text-primary hover:scale-110 transition-transform duration-200">
                {(dish.price * quantity).toFixed(2)} DZD
              </p>
            </div>
          </div>

          <Button
            className="w-full bg-primary text-primary-foreground hover:opacity-90 hover:scale-105 transition-all duration-200 hover:shadow-lg"
            size="lg"
            onClick={addToCart}
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter à la commande
          </Button>
        </div>
      </div>

      {arModel && isArOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-[60] animate-in fade-in-0 duration-300"
            onClick={() => setIsArOpen(false)}
          />
          <div className="fixed inset-4 z-[70] mx-auto flex max-w-3xl flex-col overflow-hidden rounded-xl bg-background shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 md:inset-8">
            <div className="flex items-center justify-between border-b border-border p-4">
              <div>
                <h2 className="text-lg font-bold">{dish.name}</h2>
                <p className="text-sm text-muted-foreground">Visualisez ce plat sur votre table</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="p-2"
                onClick={() => setIsArOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <ModelViewer src={arModel.src} alt={arModel.alt} />
            </div>
          </div>
        </>
      )}
    </>
  );
}
