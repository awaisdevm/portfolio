"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ObfuscatedContactProps {
  type: "email" | "phone";
  value: string; // "user@domain.com" or "+123456789"
  className?: string;
  ariaLabel?: string;
  children?: React.ReactNode;
}

export const ObfuscatedContact: React.FC<ObfuscatedContactProps> = ({
  type,
  value,
  className,
  ariaLabel,
  children,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [displayValue, setDisplayValue] = useState("");

  useEffect(() => {
    // Initial display value (obfuscated)
    if (type === "email") {
      const [user, domain] = value.split("@");
      setDisplayValue(`${user.substring(0, 2)}...${user.slice(-1)}@${domain}`);
    } else {
      setDisplayValue(`${value.substring(0, 4)}...${value.slice(-2)}`);
    }
  }, [type, value]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setDisplayValue(value);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Re-obfuscate or keep it revealed once touched? 
    // Usually revealing on touch/hover is enough for bots.
  };

  const getHref = () => {
    return type === "email" ? `mailto:${value}` : `tel:${value.replace(/\s/g, "")}`;
  };

  return (
    <a
      href={getHref()}
      className={cn("transition-all duration-300", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={ariaLabel || `${type === "email" ? "Email" : "Phone"}: ${value}`}
    >
      {children || <span className="font-mono">{displayValue}</span>}
    </a>
  );
};
