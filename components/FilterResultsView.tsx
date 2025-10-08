import React from 'react';
import { Book } from '../types';
import FilteredBookCard from './FilteredBookCard';
import { useLocalization } from '../contexts/LocalizationContext';

interface FilterResultsViewProps {
  books: Book[];
  onClearFilter: () => void;
  onSelectBook: (book: Book) => void;
}

const FilterResultsView: React.FC<FilterResultsViewProps> = ({ books, onClearFilter, onSelectBook }) => {
  const { t } = useLocalization();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">{t('filter_results_title')}</h2>
        <button
          onClick={onClearFilter}
          className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition-colors"
        >
          {t('filter_back_to_shelf')}
        </button>
      </div>
      
      {books.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-10">
          {books.map(book => (
            <FilteredBookCard key={book.id} book={book} onSelect={onSelectBook} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500 dark:text-gray-400">Tidak ada buku yang cocok dengan kriteria Anda.</p>
        </div>
      )}
    </div>
  );
};

export default FilterResultsView;
