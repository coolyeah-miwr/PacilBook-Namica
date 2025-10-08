import React from 'react';
import { useLocalization } from '../contexts/LocalizationContext';
import { ArrowLeftIcon } from './icons';

interface PrivacyPolicyViewProps {
  onBack: () => void;
}

const PrivacySection: React.FC<{ titleKey: string, children: React.ReactNode }> = ({ titleKey, children }) => {
  const { t } = useLocalization();
  return (
    <div className="mb-6">
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">{t(titleKey)}</h3>
      {children}
    </div>
  );
};

const PrivacyPolicyView: React.FC<PrivacyPolicyViewProps> = ({ onBack }) => {
  const { t } = useLocalization();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button 
        onClick={onBack} 
        className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 font-semibold"
      >
        <ArrowLeftIcon className="w-5 h-5 mr-2" />
        {t('privacy_back_button')}
      </button>

      <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">{t('privacy_title')}</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">{t('privacy_intro')}</p>
        
        <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
          <PrivacySection titleKey="privacy_section1_title">
            <p>{t('privacy_section1_p1')}</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>{t('privacy_section1_list_item1')}</li>
              <li>{t('privacy_section1_list_item2')}</li>
              <li>{t('privacy_section1_list_item3')}</li>
            </ul>
            <p className="mt-2">{t('privacy_section1_p2')}</p>
          </PrivacySection>
          
          <PrivacySection titleKey="privacy_section2_title">
            <p>{t('privacy_section2_p1')}</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>{t('privacy_section2_list_item1')}</li>
              <li>{t('privacy_section2_list_item2')}</li>
              <li>{t('privacy_section2_list_item3')}</li>
              <li>{t('privacy_section2_list_item4')}</li>
            </ul>
          </PrivacySection>

          <PrivacySection titleKey="privacy_section3_title">
            <p>{t('privacy_section3_p1')}</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>{t('privacy_section3_list_item1')}</li>
              <li>{t('privacy_section3_list_item2')}</li>
              <li>{t('privacy_section3_list_item3')}</li>
            </ul>
          </PrivacySection>

          <PrivacySection titleKey="privacy_section4_title">
            <p>{t('privacy_section4_p1')}</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>{t('privacy_section4_list_item1')}</li>
              <li>{t('privacy_section4_list_item2')}</li>
              <li>{t('privacy_section4_list_item3')}</li>
            </ul>
          </PrivacySection>
          
          <PrivacySection titleKey="privacy_section5_title">
            <p>{t('privacy_section5_p1')}</p>
          </PrivacySection>
          
          <PrivacySection titleKey="privacy_section6_title">
            <p>{t('privacy_section6_p1')}</p>
             <ul className="list-disc list-inside mt-2 space-y-1">
              <li>{t('privacy_section6_list_item1')}</li>
              <li>{t('privacy_section6_list_item2')}</li>
              <li>{t('privacy_section6_list_item3')}</li>
            </ul>
          </PrivacySection>

          <PrivacySection titleKey="privacy_section7_title">
            <p>{t('privacy_section7_p1')}</p>
          </PrivacySection>

          <PrivacySection titleKey="privacy_section8_title">
            <p>{t('privacy_section8_p1')}</p>
            <p className="mt-1">{t('privacy_section8_email')}</p>
            <p>{t('privacy_section8_address')}</p>
          </PrivacySection>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyView;