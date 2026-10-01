import React, { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle2, AlertCircle, X, Shield, Lock, Eye } from 'lucide-react';

interface PrescriptionUploaderProps {
  onFileSelect: (fileData: { fileUrl: string; fileName: string; fileSize: number; fileType: string }) => void;
  onFileRemove?: () => void;
  selectedFile?: { fileUrl: string; fileName: string; fileSize?: number; fileType?: string } | null;
  required?: boolean;
  className?: string;
}

export const PrescriptionUploader: React.FC<PrescriptionUploaderProps> = ({
  onFileSelect,
  onFileRemove,
  selectedFile,
  required = false,
  className = ''
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE_MB = 10;
  const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];

  const validateAndProcessFile = (file: File) => {
    setError(null);

    // 1. Check file type
    const isAllowed = ALLOWED_TYPES.includes(file.type.toLowerCase()) || 
      file.name.endsWith('.pdf') || 
      file.name.endsWith('.jpg') || 
      file.name.endsWith('.jpeg') || 
      file.name.endsWith('.png');

    if (!isAllowed) {
      setError('Unsupported file type. Please upload a clear JPG, PNG image or PDF document.');
      return;
    }

    // 2. Reject executables or scripts explicitly
    const dangerousExtensions = ['.exe', '.bat', '.cmd', '.sh', '.js', '.ts', '.html', '.php', '.zip', '.tar'];
    const lowerName = file.name.toLowerCase();
    if (dangerousExtensions.some(ext => lowerName.endsWith(ext))) {
      setError('Security alert: Executable and script files are strictly prohibited.');
      return;
    }

    // 3. Check file size
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setError(`File is too large. Maximum allowable size is ${MAX_FILE_SIZE_MB}MB.`);
      return;
    }

    setIsProcessing(true);

    const reader = new FileReader();
    reader.onload = () => {
      setIsProcessing(false);
      const fileUrl = reader.result as string;
      onFileSelect({
        fileUrl,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type || (file.name.endsWith('.pdf') ? 'application/pdf' : 'image/jpeg')
      });
    };

    reader.onerror = () => {
      setIsProcessing(false);
      setError('Prescription upload failed. Please try again with a JPG, PNG or PDF.');
    };

    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  const formatSize = (bytes?: number) => {
    if (!bytes) return '';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const isPDF = selectedFile?.fileName.toLowerCase().endsWith('.pdf') || selectedFile?.fileType === 'application/pdf';

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
          <span>Doctor’s Prescription</span>
          {required ? (
            <span className="text-xs px-2 py-0.5 bg-rose-100 text-rose-800 rounded-full font-medium">
              Required for this medicine
            </span>
          ) : (
            <span className="text-xs text-slate-500 font-normal">
              (Optional for general medicines)
            </span>
          )}
        </label>

        <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
          <Lock className="w-3 h-3" />
          <span>Encrypted & Confidential</span>
        </div>
      </div>

      {!selectedFile ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 ${
            isDragging 
              ? 'border-emerald-500 bg-emerald-50/60' 
              : 'border-slate-200 hover:border-emerald-400 bg-slate-50/50 hover:bg-emerald-50/30'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={handleFileChange}
            className="hidden"
            id="prescription-file-input"
          />

          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100/80 text-emerald-800 flex items-center justify-center">
              <Upload className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <p className="text-sm font-semibold text-slate-800">
                Click to upload or drag & drop prescription
              </p>
              <p className="text-xs text-slate-500">
                Supports clear JPG, PNG images or PDF files (Up to 10MB)
              </p>
            </div>

            {isProcessing && (
              <p className="text-xs text-emerald-600 font-medium animate-pulse">
                Processing file securely...
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-600 text-white rounded-xl shadow-xs">
                {isPDF ? <FileText className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-semibold text-slate-800 truncate max-w-[220px] sm:max-w-xs">
                  {selectedFile.fileName}
                </p>
                <p className="text-xs text-slate-500">
                  {formatSize(selectedFile.fileSize) || 'Ready for pharmacist review'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {selectedFile.fileUrl && !isPDF && (
                <button
                  type="button"
                  onClick={() => setShowPreviewModal(true)}
                  className="p-1.5 text-slate-600 hover:text-emerald-700 hover:bg-white rounded-lg transition-colors"
                  title="Preview Prescription"
                >
                  <Eye className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  if (onFileRemove) onFileRemove();
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}
                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-white rounded-lg transition-colors"
                title="Remove File"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-emerald-800 bg-white/70 px-3 py-1.5 rounded-xl border border-emerald-100">
            <Shield className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Prescription attached safely. Pharmacist will inspect dosage & doctor registration.</span>
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-start gap-2 text-xs text-rose-600 bg-rose-50 p-2.5 rounded-xl border border-rose-200">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Prescription Image Preview Modal */}
      {showPreviewModal && selectedFile?.fileUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 space-y-4 max-h-[90vh] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-600" />
                Prescription Preview
              </h4>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-auto max-h-[65vh] flex justify-center bg-slate-50 p-2 rounded-xl border">
              <img 
                src={selectedFile.fileUrl} 
                alt="Prescription Preview" 
                className="max-h-[60vh] object-contain rounded-lg shadow-xs" 
              />
            </div>
            <p className="text-xs text-slate-500 text-center">
              Private healthcare document. Only visible to you and verified Magnet pharmacists.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
