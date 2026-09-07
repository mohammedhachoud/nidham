import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ExternalLink, Plus } from 'lucide-react';

export const ResourcesView: React.FC = () => {
  const { resources, addResource } = useApp();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [type, setType] = useState<any>('Paper');
  const [url, setUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [relatedTopic, setRelatedTopic] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addResource({
      title,
      type,
      url,
      summary,
      relatedTopic: relatedTopic || undefined
    });
    setIsAddOpen(false);
    setTitle('');
    setUrl('');
    setSummary('');
    setRelatedTopic('');
  };

  return (
    <div className="layout-column animate-fade-in">
      <div className="view-header">
        <div className="view-header-main">
          <h1>Curated Resources</h1>
          <p>
            Connected directly to Learning Topics and Projects. Not a graveyard for unread links.
          </p>
        </div>
        <div className="view-header-aside">
          <button className="btn btn-primary btn-sm" onClick={() => setIsAddOpen(true)}>
            <Plus size={14} />
            <span>+ Add Resource</span>
          </button>
        </div>
      </div>

      {isAddOpen && (
        <div className="card" style={{ border: '1px solid var(--accent-primary)' }}>
          <div className="card-header">
            <span className="card-title">Add Curated Resource</span>
            <button className="btn btn-ghost btn-sm" onClick={() => setIsAddOpen(false)}>✕</button>
          </div>
          <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">Title</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Type</label>
                <select value={type} onChange={e => setType(e.target.value)}>
                  <option value="Paper">Paper</option>
                  <option value="Doc">Doc</option>
                  <option value="Article">Article</option>
                  <option value="Book">Book</option>
                  <option value="Tool">Tool</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">URL</label>
              <input type="url" value={url} onChange={e => setUrl(e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label">Key Takeaway / Summary</label>
              <input type="text" value={summary} onChange={e => setSummary(e.target.value)} required />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button type="button" className="btn btn-secondary" onClick={() => setIsAddOpen(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary">Save Resource</button>
            </div>
          </form>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
        {resources.map(res => (
          <div key={res.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span className="badge badge-blue">{res.type}</span>
                <span className="font-mono" style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{res.dateAdded}</span>
              </div>
              <h3 style={{ fontSize: '0.98rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>
                {res.title}
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                {res.summary}
              </p>
            </div>

            <div style={{ marginTop: '16px', paddingTop: '10px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'flex-end' }}>
              <a href={res.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <span>Open Reference</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
