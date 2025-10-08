import React, { useState, useRef, useEffect } from 'react';
import { User } from '../types';
import { UserIcon, EditIcon, GlobeAltIcon, MoonIcon, SunIcon, ShieldCheckIcon, ChevronRightIcon } from './icons';
import EditProfileModal from './EditProfileModal';
import { useLocalization } from '../contexts/LocalizationContext';
import { useTheme } from '../contexts/ThemeContext';

interface PengaturanViewProps {
  user: User;
  onSaveUser: (user: User) => void;
  onNavigateToPrivacy: () => void;
  setConfirmation: (confirmation: {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    confirmText?: string;
  } | null) => void;
}

const languageNames: { [key: string]: string } = {
  id: 'Indonesia',
  en: 'English',
  ko: '한국어',
  ja: '日本語',
}

const PengaturanView: React.FC<PengaturanViewProps> = ({ user, onSaveUser, onNavigateToPrivacy, setConfirmation }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLocalization();
  const [isLangDropdownOpen, setLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSave = (updatedUser: User) => {
    onSaveUser(updatedUser);
    setModalOpen(false);
  };
  
  const handleThemeChange = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  const handleLanguageChange = (langCode: string) => {
    if (language === langCode) return;
    setLangDropdownOpen(false);
    setConfirmation({
        isOpen: true,
        title: t('dialog_language_title'),
        message: t('dialog_language_message').replace('{language}', languageNames[langCode]),
        confirmText: t('dialog_confirm_change'),
        onConfirm: () => setLanguage(langCode),
    });
  };


  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">{t('settings_title')}</h2>
      <p className="text-gray-500 dark:text-gray-400 mt-1 mb-8">{t('settings_subtitle')}</p>


      {/* Profile Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="relative">
              {user.profilePicture ? (
                <img src={user.profilePicture} alt="Profil" className="w-16 h-16 rounded-full object-cover" />
              ) : (
                <div className="w-16 h-16 rounded-full bg-yellow-100 dark:bg-yellow-500/20 flex items-center justify-center">
                  <UserIcon className="w-8 h-8 text-yellow-500 dark:text-yellow-400" />
                </div>
              )}
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-200">{user.name}</h3>
              <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{user.nim}</p>
            </div>
          </div>
          <button 
            onClick={() => setModalOpen(true)}
            className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700" 
            aria-label="Edit profil"
          >
            <EditIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Settings List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          <li ref={langDropdownRef} className="relative">
            <button 
              onClick={() => setLangDropdownOpen(prev => !prev)}
              className="w-full flex justify-between items-center text-left px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50"
            >
              <div className="flex items-center">
                <GlobeAltIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                <span className="ml-4 text-gray-800 dark:text-gray-300 font-medium">{t('settings_language')}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-500 dark:text-gray-400 mr-2">{languageNames[language]}</span>
                <ChevronRightIcon className="w-5 h-5 text-gray-400" />
              </div>
            </button>
            {isLangDropdownOpen && (
              <div className="absolute right-6 mt-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border dark:border-gray-700 ring-1 ring-black ring-opacity-5">
                <ul className="py-1">
                  {Object.entries(languageNames).map(([code, name]) => (
                    <li key={code}>
                      <button 
                        onClick={() => handleLanguageChange(code)} 
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        {name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
          
          <li className="flex justify-between items-center px-6 py-4">
            <div className="flex items-center">
              {theme === 'dark' ? <SunIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" /> : <MoonIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />}
              <span className="ml-4 text-gray-800 dark:text-gray-300 font-medium">{t('settings_dark_mode')}</span>
            </div>
            <button
              onClick={handleThemeChange}
              className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 ${theme === 'dark' ? 'bg-yellow-500' : 'bg-gray-200'}`}
              role="switch"
              aria-checked={theme === 'dark'}
            >
              <span className="sr-only">Use setting</span>
              <span
                aria-hidden="true"
                className={`inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${theme === 'dark' ? 'translate-x-5' : 'translate-x-0'}`}
              />
            </button>
          </li>
          
          <li onClick={onNavigateToPrivacy} className="w-full flex justify-between items-center text-left px-6 py-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50">
            <div className="flex items-center">
              <ShieldCheckIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
              <span className="ml-4 text-gray-800 dark:text-gray-300 font-medium">{t('settings_privacy')}</span>
            </div>
            <ChevronRightIcon className="w-5 h-5 text-gray-400" />
          </li>
        </ul>
      </div>

      {isModalOpen && (
        <EditProfileModal 
          user={user} 
          onClose={() => setModalOpen(false)} 
          onSave={handleSave} 
          setConfirmation={setConfirmation}
        />
      )}
    </div>
  );
};

export default PengaturanView;