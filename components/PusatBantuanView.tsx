import React, { useState } from 'react';
import { useLocalization } from '../contexts/LocalizationContext';
import { ArrowLeftIcon, ChevronRightIcon } from './icons';

interface PusatBantuanViewProps {
  onBack: () => void;
}

const PusatBantuanView: React.FC<PusatBantuanViewProps> = ({ onBack }) => {
  const { t } = useLocalization();
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const faqs = [
    { q: 'faq_q1', a: 'faq_a1' },
    { q: 'faq_q2', a: 'faq_a2' },
    { q: 'faq_q3', a: 'faq_a3' },
    { q: 'faq_q4', a: 'faq_a4' },
  ];

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
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

      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">{t('faq_title')}</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full flex justify-between items-center text-left py-4"
              >
                <span className="font-semibold text-lg text-gray-800 dark:text-gray-200">{t(faq.q)}</span>
                <ChevronRightIcon 
                  className={`w-6 h-6 text-gray-500 transition-transform duration-300 ${openQuestion === index ? 'transform rotate-90' : ''}`}
                />
              </button>
              {openQuestion === index && (
                <div className="pb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t(faq.a)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PusatBantuanView;