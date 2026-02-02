import React from 'react';
import { User } from '@/types';
import { 
  Users, 
  Search, 
  CheckCircle2, 
  AlertTriangle,
  Download,
  Filter
} from 'lucide-react';

interface AdminDashboardProps {
  user: User;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user }) => {
  const reports = [
    { id: '1', name: 'Alice Smith', role: 'Engineering', status: 'ON_TIME', lateness: 0, score: 98 },
    { id: '2', name: 'Bob Johnson', role: 'Design', status: 'LATE', lateness: 14, score: 72 },
    { id: '3', name: 'Charlie Davis', role: 'Product', status: 'SICK', lateness: 0, score: 85 },
    { id: '4', name: 'Dana White', role: 'Growth', status: 'LATE', lateness: 45, score: 64 },
  ];

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'ON_TIME':
        return 'bg-moss/10 text-moss border-moss/20';
      case 'LATE':
        return 'bg-amber-50 text-amber-600 border-amber-200';
      case 'SICK':
        return 'bg-sage/10 text-sage border-sage/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="space-y-8">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Active Sessions', value: '42', color: 'bg-moss', icon: Users },
          { label: 'Verified Today', value: '38', color: 'bg-sage', icon: CheckCircle2 },
          { label: 'Pending Leaves', value: '09', color: 'bg-charcoal', icon: Filter },
          { label: 'Flags Raised', value: '04', color: 'bg-destructive', icon: AlertTriangle },
        ].map((stat, i) => (
          <div key={i} className="bg-card p-6 rounded-3xl border border-softBorder shadow-soft">
            <div className={`w-10 h-10 ${stat.color} rounded-2xl flex items-center justify-center text-white mb-4`}>
              <stat.icon size={20} />
            </div>
            <p className="text-[10px] font-bold text-charcoal/40 uppercase tracking-widest">{stat.label}</p>
            <p className="text-2xl font-bold text-charcoal mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div className="bg-card rounded-[40px] border border-softBorder shadow-soft overflow-hidden">
        <div className="p-10 border-b border-softBorder flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-charcoal">Compliance Register</h3>
            <p className="text-sm text-charcoal/40">Real-time attendance & AI verification logs</p>
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" />
              <input 
                type="text" 
                placeholder="Find candidates..."
                className="pl-12 pr-6 py-3 bg-nude border border-softBorder rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-moss/40 w-full md:w-64 text-charcoal font-medium"
              />
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-card border border-softBorder rounded-2xl text-xs font-bold uppercase tracking-widest text-charcoal hover:bg-nude transition-all">
              <Download size={14} />
              Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-nude/30">
                <th className="px-10 py-5 text-[10px] font-bold text-charcoal/40 uppercase tracking-[0.2em]">Personnel</th>
                <th className="px-10 py-5 text-[10px] font-bold text-charcoal/40 uppercase tracking-[0.2em]">Session Status</th>
                <th className="px-10 py-5 text-[10px] font-bold text-charcoal/40 uppercase tracking-[0.2em]">Lateness</th>
                <th className="px-10 py-5 text-[10px] font-bold text-charcoal/40 uppercase tracking-[0.2em]">Pulse Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-softBorder">
              {reports.map((r) => (
                <tr key={r.id} className="hover:bg-nude/50 transition-colors group">
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-sage/10 flex items-center justify-center font-bold text-sage">
                        {r.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-charcoal">{r.name}</p>
                        <p className="text-[10px] font-bold text-charcoal/40 uppercase tracking-widest">{r.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusStyles(r.status)}`}>
                      {r.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-10 py-6">
                    <span className={`text-sm font-bold ${r.lateness > 30 ? 'text-destructive' : r.lateness > 0 ? 'text-amber-600' : 'text-charcoal/40'}`}>
                      {r.lateness > 0 ? `+${r.lateness} min` : '-'}
                    </span>
                  </td>
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-2 bg-nude rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${r.score >= 80 ? 'bg-moss' : r.score >= 60 ? 'bg-amber-400' : 'bg-destructive'}`}
                          style={{ width: `${r.score}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-charcoal/60">{r.score}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
