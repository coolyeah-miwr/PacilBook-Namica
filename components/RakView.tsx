import React from 'react';
import { Book } from '../types';
import BookCarousel from './BookCarousel';
import { useLocalization } from '../contexts/LocalizationContext';

// === KODE BARU: INTERFACE DAN TIPE ===

// Definisikan tipe untuk data yang diambil dari Supabase (3 kolom)
interface ScrapedBook { 
  title: string;
  url: string;
  cover_url: string;
}

// Perluas props RakViewProps untuk menyertakan data Supabase
interface RakViewProps {
  recommendedBooks: Book[];
  newBooks: Book[];
  lastReadBooks: Book[];
  onSelectBook: (book: Book) => void;
  onAddToBag: (book: Book) => void;
  onDownload: (book: Book) => void;
  // PROPS BARU DARI SUPABASE
  scrapedBooks: ScrapedBook[]; // <-- BARU
  isSupabaseLoading: boolean;   // <-- BARU
}

// Kita perlu komponen kustom untuk merender buku scraped karena tidak cocok dengan tipe Book
const ScrapedBookCard: React.FC<{ book: ScrapedBook }> = ({ book }) => {
    return (
        <div className="p-2 w-48 flex-shrink-0">
            <div className="border rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden bg-white dark:bg-gray-800 h-full flex flex-col">
                <img
                    src={book.cover_url || '/placeholder.png'} 
                    alt={book.title} 
                    className="w-full h-40 object-cover" 
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { 
                        const target = e.target as HTMLImageElement;
                        target.onerror = null; 
                        target.src = '/placeholder.png'; // Ganti dengan placeholder lokal Anda
                    }}
                />
                <div className="p-3 flex flex-col flex-grow">
                    <h4 className="text-sm font-semibold mb-2 line-clamp-2" title={book.title}>
                        {book.title}
                    </h4>
                    <div className="mt-auto">
                        <a 
                            href={book.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-xs text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-200 transition-colors duration-150 font-medium"
                        >
                            Lihat Sumber &rarr;
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Ubah tipe props RakView
const RakView: React.FC<RakViewProps> = ({ 
    recommendedBooks, 
    newBooks, 
    lastReadBooks, 
    onSelectBook, 
    onAddToBag, 
    onDownload,
    // DESTRUCTURE PROPS BARU
    scrapedBooks, 
    isSupabaseLoading,
}) => {
    const { t } = useLocalization();

    // === 1. Tambahkan Komponen untuk Hasil Scraping Supabase (TIDAK MENGGUNAKAN BookCarousel) ===
    const renderScrapedBooks = () => {
        if (isSupabaseLoading) {
            return (
                <div className="text-center py-8 text-gray-500">
                    {t('rak_loading_supabase_data')} {/* Anda perlu menambahkan terjemahan ini */}
                </div>
            );
        }

        if (scrapedBooks.length === 0) {
            return (
                <div className="text-center py-8 text-gray-500">
                    {t('rak_no_supabase_books')} {/* Anda perlu menambahkan terjemahan ini */}
                </div>
            );
        }

        // Tampilkan hasil dalam bentuk carousel custom karena tipe datanya berbeda
        return (
            <div className="overflow-x-auto whitespace-nowrap py-2">
                <div className="flex space-x-4">
                    {scrapedBooks.map((book) => (
                        <ScrapedBookCard key={book.url} book={book} />
                    ))}
                </div>
            </div>
        );
    };


    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-12">
            
            {/* === 2. TEMPATKAN KAROSEL SUPABASE DI ATAS SEMUA KAROSEL LAMA === */}
            <section>
                <h2 className="text-2xl font-bold mb-4 border-b pb-2 dark:text-white">
                    {t('rak_scraped_books_title')} {/* Anda perlu menambahkan terjemahan ini */}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {t('rak_scraped_books_subtitle')}
                </p>
                {renderScrapedBooks()}
            </section>
            
            {/* Karosel-karosel lama yang sudah ada */}
            <BookCarousel 
                title={t('rak_recommendations')} 
                subtitle={t('rak_recommendations_subtitle')}
                books={recommendedBooks} 
                onSelectBook={onSelectBook}
                onAddToBag={onAddToBag}
                onDownload={onDownload}
            />
            <BookCarousel 
                title={t('rak_newly_added')} 
                subtitle={t('rak_newly_added_subtitle')}
                books={newBooks}
                onSelectBook={onSelectBook}
                onAddToBag={onAddToBag}
                onDownload={onDownload}
            />
            <BookCarousel 
                title={t('rak_last_read')} 
                subtitle={t('rak_last_read_subtitle')}
                books={lastReadBooks} 
                onSelectBook={onSelectBook}
                onAddToBag={onAddToBag}
                onDownload={onDownload}
            />
        </div>
    );
};

export default RakView;