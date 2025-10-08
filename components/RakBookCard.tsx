import React from 'react';
import { Book } from '../types';
import { DownloadIcon, PlusIcon } from './icons';

interface RakBookCardProps {
  book: Book;
  onSelect: (book: Book) => void;
  onAddToBag: (book: Book) => void;
  onDownload: (book: Book) => void;
}

const RakBookCard: React.FC<RakBookCardProps> = ({ book, onSelect, onAddToBag, onDownload }) => {
  return (
    <div className="flex-shrink-0 w-48 group">
      <div 
        onClick={() => onSelect(book)}
        className="relative aspect-[2/3] w-full rounded-lg overflow-hidden shadow-lg transform group-hover:-translate-y-2 transition-transform duration-300 cursor-pointer"
      >
        <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
      </div>
      <div className="mt-2 px-1">
        <h3 className="font-bold text-md text-gray-800 dark:text-gray-200 truncate">
          {book.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{book.year}</p>
        <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 h-12 overflow-hidden">
            {book.description}
        </p>
        <div className="mt-2 flex items-center justify-end space-x-2">
            <button onClick={() => onAddToBag(book)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" aria-label="Tambah ke tas">
                <PlusIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <button onClick={() => onDownload(book)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" aria-label="Unduh buku">
                <DownloadIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
        </div>
      </div>
    </div>
  );
};

export default RakBookCard;
