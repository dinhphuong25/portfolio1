"use client";

import React from "react";
import LogisticsCalculator from "./blog/LogisticsCalculator";

const COMPONENT_MAP: Record<string, React.ReactNode> = {
  "[LogisticsCalculator]": <LogisticsCalculator />,
};

interface MDXContentProps {
  content: string;
}

export default function MDXContent({ content }: MDXContentProps) {
  // Simple parser to split by [Component] tags
  const parts = content.split(/(\[.*?\])/g);

  return (
    <>
      {parts.map((part, index) => {
        if (COMPONENT_MAP[part]) {
          return <React.Fragment key={index}>{COMPONENT_MAP[part]}</React.Fragment>;
        }
        
        // Render as HTML if it's not a component placeholder
        return (
          <div 
            key={index} 
            dangerouslySetInnerHTML={{ __html: part }} 
            className="inline"
          />
        );
      })}
    </>
  );
}
