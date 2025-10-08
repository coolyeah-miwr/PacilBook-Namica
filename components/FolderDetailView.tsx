import React, { useState } from 'react';
import { Book, Folder } from '../types';
import BagBookCard from './BagBookCard';
import { ArrowLeftIcon, EditIcon, TrashIcon } from './icons';
import { useLocalization } from '../contexts/LocalizationContext';
import RenameFolderModal from './RenameFolderModal';

interface FolderDetailViewProps {
  folder: Folder;
  onBack: () => void;
  onSelectBook: (book: Book) => void;
  onDeleteBookFromFolder: (bookId: string, folderId: string) => void;
  onDeleteFolder: (folderId: string) => void;
  onRenameFolder: (folderId: string, newName: string) => void;
}

const FolderDetailView: React.FC<FolderDetailViewProps> = ({ 
    folder, 
    onBack, 
    onSelectBook, 
    onDeleteBookFromFolder,
    onDeleteFolder,
    onRenameFolder,
}) => {
    const { t } = useLocalization();
    const [isRenameModalOpen, setRenameModalOpen] = useState(false);

    const handleRename = (newName: string) => {
        onRenameFolder(folder.id, newName);
        // The folder object from props will be stale, but it will be updated on the next render
        // No need to update local state here as the parent `App` component drives the state
    };

    return (
    <>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <button 
                onClick={onBack} 
                className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 font-semibold"
            >
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                {t('bag_back_to_all_folders')}
            </button>

            <div className="flex justify-between items-start mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">{folder.name}</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        {folder.books.length} {folder.books.length === 1 ? t('bag_item_singular') : t('bag_item_plural')}
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <button 
                        onClick={() => setRenameModalOpen(true)}
                        className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" aria-label="Ganti nama folder">
                        <EditIcon className="w-5 h-5"/>
                    </button>
                    <button 
                        onClick={() => onDeleteFolder(folder.id)}
                        className="p-2 rounded-full text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors" aria-label="Hapus folder">
                        <TrashIcon className="w-5 h-5"/>
                    </button>
                </div>
            </div>

            {folder.books.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-10">
                {folder.books.map(book => (
                    <BagBookCard 
                        key={book.id} 
                        book={book} 
                        onSelect={onSelectBook}
                        onDelete={(bookId) => onDeleteBookFromFolder(bookId, folder.id)}
                    />
                ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <p className="text-gray-500 dark:text-gray-400">{t('bag_folder_empty')}</p>
                </div>
            )}
        </div>
        {isRenameModalOpen && (
            <RenameFolderModal
                currentName={folder.name}
                onClose={() => setRenameModalOpen(false)}
                onRename={handleRename}
            />
        )}
    </>
    );
};

export default FolderDetailView;
