
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Home, User } from "lucide-react";

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  showProfileButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  title = "Leftover Love", 
  showBackButton = false,
  showProfileButton = false
}) => {
  const navigate = useNavigate();
  const currentRole = localStorage.getItem("userRole")?.toLowerCase() || "donor";

  const toggleRole = () => {
    const newRole = currentRole === "donor" ? "receiver" : "donor";
    localStorage.setItem("userRole", newRole);
    navigate(`/${newRole}`);
  };

  return (
    <header className="sticky top-0 z-10 bg-[#f5e6d3] border-b border-[#e2d1bc] shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        {showBackButton ? (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)} 
            className="mr-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left">
              <path d="m12 19-7-7 7-7"/>
              <path d="M19 12H5"/>
            </svg>
            <span className="sr-only">Go back</span>
          </Button>
        ) : (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/')} 
            className="mr-2"
          >
            <Home className="h-5 w-5" />
            <span className="sr-only">Go to home</span>
          </Button>
        )}

        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold text-center">
            {title}
          </h1>
          <Button 
            variant="outline" 
            onClick={toggleRole}
            className="text-sm bg-[#f5e6d3] border-[#e2d1bc] hover:bg-[#e2d1bc]"
          >
            Switch to {currentRole === "donor" ? "Receiver" : "Donor"}
          </Button>
        </div>

        {showProfileButton ? (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/profile')} 
            className="ml-2"
          >
            <User className="h-5 w-5" />
            <span className="sr-only">Profile</span>
          </Button>
        ) : (
          <div className="w-9"></div>
        )}
      </div>
    </header>
  );
};

export default Header;
