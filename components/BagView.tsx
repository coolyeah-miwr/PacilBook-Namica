import React from 'react';
import { Folder } from '../types';
import { FolderIcon, PlusIcon } from './icons';
import { useLocalization } from '../contexts/LocalizationContext';

interface BagViewProps {
  folders: Folder[];
  onSelectFolder: (folder: Folder) => void;
  onCreateFolder: () => void;
}

const BagView: React.FC<BagViewProps> = ({ folders, onSelectFolder, onCreateFolder }) => {
  const { t } = useLocalization();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">{t('menu_bag')}</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">{t('bag_subtitle')}</p>
        </div>
        <button 
            onClick={onCreateFolder}
            className="flex items-center px-4 py-2 bg-yellow-500 text-gray-900 font-bold rounded-lg hover:bg-yellow-600 transition-colors shadow-sm"
        >
            <PlusIcon className="w-5 h-5 mr-2"/>
            {t('bag_create_folder')}
        </button>
      </div>
      
      {folders.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {folders.map((folder) => (
            <button
                key={folder.id}
                onClick={() => onSelectFolder(folder)}
                className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-200 text-left group"
            >
                <div className="flex items-center">
                <FolderIcon className="w-12 h-12 text-yellow-500 group-hover:text-yellow-400 transition-colors" />
                <div className="ml-4 overflow-hidden">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-gray-200 truncate">{folder.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {folder.books.length} {folder.books.length === 1 ? t('bag_item_singular') : t('bag_item_plural')}
                    </p>
                </div>
                </div>
            </button>
            ))}
        </div>
      ) : (
        <div className="text-center py-20 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
            <FolderIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-200">{t('bag_no_folders_title')}</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{t('bag_no_folders_desc')}</p>
            <div className="mt-6">
                <button
                onClick={onCreateFolder}
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-900 bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                {t('bag_create_folder')}
                </button>
            </div>
        </div>
      )}
    </div>
  );
};

export default BagView;
