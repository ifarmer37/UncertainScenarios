import React from 'react';
import { Category } from '../types';

interface CategoryWheelProps {
  categories: Category[];
  selectedCategory: Category | null;
  onSelectCategory: (category: Category) => void;
}

export function CategoryWheel({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryWheelProps) {
  const totalCategories = categories.length;
  const angleStep = (2 * Math.PI) / totalCategories;

  return (
    <div className="relative w-[500px] h-[500px] mx-auto">
      <p className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-lg font-bold text-purple-600">
        Pick a Category
      </p>
      {categories.map((category, index) => {
        const angle = index * angleStep - Math.PI / 2;
        const x = Math.cos(angle) * 200 + 250;
        const y = Math.sin(angle) * 200 + 250;

        return (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category)}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 
              ${category.color} text-white rounded-full w-24 h-24
              flex items-center justify-center text-center p-2
              transition-all hover:scale-110 cursor-pointer
              ${
                selectedCategory?.id === category.id
                  ? 'ring-4 ring-white shadow-xl scale-110'
                  : ''
              }
              shadow-md hover:shadow-xl`}
            style={{
              left: `${x}px`,
              top: `${y}px`,
            }}
          >
            <span className="text-sm font-medium">{category.name}</span>
          </button>
        );
      })}
    </div>
  );
}
