import React from 'react';
import { useApp } from '../../context/AppContext';
import { Menu, Plus } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    setMobileMenuOpen,
    setQuickLogOpen
  } = useApp();

  return (
    <header className="mobile-only-header">
      <button
        className="mobile-header-toggle"
        onClick={() => setMobileMenuOpen(true)}
        aria-label="Open Navigation"
      >
        <Menu size={18} />
      </button>

      <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '1rem', color: 'var(--text-primary)' }}>
        A Better You
      </span>

      <button
        className="btn btn-sm btn-sage"
        onClick={() => setQuickLogOpen(true)}
      >
        <Plus size={14} />
        <span>Log</span>
      </button>
    </header>
  );
};
