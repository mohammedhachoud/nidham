import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  CalendarCheck,
  CalendarRange,
  Languages,
  Plus
} from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { activeTab, setActiveTab, setQuickLogOpen } = useApp();

  return (
    <div className="mobile-bottom-nav">
      <button
        className={`mobile-nav-btn ${activeTab === 'command-center' ? 'active' : ''}`}
        onClick={() => setActiveTab('command-center')}
      >
        <LayoutDashboard size={20} />
        <span>Center</span>
      </button>

      <button
        className={`mobile-nav-btn ${activeTab === 'today' ? 'active' : ''}`}
        onClick={() => setActiveTab('today')}
      >
        <CalendarCheck size={20} />
        <span>Today</span>
      </button>

      <button
        className="mobile-nav-btn-center"
        onClick={() => setQuickLogOpen(true)}
        aria-label="Quick Log"
      >
        <Plus size={24} />
      </button>

      <button
        className={`mobile-nav-btn ${activeTab === 'week' ? 'active' : ''}`}
        onClick={() => setActiveTab('week')}
      >
        <CalendarRange size={20} />
        <span>Week</span>
      </button>

      <button
        className={`mobile-nav-btn ${activeTab === 'ielts' ? 'active' : ''}`}
        onClick={() => setActiveTab('ielts')}
      >
        <Languages size={20} />
        <span>IELTS</span>
      </button>
    </div>
  );
};
