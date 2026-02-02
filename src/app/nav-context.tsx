"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { HomeIcon, Globe, User, HandHelping } from "lucide-react";

const navItems = [
  { id: "home", label: "Home", color: "hover:text-cyan-200", icon: HomeIcon },
  { id: "about", label: "About", color: "hover:text-blue-400", icon: User },
  { id: "services", label: "Service", color: "hover:text-green-500", icon: HandHelping },
  { id: "projects", label: "Projects", color: "hover:text-purple-500", icon: HomeIcon },
  { id: "contact", label: "Contact", color: "hover:text-orange-500", icon: Globe },
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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId); //  set active section on scroll
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const sectionIds = navItems.map((n) => n.id);
    const observers: IntersectionObserver[] = [];

    // Choose rootMargin so the middle of the viewport counts as 'active'
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry closest to the viewport center
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top));
        if (visible.length > 0) {
          const id = visible[0].target.id;
          setActiveSection(id);
        }
      },
      { root: null, rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.25, 0.5, 0.75] },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <NavContext.Provider value={{ navItems, scrollToSection, activeSection, setActiveSection ,mobileMenuOpen,
        setMobileMenuOpen
}}>
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