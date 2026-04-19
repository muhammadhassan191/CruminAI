import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  Linkedin, 
  Mail, 
  Phone, 
  Sparkles,
  MoreHorizontal,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LeadSearch = () => {
  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState([
    { id: 1, name: 'John Doe', title: 'CTO', company: 'Global Solutions', location: 'London, UK', industry: 'SaaS', revealed: false },
    { id: 2, name: 'Jane Smith', title: 'VP of Marketing', company: 'Nexus Retail', location: 'New York, USA', industry: 'E-commerce', revealed: false },
    { id: 3, name: 'Robert Fox', title: 'Engineering Manager', company: 'CloudScale', location: 'Berlin, Germany', industry: 'DevOps', revealed: false },
    { id: 4, name: 'Alice Wong', title: 'Founder', company: 'Innovate AI', location: 'Singapore', industry: 'Artificial Intelligence', revealed: false },
  ]);

  const handleReveal = (id) => {
    setLeads(leads.map(lead => lead.id === id ? { ...lead, revealed: true } : lead));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Search Header */}
      <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '1rem' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Briefcase size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          <input 
            type="text" 
            placeholder="Search by title (e.g. CTO)..." 
            style={{ width: '100%', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '0.75rem', padding: '0.75rem 1rem 0.75rem 3rem', color: 'var(--text-primary)' }}
          />
        </div>
        <div style={{ position: 'relative', flex: 1 }}>
          <MapPin size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          <input 
            type="text" 
            placeholder="Location..." 
            style={{ width: '100%', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '0.75rem', padding: '0.75rem 1rem 0.75rem 3rem', color: 'var(--text-primary)' }}
          />
        </div>
        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Search size={18} />
          Search
        </button>
      </div>

      {/* Results Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '1.25rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Name</th>
              <th style={{ padding: '1.25rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Title & Company</th>
              <th style={{ padding: '1.25rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Location</th>
              <th style={{ padding: '1.25rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Contact Info</th>
              <th style={{ padding: '1.25rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s' }} className="table-row">
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--bg-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>
                      {lead.name.charAt(0)}
                    </div>
                    {lead.name}
                  </div>
                </td>
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  <div>
                    <p style={{ fontWeight: 500 }}>{lead.title}</p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{lead.company}</p>
                  </div>
                </td>
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    <MapPin size={14} />
                    {lead.location}
                  </div>
                </td>
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  <AnimatePresence mode="wait">
                    {lead.revealed ? (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', gap: '0.5rem' }}>
                        <div className="glass-card" style={{ padding: '0.4rem', color: 'var(--accent-primary)' }}><Mail size={16} /></div>
                        <div className="glass-card" style={{ padding: '0.4rem', color: 'var(--accent-primary)' }}><Phone size={16} /></div>
                        <div className="glass-card" style={{ padding: '0.4rem', color: 'var(--accent-primary)' }}><Linkedin size={16} /></div>
                      </motion.div>
                    ) : (
                      <button 
                        onClick={() => handleReveal(lead.id)}
                        className="btn-primary" 
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', background: 'rgba(56, 189, 248, 0.1)', color: 'var(--accent-primary)', border: '1px solid rgba(56, 189, 248, 0.2)' }}
                      >
                        Reveal Info (1 Credit)
                      </button>
                    )}
                  </AnimatePresence>
                </td>
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="glass-card" style={{ padding: '0.5rem', color: 'var(--success)' }} title="Add to CRM">
                      <Plus size={18} />
                    </button>
                    <button className="glass-card" style={{ padding: '0.5rem', color: 'var(--accent-secondary)' }} title="AI Lead Scoring">
                      <Sparkles size={18} />
                    </button>
                    <button className="glass-card" style={{ padding: '0.5rem', color: 'var(--text-secondary)' }}>
                      <MoreHorizontal size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <style>{`
        .table-row:hover {
          background: rgba(255, 255, 255, 0.02);
        }
      `}</style>
    </div>
  );
};

export default LeadSearch;
