import { Card, CardContent } from '@/shared/ui/card';
import { Skeleton } from '@/shared/ui/skeleton';
import { Badge } from '@/shared/ui/badge';
import type { MenuItem } from '../types';
import { useMenu } from '../api/queries';

interface MenuCardProps {
  item: MenuItem;
}

export function MenuCard({ item }: MenuCardProps) {
  return (
    <Card>
      <CardContent>
        <img src={item.imageUrl} alt={item.name} className="w-full h-40 object-cover" />
        <h3 className="mt-2 font-semibold">{item.name}</h3>
        <p className="text-lg">{item.price.toFixed(2)} €</p>
        {item.dietary.length > 0 && (
          <div className="flex gap-1 mt-1">
            {item.dietary.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function MenuCardSkeleton() {
  return (
    <Card>
      <CardContent>
        <Skeleton className="w-full h-40" />
        <Skeleton className="h-5 w-3/4 mt-2" />
        <Skeleton className="h-5 w-1/4 mt-1" />
      </CardContent>
    </Card>
  );
}

export function MenuList({ restaurantId }: { restaurantId: string }) {
  const { data: items, isLoading, error } = useMenu(restaurantId);

  if (isLoading) return <div className="grid grid-cols-3 gap-4">{Array.from({ length: 6 }).map((_, i) => <MenuCardSkeleton key={i} />)}</div>;
  if (error) return <p className="text-destructive">Failed to load menu</p>;
  if (!items?.length) return <p className="text-muted-foreground">No items available</p>;

  return (
    <div className="grid grid-cols-3 gap-4">
      {items.map((item) => <MenuCard key={item.id} item={item} />)}
    </div>
  );
}
