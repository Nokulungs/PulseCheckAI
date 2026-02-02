import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { SickNoteAnalysis } from '@/types';

interface SickNoteUploadProps {
  requestDate: string;
}

const SickNoteUpload: React.FC<SickNoteUploadProps> = ({ requestDate }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [analysis, setAnalysis] = useState<SickNoteAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);
    setAnalysis(null);

    // Simulate AI analysis
    setTimeout(() => {
      const mockAnalysis: SickNoteAnalysis = {
        doctorName: 'Dr. Sarah Green',
        practiceNumber: 'PR-88291',
        dateOnNote: requestDate,
        isFlagged: Math.random() > 0.7
      };
      setAnalysis(mockAnalysis);
      setIsUploading(false);
    }, 2000);
  };

  return (
    <div className="bg-card p-8 rounded-3xl border border-softBorder shadow-soft">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-moss/10 rounded-xl text-moss">
          <FileText size={20} />
        </div>
        <h3 className="text-lg font-bold text-charcoal">Evidence Portal</h3>
      </div>

      {!analysis && !isUploading && (
        <label className="group flex flex-col items-center justify-center border-2 border-dashed border-moss/30 rounded-2xl p-8 cursor-pointer bg-nude hover:border-moss transition-all duration-300">
          <Upload className="w-10 h-10 text-moss/40 group-hover:text-moss mb-4 transition-colors" />
          <span className="text-sm font-bold text-charcoal/60 text-center">Upload Sick Note</span>
          <span className="text-[10px] font-bold text-charcoal/30 uppercase tracking-widest mt-2">Max 5MB • JPEG/PNG</span>
          <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
        </label>
      )}

      {isUploading && (
        <div className="flex flex-col items-center justify-center p-10 text-center space-y-4">
          <div className="relative">
            <Loader2 className="w-10 h-10 text-moss animate-spin" />
            <Sparkles className="w-4 h-4 text-moss absolute -top-1 -right-1 animate-pulse" />
          </div>
          <p className="text-sm font-bold text-charcoal/60">AI Authenticating Evidence...</p>
        </div>
      )}

      {analysis && (
        <div className={`p-6 rounded-2xl border transition-all ${
          analysis.isFlagged 
            ? 'bg-destructive/5 border-destructive/20' 
            : 'bg-moss/5 border-moss/20'
        } fade-in`}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-2 rounded-xl ${
              analysis.isFlagged 
                ? 'bg-destructive/20 text-destructive' 
                : 'bg-moss text-white'
            }`}>
              {analysis.isFlagged ? <AlertCircle size={20} /> : <CheckCircle size={20} />}
            </div>
            <h4 className={`text-sm font-bold ${analysis.isFlagged ? 'text-destructive' : 'text-moss'}`}>
              {analysis.isFlagged ? 'Conflict Detected' : 'Evidence Verified'}
            </h4>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 border-b border-softBorder pb-4">
              <div>
                <p className="text-[10px] font-bold text-charcoal/30 uppercase tracking-widest mb-1">Doctor</p>
                <p className="text-sm font-bold text-charcoal">{analysis.doctorName}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-charcoal/30 uppercase tracking-widest mb-1">Practice #</p>
                <p className="text-sm font-bold text-charcoal">{analysis.practiceNumber}</p>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold text-charcoal/30 uppercase tracking-widest mb-1">Note Date</p>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-bold ${analysis.isFlagged ? 'text-destructive' : 'text-charcoal'}`}>
                  {analysis.dateOnNote}
                </span>
                {analysis.isFlagged && (
                  <span className="text-[9px] font-black uppercase tracking-tighter bg-destructive text-white px-2 py-0.5 rounded-full">
                    Date Mismatch
                  </span>
                )}
              </div>
            </div>
          </div>

          <button 
            onClick={() => setAnalysis(null)}
            className="w-full mt-6 text-[10px] font-bold text-charcoal/30 hover:text-charcoal/60 uppercase tracking-[0.2em] transition-colors"
          >
            Reset Upload
          </button>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-2xl text-destructive text-xs font-bold flex items-center gap-3">
          <AlertCircle size={16} />
          {error}
        </div>
      )}
    </div>
  );
};

export default SickNoteUpload;
