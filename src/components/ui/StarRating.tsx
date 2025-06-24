import { FaStar } from 'react-icons/fa';
import { useState } from 'react';

interface StarRatingProps {
  rating: number;
  setRating?: (rating: number) => void;
  readOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const StarRating = ({ 
  rating, 
  setRating, 
  readOnly = false,
  size = 'md'
}: StarRatingProps) => {
  const [hover, setHover] = useState<number | null>(null);
  
  // Determine star size based on prop
  const starSize = {
    sm: 'text-sm',
    md: 'text-xl',
    lg: 'text-2xl'
  }[size];
  
  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        
        return (
          <label key={index} className="cursor-pointer">
            <input 
              type="radio" 
              name="rating" 
              value={ratingValue} 
              onClick={() => !readOnly && setRating?.(ratingValue)} 
              className="hidden" 
              disabled={readOnly}
            />
            <FaStar 
              className={`${starSize} ${
                ratingValue <= (hover || rating) 
                  ? 'text-yellow-500' 
                  : 'text-gray-300'
              } transition-colors duration-200 ${!readOnly && 'hover:text-yellow-500'}`}
              onMouseEnter={() => !readOnly && setHover?.(ratingValue)}
              onMouseLeave={() => !readOnly && setHover?.(null)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
