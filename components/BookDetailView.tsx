import React from 'react';
import { Book } from '../types';
import { ArrowLeftIcon, CheckIcon } from './icons';
import { useLocalization } from '../contexts/LocalizationContext';

interface BookDetailViewProps {
  book: Book;
  onBack: () => void;
  isDownloaded?: boolean;
}

const BookDetailView: React.FC<BookDetailViewProps> = ({ book, onBack, isDownloaded }) => {
  const { t } = useLocalization();
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button 
        onClick={onBack} 
        className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 font-semibold"
      >
        <ArrowLeftIcon className="w-5 h-5 mr-2" />
        {t('book_detail_back')}
      </button>

      <div className="max-w-2xl mx-auto">
        {/* Book Cover with Title Overlay */}
        <div className="relative rounded-lg shadow-2xl overflow-hidden mb-6 w-full max-w-sm mx-auto aspect-[2/3]">
          <img 
            src={book.coverImage} 
            alt={book.title} 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4">
            <h1 className="text-3xl font-bold font-didot text-white text-center shadow-text">
              {book.title}
            </h1>
          </div>

          {/* Checkmark Icon */}
          {isDownloaded && (
            <div 
              className="absolute bottom-4 right-4 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg" 
              aria-label="Buku telah diunduh"
            >
              <CheckIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          )}
        </div>

        {/* Book Details */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-200">{book.title}</h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 mt-1">{book.year}</p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4 text-left sm:text-center">
            {book.description}
          </p>
        </div>
        
        {/* Action Button */}
        <div className="mt-8">
          <button className="w-full bg-yellow-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700 transition-colors duration-200 text-lg">
            {t('book_detail_read')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetailView;