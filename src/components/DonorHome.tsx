
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import FoodCard from './FoodCard';
import Header from './Header';
import { PlusIcon } from 'lucide-react';

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
    <div className="min-h-screen bg-background">
      <Header title="Your Food Listings" showProfileButton />
      
      <main className="container p-4">
        <div className="mb-6">
          <Button 
            onClick={handleAddFood} 
            size="lg"
            className="w-full flex items-center justify-center gap-2"
          >
            <PlusIcon className="h-5 w-5" />
            Post Surplus Food
          </Button>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Your Listings</h2>
          
          {foodItems.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {foodItems.map((food) => (
                <FoodCard
                  key={food.id}
                  food={food}
                  viewType="donor"
                  onEdit={handleEditFood}
                  onDelete={handleDeleteFood}
                />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
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
