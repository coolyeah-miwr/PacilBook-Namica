import React, { useState } from 'react';
import { useLocalization } from '../contexts/LocalizationContext';
import { ArrowLeftIcon, ChevronRightIcon, ChatBubbleLeftRightIcon, HelpIcon } from './icons';
import KritikSaranView from './KritikSaranView';
import PusatBantuanView from './PusatBantuanView';

interface BantuanViewProps {
  onBack: () => void;
}

type HelpSubView = 'main' | 'feedback' | 'faq';

const BantuanView: React.FC<BantuanViewProps> = ({ onBack }) => {
  const { t } = useLocalization();
  const [subView, setSubView] = useState<HelpSubView>('main');

  const renderContent = () => {
    switch (subView) {
      case 'feedback':
        return <KritikSaranView onBack={() => setSubView('main')} />;
      case 'faq':
        return <PusatBantuanView onBack={() => setSubView('main')} />;
      case 'main':
      default:
        return (
          <>
            <button 
              onClick={onBack} 
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 font-semibold"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              {t('menu_my_books')}
            </button>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">{t('help_title')}</h2>
            <div className="mt-8 space-y-4">
              <MenuItem
                icon={<ChatBubbleLeftRightIcon className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />}
                title={t('help_feedback_title')}
                description={t('help_feedback_desc')}
                onClick={() => setSubView('feedback')}
              />
              <MenuItem
                icon={<HelpIcon className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />}
                title={t('help_center_title')}
                description={t('help_center_desc')}
                onClick={() => setSubView('faq')}
              />
            </div>
          </>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {renderContent()}
    </div>
  );
};

interface MenuItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, title, description, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="w-full flex items-center text-left p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
    >
      <div className="flex-shrink-0 bg-yellow-100 dark:bg-yellow-500/20 p-3 rounded-full">
        {icon}
      </div>
      <div className="ml-4 flex-grow">
        <p className="font-bold text-lg text-gray-900 dark:text-gray-200">{title}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>
      <ChevronRightIcon className="w-6 h-6 text-gray-400" />
    </button>
  );
};

export default BantuanView;