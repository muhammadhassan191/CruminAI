import React from 'react';
import { 
  Users, 
  Mail, 
  Phone, 
  TrendingUp,
  ArrowUpRight,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, trend, color }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="card stat-card"
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div style={{ padding: '0.75rem', borderRadius: '0.75rem', backgroundColor: `${color}15`, color }}>
        <Icon size={24} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--success)', fontSize: '0.875rem' }}>
        <TrendingUp size={16} />
        <span>{trend}</span>
      </div>
    </div>
    <div style={{ marginTop: '1.5rem' }}>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 500 }}>{title}</p>
      <h3 className="stat-value">{value}</h3>
    </div>
  </motion.div>
);

const Dashboard = () => {
  const recentLeads = [
    { name: 'Sarah Wilson', company: 'TechFlow', status: 'Interested', date: '2h ago' },
    { name: 'Michael Chen', company: 'Zenith AI', status: 'New', date: '4h ago' },
    { name: 'Emma Brown', company: 'Starlight', status: 'Contacted', date: '1d ago' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
        <StatCard title="Total Leads" value="1,284" icon={Users} trend="+12%" color="#3b82f6" />
        <StatCard title="Verified Emails" value="942" icon={Mail} trend="+8%" color="#10b981" />
        <StatCard title="Phone Numbers" value="312" icon={Phone} trend="+5%" color="#8b5cf6" />
        <StatCard title="Conversion Rate" value="4.2%" icon={ArrowUpRight} trend="+2.4%" color="#f59e0b" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        <div className="card">
          <h3 style={{ marginBottom: '1.5rem' }}>Recent Lead Activity</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {recentLeads.map((lead, i) => (
              <div key={i} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: '1rem',
                borderRadius: '0.75rem',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-color)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {lead.name.charAt(0)}
                  </div>
                  <div>
                    <p style={{ fontWeight: 600 }}>{lead.name}</p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{lead.company}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <span className={`tag ${lead.status === 'Interested' ? 'tag-success' : lead.status === 'New' ? 'tag-warning' : ''}`} style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)' }}>
                    {lead.status}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                    <Clock size={14} />
                    <span>{lead.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card glass-card" style={{ background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.1), rgba(129, 140, 248, 0.1))' }}>
          <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
             AI Insights
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            Based on your recent conversions, you should target <strong>SaaS CTOs</strong> in <strong>Western Europe</strong>.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
             <button className="btn-primary" style={{ fontSize: '0.875rem' }}>Generate ICP Report</button>
             <button style={{ background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: '0.75rem', borderRadius: '0.75rem', fontSize: '0.875rem' }}>
               Learn More
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
