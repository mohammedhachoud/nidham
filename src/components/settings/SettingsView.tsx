import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Download,
  Upload,
  RotateCcw,
  Sparkles,
  Check,
  AlertCircle,
  User,
  Save,
  Target,
  Moon,
  Monitor
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const {
    exportDataJSON,
    importDataJSON,
    resetToDefaults,
    triggerCelebration,
    userProfile,
    updateUserProfile,
    theme,
    toggleTheme
  } = useApp();

  const [importText, setImportText] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // Profile form state
  const [profileForm, setProfileForm] = useState({ ...userProfile });
  const [profileSaved, setProfileSaved] = useState(false);

  const handleProfileChange = (field: string, value: string | number) => {
    setProfileForm(prev => ({ ...prev, [field]: value }));
    setProfileSaved(false);
  };

  const handleProfileSave = () => {
    updateUserProfile({
      name: profileForm.name,
      motto: profileForm.motto,
      ieltsTargetBand: Number(profileForm.ieltsTargetBand),
      dailySleepTarget: Number(profileForm.dailySleepTarget),
      dailyScreenTimeLimit: Number(profileForm.dailyScreenTimeLimit),
    });
    setProfileSaved(true);
    triggerCelebration();
    setTimeout(() => setProfileSaved(false), 2500);
  };

  const handleDownloadBackup = () => {
    const jsonStr = exportDataJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nidham_pos_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    triggerCelebration();
  };

  const handleImport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!importText.trim()) return;
    const success = importDataJSON(importText);
    if (success) {
      setImportStatus('success');
      triggerCelebration();
      setTimeout(() => setImportStatus(null), 3000);
      setImportText('');
    } else {
      setImportStatus('error');
    }
  };

  const handleReset = () => {
    resetToDefaults();
    setIsResetConfirmOpen(false);
    triggerCelebration();
  };

  return (
    <div className="layout-column animate-fade-in">
      <div className="view-header">
        <div className="view-header-main">
          <h1>Settings & Data Management</h1>
          <p>Configure your profile, manage your data, and customize the system to your needs.</p>
        </div>
      </div>

      {/* ── Profile Editor ────────────────────────────────────────────────── */}
      <div className="card" style={{ marginBottom: 0 }}>
        <div className="card-header">
          <span className="card-title">
            <div className="card-title-icon" style={{ background: 'var(--accent-sage-bg)', color: 'var(--accent-sage)' }}>
              <User size={14} />
            </div>
            User Profile
          </span>
          <button
            className="btn btn-primary btn-sm"
            onClick={handleProfileSave}
            style={{ gap: '6px' }}
          >
            {profileSaved ? <Check size={13} /> : <Save size={13} />}
            {profileSaved ? 'Saved!' : 'Save Profile'}
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {/* Name */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Your Name
            </label>
            <input
              type="text"
              value={profileForm.name}
              onChange={e => handleProfileChange('name', e.target.value)}
              placeholder="e.g. Mohammed"
            />
          </div>

          {/* Motto */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Personal Motto
            </label>
            <input
              type="text"
              value={profileForm.motto}
              onChange={e => handleProfileChange('motto', e.target.value)}
              placeholder="e.g. Discipline Creates Freedom"
            />
          </div>

          {/* IELTS Target */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              <Target size={12} style={{ display: 'inline', marginRight: '4px' }} />
              IELTS Target Band
            </label>
            <input
              type="number"
              min={4}
              max={9}
              step={0.5}
              value={profileForm.ieltsTargetBand}
              onChange={e => handleProfileChange('ieltsTargetBand', e.target.value)}
            />
          </div>

          {/* Sleep Target */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              <Moon size={12} style={{ display: 'inline', marginRight: '4px' }} />
              Daily Sleep Target (hrs)
            </label>
            <input
              type="number"
              min={4}
              max={12}
              step={0.5}
              value={profileForm.dailySleepTarget}
              onChange={e => handleProfileChange('dailySleepTarget', e.target.value)}
            />
          </div>

          {/* Screen Time */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              <Monitor size={12} style={{ display: 'inline', marginRight: '4px' }} />
              Screen Time Limit (hrs/day)
            </label>
            <input
              type="number"
              min={0}
              max={10}
              step={0.5}
              value={profileForm.dailyScreenTimeLimit}
              onChange={e => handleProfileChange('dailyScreenTimeLimit', e.target.value)}
            />
          </div>

          {/* Program Start Date (read-only display) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Program Start Date
            </label>
            <input
              type="text"
              value={userProfile.programStartDate}
              readOnly
              style={{ opacity: 0.6, cursor: 'not-allowed' }}
            />
          </div>
        </div>
      </div>

      {/* ── Appearance ──────────────────────────────────────────────────────── */}
      <div className="grid-2col">
        <div className="card">
          <div className="card-header">
            <span className="card-title">
              <Moon size={16} style={{ color: 'var(--accent-periwinkle)' }} />
              Appearance
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
              Current theme: <strong style={{ color: 'var(--text-primary)' }}>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</strong>
            </span>
            <button className="btn btn-secondary btn-sm" onClick={toggleTheme}>
              {theme === 'dark' ? '☀ Switch to Light' : '🌙 Switch to Dark'}
            </button>
          </div>
        </div>

        {/* Operating Principles */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">
              <Sparkles size={16} style={{ color: 'var(--status-purple)' }} />
              Operating Principles
            </span>
          </div>
          <ul style={{ paddingLeft: '18px', fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '5px', margin: 0 }}>
            <li><strong>Principle 1 — Attention:</strong> Dashboard manages attention, not data storage.</li>
            <li><strong>Principle 2 — Dominant Objective:</strong> One dominant outcome per cycle/week/day.</li>
            <li><strong>Principle 3 — Essential vs Flexible:</strong> 3–5 non-negotiable commitments.</li>
            <li><strong>Principle 4 — Outputs Beat Consumption:</strong> Evidence proves capability.</li>
            <li><strong>Principle 5 — Technology Follows Problem:</strong> Use agents only when justified.</li>
          </ul>
        </div>
      </div>

      {/* ── Data Management ─────────────────────────────────────────────────── */}
      <div className="grid-2col">
        {/* Backup & Export */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">
              <Download size={18} style={{ color: 'var(--accent-primary)' }} />
              Export & Backup Data
            </span>
          </div>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.5 }}>
            Download a portable JSON snapshot of your entire 90-day trajectory, learning logs, IELTS sessions, error records, and artifacts.
          </p>
          <button className="btn btn-primary" onClick={handleDownloadBackup}>
            <Download size={16} />
            <span>Download JSON Snapshot</span>
          </button>
        </div>

        {/* Restore Backup */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">
              <Upload size={18} style={{ color: 'var(--status-success)' }} />
              Restore from Backup
            </span>
          </div>
          <form onSubmit={handleImport} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <textarea
              rows={3}
              placeholder="Paste exported JSON snapshot string here..."
              value={importText}
              onChange={e => setImportText(e.target.value)}
              style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}
            />
            {importStatus === 'success' && (
              <div style={{ color: 'var(--status-success)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Check size={14} />
                <span>Backup restored successfully!</span>
              </div>
            )}
            {importStatus === 'error' && (
              <div style={{ color: 'var(--status-danger)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <AlertCircle size={14} />
                <span>Invalid JSON format. Please verify your backup file.</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button type="submit" className="btn btn-secondary btn-sm" disabled={!importText.trim()}>
                Restore Data
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ── Danger Zone ─────────────────────────────────────────────────────── */}
      <div className="card" style={{ borderColor: 'var(--status-danger-border)' }}>
        <div className="card-header">
          <span className="card-title" style={{ color: 'var(--status-danger)' }}>
            <RotateCcw size={18} />
            Danger Zone — Reset & Defaults
          </span>
        </div>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
          Reset all system state back to the Day 1 / Week 1 clean starting state. This will erase all your logs, sessions, and progress. This action cannot be undone.
        </p>

        {!isResetConfirmOpen ? (
          <button
            className="btn btn-outline"
            style={{ color: 'var(--status-danger)', borderColor: 'var(--status-danger-border)' }}
            onClick={() => setIsResetConfirmOpen(true)}
          >
            Reset to Day 1 Starting State
          </button>
        ) : (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--status-danger)', fontWeight: 600 }}>⚠ This will erase all data. Are you sure?</span>
            <button className="btn btn-sm btn-secondary" onClick={() => setIsResetConfirmOpen(false)}>Cancel</button>
            <button
              className="btn btn-sm"
              style={{ background: 'var(--status-danger)', color: '#FFFFFF' }}
              onClick={handleReset}
            >
              Confirm Reset
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
