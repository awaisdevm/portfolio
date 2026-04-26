"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, useTransition } from "react";
import { HomeIcon, Globe, User, HandHelping } from "lucide-react";

const navItems = [
  { id: "home", label: "Home", color: "hover:text-primary", icon: HomeIcon },
  { id: "about", label: "About", color: "hover:text-secondary", icon: User },
  { id: "services", label: "Service", color: "hover:text-accent", icon: HandHelping },
  { id: "projects", label: "Projects", color: "hover:text-primary", icon: HomeIcon },
  { id: "contact", label: "Contact", color: "hover:text-secondary", icon: Globe },
];

// Create context type
interface NavContextType  {
  navItems: typeof navItems;
  scrollToSection: (id: string) => void;
  activeSection: string;
  setActiveSection: (id: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
};

// Create the context
const NavContext = createContext<NavContextType | undefined>(undefined);


export const NavProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [isPending, startTransition] = useTransition();
  
  const updateActiveSection = useCallback((id: string) => {
    startTransition(() => {
      setActiveSection(id);
    });
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      updateActiveSection(sectionId);
    }
  }, [updateActiveSection]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const sectionIds = navItems.map((n) => n.id);
    
    // Use a more generous threshold and rootMargin for better mobile/desktop sync
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px", // Detect section when it's in the top part of viewport
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    // Function to start observing elements
    const observeElements = () => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          observer.observe(el);
        }
      });
    };

    // Try observing immediately
    observeElements();

    // Fallback: If elements aren't found yet (Next.js hydration), try again after a short delay
    const timeoutId = setTimeout(observeElements, 1000);

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, []);

  const value = useMemo(() => ({
    navItems,
    scrollToSection,
    activeSection,
    setActiveSection: updateActiveSection,
    mobileMenuOpen,
    setMobileMenuOpen
  }), [scrollToSection, activeSection, updateActiveSection, mobileMenuOpen]);

  return (
    <NavContext.Provider value={value}>
      {children}
    </NavContext.Provider>
  );
};

// Hook for easy use
export const useNav = () => {
  const context = useContext(NavContext);
  if (!context) {
    throw new Error("useNav must be used within a NavProvider");
  }
  return context;
};