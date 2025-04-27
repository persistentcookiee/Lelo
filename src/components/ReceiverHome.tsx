
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FoodCard from './FoodCard';
import Header from './Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { TabsContent, Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data for available food listings
const MOCK_AVAILABLE_FOOD = [
  {
    id: '1',
    title: 'Fresh Pastries',
    description: 'Assortment of croissants, danishes, and muffins from today\'s baking.',
    image: '/placeholder.svg',
    quantity: '12 pieces',
    expiryTime: 'Today, 9PM',
    location: 'Sunrise Bakery',
    distance: '0.8 km',
    donor: 'Sunrise Bakery',
    isUrgent: true,
  },
  {
    id: '2',
    title: 'Vegetable Curry',
    description: 'Homemade vegetable curry with rice. Vegan friendly.',
    image: '/placeholder.svg',
    quantity: '3 servings',
    expiryTime: 'Today, 10PM',
    location: 'Green Life Restaurant',
    distance: '1.2 km',
    donor: 'Maria',
    isUrgent: false,
  },
  {
    id: '3',
    title: 'Sandwich Platter',
    description: 'Various sandwiches from a canceled meeting. All wrapped individually.',
    image: '/placeholder.svg',
    quantity: '8 sandwiches',
    expiryTime: 'Tomorrow, 12PM',
    location: 'Central Office Building',
    distance: '2.5 km',
    donor: 'John from ABC Corp',
    isUrgent: false,
  }
];

const ReceiverHome: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  
  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const handleClaimFood = (id: string) => {
    console.log('Claiming food item:', id);
    // In a real app, this would communicate with an API
    navigate(`/claim-food/${id}`);
  };

  const filteredFood = MOCK_AVAILABLE_FOOD.filter(food => {
    // Apply search filter
    if (searchQuery && !food.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Apply active filters
    if (activeFilters.includes('urgent') && !food.isUrgent) {
      return false;
    }
    if (activeFilters.includes('nearby') && parseFloat(food.distance.split(' ')[0]) > 1) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header title="Available Food" showProfileButton />
      
      <main className="container p-4">
        <div className="space-y-4">
          <div className="relative">
            <Input
              placeholder="Search for food..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
          
          <Tabs defaultValue="list" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="list">List</TabsTrigger>
              <TabsTrigger value="map">Map</TabsTrigger>
            </TabsList>
            
            <TabsContent value="list" className="space-y-4 mt-2">
              <div className="flex gap-2 overflow-x-auto pb-2">
                <Badge 
                  variant={activeFilters.includes('urgent') ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => toggleFilter('urgent')}
                >
                  Urgent
                </Badge>
                <Badge 
                  variant={activeFilters.includes('nearby') ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => toggleFilter('nearby')}
                >
                  Within 1km
                </Badge>
                <Badge 
                  variant={activeFilters.includes('vegan') ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => toggleFilter('vegan')}
                >
                  Vegan Only
                </Badge>
              </div>
              
              {filteredFood.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredFood.map((food) => (
                    <FoodCard
                      key={food.id}
                      food={food}
                      viewType="receiver"
                      onClaim={handleClaimFood}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <p className="text-muted-foreground">
                    No food listings match your search
                  </p>
                  <Button 
                    variant="link" 
                    onClick={() => {
                      setSearchQuery('');
                      setActiveFilters([]);
                    }}
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="map">
              <div className="h-[60vh] bg-muted rounded-md flex items-center justify-center">
                <div className="text-center">
                  <p className="text-muted-foreground">Map view coming soon</p>
                  <p className="text-sm text-muted-foreground">
                    Find food donations near you on the map
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default ReceiverHome;
