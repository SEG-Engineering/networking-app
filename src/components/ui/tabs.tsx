"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TabsProps {
  defaultValue: string;
  children: React.ReactNode;
}

export function Tabs({ defaultValue, children }: TabsProps) {
  const [activeTab, setActiveTab] = React.useState(defaultValue);

  return (
    <div>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // Add activeTab and setActiveTab props dynamically
          return React.cloneElement(child as React.ReactElement<any>, {
            activeTab,
            setActiveTab,
          });
        }
        return child;
      })}
    </div>
  );
}

interface TabsListProps {
  className?: string;
  children: React.ReactNode;
  activeTab?: string;
  setActiveTab?: React.Dispatch<React.SetStateAction<string>>;
}

export function TabsList({ className, children, activeTab, setActiveTab }: TabsListProps) {
  return (
    <div className={cn("tabs-list flex", className)}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // Pass activeTab and setActiveTab to TabsTrigger components
          return React.cloneElement(child as React.ReactElement<any>, {
            activeTab,
            setActiveTab,
          });
        }
        return child;
      })}
    </div>
  );
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  activeTab?: string;
  setActiveTab?: React.Dispatch<React.SetStateAction<string>>;
}

export function TabsTrigger({
  value,
  children,
  activeTab,
  setActiveTab,
}: TabsTriggerProps) {
  const isActive = value === activeTab;

  const handleClick = () => {
    if (setActiveTab) {
      setActiveTab(value);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "tabs-trigger px-4 py-2 text-sm font-medium focus:outline-none",
        "border-b-2",
        "border-transparent",
        isActive ? "border-blue-500 text-blue-500" : "text-gray-500"
      )}
    >
      {children}
    </button>
  );
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  activeTab?: string;
}

export function TabsContent({ value, children, activeTab }: TabsContentProps) {
  if (value !== activeTab) return null;
  return <div className="tabs-content">{children}</div>;
}
