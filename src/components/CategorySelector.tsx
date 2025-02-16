import React from "react";
import Slider from "react-slick";
import { CategoryCard } from './CategoryCard';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface CategorySelectorProps {
  onSelectCategory: (category: string) => void;
}

export function CategorySelector({ onSelectCategory }: CategorySelectorProps) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '60px',
    className: 'category-carousel'
  };

  const categories = [
    { id: 'history', name: 'History', description: 'Historical events and figures', color: 'bg-yellow-500' },
    { id: 'science', name: 'Science', description: 'Scientific discoveries', color: 'bg-blue-500' },
    { id: 'geography', name: 'Geography', description: 'Places and landmarks', color: 'bg-green-500' },
    // Add more categories as needed
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Slider {...settings}>
        {categories.map((category) => (
          <div key={category.id} className="px-2">
            <CategoryCard
              category={category}
              onClick={() => onSelectCategory(category.id)}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}