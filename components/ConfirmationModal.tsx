import React from 'react';
import { CloseIcon, QuestionMarkCircleIcon } from './icons';
import { useLocalization } from '../contexts/LocalizationContext';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  cancelText,
}) => {
  const { t } = useLocalization();
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
      aria-labelledby="confirmation-modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-start p-6">
          <div className="flex-shrink-0 bg-yellow-100 dark:bg-yellow-500/20 p-3 rounded-full mr-4">
            <QuestionMarkCircleIcon className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div className="flex-grow">
            <h3 id="confirmation-modal-title" className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {title}
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {message}
            </p>
          </div>
          <button onClick={onClose} className="ml-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <CloseIcon className="w-5 h-5 text-gray-500 dark:text-gray-300" />
          </button>
        </div>
        <div className="flex justify-end space-x-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-b-lg">
          <button
            onClick={onClose}
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            {cancelText || t('dialog_cancel')}
          </button>
          <button
            onClick={handleConfirm}
            type="button"
            className="px-4 py-2 text-sm font-medium text-white bg-yellow-500 border border-transparent rounded-md shadow-sm hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700"
          >
            {confirmText || t('dialog_confirm')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
