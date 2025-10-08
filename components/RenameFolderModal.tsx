import React, { useState } from 'react';
import { CloseIcon } from './icons';
import { useLocalization } from '../contexts/LocalizationContext';

interface RenameFolderModalProps {
  currentName: string;
  onClose: () => void;
  onRename: (newName: string) => void;
}

const RenameFolderModal: React.FC<RenameFolderModalProps> = ({ currentName, onClose, onRename }) => {
  const [newName, setNewName] = useState(currentName);
  const { t } = useLocalization();

  const handleRename = () => {
    if (newName.trim() && newName.trim() !== currentName) {
      onRename(newName.trim());
    }
    onClose();
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        handleRename();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-sm">
        <div className="flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Ganti Nama Folder
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
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={handleKeyDown}
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
            onClick={handleRename}
            disabled={!newName.trim() || newName.trim() === currentName}
            className="px-4 py-2 text-sm font-medium text-white bg-yellow-500 border border-transparent rounded-md shadow-sm hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700 disabled:bg-gray-400 dark:disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            {t('edit_profile_save')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RenameFolderModal;