import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  Link, 
  Mail, 
  Phone, 
  Sparkles,
  MoreHorizontal,
  Plus,
  Play,
  Loader2,
  Database
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

  const [scraping, setScraping] = useState(false);
  const [scrapeFilters, setScrapeFilters] = useState({ industry: '', location: '', title: '', employeeCount: '' });

  const handleStartScrape = async () => {
    if (!scrapeFilters.industry || !scrapeFilters.location) {
      alert("Please provide at least Industry and Location.");
      return;
    }
    
    setScraping(true);
    try {
      const response = await fetch('http://localhost:8000/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          industry: scrapeFilters.industry,
          location: scrapeFilters.location,
          title: scrapeFilters.title,
          employee_count: scrapeFilters.employeeCount,
          limit: 10
        })
      });
      const data = await response.json();
      alert(data.message);
    } catch (err) {
      console.error("Scraper error:", err);
      alert("Failed to connect to scraper microservice.");
    } finally {
      // Background task will continue, we just reset the UI state
      setScraping(false);
    }
  };

  const handleReveal = async (id, lead) => {
    // Simulated credit deduction
    console.log(`Deducting 1 credit for lead: ${id}`);
    
    // Call our Python microservice enrichment endpoint
    try {
      const response = await fetch(`http://localhost:8000/enrich/${id}`);
      const data = await response.json();
      console.log("Enrichment API Data:", data);
    } catch (err) {
      console.error("Enrichment service error:", err);
    }

    setLeads(leads.map(l => l.id === id ? { ...l, revealed: true } : l));
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
      </div>

      {/* Live Scraper Panel */}
      <div className="card glass-card" style={{ border: '1px solid var(--accent-primary)', background: 'rgba(56, 189, 248, 0.02)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
             <Database size={20} style={{ color: 'var(--accent-primary)' }} />
             <div>
               <h3 style={{ fontSize: '1.125rem' }}>Google Maps Crawler</h3>
               <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Find new businesses and import them as leads instantly.</p>
             </div>
          </div>
          <button 
            onClick={handleStartScrape}
            disabled={scraping}
            className="btn-primary" 
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: scraping ? 0.7 : 1 }}
          >
            {scraping ? <Loader2 size={18} className="animate-spin" /> : <Play size={18} />}
            {scraping ? 'Searching...' : 'Start Crawler'}
          </button>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
          <div>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>Industry / Category</label>
            <input 
              type="text" 
              placeholder="e.g. Real Estate" 
              value={scrapeFilters.industry}
              onChange={(e) => setScrapeFilters({...scrapeFilters, industry: e.target.value})}
              style={{ width: '100%', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', padding: '0.6rem', color: 'var(--text-primary)' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>Location</label>
            <input 
              type="text" 
              placeholder="e.g. Dubai, UAE" 
              value={scrapeFilters.location}
              onChange={(e) => setScrapeFilters({...scrapeFilters, location: e.target.value})}
              style={{ width: '100%', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', padding: '0.6rem', color: 'var(--text-primary)' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>Target Title</label>
            <input 
              type="text" 
              placeholder="e.g. CEO" 
              value={scrapeFilters.title}
              onChange={(e) => setScrapeFilters({...scrapeFilters, title: e.target.value})}
              style={{ width: '100%', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', padding: '0.6rem', color: 'var(--text-primary)' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>Emp. Count</label>
            <input 
              type="text" 
              placeholder="e.g. 11-50" 
              value={scrapeFilters.employeeCount}
              onChange={(e) => setScrapeFilters({...scrapeFilters, employeeCount: e.target.value})}
              style={{ width: '100%', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', padding: '0.6rem', color: 'var(--text-primary)' }}
            />
          </div>
        </div>
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
                        <div className="glass-card" style={{ padding: '0.4rem', color: 'var(--accent-primary)' }}><Link size={16} /></div>
                      </motion.div>
                    ) : (
                      <button 
                        onClick={() => handleReveal(lead.id, lead)}
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
