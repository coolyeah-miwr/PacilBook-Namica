import React, { useState } from 'react';
import { useLocalization } from '../contexts/LocalizationContext';
import { ArrowLeftIcon } from './icons';

interface KritikSaranViewProps {
  onBack: () => void;
}

const KritikSaranView: React.FC<KritikSaranViewProps> = ({ onBack }) => {
  const { t } = useLocalization();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && message) {
      setIsSubmitted(true);
      // Here you would typically send the data to a server
      console.log({ email, message });
    }
  };

  return (
    <div>
      <button 
        onClick={onBack} 
        className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 font-semibold"
      >
        <ArrowLeftIcon className="w-5 h-5 mr-2" />
        {t('help_title')}
      </button>

      <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">{t('feedback_form_title')}</h2>

        {isSubmitted && (
          <div className="mb-4 text-green-700 dark:text-green-400 font-semibold bg-green-100 dark:bg-green-500/20 p-3 rounded-md">
            {t('feedback_form_success')}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">{t('feedback_form_email')}</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">{t('feedback_form_message')}</label>
            <textarea
              id="message"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700 transition-colors duration-200 text-lg"
            >
              {t('feedback_form_submit')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default KritikSaranView;