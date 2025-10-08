import React from 'react';
import { Notification } from '../types';
import { useLocalization } from '../contexts/LocalizationContext';
import { CheckIcon, InformationCircleIcon, ShieldCheckIcon } from './icons';

interface NotificationPanelProps {
  isOpen: boolean;
  notifications: Notification[];
  onMarkRead: (id: string) => void;
  onMarkAllRead: () => void;
  onClearAll: () => void;
}

const formatTimeAgo = (timestamp: number): string => {
    const now = new Date();
    const secondsPast = (now.getTime() - timestamp) / 1000;

    if (secondsPast < 60) {
        return `${Math.round(secondsPast)}s ago`;
    }
    if (secondsPast < 3600) {
        return `${Math.round(secondsPast / 60)}m ago`;
    }
    if (secondsPast <= 86400) {
        return `${Math.round(secondsPast / 3600)}h ago`;
    }
    const day = new Date(timestamp);
    return day.toLocaleDateString();
};

const NotificationIcon: React.FC<{ type: Notification['type'] }> = ({ type }) => {
  switch (type) {
    case 'success':
      return <CheckIcon className="w-6 h-6 text-green-500" />;
    case 'update':
      return <InformationCircleIcon className="w-6 h-6 text-blue-500" />;
    case 'security':
      return <ShieldCheckIcon className="w-6 h-6 text-purple-500" />;
    default:
      return null;
  }
};

const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, notifications, onMarkRead, onMarkAllRead, onClearAll }) => {
  const { t } = useLocalization();

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl border dark:border-gray-700 flex flex-col max-h-[70vh]">
      {/* Header */}
      <div className="p-4 border-b dark:border-gray-700">
        <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">{t('notifications_title')}</h3>
        {notifications.length > 0 && (
            <div className="flex justify-between items-center mt-2 text-xs">
                <button onClick={onMarkAllRead} className="text-blue-600 dark:text-blue-400 hover:underline">{t('notifications_mark_all_read')}</button>
                <button onClick={onClearAll} className="text-red-600 dark:text-red-400 hover:underline">{t('notifications_clear_all')}</button>
            </div>
        )}
      </div>

      {/* Body */}
      <div className="overflow-y-auto flex-grow">
        {notifications.length > 0 ? (
          <ul>
            {notifications.map(notification => (
              <li 
                key={notification.id} 
                onClick={() => onMarkRead(notification.id)}
                className="flex items-start p-4 border-b dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer"
              >
                {!notification.isRead && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                )}
                <div className={`flex-shrink-0 ${notification.isRead ? 'ml-[20px]' : ''}`}>
                    <NotificationIcon type={notification.type} />
                </div>
                <div className="ml-3 flex-grow">
                  <p className={`text-sm ${notification.isRead ? 'text-gray-600 dark:text-gray-400' : 'text-gray-800 dark:text-gray-200'}`}>
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    {formatTimeAgo(notification.timestamp)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center p-16">
            <p className="text-gray-500 dark:text-gray-400">{t('notifications_empty')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;
