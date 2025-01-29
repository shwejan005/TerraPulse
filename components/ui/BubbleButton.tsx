"use client";
import { ArrowRight, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";

const BubbleButton = ( {children} : {children: React.ReactNode} ) => {
  return (
    <Button
      className="relative flex items-center gap-2 px-4 py-2 text-lg font-medium transition-all 
        duration-300 ease-out transform rounded-lg group 
        hover:scale-105 hover:shadow-[0px_0px_15px_rgba(0,255,100,0.3)]"
    >
      {children}
      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
      <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 
        transition-all duration-500 bg-white blur-lg"></span>
    </Button>
  );
};

export default BubbleButton;
