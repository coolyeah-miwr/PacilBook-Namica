import React from 'react';
import { Book, Folder } from '../types';
import { CloseIcon, PlusIcon, FolderIcon } from './icons';
import { useLocalization } from '../contexts/LocalizationContext';

interface AddToBagModalProps {
  book: Book;
  folders: Folder[];
  onClose: () => void;
  onAddToFolder: (book: Book, folderId: string) => void;
  onCreateFolder: () => void;
}

const AddToBagModal: React.FC<AddToBagModalProps> = ({ book, folders, onClose, onAddToFolder, onCreateFolder }) => {
  const { t } = useLocalization();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('bag_add_to_folder_title').replace('{title}', book.title)}
          </h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <CloseIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
        <div className="p-5 overflow-y-auto">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {t('bag_select_folder_prompt')}
          </p>
          <div className="space-y-2">
            {folders.map((folder) => (
              <button
                key={folder.id}
                onClick={() => onAddToFolder(book, folder.id)}
                className="w-full flex items-center text-left py-3 px-4 bg-gray-100 dark:bg-gray-700/60 text-gray-800 dark:text-gray-200 font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600/60 transition-colors"
              >
                <FolderIcon className="w-5 h-5 mr-3 text-yellow-500"/>
                <span className="flex-grow">{folder.name}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                    {folder.books.length} {folder.books.length === 1 ? t('bag_item_singular') : t('bag_item_plural')}
                </span>
              </button>
            ))}
            {folders.length === 0 && (
                <p className="text-center text-gray-500 dark:text-gray-400 py-4">{t('bag_no_folders_yet')}</p>
            )}
          </div>
        </div>
        <div className="p-5 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onCreateFolder}
            className="w-full flex items-center justify-center py-3 px-4 bg-yellow-500 text-gray-900 font-bold rounded-lg hover:bg-yellow-600 transition-colors"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            {t('bag_create_new_folder')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToBagModal;