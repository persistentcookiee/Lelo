import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Onboarding from "@/components/Onboarding";

const Index = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Check if the user has already selected a role
    const userRole = localStorage.getItem("userRole");
    
    if (userRole) {
      // If the user has already selected a role, redirect them to their home page
      navigate(`/${userRole.toLowerCase()}`);
    } else {
      // Otherwise, show the onboarding flow
      setIsLoading(false);
    }
  }, [navigate]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  return <Onboarding />;
};

export default Index;
