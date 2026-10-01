export type AvailabilityStatus = 'in_stock' | 'low_stock' | 'on_request' | 'out_of_stock';

export type EnquiryStatus = 
  | 'pending' 
  | 'under_review' 
  | 'prescription_verification' 
  | 'available' 
  | 'confirmed' 
  | 'ready_for_pickup' 
  | 'out_for_delivery' 
  | 'completed' 
  | 'cancelled';

export interface Product {
  id: string;
  name: string;
  genericName?: string;
  category: string;
  subcategory?: string;
  description: string;
  manufacturer: string;
  packSize: string;
  price?: number;
  availability: AvailabilityStatus;
  prescriptionRequired: boolean;
  imageUrl: string;
  sku: string;
  dosageForm: string; // e.g. Tablet, Syrup, Capsule, Ointment, Spray, Device, Personal Care
  tags: string[];
  isFeatured?: boolean;
  usageInstructions?: string;
  storageCondition?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  description: string;
  productCount?: number;
  isPopular?: boolean;
}

export interface EnquiryItem {
  productId?: string;
  productName: string;
  genericName?: string;
  quantity: number;
  packSize?: string;
  estimatedPrice?: number;
  notes?: string;
}

export interface TimelineEvent {
  id: string;
  status: EnquiryStatus;
  label: string;
  note?: string;
  timestamp: string;
  updatedBy?: string;
}

export interface Enquiry {
  id: string;
  refNumber: string; // e.g. MAG-2026-000123
  userId?: string;
  customerName: string;
  phone: string;
  email: string;
  deliveryMethod: 'pickup' | 'delivery' | 'discuss';
  address?: string;
  city?: string;
  pincode?: string;
  preferredContact: 'whatsapp' | 'call' | 'email';
  items: EnquiryItem[];
  prescriptionId?: string;
  prescriptionUrl?: string;
  prescriptionFileName?: string;
  message?: string;
  status: EnquiryStatus;
  estimatedAmount?: number;
  createdAt: string;
  updatedAt: string;
  adminNotes?: string;
  timeline: TimelineEvent[];
}

export interface PilgrimageEnquiry {
  id: string;
  refNumber: string;
  userId?: string;
  customerName: string;
  phone: string;
  email?: string;
  travelType: 'Umrah' | 'Hajj' | 'Ziyarat' | 'Other Pilgrimage';
  travelMonthYear: string;
  durationDays?: number;
  specificNeeds: string[];
  selectedChecklistItems: string[];
  customMessage?: string;
  status: 'pending' | 'under_review' | 'need_more_info' | 'confirmed' | 'completed' | 'cancelled';
  prescriptionUrl?: string;
  prescriptionFileName?: string;
  createdAt: string;
  updatedAt: string;
  adminNotes?: string;
}

export interface PrescriptionDoc {
  id: string;
  refNumber: string;
  customerName: string;
  phone: string;
  email?: string;
  fileName: string;
  fileSize: number; // in bytes
  fileType: string; // e.g. image/jpeg, image/png, application/pdf
  fileUrl: string; // base64 DataURL
  uploadedAt: string;
  status: 'pending_review' | 'verified' | 'clarification_needed' | 'rejected';
  notes?: string;
  linkedEnquiryId?: string;
}

export interface BusinessSettings {
  businessName: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  address: string;
  storeTimings: string;
  googleMapsUrl?: string;
  tagline: string;
  disclaimerText: string;
  pilgrimageBannerText: string;
  heroHeadline: string;
  heroSubtext: string;
}

export interface PolicyContent {
  medicinePolicy: string;
  prescriptionPolicy: string;
  enquiryPolicy: string;
  cancellationPolicy: string;
  deliveryPolicy: string;
  privacyPolicy: string;
  termsConditions: string;
  lastUpdated: string;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
  address?: string;
  createdAt: string;
}

export type ActiveTab = 
  | 'home' 
  | 'medicines' 
  | 'categories' 
  | 'pilgrimage-care' 
  | 'how-it-works' 
  | 'policies' 
  | 'about' 
  | 'contact' 
  | 'my-enquiries' 
  | 'book-medicine' 
  | 'admin';
