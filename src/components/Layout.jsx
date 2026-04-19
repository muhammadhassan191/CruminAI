import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Search, 
  Users, 
  Settings, 
  Database, 
  CreditCard,
  Target
} from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Search, label: 'Lead Discovery', path: '/search' },
    { icon: Database, label: 'CRM / Pipeline', path: '/crm' },
    { icon: Target, label: 'AI ICP Matcher', path: '/ai-matcher' },
    { icon: CreditCard, label: 'Credits', path: '/credits' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <aside className="sidebar">
      <div className="logo-container" style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ color: 'var(--accent-primary)' }}>Abstract</span>LeadFlow
        </h2>
      </div>
      
      <nav style={{ flex: 1 }}>
        {navItems.map((item) => (
          <NavLink 
            key={item.path} 
            to={item.path} 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="profile-mini glass-card" style={{ padding: '1rem', marginTop: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)' }}></div>
          <div>
            <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>Hassan</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Pro Plan • 42 Credits</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

const Layout = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main className="main-content">
        <header style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 id="page-title" style={{ fontSize: '1.875rem' }}>Welcome back, Hassan</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Here's what's happening with your leads today.</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
             <div className="glass-card" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>⚡ 42</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Credits Left</span>
             </div>
             <button className="btn-primary">Find New Leads</button>
          </div>
        </header>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
