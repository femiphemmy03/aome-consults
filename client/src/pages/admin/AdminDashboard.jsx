import { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import logo from '../../assets/images/aome-logo.jpg';

import BookingsTab from './tabs/BookingsTab.jsx';
import LeadsTab from './tabs/LeadsTab.jsx';
import BooksTab from './tabs/BooksTab.jsx';
import BlogTab from './tabs/BlogTab.jsx';
import SurveysTab from './tabs/SurveysTab.jsx';
import SettingsTab from './tabs/SettingsTab.jsx';

const TABS = [
  { key: 'bookings', label: 'Bookings', Component: BookingsTab },
  { key: 'leads', label: 'Leads', Component: LeadsTab },
  { key: 'books', label: 'Books', Component: BooksTab },
  { key: 'blog', label: 'Blog', Component: BlogTab },
  { key: 'surveys', label: 'Surveys', Component: SurveysTab },
  { key: 'settings', label: 'Settings', Component: SettingsTab }
];

export default function AdminDashboard() {
  const { logout, username } = useAuth();
  const [active, setActive] = useState('bookings');

  const ActiveComponent = TABS.find((t) => t.key === active)?.Component;

  return (
    <div className="min-h-screen bg-cream-100">
      <header className="bg-teal-900 text-cream-100">
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Aome Consults" className="h-9 rounded-md" />
            <span className="font-display text-lg">Admin Dashboard</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-teal-100">{username}</span>
            <button onClick={logout} className="font-semibold text-gold-300 hover:text-gold-200">
              Log Out
            </button>
          </div>
        </div>
      </header>

      <nav className="bg-cream-50 border-b border-teal-700/10 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-5 flex gap-1">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={`px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 ${
                active === tab.key
                  ? 'border-gold-500 text-teal-900'
                  : 'border-transparent text-ink-400 hover:text-teal-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-5 py-8">{ActiveComponent && <ActiveComponent />}</main>
    </div>
  );
}
