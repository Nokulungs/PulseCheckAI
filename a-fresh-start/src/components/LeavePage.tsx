import React, { useState } from 'react';
import { User, LeaveRequest } from '@/types';
import { Calendar, Clock, FileText, Plus, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface LeavePageProps {
  user: User;
}

const LeavePage: React.FC<LeavePageProps> = ({ user }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [leaveType, setLeaveType] = useState<'SICK' | 'ANNUAL' | 'EMERGENCY'>('ANNUAL');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');

  const leaveHistory: LeaveRequest[] = [
    {
      id: '1',
      userId: user.id,
      userName: user.name,
      type: 'SICK',
      startDate: '2026-01-15',
      endDate: '2026-01-16',
      reason: 'Flu symptoms',
      status: 'APPROVED'
    },
    {
      id: '2',
      userId: user.id,
      userName: user.name,
      type: 'ANNUAL',
      startDate: '2025-12-23',
      endDate: '2025-12-27',
      reason: 'Holiday travel',
      status: 'APPROVED'
    }
  ];

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowForm(false);
      setStartDate('');
      setEndDate('');
      setReason('');
    }, 1500);
  };

  return (
    <div className="space-y-8">
      {/* Leave Balance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card p-6 rounded-3xl border border-softBorder shadow-soft">
          <div className="w-10 h-10 bg-moss rounded-2xl flex items-center justify-center text-white mb-4">
            <Calendar size={20} />
          </div>
          <p className="text-[10px] font-bold text-charcoal/40 uppercase tracking-widest">Available Leave</p>
          <p className="text-3xl font-bold text-charcoal mt-1">{user.accruedLeave.toFixed(1)} <span className="text-sm text-charcoal/40">days</span></p>
        </div>
        <div className="bg-card p-6 rounded-3xl border border-softBorder shadow-soft">
          <div className="w-10 h-10 bg-sage rounded-2xl flex items-center justify-center text-white mb-4">
            <CheckCircle2 size={20} />
          </div>
          <p className="text-[10px] font-bold text-charcoal/40 uppercase tracking-widest">Used This Year</p>
          <p className="text-3xl font-bold text-charcoal mt-1">7 <span className="text-sm text-charcoal/40">days</span></p>
        </div>
        <div className="bg-card p-6 rounded-3xl border border-softBorder shadow-soft">
          <div className="w-10 h-10 bg-forest rounded-2xl flex items-center justify-center text-white mb-4">
            <Clock size={20} />
          </div>
          <p className="text-[10px] font-bold text-charcoal/40 uppercase tracking-widest">Pending Requests</p>
          <p className="text-3xl font-bold text-charcoal mt-1">0</p>
        </div>
      </div>

      {/* New Leave Request */}
      <div className="bg-card rounded-3xl border border-softBorder shadow-soft overflow-hidden">
        <div className="p-8 border-b border-softBorder flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="text-moss" size={20} />
            <h3 className="text-lg font-bold text-charcoal">Leave Request</h3>
          </div>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 bg-moss text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-moss/90 transition-all"
          >
            <Plus size={16} />
            New Request
          </button>
        </div>

        {showForm && (
          <div className="p-8 bg-nude/30 border-b border-softBorder space-y-6 fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-charcoal/40 uppercase tracking-widest mb-2">Leave Type</label>
                <select 
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value as 'SICK' | 'ANNUAL' | 'EMERGENCY')}
                  className="w-full px-4 py-3 bg-card border border-softBorder rounded-xl text-sm font-bold text-charcoal focus:outline-none focus:ring-2 focus:ring-moss/40"
                >
                  <option value="ANNUAL">Annual Leave</option>
                  <option value="SICK">Sick Leave</option>
                  <option value="EMERGENCY">Emergency</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-charcoal/40 uppercase tracking-widest mb-2">Start Date</label>
                <input 
                  type="date" 
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-3 bg-card border border-softBorder rounded-xl text-sm font-bold text-charcoal focus:outline-none focus:ring-2 focus:ring-moss/40"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-charcoal/40 uppercase tracking-widest mb-2">End Date</label>
                <input 
                  type="date" 
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-3 bg-card border border-softBorder rounded-xl text-sm font-bold text-charcoal focus:outline-none focus:ring-2 focus:ring-moss/40"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-charcoal/40 uppercase tracking-widest mb-2">Reason</label>
              <textarea 
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Brief explanation for your leave request..."
                className="w-full px-4 py-3 bg-card border border-softBorder rounded-xl text-sm font-medium text-charcoal focus:outline-none focus:ring-2 focus:ring-moss/40 min-h-[100px] resize-none"
              />
            </div>
            <div className="flex gap-4">
              <button 
                onClick={handleSubmit}
                disabled={isSubmitting || !startDate || !endDate || !reason}
                className="flex items-center gap-2 px-6 py-3 bg-forest text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-forest/90 transition-all disabled:opacity-50"
              >
                {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle2 size={16} />}
                Submit Request
              </button>
              <button 
                onClick={() => setShowForm(false)}
                className="px-6 py-3 bg-card border border-softBorder text-charcoal rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-nude transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Leave History */}
        <div className="p-8">
          <h4 className="text-sm font-bold text-charcoal/40 uppercase tracking-widest mb-6">Request History</h4>
          <div className="space-y-4">
            {leaveHistory.map((leave) => (
              <div key={leave.id} className="flex items-center justify-between p-4 bg-nude rounded-2xl border border-softBorder">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    leave.type === 'SICK' ? 'bg-sage/20 text-sage' : 
                    leave.type === 'ANNUAL' ? 'bg-moss/20 text-moss' : 
                    'bg-amber-100 text-amber-600'
                  }`}>
                    <Calendar size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-charcoal">{leave.type} Leave</p>
                    <p className="text-xs text-charcoal/40">{leave.startDate} → {leave.endDate}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  leave.status === 'APPROVED' 
                    ? 'bg-moss/10 text-moss border border-moss/20' 
                    : leave.status === 'PENDING'
                      ? 'bg-amber-50 text-amber-600 border border-amber-200'
                      : 'bg-destructive/10 text-destructive border border-destructive/20'
                }`}>
                  {leave.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeavePage;
