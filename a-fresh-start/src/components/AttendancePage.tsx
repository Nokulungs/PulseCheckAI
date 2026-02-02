import React from 'react';
import { User } from '@/types';
import { Clock, Timer, MapPin, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';

interface AttendancePageProps {
  user: User;
}

const AttendancePage: React.FC<AttendancePageProps> = ({ user }) => {
  const attendanceRecords = [
    { date: '2026-01-27', clockIn: '08:02', clockOut: '17:15', status: 'ON_TIME', hours: '9.2' },
    { date: '2026-01-26', clockIn: '08:45', clockOut: '17:30', status: 'LATE', hours: '8.75' },
    { date: '2026-01-25', clockIn: '07:58', clockOut: '17:00', status: 'ON_TIME', hours: '9.0' },
    { date: '2026-01-24', clockIn: '08:01', clockOut: '16:45', status: 'ON_TIME', hours: '8.7' },
    { date: '2026-01-23', clockIn: '-', clockOut: '-', status: 'SICK', hours: '0' },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'This Month', value: '162.5h', icon: Clock, color: 'bg-moss' },
          { label: 'On-Time Rate', value: '94%', icon: CheckCircle2, color: 'bg-sage' },
          { label: 'Avg. Daily', value: '8.2h', icon: Timer, color: 'bg-forest' },
          { label: 'Location Verified', value: '100%', icon: MapPin, color: 'bg-charcoal' },
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

      {/* Attendance Table */}
      <div className="bg-card rounded-3xl border border-softBorder shadow-soft overflow-hidden">
        <div className="p-8 border-b border-softBorder flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar className="text-moss" size={20} />
            <h3 className="text-lg font-bold text-charcoal">Attendance Log</h3>
          </div>
          <span className="text-[10px] font-black text-charcoal/30 uppercase tracking-widest">January 2026</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-nude/30">
                <th className="px-8 py-4 text-[10px] font-bold text-charcoal/40 uppercase tracking-widest">Date</th>
                <th className="px-8 py-4 text-[10px] font-bold text-charcoal/40 uppercase tracking-widest">Clock In</th>
                <th className="px-8 py-4 text-[10px] font-bold text-charcoal/40 uppercase tracking-widest">Clock Out</th>
                <th className="px-8 py-4 text-[10px] font-bold text-charcoal/40 uppercase tracking-widest">Status</th>
                <th className="px-8 py-4 text-[10px] font-bold text-charcoal/40 uppercase tracking-widest">Hours</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-softBorder">
              {attendanceRecords.map((record, i) => (
                <tr key={i} className="hover:bg-nude/30 transition-colors">
                  <td className="px-8 py-5">
                    <span className="text-sm font-bold text-charcoal">{record.date}</span>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-sm font-medium text-charcoal/70">{record.clockIn}</span>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-sm font-medium text-charcoal/70">{record.clockOut}</span>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      record.status === 'ON_TIME' 
                        ? 'bg-moss/10 text-moss border border-moss/20' 
                        : record.status === 'LATE' 
                          ? 'bg-amber-50 text-amber-600 border border-amber-200'
                          : 'bg-sage/10 text-sage border border-sage/20'
                    }`}>
                      {record.status === 'ON_TIME' && <CheckCircle2 size={10} />}
                      {record.status === 'LATE' && <AlertCircle size={10} />}
                      {record.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-sm font-bold text-charcoal">{record.hours}h</span>
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

export default AttendancePage;
