import React from "react";

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    description: string;
    color: string;
  };
  onClick: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick }) => {
  return (
    <div 
      className={`cursor-pointer rounded-lg shadow-lg p-4 ${category.color}`} 
      onClick={onClick}
    >
      <h3 className="text-lg font-bold">{category.name}</h3>
      <p className="text-sm">{category.description}</p>
    </div>
  );
};