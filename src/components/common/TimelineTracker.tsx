import React from 'react';
import { CheckCircle2, Clock, ShieldCheck, XCircle } from 'lucide-react';
import { TimelineEvent } from '../../types';

interface TimelineTrackerProps {
  events: TimelineEvent[];
  className?: string;
}

export const TimelineTracker: React.FC<TimelineTrackerProps> = ({ events, className = '' }) => {
  if (!events || events.length === 0) return null;

  return (
    <div className={`relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 ${className}`}>
      {events.map((event, idx) => {
        const isLatest = idx === events.length - 1;
        const isCancelled = event.status === 'cancelled';
        const isCompleted = event.status === 'completed';

        return (
          <div key={event.id || idx} className="relative group">
            {/* Timeline icon dot */}
            <div 
              className={`absolute -left-6 top-1 flex items-center justify-center w-5 h-5 rounded-full ring-4 ring-white ${
                isCancelled 
                  ? 'bg-rose-500 text-white' 
                  : isCompleted 
                  ? 'bg-emerald-600 text-white' 
                  : isLatest 
                  ? 'bg-emerald-600 text-white shadow-sm ring-emerald-100' 
                  : 'bg-slate-300 text-white'
              }`}
            >
              {isCancelled ? (
                <XCircle className="w-3.5 h-3.5" />
              ) : isCompleted || isLatest ? (
                <CheckCircle2 className="w-3.5 h-3.5" />
              ) : (
                <Clock className="w-3 h-3" />
              )}
            </div>

            <div className="bg-white/80 rounded-xl p-3 border border-slate-100 shadow-xs space-y-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h5 className={`text-sm font-semibold ${isLatest ? 'text-emerald-900' : 'text-slate-800'}`}>
                  {event.label}
                </h5>
                <span className="text-[11px] text-slate-400 font-medium">
                  {new Date(event.timestamp).toLocaleString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>

              {event.note && (
                <p className="text-xs text-slate-600 leading-relaxed">
                  {event.note}
                </p>
              )}

              {event.updatedBy && (
                <div className="flex items-center gap-1 text-[11px] text-emerald-700 pt-0.5 font-medium">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Verified by {event.updatedBy}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
