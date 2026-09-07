import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Download,
  Upload,
  RotateCcw,
  Sparkles,
  Check,
  AlertCircle
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const {
    exportDataJSON,
    importDataJSON,
    resetToDefaults,
    triggerCelebration
  } = useApp();

  const [importText, setImportText] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

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
          <p>
            Full local data ownership. Export complete JSON snapshots, import backups, and customize appearance.
          </p>
        </div>
      </div>

      <div className="grid-2col">
        {/* Backup & Export */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">
              <Download size={18} style={{ color: 'var(--accent-primary)' }} />
              Export & Backup Data
            </span>
          </div>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Download a portable JSON snapshot containing your entire 90-day trajectory, learning logs, IELTS sessions, error records, and artifacts.
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

      {/* Philosophy & Reset Grid */}
      <div className="grid-2col">
        {/* Core Operating Principles Card */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">
              <Sparkles size={18} style={{ color: 'var(--status-purple)' }} />
              Operating Rules & Architecture Principles
            </span>
          </div>
          <ul style={{ paddingLeft: '18px', fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <li><strong>Principle 1 — Attention:</strong> The dashboard manages attention, not data storage.</li>
            <li><strong>Principle 2 — Dominant Objective:</strong> Every cycle, week, and day has ONE dominant outcome.</li>
            <li><strong>Principle 3 — Essential vs Flexible:</strong> 3–5 non-negotiable commitments; optional items move freely.</li>
            <li><strong>Principle 4 — Outputs Beat Consumption:</strong> Evidence demonstrates capability; watching content is not learning.</li>
            <li><strong>Principle 5 — Technology Follows Problem:</strong> Workflow ≠ Agent. Only use agents when dynamic reasoning is proven necessary.</li>
          </ul>
        </div>

        {/* System Reset & Appearance */}
        <div className="card" style={{ borderColor: 'var(--status-danger-border)' }}>
          <div className="card-header">
            <span className="card-title" style={{ color: 'var(--status-danger)' }}>
              <RotateCcw size={18} />
              Reset & Defaults
            </span>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Reset system state back to the original Day 18 / Week 3 seed dataset.
          </p>

          {!isResetConfirmOpen ? (
            <button className="btn btn-outline" style={{ color: 'var(--status-danger)', borderColor: 'var(--status-danger-border)' }} onClick={() => setIsResetConfirmOpen(true)}>
              Reset to Sample Data
            </button>
          ) : (
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--status-danger)' }}>Are you sure?</span>
              <button className="btn btn-sm btn-secondary" onClick={() => setIsResetConfirmOpen(false)}>Cancel</button>
              <button className="btn btn-sm" style={{ background: 'var(--status-danger)', color: '#FFFFFF' }} onClick={handleReset}>
                Confirm Reset
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
