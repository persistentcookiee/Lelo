
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import RoleSelection from "./RoleSelection";
import { motion } from "framer-motion";

const Onboarding: React.FC = () => {
  const [step, setStep] = useState(0);
  
  const steps = [
    {
      title: "Welcome to Leftover Love",
      description: "Join our community fighting food waste and hunger - one meal at a time!",
      image: "food-sharing-illustration",
    },
    {
      title: "Share Your Surplus",
      description: "Restaurants and households can post their extra food for others to claim.",
      image: "food-sharing-illustration",
    },
    {
      title: "Find Available Food",
      description: "Browse nearby available food that would otherwise go to waste.",
      image: "food-sharing-illustration",
    },
    {
      component: <RoleSelection />,
    },
  ];

  const handleNextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const handleSkip = () => {
    setStep(steps.length - 1);
  };

  const currentStep = steps[step];
  
  if (currentStep.component) {
    return <>{currentStep.component}</>;
  }

  return (
    <div className="flex flex-col items-center justify-between min-h-[calc(100vh-6rem)] p-6 text-center">
      <div></div>
      
      <div className="space-y-8 w-full max-w-lg">
        <div className={`h-64 w-full ${currentStep.image} flex items-center justify-center`}>
          {/* Illustration is loaded through CSS background in the class */}
        </div>
        
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <h1 className="text-3xl font-bold">{currentStep.title}</h1>
          <p className="text-lg text-gray-600">{currentStep.description}</p>
        </motion.div>
      </div>

      <div className="w-full space-y-4">
        <div className="flex justify-center space-x-2">
          {steps.slice(0, steps.length - 1).map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === step ? "bg-primary" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
        
        <div className="flex flex-col space-y-2">
          <Button onClick={handleNextStep} size="lg" className="w-full">
            {step === steps.length - 2 ? "Get Started" : "Next"}
          </Button>
          
          {step < steps.length - 2 && (
            <Button variant="ghost" onClick={handleSkip} size="lg">
              Skip
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
