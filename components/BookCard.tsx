import React from 'react';
import { Book } from '../types';
import { TrashIcon, CheckIcon } from './icons';

interface BookCardProps {
  book: Book;
  onSelect: (book: Book) => void;
  onDelete: (bookId: string) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onSelect, onDelete }) => {
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents the onSelect from being called
    onDelete(book.id);
  };

  return (
    <div 
      className="relative w-full aspect-[2/3] cursor-pointer transform hover:-translate-y-1 transition-transform duration-200"
      onClick={() => onSelect(book)}
    >
      <img 
        src={book.coverImage} 
        alt={book.title} 
        className="w-full h-full object-cover rounded-lg shadow-lg" 
      />
      
      <div className="absolute bottom-2 right-2 flex items-center space-x-2">
        {/* Checkmark Icon */}
        <div
          className="bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-lg"
          aria-label={`Buku ${book.title} telah diunduh`}
        >
          <CheckIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
        </div>

        {/* Delete Icon */}
        <button 
          onClick={handleDeleteClick}
          className="bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-lg hover:bg-red-100 dark:hover:bg-red-500/30 transition-colors duration-200" 
          aria-label={`Hapus ${book.title}`}
        >
          <TrashIcon className="w-5 h-5 text-red-600 dark:text-red-400" />
        </button>
      </div>
    </div>
  );
};

export default BookCard;