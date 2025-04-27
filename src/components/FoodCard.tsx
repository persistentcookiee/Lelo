import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, MessageSquare } from 'lucide-react';
import { Input } from "@/components/ui/input";

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

interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

interface FoodCardProps {
  food: FoodItem;
  viewType: 'donor' | 'receiver';
  onClaim?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const FoodCard: React.FC<FoodCardProps> = ({ 
  food, 
  viewType, 
  onClaim, 
  onEdit, 
  onDelete 
}) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const isAvailable = food.status === 'available' || !food.status;
  
  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        author: 'User', // In a real app, this would come from auth
        text: newComment.trim(),
        timestamp: new Date().toLocaleString()
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

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
          {showComments && (
            <div className="mt-4 space-y-2">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-background/50 p-2 rounded-md">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{comment.author}</span>
                    <span className="text-muted-foreground">{comment.timestamp}</span>
                  </div>
                  <p className="text-sm mt-1">{comment.text}</p>
                </div>
              ))}
              <div className="flex gap-2 mt-2">
                <Input
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleAddComment} variant="secondary" size="sm">
                  Post
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-2 bg-white/50 backdrop-blur-sm">
        <div className="flex w-full gap-2">
          {viewType === 'donor' ? (
            <>
              <Button variant="secondary" size="sm" onClick={() => onEdit?.(food.id)} className="flex-1">
                Edit
              </Button>
              <Button variant="destructive" size="sm" onClick={() => onDelete?.(food.id)} className="flex-1">
                Delete
              </Button>
            </>
          ) : (
            <div className="flex w-full gap-2">
              <Button 
                className="flex-1" 
                disabled={!isAvailable}
                onClick={() => onClaim?.(food.id)}
              >
                {isAvailable ? 'Claim' : 'Claimed'}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowComments(!showComments)}
                className="w-10"
              >
                <MessageSquare className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default FoodCard;
