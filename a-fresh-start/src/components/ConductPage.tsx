import React from 'react';
import { User } from '@/types';
import { ShieldAlert, BookOpen, Star, AlertTriangle, Scale, Target, Clock, CheckCircle2 } from 'lucide-react';

interface ConductPageProps {
  user: User;
}

const ConductPage: React.FC<ConductPageProps> = ({ user }) => {
  const scorecard = [
    { label: 'Punctuality', score: 98, icon: Clock, color: 'text-moss' },
    { label: 'Evidence Quality', score: 85, icon: BookOpen, color: 'text-sage' },
    { label: 'Reasoning Logic', score: 92, icon: Target, color: 'text-forest' },
  ];

  return (
    <div className="space-y-8">
      {/* Score Breakdown */}
      <div className="bg-card p-8 rounded-[40px] border border-softBorder shadow-soft">
        <h3 className="text-lg font-bold text-charcoal mb-8 flex items-center gap-3">
          <Scale className="text-moss" />
          Professional Scorecard
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {scorecard.map((item, idx) => (
            <div key={idx} className="space-y-4">
              <div className="flex items-center justify-between">
                <div className={`p-2 bg-nude rounded-xl ${item.color}`}>
                  <item.icon size={18} />
                </div>
                <span className="text-sm font-bold text-charcoal">{item.score}%</span>
              </div>
              <p className="text-xs font-bold text-charcoal uppercase tracking-widest">{item.label}</p>
              <div className="h-1.5 bg-nude rounded-full overflow-hidden">
                <div className="h-full bg-moss rounded-full" style={{ width: `${item.score}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Code of Conduct */}
        <div className="bg-card p-8 rounded-3xl border border-softBorder shadow-soft">
          <h3 className="text-lg font-bold text-charcoal mb-6 flex items-center gap-3">
            <BookOpen className="text-sage" />
            Code of Engagement
          </h3>
          <div className="space-y-6">
            <div className="p-4 bg-nude rounded-2xl border border-softBorder">
              <h4 className="text-xs font-bold text-charcoal/50 uppercase tracking-widest mb-2 flex items-center gap-2">
                <Star size={12} className="text-amber-500" /> Professional Standard
              </h4>
              <p className="text-sm text-charcoal/80 leading-relaxed">
                Candidates must maintain a reliability score above <span className="font-bold text-moss">85%</span> to remain in good standing. 
                Scores below 70% trigger an automatic compliance review.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { title: 'Emergency Protocols', text: 'Medical/Family crises must be reported within 2 hours of missing clock-in.' },
                { title: 'Geofence Compliance', text: 'Work sessions must only begin within the designated 100m perimeter.' },
                { title: 'Evidence Submission', text: 'Medical notes must be clear, dated, and from a registered practice.' }
              ].map((rule, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-nude flex items-center justify-center shrink-0 border border-softBorder text-xs font-bold text-charcoal/30">
                    {idx + 1}
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-charcoal">{rule.title}</h5>
                    <p className="text-xs text-charcoal/50 mt-1 leading-relaxed">{rule.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Transgressions */}
        <div className="bg-card p-8 rounded-3xl border border-softBorder shadow-soft">
          <h3 className="text-lg font-bold text-charcoal mb-6 flex items-center gap-3">
            <ShieldAlert className="text-destructive" />
            Incident History
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-center p-12 text-center border-2 border-dashed border-softBorder rounded-2xl bg-nude/30">
              <div>
                <CheckCircle2 size={40} className="text-moss/20 mx-auto mb-4" />
                <p className="text-sm font-bold text-charcoal/40 uppercase tracking-widest">No Transgressions Recorded</p>
                <p className="text-[10px] text-charcoal/20 mt-1">Maintaining a high professionalism standard.</p>
              </div>
            </div>
            
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-start gap-4">
              <AlertTriangle size={20} className="text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-amber-800 uppercase tracking-widest">Notice</p>
                <p className="text-xs text-amber-700/80 mt-1 leading-relaxed">
                  One potential geo-fence mismatch flagged on Jan 22. AI Coach marked it as "Borderline" due to network latency.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConductPage;
