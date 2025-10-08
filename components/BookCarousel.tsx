import React, { useRef } from 'react';
import { Book } from '../types';
import RakBookCard from './RakBookCard';
import { ArrowLeftIcon, ArrowRightIcon } from './icons';

interface BookCarouselProps {
  title: string;
  subtitle: string;
  books: Book[];
  onSelectBook: (book: Book) => void;
  onAddToBag: (book: Book) => void;
  onDownload: (book: Book) => void;
}

const BookCarousel: React.FC<BookCarouselProps> = ({ title, subtitle, books, onSelectBook, onAddToBag, onDownload }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth * 0.8 
        : scrollLeft + clientWidth * 0.8;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{title}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>
        </div>
        <div className="flex items-center space-x-2">
            <button onClick={() => scroll('left')} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">
                <ArrowLeftIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
            <button onClick={() => scroll('right')} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">
                <ArrowRightIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
        </div>
      </div>
      <div 
        ref={scrollRef}
        className="flex space-x-6 overflow-x-auto pb-4 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 scrollbar-hide"
      >
        {books.map((book) => (
          <RakBookCard 
            key={book.id} 
            book={book} 
            onSelect={onSelectBook}
            onAddToBag={onAddToBag}
            onDownload={onDownload}
          />
        ))}
      </div>
    </section>
  );
};

export default BookCarousel;