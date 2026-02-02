import React, { useState } from 'react';
import { User, UserRole, UserLocation } from '@/types';
import { DEFAULT_OFFICE_COORDINATES, MOCK_ADDRESSES } from '@/constants';
import { INITIAL_USERS } from '@/data/mockUsers';
import { 
  ShieldCheck, 
  ArrowRight, 
  Globe, 
  Lock, 
  Info, 
  ChevronLeft, 
  Sparkles, 
  Target, 
  Zap, 
  UserPlus, 
  AlertCircle,
  Building,
  Mail,
  MapPin,
  User as UserIcon,
  Navigation
} from 'lucide-react';

interface LoginProps {
  onLogin: (user: User) => void;
}

type LoginViewState = 'HERO' | 'LOGIN' | 'SIGNUP' | 'ABOUT';

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [view, setView] = useState<LoginViewState>('HERO');
  const [error, setError] = useState<string | null>(null);
  
  // Login State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Registration State
  const [regCompany, setRegCompany] = useState('');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regAddress, setRegAddress] = useState('');
  const [regLocation, setRegLocation] = useState<UserLocation | null>(null);
  const [regRole, setRegRole] = useState<UserRole>(UserRole.EMPLOYEE);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  
  // Address Suggestions State
  const [addressSuggestions, setAddressSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // Mock Database State
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRegAddress(value);
    if (value.length > 2) {
      const filtered = MOCK_ADDRESSES.filter(addr => 
        addr.toLowerCase().includes(value.toLowerCase())
      );
      setAddressSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setAddressSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const selectAddress = (addr: string) => {
    setRegAddress(addr);
    setShowSuggestions(false);
    setRegLocation({
      address: addr,
      lat: DEFAULT_OFFICE_COORDINATES.lat + (Math.random() - 0.5) * 0.01,
      lng: DEFAULT_OFFICE_COORDINATES.lng + (Math.random() - 0.5) * 0.01,
    });
  };

  const captureCurrentLocation = () => {
    setIsGettingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setRegLocation({
            address: regAddress || "Current Location Detected",
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          });
          setIsGettingLocation(false);
          if (!regAddress) setRegAddress("Current Location Detected");
        },
        () => {
          setError("Failed to get current location. Please check browser permissions.");
          setIsGettingLocation(false);
        }
      );
    }
  };

  const handleLogin = () => {
    setError(null);
    if (!loginEmail || !loginPassword) {
      setError("Please enter both email and password.");
      return;
    }

    const foundUser = users.find(u => u.email.toLowerCase() === loginEmail.toLowerCase());
    if (!foundUser || foundUser.password !== loginPassword) {
      setError("Invalid credentials. Please check your email and password.");
      return;
    }

    onLogin(foundUser);
  };

  const handleSignUp = () => {
    setError(null);
    if (!regCompany || !regName || !regEmail || !regPassword || !regLocation) {
      setError("All fields including company location are required.");
      return;
    }

    if (users.find(u => u.email.toLowerCase() === regEmail.toLowerCase())) {
      setError("An account with this email already exists.");
      return;
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: regEmail,
      password: regPassword,
      company: regCompany,
      companyLocation: regLocation,
      name: regName,
      role: regRole,
      startDate: new Date().toISOString().split('T')[0],
      reliabilityScore: 100,
      accruedLeave: 0,
    };

    setUsers([...users, newUser]);
    setView('LOGIN');
    setLoginEmail(regEmail);
    setError(null);
  };

  const renderHero = () => (
    <div className="flex flex-col items-center text-center space-y-8 zoom-in-95">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white">
        <Sparkles size={16} className="text-moss" />
        <span className="text-[10px] font-black uppercase tracking-[0.2em]">PulseCheck AI v2.5</span>
      </div>
      
      <h1 className="text-6xl md:text-8xl font-black text-white tracking-tight leading-none">
        Precision <br />
        <span className="text-moss">Attendance.</span>
      </h1>
      
      <p className="max-w-xl text-lg text-nude/70 font-medium leading-relaxed">
        High-fidelity location monitoring and AI verification for elite corporate placements.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md pt-4">
        <button onClick={() => setView('LOGIN')} className="flex-1 bg-moss text-forest font-black text-sm uppercase tracking-[0.2em] py-5 rounded-3xl hover:bg-white transition-all shadow-xl flex items-center justify-center gap-3">
          Enter Portal <ArrowRight size={18} />
        </button>
        <button onClick={() => setView('ABOUT')} className="flex-1 bg-white/10 backdrop-blur-md text-white border border-white/20 font-black text-sm uppercase tracking-[0.2em] py-5 rounded-3xl hover:bg-white/20 transition-all flex items-center justify-center gap-3">
          How it Works <Info size={18} />
        </button>
      </div>
    </div>
  );

  const renderSignUpForm = () => (
    <div className="w-full max-w-md slide-in-from-right-8">
      <div className="bg-white/95 backdrop-blur-xl rounded-[40px] border border-white/20 p-8 lg:p-10 shadow-xl max-h-[90vh] overflow-y-auto sidebar-scroll">
        <button onClick={() => setView('LOGIN')} className="flex items-center gap-2 text-[10px] font-black text-charcoal/30 uppercase tracking-widest hover:text-moss mb-6 transition-colors">
          <ChevronLeft size={14} /> Back to Login
        </button>

        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-charcoal tracking-tight">New Placement</h2>
            <p className="text-xs text-charcoal/40 font-medium">Define your corporate workspace perimeter.</p>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl flex gap-3 fade-in">
              <AlertCircle className="text-rose-400 shrink-0" size={16} />
              <p className="text-[10px] text-rose-700 font-bold">{error}</p>
            </div>
          )}

          <div className="space-y-3">
            <div className="relative">
              <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/20 w-4 h-4" />
              <input value={regCompany} onChange={(e) => setRegCompany(e.target.value)} type="text" placeholder="Company Name" className="w-full pl-12 pr-4 py-3 bg-nude border border-softBorder rounded-2xl focus:outline-none focus:ring-2 focus:ring-moss/30 text-xs font-bold text-charcoal" />
            </div>
            
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/20 w-4 h-4" />
              <input 
                value={regAddress} 
                onChange={handleAddressChange} 
                type="text" 
                placeholder="Company Location Address" 
                className="w-full pl-12 pr-12 py-3 bg-nude border border-softBorder rounded-2xl focus:outline-none focus:ring-2 focus:ring-moss/30 text-xs font-bold text-charcoal" 
              />
              <button 
                onClick={captureCurrentLocation}
                className={`absolute right-4 top-1/2 -translate-y-1/2 ${regLocation ? 'text-moss' : 'text-charcoal/20'} hover:text-moss transition-colors`}
                title="Use Current GPS Location"
              >
                <Navigation size={16} className={isGettingLocation ? 'animate-pulse' : ''} />
              </button>

              {showSuggestions && addressSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-softBorder rounded-2xl shadow-xl overflow-hidden fade-in">
                  {addressSuggestions.map((addr, i) => (
                    <button 
                      key={i} 
                      onClick={() => selectAddress(addr)}
                      className="w-full px-4 py-2.5 text-left text-[11px] font-medium text-charcoal hover:bg-nude transition-colors border-b border-softBorder last:border-0"
                    >
                      {addr}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {regLocation && (
              <div className="px-4 py-2 bg-moss/5 border border-moss/20 rounded-xl flex items-center justify-between">
                <span className="text-[9px] font-black text-moss uppercase tracking-widest">Target Coordinates Locked</span>
                <span className="text-[9px] font-mono text-moss/50">{regLocation.lat.toFixed(4)}, {regLocation.lng.toFixed(4)}</span>
              </div>
            )}

            <div className="relative">
              <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/20 w-4 h-4" />
              <input value={regName} onChange={(e) => setRegName(e.target.value)} type="text" placeholder="Full Name" className="w-full pl-12 pr-4 py-3 bg-nude border border-softBorder rounded-2xl focus:outline-none focus:ring-2 focus:ring-moss/30 text-xs font-bold text-charcoal" />
            </div>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/20 w-4 h-4" />
              <input value={regEmail} onChange={(e) => setRegEmail(e.target.value)} type="email" placeholder="Email Address" className="w-full pl-12 pr-4 py-3 bg-nude border border-softBorder rounded-2xl focus:outline-none focus:ring-2 focus:ring-moss/30 text-xs font-bold text-charcoal" />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/20 w-4 h-4" />
              <input value={regPassword} onChange={(e) => setRegPassword(e.target.value)} type="password" placeholder="Create Password" className="w-full pl-12 pr-4 py-3 bg-nude border border-softBorder rounded-2xl focus:outline-none focus:ring-2 focus:ring-moss/30 text-xs font-bold text-charcoal" />
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-[9px] font-black text-charcoal/30 uppercase tracking-widest ml-1">Account Authorization</p>
            <div className="flex p-1 bg-nude rounded-xl border border-softBorder">
              <button onClick={() => setRegRole(UserRole.EMPLOYEE)} className={`flex-1 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${regRole === UserRole.EMPLOYEE ? 'bg-white text-charcoal shadow-sm' : 'text-charcoal/30'}`}>Employee</button>
              <button onClick={() => setRegRole(UserRole.ADMIN)} className={`flex-1 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${regRole === UserRole.ADMIN ? 'bg-white text-charcoal shadow-sm' : 'text-charcoal/30'}`}>Admin</button>
            </div>
          </div>

          <button onClick={handleSignUp} className="group w-full bg-forest text-white font-black text-xs uppercase tracking-[0.2em] py-4 rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3 active:scale-[0.98]">
            Complete Registration <UserPlus size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  const renderLoginForm = () => (
    <div className="w-full max-w-md slide-in-from-right-8">
      <div className="bg-white/95 backdrop-blur-xl rounded-[40px] border border-white/20 p-10 lg:p-12 shadow-xl">
        <button onClick={() => setView('HERO')} className="flex items-center gap-2 text-[10px] font-black text-charcoal/30 uppercase tracking-widest hover:text-moss mb-8 transition-colors">
          <ChevronLeft size={14} /> Back
        </button>

        <div className="space-y-8">
          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-3xl font-black text-charcoal tracking-tight">Portal Sign-In</h2>
            <p className="text-sm text-charcoal/40 font-medium">Access your professional profile.</p>
          </div>

          {error && (
            <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex gap-3 fade-in">
              <AlertCircle className="text-rose-400 shrink-0" size={18} />
              <p className="text-[10px] text-rose-700 font-bold leading-relaxed">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-charcoal/20 w-4 h-4" />
              <input value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} type="email" placeholder="Email Address" className="w-full pl-14 pr-6 py-5 bg-nude border border-softBorder rounded-3xl focus:outline-none focus:ring-2 focus:ring-moss/30 text-sm font-bold text-charcoal placeholder:text-charcoal/20" />
            </div>
            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-charcoal/20 w-4 h-4" />
              <input value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} type="password" placeholder="Secure Password" className="w-full pl-14 pr-6 py-5 bg-nude border border-softBorder rounded-3xl focus:outline-none focus:ring-2 focus:ring-moss/30 text-sm font-bold text-charcoal placeholder:text-charcoal/20" />
            </div>
          </div>

          <button onClick={handleLogin} className="group w-full bg-forest hover:bg-forest/90 text-white font-black text-sm uppercase tracking-[0.2em] py-6 rounded-3xl transition-all shadow-xl flex items-center justify-center gap-3">
            Enter Portal <ArrowRight size={18} />
          </button>

          <div className="text-center pt-4">
            <p className="text-[10px] font-bold text-charcoal/30 uppercase tracking-widest">
              No placement yet? <button onClick={() => { setView('SIGNUP'); setError(null); }} className="text-moss hover:underline">Create Account</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-[10000ms] scale-110" 
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-forest/90 via-forest/60 to-transparent backdrop-blur-[1px]" />
      </div>

      <div className="relative z-10 w-full px-6 flex items-center justify-center">
        {view === 'HERO' && renderHero()}
        {view === 'ABOUT' && (
          <div className="w-full max-w-4xl bg-white/95 backdrop-blur-xl rounded-[40px] border border-white/20 p-10 md:p-16 shadow-xl slide-in-from-bottom-8">
            <button onClick={() => setView('HERO')} className="flex items-center gap-2 text-[10px] font-black text-charcoal/30 uppercase tracking-widest hover:text-moss mb-8 transition-colors">
              <ChevronLeft size={14} /> Back
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h2 className="text-4xl font-black text-charcoal tracking-tight">System <span className="text-moss">Architecture</span></h2>
                <p className="text-charcoal/60 font-medium leading-relaxed text-sm">PulseCheck AI enforces accountability via precise geofencing. Users must be within 100m of their registered company coordinates to initiate work sessions.</p>
                <div className="space-y-4">
                  {[{ icon: Target, title: 'Micro-Geofencing', desc: '100m precision perimeter validation.' },
                    { icon: Globe, title: 'Global Sync', desc: 'Real-time multi-office coordination.' }].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="p-2 bg-moss/10 rounded-xl text-moss h-fit"><item.icon size={20} /></div>
                      <div><h4 className="text-sm font-bold text-charcoal">{item.title}</h4><p className="text-xs text-charcoal/40 font-medium">{item.desc}</p></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-nude rounded-3xl p-8 border border-softBorder flex flex-col justify-center space-y-4">
                <h3 className="text-xs font-black text-moss uppercase tracking-[0.2em]">Verified Locations</h3>
                <div className="flex -space-x-2">
                  {[1,2,3,4,5].map(i => <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-moss/20" />)}
                </div>
                <p className="text-[10px] font-black text-charcoal/30 uppercase tracking-widest">Global standard for host placements.</p>
              </div>
            </div>
          </div>
        )}
        {view === 'LOGIN' && renderLoginForm()}
        {view === 'SIGNUP' && renderSignUpForm()}
      </div>

      <div className="absolute bottom-10 left-10 z-10 hidden xl:flex items-center gap-3">
        <div className="w-12 h-1 bg-moss/30 rounded-full" />
        <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">PulseCheck Secure Gateway v2.5</span>
      </div>
    </div>
  );
};

export default Login;
