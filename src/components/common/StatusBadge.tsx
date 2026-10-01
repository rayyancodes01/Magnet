import React from 'react';
import { 
  Clock, 
  Search, 
  FileCheck2, 
  CheckCircle2, 
  PackageCheck, 
  Truck, 
  Check, 
  XCircle, 
  AlertCircle 
} from 'lucide-react';
import { EnquiryStatus } from '../../types';

interface StatusBadgeProps {
  status: EnquiryStatus;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md', className = '' }) => {
  const configs: Record<EnquiryStatus, { label: string; icon: React.FC<{ className?: string }>; bg: string; text: string; border: string }> = {
    pending: {
      label: 'Pending',
      icon: Clock,
      bg: 'bg-amber-50',
      text: 'text-amber-800',
      border: 'border-amber-200'
    },
    under_review: {
      label: 'Under Review',
      icon: Search,
      bg: 'bg-blue-50',
      text: 'text-blue-800',
      border: 'border-blue-200'
    },
    prescription_verification: {
      label: 'Prescription Verification',
      icon: FileCheck2,
      bg: 'bg-purple-50',
      text: 'text-purple-800',
      border: 'border-purple-200'
    },
    available: {
      label: 'Available in Store',
      icon: CheckCircle2,
      bg: 'bg-teal-50',
      text: 'text-teal-800',
      border: 'border-teal-200'
    },
    confirmed: {
      label: 'Confirmed',
      icon: CheckCircle2,
      bg: 'bg-emerald-50',
      text: 'text-emerald-800',
      border: 'border-emerald-200'
    },
    ready_for_pickup: {
      label: 'Ready for Pickup',
      icon: PackageCheck,
      bg: 'bg-indigo-50',
      text: 'text-indigo-800',
      border: 'border-indigo-200'
    },
    out_for_delivery: {
      label: 'Out for Delivery',
      icon: Truck,
      bg: 'bg-cyan-50',
      text: 'text-cyan-800',
      border: 'border-cyan-200'
    },
    completed: {
      label: 'Completed',
      icon: Check,
      bg: 'bg-emerald-100',
      text: 'text-emerald-900',
      border: 'border-emerald-300'
    },
    cancelled: {
      label: 'Cancelled',
      icon: XCircle,
      bg: 'bg-rose-50',
      text: 'text-rose-800',
      border: 'border-rose-200'
    }
  };

  const config = configs[status] || {
    label: status,
    icon: AlertCircle,
    bg: 'bg-slate-100',
    text: 'text-slate-800',
    border: 'border-slate-200'
  };

  const Icon = config.icon;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs sm:text-sm px-2.5 py-1 gap-1.5 font-medium',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-semibold'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4'
  };

  return (
    <span 
      className={`inline-flex items-center rounded-full border whitespace-nowrap ${config.bg} ${config.text} ${config.border} ${sizeClasses[size]} ${className}`}
    >
      <Icon className={`${iconSizes[size]} shrink-0`} />
      <span>{config.label}</span>
    </span>
  );
};
