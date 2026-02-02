import React, { useState } from 'react';
import { User, LeaveRequest } from '@/types';
import { INITIAL_LEAVE_REQUESTS } from '@/data/mockUsers';
import { 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  ShieldCheck, 
  AlertTriangle,
  Loader2,
  X,
  FileText
} from 'lucide-react';

interface AdminLeaveManagementProps {
  user: User;
}

const AdminLeaveManagement: React.FC<AdminLeaveManagementProps> = ({ user }) => {
  const [requests, setRequests] = useState<LeaveRequest[]>(INITIAL_LEAVE_REQUESTS);
  const [selectedReq, setSelectedReq] = useState<LeaveRequest | null>(null);
  const [isBulkApproving, setIsBulkApproving] = useState(false);
  const [rejectionNote, setRejectionNote] = useState('');
  const [isRejecting, setIsRejecting] = useState(false);

  const handleStatusChange = (id: string, newStatus: LeaveRequest['status'], note?: string) => {
    setRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: newStatus, rejectionReason: note } : req
    ));
    setSelectedReq(null);
    setRejectionNote('');
    setIsRejecting(false);
  };

  const bulkApprove = () => {
    setIsBulkApproving(true);
    setTimeout(() => {
      setRequests(prev => prev.map(req => 
        (req.evidenceData && !req.evidenceData.isFlagged && req.status === 'PENDING') 
        ? { ...req, status: 'APPROVED' } 
        : req
      ));
      setIsBulkApproving(false);
    }, 1500);
  };

  return (
    <div className="relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div className="flex gap-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" />
            <input 
              type="text" 
              placeholder="Filter by name..."
              className="pl-12 pr-6 py-3 bg-card border border-softBorder rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-moss/40 w-full md:w-64"
            />
          </div>
          <button className="p-3 bg-card border border-softBorder rounded-2xl text-charcoal/40 hover:text-moss transition-colors">
            <Filter size={18} />
          </button>
        </div>

        <button 
          onClick={bulkApprove}
          disabled={isBulkApproving}
          className="flex items-center gap-2 px-6 py-3 bg-moss text-white rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-moss/90 transition-all disabled:opacity-50"
        >
          {isBulkApproving ? <Loader2 size={16} className="animate-spin" /> : <ShieldCheck size={16} />}
          Bulk Approve Verified
        </button>
      </div>

      <div className="bg-card rounded-3xl border border-softBorder shadow-soft overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-nude/30 border-b border-softBorder">
              <th className="px-8 py-5 text-[10px] font-bold text-charcoal/40 uppercase tracking-widest">Candidate</th>
              <th className="px-8 py-5 text-[10px] font-bold text-charcoal/40 uppercase tracking-widest">Type</th>
              <th className="px-8 py-5 text-[10px] font-bold text-charcoal/40 uppercase tracking-widest">Dates</th>
              <th className="px-8 py-5 text-[10px] font-bold text-charcoal/40 uppercase tracking-widest">AI Status</th>
              <th className="px-8 py-5 text-[10px] font-bold text-charcoal/40 uppercase tracking-widest text-right">Review</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-softBorder">
            {requests.map((req) => (
              <tr key={req.id} className="hover:bg-nude/20 transition-colors">
                <td className="px-8 py-6">
                  <p className="text-sm font-bold text-charcoal">{req.userName}</p>
                </td>
                <td className="px-8 py-6">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal/60 bg-nude px-2 py-1 rounded">
                    {req.type}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <p className="text-xs font-medium text-charcoal/70">{req.startDate} → {req.endDate}</p>
                </td>
                <td className="px-8 py-6">
                  {req.evidenceData ? (
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${req.evidenceData.isFlagged ? 'bg-destructive' : 'bg-moss'}`}></div>
                      <span className={`text-[10px] font-bold uppercase tracking-tighter ${req.evidenceData.isFlagged ? 'text-destructive' : 'text-moss'}`}>
                        {req.evidenceData.isFlagged ? `Flagged (${req.evidenceData.aiConfidence}%)` : 'Verified (100%)'}
                      </span>
                    </div>
                  ) : (
                    <span className="text-[10px] font-bold text-charcoal/20 uppercase">No Data</span>
                  )}
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {req.status === 'PENDING' ? (
                      <>
                        <button 
                          onClick={() => setSelectedReq(req)}
                          className="p-2 text-charcoal/30 hover:text-moss hover:bg-moss/10 rounded-xl transition-all"
                          title="Detailed Review"
                        >
                          <Eye size={18} />
                        </button>
                        <button 
                          onClick={() => handleStatusChange(req.id, 'APPROVED')}
                          className="p-2 text-moss hover:bg-moss hover:text-white rounded-xl transition-all"
                        >
                          <CheckCircle2 size={18} />
                        </button>
                        <button 
                          onClick={() => { setSelectedReq(req); setIsRejecting(true); }}
                          className="p-2 text-destructive hover:bg-destructive hover:text-white rounded-xl transition-all"
                        >
                          <XCircle size={18} />
                        </button>
                      </>
                    ) : (
                      <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${req.status === 'APPROVED' ? 'text-moss' : 'text-destructive'}`}>
                        {req.status}
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Side Detail Panel */}
      {selectedReq && (
        <div className="fixed inset-y-4 right-4 w-full max-w-md bg-card rounded-3xl shadow-xl z-[60] border border-softBorder p-8 flex flex-col slide-in-from-right-8">
          <div className="flex items-center justify-between mb-8">
            <h4 className="text-xl font-bold text-charcoal">Request Details</h4>
            <button onClick={() => { setSelectedReq(null); setIsRejecting(false); }} className="p-2 hover:bg-nude rounded-full transition-colors">
              <X size={20} className="text-charcoal/30" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 space-y-8 sidebar-scroll">
            <section>
              <p className="text-[10px] font-bold text-charcoal/30 uppercase tracking-[0.2em] mb-4">Application Info</p>
              <div className="p-5 bg-nude rounded-2xl border border-softBorder space-y-3">
                <div className="flex justify-between">
                  <span className="text-xs text-charcoal/50">Candidate</span>
                  <span className="text-xs font-bold text-charcoal">{selectedReq.userName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-charcoal/50">Duration</span>
                  <span className="text-xs font-bold text-charcoal">{selectedReq.startDate} to {selectedReq.endDate}</span>
                </div>
                <div>
                  <span className="text-xs text-charcoal/50">Reason</span>
                  <p className="text-sm font-medium text-charcoal mt-1 leading-relaxed">{selectedReq.reason}</p>
                </div>
              </div>
            </section>

            <section>
              <p className="text-[10px] font-bold text-charcoal/30 uppercase tracking-[0.2em] mb-4">AI Verification</p>
              {selectedReq.evidenceData ? (
                <div className="space-y-4">
                  <div className="p-5 bg-moss/5 border border-moss/10 rounded-2xl">
                    <div className="flex items-center gap-3 mb-4">
                      {selectedReq.evidenceData.isFlagged ? <AlertTriangle className="text-destructive" /> : <ShieldCheck className="text-moss" />}
                      <h5 className={`text-sm font-bold ${selectedReq.evidenceData.isFlagged ? 'text-destructive' : 'text-moss'}`}>
                        {selectedReq.evidenceData.isFlagged ? 'Anomaly Detected' : 'Full Authenticity Verified'}
                      </h5>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-xs font-medium text-charcoal/60">
                      <div>
                        <span className="block text-[9px] uppercase font-bold text-charcoal/30 mb-1">Practice #</span>
                        {selectedReq.evidenceData.practiceNumber}
                      </div>
                      <div>
                        <span className="block text-[9px] uppercase font-bold text-charcoal/30 mb-1">Date on Note</span>
                        {selectedReq.evidenceData.dateOnNote}
                      </div>
                    </div>
                  </div>
                  <div className="aspect-video bg-nude rounded-2xl border-2 border-dashed border-softBorder flex items-center justify-center overflow-hidden group relative">
                    <FileText size={48} className="text-charcoal/10 group-hover:scale-110 transition-transform" />
                    <p className="absolute bottom-4 text-[10px] font-bold text-charcoal/30 uppercase tracking-widest">Evidence Preview</p>
                  </div>
                </div>
              ) : (
                <div className="p-8 border-2 border-dashed border-softBorder rounded-2xl text-center text-charcoal/20">
                  <p className="text-xs font-bold uppercase">No Supporting Evidence</p>
                </div>
              )}
            </section>

            {isRejecting && (
              <section className="fade-in">
                <p className="text-[10px] font-bold text-destructive uppercase tracking-[0.2em] mb-4">Rejection Note</p>
                <textarea 
                  value={rejectionNote}
                  onChange={(e) => setRejectionNote(e.target.value)}
                  placeholder="Provide a clear reason for rejection..."
                  className="w-full px-4 py-3 bg-nude border border-softBorder rounded-xl text-sm font-medium text-charcoal focus:outline-none focus:ring-2 focus:ring-destructive/40 min-h-[100px] resize-none"
                />
              </section>
            )}
          </div>

          <div className="pt-6 border-t border-softBorder mt-auto flex gap-3">
            {isRejecting ? (
              <>
                <button 
                  onClick={() => handleStatusChange(selectedReq.id, 'REJECTED', rejectionNote)}
                  disabled={!rejectionNote}
                  className="flex-1 py-4 bg-destructive text-white rounded-xl text-xs font-bold uppercase tracking-widest disabled:opacity-50"
                >
                  Confirm Rejection
                </button>
                <button 
                  onClick={() => setIsRejecting(false)}
                  className="flex-1 py-4 bg-nude border border-softBorder text-charcoal rounded-xl text-xs font-bold uppercase tracking-widest"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => handleStatusChange(selectedReq.id, 'APPROVED')}
                  className="flex-1 py-4 bg-moss text-white rounded-xl text-xs font-bold uppercase tracking-widest"
                >
                  Approve
                </button>
                <button 
                  onClick={() => setIsRejecting(true)}
                  className="flex-1 py-4 bg-nude border border-softBorder text-charcoal rounded-xl text-xs font-bold uppercase tracking-widest"
                >
                  Reject
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLeaveManagement;
