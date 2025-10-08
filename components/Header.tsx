import React, { useRef, useEffect, useState } from 'react';
import { MenuIcon, SearchIcon, FilterIcon, BellIcon } from './icons';
import DropdownMenu from './DropdownMenu';
import NotificationPanel from './NotificationPanel';
import { View, FilterOptions, Notification } from '../types';
import { useLocalization } from '../contexts/LocalizationContext';

interface HeaderProps {
  isMenuOpen: boolean;
  setMenuOpen: (isOpen: boolean) => void;
  view: View;
  setView: (view: View) => void;
  onLogout: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterOptions: FilterOptions;
  setFilterOptions: (options: FilterOptions) => void;
  notifications: Notification[];
  onMarkNotificationAsRead: (id: string) => void;
  onMarkAllNotificationsAsRead: () => void;
  onClearAllNotifications: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  isMenuOpen, setMenuOpen, view, setView, onLogout,
  searchTerm, setSearchTerm, filterOptions, setFilterOptions,
  notifications, onMarkNotificationAsRead, onMarkAllNotificationsAsRead, onClearAllNotifications
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const { t } = useLocalization();
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (name === 'citra' || name === 'jaringan' || name === 'tertanam') {
      setFilterOptions({
        ...filterOptions,
        fields: { ...filterOptions.fields, [name]: checked },
      });
    } else {
      setFilterOptions({ ...filterOptions, [name]: value });
    }
  };

  const handleResetFilters = () => {
    setFilterOptions({
      from: '',
      to: '',
      fields: { citra: false, jaringan: false, tertanam: false },
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setMenuOpen(false);
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) setFilterOpen(false);
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) setNotificationOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setMenuOpen]);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left: Menu & Title */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            <div ref={menuRef} className="relative">
              <button
                onClick={() => setMenuOpen(!isMenuOpen)}
                className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                aria-label="Open menu"
              >
                <MenuIcon className="h-6 w-6" />
              </button>
              <DropdownMenu isOpen={isMenuOpen} view={view} setView={setView} onLogout={onLogout} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-didot hidden sm:block">
                Pacil<span className="text-yellow-500 dark:text-yellow-400">Book</span>
            </h1>
          </div>

          {/* Center: Search Bar */}
          <div className="flex-1 mx-4 flex justify-center">
            <div className="relative w-full max-w-lg">
              <input
                type="text"
                placeholder={t('search_placeholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-12 pl-12 pr-4 bg-black text-white placeholder-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
          
          {/* Right: Actions */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <div ref={filterRef} className="relative">
              <button onClick={() => setFilterOpen(!isFilterOpen)} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                <FilterIcon className="h-6 w-6" />
              </button>
              {isFilterOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-xl border dark:border-gray-700 p-4">
                  <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200 mb-4">{t('filter_title')}</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">{t('filter_range_label')}</label>
                      <div className="flex items-center space-x-2 mt-1">
                        <input type="text" name="from" placeholder={t('filter_from')} value={filterOptions.from} onChange={handleFilterChange} className="w-full p-2 bg-gray-900 text-white rounded-md text-sm placeholder-gray-400" />
                        <span className="text-gray-500 dark:text-gray-400">-</span>
                        <input type="text" name="to" placeholder={t('filter_to')} value={filterOptions.to} onChange={handleFilterChange} className="w-full p-2 bg-gray-900 text-white rounded-md text-sm placeholder-gray-400" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">{t('filter_field_label')}</label>
                      <div className="space-y-1 mt-2">
                        {Object.keys(filterOptions.fields).map((field) => (
                          <label key={field} className="flex items-center">
                            <input type="checkbox" name={field} checked={filterOptions.fields[field as keyof typeof filterOptions.fields]} onChange={handleFilterChange} className="h-4 w-4 rounded text-yellow-500 focus:ring-yellow-500 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700" />
                            <span className="ml-2 text-gray-700 dark:text-gray-300 capitalize">{t(`filter_field_${field}`)}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end items-center space-x-3 mt-6">
                    <button 
                        onClick={handleResetFilters}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 transition-colors"
                    >
                        {t('filter_reset')}
                    </button>
                    <button 
                        onClick={() => setFilterOpen(false)}
                        className="px-4 py-2 text-sm font-medium text-gray-900 bg-yellow-400 rounded-lg hover:bg-yellow-500 transition-colors"
                    >
                        {t('filter_apply')}
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div ref={notificationRef} className="relative">
              <button onClick={() => setNotificationOpen(!isNotificationOpen)} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                <BellIcon className="h-6 w-6" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500"></span>
                  </span>
                )}
              </button>
              <NotificationPanel
                isOpen={isNotificationOpen}
                notifications={notifications}
                onMarkRead={onMarkNotificationAsRead}
                onMarkAllRead={onMarkAllNotificationsAsRead}
                onClearAll={onClearAllNotifications}
              />
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;