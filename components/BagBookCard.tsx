import React from 'react';
import { Book } from '../types';
import { TrashIcon } from './icons';

interface BagBookCardProps {
  book: Book;
  onSelect: (book: Book) => void;
  onDelete: (bookId: string) => void;
}

const BagBookCard: React.FC<BagBookCardProps> = ({ book, onSelect, onDelete }) => {
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent onSelect from being called
    onDelete(book.id);
  };

  return (
    <div className="flex flex-col items-center text-center">
        <div 
            className="relative w-full aspect-[2/3] cursor-pointer group"
            onClick={() => onSelect(book)}
        >
            <img 
                src={book.coverImage} 
                alt={book.title} 
                className="w-full h-full object-cover rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105" 
            />
            
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 rounded-lg"></div>

            <button 
                onClick={handleDeleteClick}
                className="absolute top-2 right-2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-100 dark:hover:bg-red-500/30" 
                aria-label={`Hapus ${book.title} dari tas`}
            >
                <TrashIcon className="w-5 h-5 text-red-600 dark:text-red-400" />
            </button>
        </div>
        <h3 className="font-semibold text-gray-800 dark:text-gray-300 mt-3 text-sm">{book.title}</h3>
    </div>
  );
};

export default BagBookCard;
