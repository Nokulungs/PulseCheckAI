import React from 'react';
import { User } from '@/types';

interface HeaderProps {
  user: User;
  title: string;
  subtitle: string;
}

const Header: React.FC<HeaderProps> = ({ user, title, subtitle }) => {
  return (
    <header className="flex justify-between items-center mb-10">
      <div>
        <h1 className="text-2xl font-bold text-charcoal tracking-tight">{title}</h1>
        <p className="text-charcoal/40 text-sm font-medium">{subtitle}</p>
      </div>

      <div className="flex items-center gap-3 bg-white border border-softBorder px-4 py-2 rounded-full shadow-soft">
        <div className="w-8 h-8 rounded-full bg-sage flex items-center justify-center text-white text-[10px] font-black uppercase tracking-tighter">
          {user.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div className="text-left hidden sm:block">
          <p className="text-xs font-bold text-charcoal leading-none">{user.name}</p>
          <p className="text-[9px] text-moss uppercase font-black tracking-[0.1em] mt-1">{user.role}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
