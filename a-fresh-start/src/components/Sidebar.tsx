import React from 'react';
import { User, UserRole, Tab } from '@/types';
import { 
  Home, 
  Clock, 
  Calendar, 
  ShieldCheck, 
  LogOut, 
  Inbox
} from 'lucide-react';

interface SidebarProps {
  user: User;
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  onLogout: () => void;
}

const SidebarItem = ({ 
  icon: Icon, 
  label, 
  active = false, 
  onClick 
}: { 
  icon: React.ElementType; 
  label: string; 
  active?: boolean; 
  onClick: () => void;
}) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      active 
        ? 'bg-moss text-white shadow-lg shadow-moss/20' 
        : 'text-nude/70 hover:bg-white/10 hover:text-white'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium text-sm">{label}</span>
  </button>
);

const Sidebar: React.FC<SidebarProps> = ({ user, activeTab, onTabChange, onLogout }) => {
  return (
    <aside className="fixed left-4 top-4 bottom-4 w-64 bg-forest rounded-3xl flex flex-col p-6 text-white shadow-xl z-50">
      <div className="flex items-center gap-3 mb-12 px-2">
        <div className="bg-moss p-2.5 rounded-xl shadow-inner">
          <Clock className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight">PulseCheck <span className="text-moss">AI</span></span>
      </div>

      <nav className="flex-1 space-y-1.5">
        <SidebarItem 
          icon={Home} 
          label="Dashboard" 
          active={activeTab === 'DASHBOARD'} 
          onClick={() => onTabChange('DASHBOARD')} 
        />
        {user.role === UserRole.EMPLOYEE ? (
          <>
            <SidebarItem 
              icon={Clock} 
              label="My Attendance" 
              active={activeTab === 'ATTENDANCE'} 
              onClick={() => onTabChange('ATTENDANCE')} 
            />
            <SidebarItem 
              icon={Calendar} 
              label="Leave Portal" 
              active={activeTab === 'LEAVE'} 
              onClick={() => onTabChange('LEAVE')} 
            />
          </>
        ) : (
          <>
            <SidebarItem 
              icon={Inbox} 
              label="Admin Panel" 
              active={activeTab === 'LEAVE_MGMT'} 
              onClick={() => onTabChange('LEAVE_MGMT')} 
            />
            <SidebarItem 
              icon={Clock} 
              label="Staff Records" 
              active={activeTab === 'ATTENDANCE'} 
              onClick={() => onTabChange('ATTENDANCE')} 
            />
          </>
        )}
        <SidebarItem 
          icon={ShieldCheck} 
          label="Compliance" 
          active={activeTab === 'CONDUCT'} 
          onClick={() => onTabChange('CONDUCT')} 
        />
      </nav>

      <div className="pt-6 border-t border-white/10 mt-auto">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-nude/60 hover:text-white transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium text-sm">Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
