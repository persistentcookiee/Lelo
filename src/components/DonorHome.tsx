import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import FoodCard from './FoodCard';
import Header from './Header';
import { PlusIcon, Cake, Cookie } from 'lucide-react';

// Mock data for donor's food listings
const MOCK_FOOD_ITEMS = [
  {
    id: '1',
    title: 'Homemade Vegetable Soup',
    description: 'Freshly made vegetable soup with organic ingredients. Great for a healthy meal.',
    image: '/placeholder.svg',
    quantity: '4 servings',
    expiryTime: 'Today, 8PM',
    location: 'Downtown',
    status: 'available' as const
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
            <Cookie size={60} className="text-primary" />
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

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Cake className="text-primary h-6 w-6" />
            <h2 className="text-xl font-semibold">Your Listings</h2>
          </div>
          
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
        </div>
      </main>
    </div>
  );
};

export default DonorHome;
