
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import FoodCard from './FoodCard';
import Header from './Header';
import { PlusIcon, Star, MapPin, Sandwich, CircleDollarSign } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Updated mock data to include ratings and discounts
const MOCK_FOOD_ITEMS = [
  {
    id: '1',
    title: 'Homemade Vegetable Soup',
    description: 'Freshly made vegetable soup with organic ingredients. Great for a healthy meal.',
    image: '/placeholder.svg',
    quantity: '4 servings',
    expiryTime: 'Today, 8PM',
    location: 'Downtown',
    status: 'available' as const,
    rating: 4.5,
    reviews: 12,
    discount: '20% off'
  },
  {
    id: '2',
    title: 'Bread Basket',
    description: 'Assorted bread from our bakery. Still fresh and delicious.',
    image: '/placeholder.svg',
    quantity: '1 basket',
    expiryTime: 'Tomorrow, 12PM',
    location: 'Westside',
    status: 'reserved' as const
  }
];

const DonorHome: React.FC = () => {
  const navigate = useNavigate();
  const [foodItems, setFoodItems] = useState(MOCK_FOOD_ITEMS);
  const [activeView, setActiveView] = useState('grid');

  const handleEditFood = (id: string) => {
    console.log('Edit food item:', id);
    navigate(`/edit-food/${id}`);
  };

  const handleDeleteFood = (id: string) => {
    console.log('Delete food item:', id);
    setFoodItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddFood = () => {
    navigate('/post-food');
  };

  return (
    <div className="min-h-screen bg-background bread-pattern">
      <Header title="Your Food Listings" showProfileButton />
      
      <main className="container p-4">
        <div className="relative mb-8 p-6 rounded-xl warm-gradient shadow-lg">
          <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-10">
            <Sandwich size={60} className="text-foreground" />
          </div>
          <div className="max-w-[80%]">
            <h1 className="text-2xl font-semibold text-foreground mb-2">
              Share Your Surplus
            </h1>
            <p className="text-muted-foreground mb-4">
              Your leftover food can make someone's day better
            </p>
            <Button 
              onClick={handleAddFood} 
              size="lg"
              className="w-full sm:w-auto flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
              <PlusIcon className="h-5 w-5" />
              Post Surplus Food
            </Button>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg card-gradient">
            <Star className="h-8 w-8 mb-2 text-amber-500" />
            <h3 className="font-semibold mb-1">4.8 Rating</h3>
            <p className="text-sm text-muted-foreground">Based on 45 reviews</p>
          </div>
          <div className="p-4 rounded-lg card-gradient">
            <MapPin className="h-8 w-8 mb-2 text-rose-500" />
            <h3 className="font-semibold mb-1">5 Locations</h3>
            <p className="text-sm text-muted-foreground">Active pickup points</p>
          </div>
          <div className="p-4 rounded-lg card-gradient">
            <CircleDollarSign className="h-8 w-8 mb-2 text-emerald-500" />
            <h3 className="font-semibold mb-1">3 Active Discounts</h3>
            <p className="text-sm text-muted-foreground">For bulk pickups</p>
          </div>
        </div>

        <Tabs defaultValue="grid" className="w-full">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Sandwich className="text-foreground h-6 w-6" />
              <h2 className="text-xl font-semibold">Your Listings</h2>
            </div>
            <TabsList>
              <TabsTrigger value="grid">Grid</TabsTrigger>
              <TabsTrigger value="map">Map</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="grid">
            {foodItems.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {foodItems.map((food) => (
                  <div key={food.id} className="transform hover:-translate-y-1 transition-transform duration-200">
                    <FoodCard
                      food={food}
                      viewType="donor"
                      onEdit={handleEditFood}
                      onDelete={handleDeleteFood}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center bg-secondary/20 rounded-lg">
                <p className="text-muted-foreground">
                  You haven't posted any food yet.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="map">
            <div className="h-[60vh] bg-muted rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">Map view coming soon</p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default DonorHome;
