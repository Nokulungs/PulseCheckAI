import React, { useState, useEffect } from 'react';
import { User } from '@/types';
import { GEOFENCE_RADIUS_METERS } from '@/constants';
import { calculateDistance } from '@/utils/geo';
import ReliabilityCircle from './ReliabilityCircle';
import SickNoteUpload from './SickNoteUpload';
import { 
  Timer, 
  MessageSquare,
  Activity,
  Info,
  Navigation,
  Crosshair,
  Target
} from 'lucide-react';

interface EmployeeDashboardProps {
  user: User;
}

const EmployeeDashboard: React.FC<EmployeeDashboardProps> = ({ user }) => {
  const [isInside, setIsInside] = useState<boolean>(false);
  const [currentDist, setCurrentDist] = useState<number | null>(null);
  const [clockedIn, setClockedIn] = useState<boolean>(false);
  const [reason, setReason] = useState<string>('');
  const [coachFeedback, setCoachFeedback] = useState<{suggestion: string, rating: string} | null>(null);
  const [isLoadingCoach, setIsLoadingCoach] = useState(false);

  useEffect(() => {
    let watchId: number;
    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const dist = calculateDistance(
            pos.coords.latitude, 
            pos.coords.longitude, 
            user.companyLocation.lat, 
            user.companyLocation.lng
          );
          setCurrentDist(dist);
          setIsInside(dist <= GEOFENCE_RADIUS_METERS);
        },
        (err) => console.error("Geo watch error:", err),
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    }
    return () => navigator.geolocation.clearWatch(watchId);
  }, [user.companyLocation]);

  const handleCoachFeedback = async () => {
    if (!reason) return;
    setIsLoadingCoach(true);
    
    // Simulate AI feedback
    setTimeout(() => {
      const ratings = ['Professional', 'Unprofessional', 'Borderline'];
      const suggestions = [
        "Consider setting multiple alarms and preparing your work essentials the night before to avoid future delays.",
        "While we understand unexpected situations occur, please try to communicate earlier when delays are anticipated.",
        "Your explanation demonstrates accountability. Keep maintaining this professional communication standard."
      ];
      setCoachFeedback({
        suggestion: suggestions[Math.floor(Math.random() * suggestions.length)],
        rating: ratings[Math.floor(Math.random() * ratings.length)]
      });
      setIsLoadingCoach(false);
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2 space-y-8">
        {/* Status Tracker */}
        <div className="bg-card p-8 rounded-3xl border border-softBorder shadow-soft">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-bold text-charcoal uppercase tracking-widest">Perimeter Status</h3>
            <span className="text-[10px] font-black text-moss uppercase bg-moss/10 px-3 py-1 rounded-full border border-moss/20">
              Threshold: {GEOFENCE_RADIUS_METERS}m
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${isInside ? 'bg-moss text-white' : 'bg-destructive text-white'}`}>
                  <Navigation size={20} className={isInside ? 'animate-pulse' : ''} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-charcoal">Distance to Desk</h4>
                  <p className="text-xs font-medium text-charcoal/40">{user.companyLocation.address}</p>
                </div>
              </div>
              <div className="p-5 bg-nude rounded-3xl border border-softBorder relative overflow-hidden">
                <p className="text-2xl font-black text-charcoal">
                  {currentDist === null ? 'Locating...' : `${currentDist.toFixed(2)}m`}
                </p>
                <p className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${isInside ? 'text-moss' : 'text-destructive'}`}>
                  {isInside ? 'Target Reached' : 'Approach Office'}
                </p>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-10">
                  <Crosshair size={48} />
                </div>
              </div>
            </div>

            <div className="bg-forest p-6 rounded-3xl text-white space-y-4 shadow-xl shadow-forest/10">
              <div className="flex items-center gap-2">
                <Target size={16} className="text-moss" />
                <span className="text-[10px] font-black uppercase tracking-widest">Office HQ Coordinates</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-medium opacity-60">
                  <span>Latitude</span>
                  <span>{user.companyLocation.lat.toFixed(6)}</span>
                </div>
                <div className="flex justify-between text-xs font-medium opacity-60">
                  <span>Longitude</span>
                  <span>{user.companyLocation.lng.toFixed(6)}</span>
                </div>
              </div>
              <div className="pt-3 border-t border-white/10">
                <p className="text-[9px] font-medium opacity-40 italic">System requires {GEOFENCE_RADIUS_METERS}m precision for authentication.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reliability and Session Stats */}
        <div className="bg-card p-8 rounded-3xl border border-softBorder shadow-soft">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div className="flex flex-col items-center">
              <ReliabilityCircle score={user.reliabilityScore} />
              <p className="mt-3 text-xs font-bold text-charcoal/40 uppercase tracking-widest">Reliability</p>
            </div>
            <div className="flex flex-col items-center justify-center border-x border-softBorder px-4 text-center">
              <div className="relative">
                <p className="text-3xl font-bold text-charcoal">07:22</p>
                <div className="absolute -top-4 -right-4 w-2 h-2 rounded-full bg-moss animate-ping"></div>
              </div>
              <p className="text-xs font-bold text-charcoal/40 uppercase tracking-widest mt-1">Today's Session</p>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <p className="text-3xl font-bold text-charcoal">{user.accruedLeave.toFixed(2)}</p>
              <p className="text-xs font-bold text-charcoal/40 uppercase tracking-widest mt-1">Leave Balance</p>
            </div>
          </div>

          <button 
            onClick={() => setClockedIn(!clockedIn)} 
            disabled={!isInside && !clockedIn} 
            className={`w-full py-5 rounded-3xl font-black text-sm uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 ${
              clockedIn 
                ? 'bg-destructive text-white shadow-lg' 
                : 'bg-moss text-white shadow-lg disabled:opacity-20 disabled:grayscale transition-transform active:scale-95'
            }`}
          >
            <Timer size={20} /> {clockedIn ? 'End Shift Sequence' : 'Commence Work Day'}
          </button>
        </div>

        {/* Punctuality Coach */}
        <div className="bg-card p-8 rounded-3xl border border-softBorder shadow-soft">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-sage/10 rounded-xl text-sage">
              <MessageSquare size={20} />
            </div>
            <h3 className="text-lg font-bold text-charcoal">Professionalism Audit</h3>
          </div>
          <div className="space-y-6">
            <textarea 
              value={reason} 
              onChange={(e) => setReason(e.target.value)} 
              placeholder="If you're late, provide your justification for AI analysis..." 
              className="w-full px-5 py-4 bg-nude border border-softBorder rounded-2xl focus:outline-none focus:ring-2 focus:ring-moss/50 min-h-[100px] text-charcoal text-sm font-medium resize-none" 
            />
            <button 
              onClick={handleCoachFeedback} 
              disabled={isLoadingCoach || !reason} 
              className="px-6 py-4 bg-forest text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-forest/90 disabled:opacity-50 shadow-lg shadow-forest/10"
            >
              {isLoadingCoach ? 'Evaluating...' : 'Analyze Reasoning'}
            </button>
            {coachFeedback && (
              <div className="p-5 bg-moss/5 rounded-2xl border border-moss/20 fade-in">
                <div className="flex items-start gap-3">
                  <Info size={18} className="text-moss mt-0.5" />
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-black uppercase tracking-widest bg-moss text-white px-3 py-1 rounded-full">
                        {coachFeedback.rating}
                      </span>
                    </div>
                    <p className="text-sm text-charcoal/80 leading-relaxed font-bold">{coachFeedback.suggestion}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <SickNoteUpload requestDate={new Date().toISOString().split('T')[0]} />
        <div className="bg-card p-6 rounded-3xl border border-softBorder shadow-soft">
          <h3 className="text-sm font-bold text-charcoal uppercase tracking-widest mb-6 px-2">Timeline</h3>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 relative">
                {i < 3 && <div className="absolute left-4 top-10 bottom-0 w-px bg-softBorder"></div>}
                <div className="w-8 h-8 rounded-full bg-nude flex items-center justify-center shrink-0 border border-softBorder">
                  <Activity size={14} className="text-charcoal/40" />
                </div>
                <div>
                  <p className="text-sm font-bold text-charcoal">Session Authenticated</p>
                  <p className="text-[10px] text-charcoal/40 font-bold uppercase mt-0.5">Jan {24-i} • 08:02 AM</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
