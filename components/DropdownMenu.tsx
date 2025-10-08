import React from 'react';
import { ShelfIcon, BagIcon, UserIcon, SettingsIcon, HelpIcon, LogoutIcon } from './icons';
import { View } from '../types';
import { useLocalization } from '../contexts/LocalizationContext';

interface DropdownMenuProps {
  isOpen: boolean;
  view: View;
  setView: (view: View) => void;
  onLogout: () => void;
}

const MenuItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean; onClick?: () => void }> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full px-4 py-2 text-sm text-left rounded-md transition-colors duration-150 ${
      active
        ? 'font-semibold bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400'
        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
    }`}
  >
    {icon}
    <span className="ml-3">{label}</span>
  </button>
);

const DropdownMenu: React.FC<DropdownMenuProps> = ({ isOpen, view, setView, onLogout }) => {
  const { t } = useLocalization();
  if (!isOpen) return null;

  return (
    <div
      className="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 dark:ring-gray-700 focus:outline-none"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
    >
      <div className="py-1 px-1" role="none">
        <MenuItem 
            icon={<ShelfIcon className="w-5 h-5" />} 
            label={t('menu_shelf')} 
            active={view === 'rak'}
            onClick={() => setView('rak')}
        />
        <MenuItem 
          icon={<BagIcon className="w-5 h-5" />} 
          label={t('menu_bag')}
          active={view === 'bag'}
          onClick={() => setView('bag')}
        />
        <MenuItem 
          icon={<UserIcon className="w-5 h-5" />} 
          label={t('menu_my_books')}
          active={view === 'punyaku'} 
          onClick={() => setView('punyaku')}
        />
      </div>
      <hr className="my-1 border-gray-200 dark:border-gray-700" />
      <div className="py-1 px-1" role="none">
        <MenuItem 
          icon={<SettingsIcon className="w-5 h-5" />} 
          label={t('menu_settings')}
          active={view === 'pengaturan'}
          onClick={() => setView('pengaturan')}
        />
        <MenuItem 
          icon={<HelpIcon className="w-5 h-5" />} 
          label={t('menu_help')}
          active={view === 'bantuan'}
          onClick={() => setView('bantuan')}
        />
        <MenuItem icon={<LogoutIcon className="w-5 h-5" />} label={t('menu_logout')} onClick={onLogout} />
      </div>
    </div>
  );
};

export default DropdownMenu;