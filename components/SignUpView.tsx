import React, { useState } from 'react';
import { BookIcon, EyeIcon, EyeSlashIcon, BookOutlineIcon, CodeBracketIcon } from './icons';
import { useLocalization } from '../contexts/LocalizationContext';
import { User } from '../types';

interface SignUpViewProps {
  onSignUp: (newUser: Omit<User, 'profilePicture'>) => { success: boolean; message?: string };
  onSignUpSuccess: () => void;
  onSwitchToLogin: () => void;
}

const SignUpView: React.FC<SignUpViewProps> = ({ onSignUp, onSignUpSuccess, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    nim: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { t } = useLocalization();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError(t('signup_error_password_mismatch'));
      return;
    }

    const { confirmPassword, ...newUser } = formData;
    const result = onSignUp(newUser);
    
    if (result.success) {
      onSignUpSuccess();
    } else {
      setError(result.message || t('signup_error_generic'));
    }
  };

  const inputClass = "block w-full px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent";

  return (
    <div className="relative bg-gray-100 dark:bg-gray-900 min-h-screen flex items-center justify-center p-4 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 z-0" aria-hidden="true">
            <BookOutlineIcon className="absolute -top-8 -left-12 h-40 w-40 text-gray-300/70 dark:text-gray-700/50 transform -rotate-12" />
            <div className="absolute top-[15%] -right-8 h-24 w-24 border-2 border-gray-300/70 dark:border-gray-700/50 rounded-full"></div>
            <BookOutlineIcon className="absolute top-10 -right-16 h-48 w-48 text-gray-300/70 dark:text-gray-700/50 transform rotate-12" />
            <CodeBracketIcon className="absolute bottom-[20%] -left-8 h-28 w-28 text-gray-300/70 dark:text-gray-700/50 transform rotate-12" />
            <div className="absolute bottom-[25%] -right-5 h-16 w-16 border-2 border-gray-300/70 dark:border-gray-700/50 rounded-full"></div>
            <span className="absolute bottom-10 left-10 text-4xl font-mono text-gray-300/70 dark:text-gray-700/50 transform rotate-12 select-none">101</span>
        </div>

      <div className="w-full max-w-md z-10">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
          <div className="flex flex-col items-center mb-6">
            <div className="mb-4">
                <BookIcon className="h-14 w-14 text-gray-800 dark:text-gray-200" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {t('signup_title')}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">{t('signup_subtitle')}</p>
          </div>

          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('signup_fullname_label')}
              </label>
              <input type="text" id="name" value={formData.name} onChange={handleChange} placeholder={t('signup_fullname_placeholder')} className={inputClass} required />
            </div>

            <div>
              <label htmlFor="nim" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('signup_nim_label')}
              </label>
              <input type="text" id="nim" value={formData.nim} onChange={handleChange} placeholder={t('signup_nim_placeholder')} className={inputClass} required />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('signup_phone_label')}
              </label>
              <input type="tel" id="phone" value={formData.phone} onChange={handleChange} placeholder={t('signup_phone_placeholder')} className={inputClass} required />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('signup_email_label')}
              </label>
              <input type="email" id="email" value={formData.email} onChange={handleChange} placeholder={t('signup_email_placeholder')} className={inputClass} required />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('signup_password_label')}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={t('signup_password_placeholder')}
                  className={inputClass}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('signup_confirm_password_label')}
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder={t('signup_password_placeholder')}
                  className={inputClass}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-gray-900 bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors"
              >
                {t('signup_button')}
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            {t('signup_login_prompt')}{' '}
            <button onClick={onSwitchToLogin} className="font-medium text-yellow-600 dark:text-yellow-400 hover:text-yellow-500 focus:outline-none">
              {t('signup_login_link')}
            </button>
          </p>
        </div>
        <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          {t('footer_copyright')}
        </p>
      </div>
    </div>
  );
};

export default SignUpView;