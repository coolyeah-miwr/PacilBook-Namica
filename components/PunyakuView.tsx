import React from 'react';
import { Book } from '../types';
import BookCard from './BookCard';
import { useLocalization } from '../contexts/LocalizationContext';

interface PunyakuViewProps {
  books: Book[];
  onSelectBook: (book: Book) => void;
  onDeleteBook: (bookId: string) => void;
}

const PunyakuView: React.FC<PunyakuViewProps> = ({ books, onSelectBook, onDeleteBook }) => {
  const { t } = useLocalization();
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">{t('punyaku_title')}</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">{t('punyaku_subtitle')}</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-10">
        {books.map(book => (
          <div key={book.id} className="flex flex-col items-center text-center">
            <BookCard book={book} onSelect={onSelectBook} onDelete={onDeleteBook} />
            <h3 className="font-semibold text-gray-800 dark:text-gray-300 mt-3 text-sm">{book.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PunyakuView;