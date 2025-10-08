import React from 'react';
import { Book } from '../types';

interface FilteredBookCardProps {
  book: Book;
  onSelect: (book: Book) => void;
}

const FilteredBookCard: React.FC<FilteredBookCardProps> = ({ book, onSelect }) => {
  return (
    <div className="space-y-3 cursor-pointer group" onClick={() => onSelect(book)}>
      <div className="aspect-[2/3] w-full rounded-lg overflow-hidden shadow-lg transform group-hover:scale-105 transition-transform duration-300">
        <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
      </div>
      
      <div className="px-1">
        <h3 className="font-bold text-md text-gray-800 dark:text-gray-200 truncate group-hover:text-yellow-500 dark:group-hover:text-yellow-400 transition-colors">
          {book.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{book.year}</p>
        <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 h-12 overflow-hidden">
            {book.description}
        </p>
      </div>
    </div>
  );
};

export default FilteredBookCard;
