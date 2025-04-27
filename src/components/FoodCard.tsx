import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin } from 'lucide-react';

interface FoodItem {
  id: string;
  title: string;
  description: string;
  image: string;
  quantity: string;
  expiryTime: string;
  location: string;
  distance?: string;
  isUrgent?: boolean;
  donor?: string;
  status?: 'available' | 'reserved' | 'completed';
  rating?: number;
  reviews?: number;
  discount?: string;
}

interface FoodCardProps {
  food: FoodItem;
  viewType: 'donor' | 'receiver';
  onClaim?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (string) => void;
}

const FoodCard: React.FC<FoodCardProps> = ({ 
  food, 
  viewType, 
  onClaim, 
  onEdit, 
  onDelete 
}) => {
  const isAvailable = food.status === 'available' || !food.status;
  
  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow card-gradient bg-opacity-50">
      <div className="relative h-48 bg-muted">
        <img 
          src={food.image || '/placeholder.svg'} 
          alt={food.title} 
          className="object-cover w-full h-full"
        />
        {food.isUrgent && (
          <Badge variant="destructive" className="absolute top-2 right-2">
            Urgent
          </Badge>
        )}
        {food.discount && (
          <Badge variant="secondary" className="absolute top-2 left-2">
            {food.discount}
          </Badge>
        )}
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="line-clamp-1">{food.title}</CardTitle>
            <CardDescription className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {food.location}
              {viewType === 'receiver' && food.distance && (
                <span>{food.distance}</span>
              )}
            </CardDescription>
          </div>
          {food.rating && (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
              <span className="text-sm font-medium">{food.rating}</span>
              {food.reviews && (
                <span className="text-sm text-muted-foreground">({food.reviews})</span>
              )}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm line-clamp-2">{food.description}</p>
          <div className="flex justify-between text-sm">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M3 9h18" />
                <path d="M9 3v18" />
              </svg>
              <span>{food.quantity}</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>{food.expiryTime}</span>
            </div>
          </div>
          {viewType === 'receiver' && food.donor && (
            <div className="text-sm text-gray-500">
              Posted by: {food.donor}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-2 bg-white/50 backdrop-blur-sm">
        {viewType === 'donor' ? (
          <div className="flex justify-between w-full gap-2">
            <Button variant="secondary" size="sm" onClick={() => onEdit?.(food.id)} className="flex-1">
              Edit
            </Button>
            <Button variant="destructive" size="sm" onClick={() => onDelete?.(food.id)} className="flex-1">
              Delete
            </Button>
          </div>
        ) : (
          <Button 
            className="w-full" 
            disabled={!isAvailable}
            onClick={() => onClaim?.(food.id)}
          >
            {isAvailable ? 'Claim' : 'Claimed'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default FoodCard;
