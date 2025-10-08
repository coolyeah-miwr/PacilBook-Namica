import React, { useState } from 'react';
import { CloseIcon } from './icons';
import { useLocalization } from '../contexts/LocalizationContext';

interface CreateFolderModalProps {
  onClose: () => void;
  onCreate: (folderName: string) => void;
}

const CreateFolderModal: React.FC<CreateFolderModalProps> = ({ onClose, onCreate }) => {
  const [folderName, setFolderName] = useState('');
  const { t } = useLocalization();

  const handleCreate = () => {
    if (folderName.trim()) {
      onCreate(folderName.trim());
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        handleCreate();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-sm">
        <div className="flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('dialog_create_folder_title')}
          </h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <CloseIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
        <div className="p-5">
          <label htmlFor="folderName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('dialog_create_folder_name_label')}
          </label>
          <input
            type="text"
            id="folderName"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('dialog_create_folder_name_placeholder')}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
            autoFocus
          />
        </div>
        <div className="flex justify-end space-x-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-b-lg">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            {t('dialog_cancel')}
          </button>
          <button
            onClick={handleCreate}
            disabled={!folderName.trim()}
            className="px-4 py-2 text-sm font-medium text-white bg-yellow-500 border border-transparent rounded-md shadow-sm hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700 disabled:bg-gray-400 dark:disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            {t('dialog_create_folder_button')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateFolderModal;