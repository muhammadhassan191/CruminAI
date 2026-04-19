import React, { useState } from 'react';
import { 
  MoreVertical, 
  Plus, 
  ChevronRight,
  MessageSquare,
  Calendar,
  Filter
} from 'lucide-react';
import { motion } from 'framer-motion';

const Column = ({ title, count, leads, color }) => {
  const handleSendEmail = async (email, name) => {
    const subject = `Opportunities for ${name}`;
    const body = `Hi ${name},\n\nI saw your profile at ${leads[0].company} and I'm impressed with your work. Let's connect!`;
    
    try {
      const response = await fetch('http://localhost:8000/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipient_email: email || 'hassan@test.com', subject, body })
      });
      const data = await response.json();
      alert("Email status: " + data.message);
    } catch (err) {
      console.error("Email service error:", err);
      alert("Failed to connect to email microservice.");
    }
  };

  return (
    <div style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 0.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: color }}></div>
        <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>{title}</h3>
        <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', background: 'var(--bg-secondary)', padding: '0.1rem 0.5rem', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
          {count}
        </span>
      </div>
      <button style={{ color: 'var(--text-secondary)', background: 'transparent' }}><MoreVertical size={16} /></button>
    </div>
    
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {leads.map((lead, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
          style={{ padding: '1rem', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <div>
              <p style={{ fontWeight: 600, fontSize: '0.925rem' }}>{lead.name}</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{lead.company}</p>
            </div>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--bg-surface)', fontSize: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {lead.score || 85}
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
              <MessageSquare size={12} />
              <span>{lead.msgs || 0}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
              <Calendar size={12} />
              <span>{lead.date || '2d'}</span>
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); handleSendEmail(lead.email, lead.name); }}
              className="glass-card" 
              style={{ marginLeft: 'auto', padding: '4px', color: 'var(--accent-primary)', cursor: 'pointer' }}
              title="Send Outreach Email"
            >
              <MessageSquare size={14} />
            </button>
          </div>
        </motion.div>
      ))}
      <button style={{ 
        width: '100%', 
        padding: '0.75rem', 
        border: '1px dashed var(--border-color)', 
        background: 'transparent', 
        borderRadius: '0.75rem', 
        color: 'var(--text-secondary)',
        fontSize: '0.875rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem'
      }}>
        <Plus size={16} /> Add Lead
      </button>
    </div>
  </div>
);

const CRM = () => {
  const pipeline = {
    'New': [
      { name: 'Marcus Aurelius', company: 'Rome Tech', score: 92, date: '1h' },
      { name: 'Elon Tusk', company: 'X-Space', score: 78, date: '5h' }
    ],
    'Contacted': [
      { name: 'Sarah Connor', company: 'Cyberdyne', score: 88, msgs: 2 }
    ],
    'Interested': [
      { name: 'Peter Parker', company: 'Daily Bugle', score: 95, msgs: 4 }
    ],
    'Converted': [
      { name: 'Tony Stark', company: 'Stark Ind.', score: 99, msgs: 12 }
    ]
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="glass-card" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
            <Filter size={16} /> Filter
          </button>
          <div className="glass-card" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Pipeline View: <strong>Visual</strong>
          </div>
        </div>
        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={18} /> New Pipeline
        </button>
      </div>

      <div style={{ 
        display: 'flex', 
        gap: '1.5rem', 
        overflowX: 'auto', 
        paddingBottom: '2rem',
        minHeight: 'calc(100vh - 300px)'
      }}>
        <Column title="New Leads" count={2} leads={pipeline['New']} color="#3b82f6" />
        <Column title="Contacted" count={1} leads={pipeline['Contacted']} color="#8b5cf6" />
        <Column title="Interested" count={1} leads={pipeline['Interested']} color="#f59e0b" />
        <Column title="Converted" count={1} leads={pipeline['Converted']} color="#10b981" />
      </div>
    </div>
  );
};

export default CRM;
