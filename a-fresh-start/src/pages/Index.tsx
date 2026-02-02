import React, { useState } from 'react';
import { User, UserRole, Tab } from '@/types';
import Login from '@/components/Login';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import EmployeeDashboard from '@/components/EmployeeDashboard';
import AdminDashboard from '@/components/AdminDashboard';
import AttendancePage from '@/components/AttendancePage';
import LeavePage from '@/components/LeavePage';
import ConductPage from '@/components/ConductPage';
import AdminLeaveManagement from '@/components/AdminLeaveManagement';

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('DASHBOARD');

  const handleLogin = (authenticatedUser: User) => {
    setUser(authenticatedUser);
    setActiveTab('DASHBOARD');
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  const getTitle = () => {
    switch (activeTab) {
      case 'DASHBOARD':
        return 'Dashboard';
      case 'ATTENDANCE':
        return user.role === UserRole.ADMIN ? 'Staff Records' : 'My Attendance';
      case 'LEAVE':
        return 'Leave Portal';
      case 'CONDUCT':
        return 'Compliance';
      case 'LEAVE_MGMT':
        return 'Administration';
      default:
        return 'Dashboard';
    }
  };

  const getSubtitle = () => {
    if (activeTab === 'DASHBOARD') {
      return `Active session for ${user.name}`;
    }
    return 'Professionalism records.';
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'DASHBOARD':
        return user.role === UserRole.EMPLOYEE ? <EmployeeDashboard user={user} /> : <AdminDashboard user={user} />;
      case 'ATTENDANCE':
        return <AttendancePage user={user} />;
      case 'LEAVE':
        return <LeavePage user={user} />;
      case 'CONDUCT':
        return <ConductPage user={user} />;
      case 'LEAVE_MGMT':
        return <AdminLeaveManagement user={user} />;
      default:
        return <EmployeeDashboard user={user} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background antialiased">
      {/* Sidebar */}
      <Sidebar 
        user={user} 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        onLogout={handleLogout} 
      />

      {/* Main Content Area */}
      <div className="flex-1 ml-72 p-8">
        <Header user={user} title={getTitle()} subtitle={getSubtitle()} />

        <main className="max-w-6xl mx-auto pb-20">
          {renderContent()}
        </main>

        <footer className="py-12 border-t border-softBorder text-charcoal/20 text-[10px] font-black uppercase tracking-[0.3em] text-center">
          PulseCheck AI • Secure Infrastructure • v2.5.0
        </footer>
      </div>
    </div>
  );
};

export default Index;
