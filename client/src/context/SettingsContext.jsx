import { createContext, useContext, useEffect, useState } from 'react';
import api from '../utils/api.js';

const defaultSettings = {
  whatsapp_number: '+2349022150216',
  gumroad_profile_url: 'https://gumroad.com/aomeconsults',
  facebook_url: 'https://www.facebook.com/share/1AQA9CKaRt/',
  instagram_url: '',
  linkedin_url: '',
  tiktok_url: '',
  youtube_url: '',
  consultation_fee_ngn: '20000',
  consultation_fee_usd: '25'
};

const SettingsContext = createContext({ settings: defaultSettings, loading: true });

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/api/settings')
      .then(({ data }) => {
        setSettings({ ...defaultSettings, ...data.settings });
      })
      .catch(() => {
        // Falls back to defaultSettings — keeps the site usable even if the API is down.
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading }}>{children}</SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
