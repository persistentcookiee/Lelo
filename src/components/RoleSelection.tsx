
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const RoleSelection: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    
    // In a real app, we would save this to local storage or a user profile
    localStorage.setItem("userRole", role);
    
    // Navigate to the appropriate home page
    navigate(`/${role.toLowerCase()}`);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 space-y-6 text-center">
      <h2 className="text-2xl font-bold">I want to...</h2>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 w-full max-w-3xl">
        <Card 
          className={`cursor-pointer transition-all ${
            selectedRole === "donor" ? "ring-2 ring-primary" : "hover:shadow-md"
          }`}
          onClick={() => setSelectedRole("donor")}
        >
          <CardHeader>
            <CardTitle>Give Food</CardTitle>
            <CardDescription>Share your surplus food with those who need it</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-40 flex items-center justify-center p-4 bg-primary/10 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"/>
                <path d="M16.5 9.4 7.55 4.24"/>
                <polyline points="3.29 7 12 12 20.71 7"/>
                <line x1="12" y1="22" x2="12" y2="12"/>
                <circle cx="18.5" cy="15.5" r="2.5"/>
                <path d="M20.27 17.27 22 19"/>
              </svg>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              onClick={() => handleRoleSelect("donor")}
            >
              Select Donor Role
            </Button>
          </CardFooter>
        </Card>

        <Card 
          className={`cursor-pointer transition-all ${
            selectedRole === "receiver" ? "ring-2 ring-primary" : "hover:shadow-md"
          }`}
          onClick={() => setSelectedRole("receiver")}
        >
          <CardHeader>
            <CardTitle>Receive Food</CardTitle>
            <CardDescription>Find available food in your area</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-40 flex items-center justify-center p-4 bg-primary/10 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 5.523 4.477 10 10 10 1.555 0 3.023-.358 4.35-.992"/>
                <path d="m18 9-4 4-2-2"/>
                <path d="M15.5 19.5 14 22l-3.5-2L8 22l-1.5-2.5L4 18l1.5-3.5L4 11l2.5-1.5L8 7l3.5 2L14 7l1.5 2.5L18 11l-1.5 3.5 2.5 2"/>
              </svg>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              onClick={() => handleRoleSelect("receiver")}
            >
              Select Receiver Role
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <p className="text-sm text-gray-500 max-w-md">
        You can always change your role later in your profile settings
      </p>
    </div>
  );
};

export default RoleSelection;
