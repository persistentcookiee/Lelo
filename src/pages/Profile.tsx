
import React from 'react';
import Header from '@/components/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, MapPin, Star } from 'lucide-react';

const Profile = () => {
  return (
    <div className="min-h-screen bg-background bread-pattern">
      <Header title="Profile" showProfileButton={false} />
      
      <main className="container p-4">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="ratings" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="ratings">
                <Star className="mr-2 h-4 w-4" />
                Ratings
              </TabsTrigger>
              <TabsTrigger value="location">
                <MapPin className="mr-2 h-4 w-4" />
                Location
              </TabsTrigger>
              <TabsTrigger value="comments">
                <MessageSquare className="mr-2 h-4 w-4" />
                Comments
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="ratings">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                      <span className="text-lg font-medium">4.8 Average Rating</span>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Based on 45 reviews</p>
                      {/* Add rating breakdown here */}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="location">
              <Card>
                <CardContent className="pt-6">
                  <div className="h-[300px] bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Map view coming soon</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="comments">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-4 bg-muted rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium">User {i}</span>
                        <span className="text-sm text-muted-foreground">
                          {new Date().toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm">
                        Great food quality and always on time for pickup!
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Profile;
