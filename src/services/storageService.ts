import { 
  BusinessSettings, 
  Category, 
  Enquiry, 
  EnquiryStatus, 
  PilgrimageEnquiry, 
  PolicyContent, 
  Product, 
  PrescriptionDoc, 
  TimelineEvent, 
  UserAccount 
} from '../types';
import { 
  INITIAL_BUSINESS_SETTINGS, 
  INITIAL_CATEGORIES, 
  INITIAL_POLICIES, 
  INITIAL_PRODUCTS 
} from '../data/initialData';

const KEYS = {
  SETTINGS: 'magnet_business_settings_v2',
  POLICIES: 'magnet_policies_v1',
  PRODUCTS: 'magnet_products_v2',
  CATEGORIES: 'magnet_categories_v2',
  ENQUIRIES: 'magnet_enquiries_v1',
  PILGRIMAGE_ENQUIRIES: 'magnet_pilgrimage_enquiries_v1',
  PRESCRIPTIONS: 'magnet_prescriptions_v1',
  CURRENT_USER: 'magnet_current_user_v1',
};

// Seed sample enquiries so admin and history lookup show realistic timeline examples
const SAMPLE_ENQUIRIES: Enquiry[] = [
  {
    id: 'enq-sample-1',
    refNumber: 'MAG-2026-000101',
    customerName: 'Mohammed Rayyan Ansari',
    phone: '7620059437',
    email: 'rayyanansari7666@gmail.com',
    deliveryMethod: 'pickup',
    preferredContact: 'whatsapp',
    items: [
      {
        productId: 'prod-017-ihram-lotion',
        productName: 'Ihram-Safe Fragrance-Free Gentle Moisturizing Lotion',
        quantity: 2,
        packSize: '150 ml Bottle',
        estimatedPrice: 180.00
      },
      {
        productId: 'prod-018-blister-pads',
        productName: 'Hydrocolloid Blister & Heel Protection Pads',
        quantity: 2,
        packSize: 'Pack of 10 Assorted Pads',
        estimatedPrice: 195.00
      },
      {
        productId: 'prod-015-electral',
        productName: 'Electral ORS Oral Rehydration Salts Sachet',
        quantity: 5,
        packSize: 'Pack of 21.8g Sachet',
        estimatedPrice: 22.00
      }
    ],
    message: 'Preparing for Umrah next week. Need these healthcare essentials packed for travel.',
    status: 'ready_for_pickup',
    estimatedAmount: 860.00,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    adminNotes: 'Packed travel essentials in sealed travel pouch. Customer notified via WhatsApp.',
    timeline: [
      {
        id: 't-1',
        status: 'pending',
        label: 'Enquiry Submitted',
        note: 'Customer submitted travel essentials enquiry online',
        timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
      },
      {
        id: 't-2',
        status: 'under_review',
        label: 'Pharmacist Reviewing Stock',
        note: 'All 3 items available in store inventory',
        timestamp: new Date(Date.now() - 86400000 * 1.8).toISOString(),
      },
      {
        id: 't-3',
        status: 'confirmed',
        label: 'Order Confirmed',
        note: 'Customer agreed on quantity and store pickup',
        timestamp: new Date(Date.now() - 86400000 * 1).toISOString(),
      },
      {
        id: 't-4',
        status: 'ready_for_pickup',
        label: 'Ready for Store Pickup',
        note: 'Order package ready at Magnet counter',
        timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
      }
    ]
  },
  {
    id: 'enq-sample-2',
    refNumber: 'MAG-2026-000102',
    customerName: 'Fatima Shaikh',
    phone: '9823145678',
    email: 'fatima.shaikh@example.com',
    deliveryMethod: 'delivery',
    address: 'Flat 302, Al-Noor Heights, Near Green Park',
    city: 'Nagpur',
    pincode: '440001',
    preferredContact: 'whatsapp',
    items: [
      {
        productId: 'prod-011-augmentin',
        productName: 'Augmentin 625 Duo Tablet',
        genericName: 'Amoxicillin + Clavulanic Acid',
        quantity: 1,
        packSize: 'Strip of 10 Tablets',
        estimatedPrice: 204.00
      },
      {
        productId: 'prod-012-pand',
        productName: 'Pan-D Capsule',
        quantity: 1,
        packSize: 'Strip of 15 Capsules',
        estimatedPrice: 199.00
      }
    ],
    prescriptionFileName: 'doctor_prescription_2026.jpg',
    prescriptionUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&auto=format&fit=crop&q=80',
    message: 'Please verify the attached prescription for 5-day course.',
    status: 'under_review',
    estimatedAmount: 403.00,
    createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    adminNotes: 'Prescription image verified. Checking delivery schedule.',
    timeline: [
      {
        id: 't-1',
        status: 'pending',
        label: 'Enquiry & Prescription Uploaded',
        note: 'Customer attached valid prescription doc',
        timestamp: new Date(Date.now() - 3600000 * 6).toISOString(),
      },
      {
        id: 't-2',
        status: 'prescription_verification',
        label: 'Prescription Verified by Pharmacist',
        note: 'Dr. Registration No. and dosage verified valid',
        timestamp: new Date(Date.now() - 3600000 * 3).toISOString(),
      },
      {
        id: 't-3',
        status: 'under_review',
        label: 'Scheduling Local Delivery',
        note: 'Delivery slot being coordinated with customer',
        timestamp: new Date(Date.now() - 3600000 * 1).toISOString(),
      }
    ]
  }
];

export const storageService = {
  // Business Settings
  getBusinessSettings(): BusinessSettings {
    try {
      const data = localStorage.getItem(KEYS.SETTINGS);
      if (data) return JSON.parse(data);
    } catch {
      // fallback
    }
    return INITIAL_BUSINESS_SETTINGS;
  },

  updateBusinessSettings(settings: BusinessSettings): void {
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
  },

  // Policies
  getPolicies(): PolicyContent {
    try {
      const data = localStorage.getItem(KEYS.POLICIES);
      if (data) return JSON.parse(data);
    } catch {
      // fallback
    }
    return INITIAL_POLICIES;
  },

  updatePolicies(policies: PolicyContent): void {
    localStorage.setItem(KEYS.POLICIES, JSON.stringify(policies));
  },

  // Products
  getProducts(): Product[] {
    try {
      const data = localStorage.getItem(KEYS.PRODUCTS);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
    return INITIAL_PRODUCTS;
  },

  getProductById(id: string): Product | undefined {
    return this.getProducts().find(p => p.id === id);
  },

  saveProduct(product: Product): void {
    const products = this.getProducts();
    const index = products.findIndex(p => p.id === product.id);
    if (index >= 0) {
      products[index] = product;
    } else {
      products.unshift(product);
    }
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
  },

  deleteProduct(id: string): void {
    const products = this.getProducts().filter(p => p.id !== id);
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
  },

  // Categories
  getCategories(): Category[] {
    try {
      const data = localStorage.getItem(KEYS.CATEGORIES);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
    return INITIAL_CATEGORIES;
  },

  saveCategory(category: Category): void {
    const categories = this.getCategories();
    const index = categories.findIndex(c => c.id === category.id);
    if (index >= 0) {
      categories[index] = category;
    } else {
      categories.push(category);
    }
    localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(categories));
  },

  deleteCategory(id: string): void {
    const categories = this.getCategories().filter(c => c.id !== id);
    localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(categories));
  },

  // Enquiries
  getEnquiries(): Enquiry[] {
    try {
      const data = localStorage.getItem(KEYS.ENQUIRIES);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // fallback
    }
    localStorage.setItem(KEYS.ENQUIRIES, JSON.stringify(SAMPLE_ENQUIRIES));
    return SAMPLE_ENQUIRIES;
  },

  getEnquiryByRef(refNumber: string): Enquiry | undefined {
    const cleanRef = refNumber.trim().toUpperCase();
    return this.getEnquiries().find(e => e.refNumber.toUpperCase() === cleanRef);
  },

  getEnquiriesByPhone(phone: string): Enquiry[] {
    const cleanPhone = phone.replace(/\D/g, '');
    return this.getEnquiries().filter(e => {
      const storedPhone = e.phone.replace(/\D/g, '');
      return storedPhone.includes(cleanPhone) || cleanPhone.includes(storedPhone);
    });
  },

  createEnquiry(enquiryInput: Omit<Enquiry, 'id' | 'refNumber' | 'createdAt' | 'updatedAt' | 'timeline' | 'status'> & { status?: EnquiryStatus }): Enquiry {
    const enquiries = this.getEnquiries();
    const counter = enquiries.length + 101;
    const refNumber = `MAG-2026-${String(counter).padStart(6, '0')}`;
    const id = 'enq-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6);
    const now = new Date().toISOString();

    const initialStatus: EnquiryStatus = enquiryInput.prescriptionUrl 
      ? 'prescription_verification' 
      : (enquiryInput.status || 'pending');

    const timelineEvent: TimelineEvent = {
      id: 'tl-' + Date.now(),
      status: initialStatus,
      label: initialStatus === 'prescription_verification' ? 'Prescription Uploaded & Pending Review' : 'Enquiry Received',
      note: 'Enquiry submitted online by customer',
      timestamp: now
    };

    const newEnquiry: Enquiry = {
      ...enquiryInput,
      id,
      refNumber,
      status: initialStatus,
      createdAt: now,
      updatedAt: now,
      timeline: [timelineEvent]
    };

    enquiries.unshift(newEnquiry);
    localStorage.setItem(KEYS.ENQUIRIES, JSON.stringify(enquiries));
    return newEnquiry;
  },

  updateEnquiryStatus(id: string, status: EnquiryStatus, note?: string, adminNotes?: string): Enquiry | undefined {
    const enquiries = this.getEnquiries();
    const index = enquiries.findIndex(e => e.id === id);
    if (index === -1) return undefined;

    const enquiry = enquiries[index];
    const now = new Date().toISOString();
    
    // Status labels
    const statusLabels: Record<EnquiryStatus, string> = {
      pending: 'Enquiry Pending',
      under_review: 'Under Pharmacist Review',
      prescription_verification: 'Prescription Under Verification',
      available: 'Medicines Available',
      confirmed: 'Order Confirmed',
      ready_for_pickup: 'Ready for Store Pickup',
      out_for_delivery: 'Out for Local Delivery',
      completed: 'Completed & Handed Over',
      cancelled: 'Enquiry Cancelled'
    };

    const newTimelineEvent: TimelineEvent = {
      id: 'tl-' + Date.now(),
      status,
      label: statusLabels[status] || status,
      note: note || `Status updated to ${statusLabels[status] || status}`,
      timestamp: now,
      updatedBy: 'Magnet Pharmacist'
    };

    enquiry.status = status;
    enquiry.updatedAt = now;
    if (adminNotes !== undefined) {
      enquiry.adminNotes = adminNotes;
    }
    enquiry.timeline.push(newTimelineEvent);

    enquiries[index] = enquiry;
    localStorage.setItem(KEYS.ENQUIRIES, JSON.stringify(enquiries));
    return enquiry;
  },

  updateEnquiryAdminNotes(id: string, adminNotes: string): void {
    const enquiries = this.getEnquiries();
    const enquiry = enquiries.find(e => e.id === id);
    if (enquiry) {
      enquiry.adminNotes = adminNotes;
      enquiry.updatedAt = new Date().toISOString();
      localStorage.setItem(KEYS.ENQUIRIES, JSON.stringify(enquiries));
    }
  },

  // Pilgrimage Enquiries
  getPilgrimageEnquiries(): PilgrimageEnquiry[] {
    try {
      const data = localStorage.getItem(KEYS.PILGRIMAGE_ENQUIRIES);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // fallback
    }
    // Seed one sample pilgrimage enquiry
    const sample: PilgrimageEnquiry[] = [
      {
        id: 'pil-sample-1',
        refNumber: 'MAG-PIL-2026-001',
        customerName: 'Rayyan Ansari',
        phone: '7620059437',
        email: 'rayyanansari7666@gmail.com',
        travelType: 'Umrah',
        travelMonthYear: 'October 2026',
        durationDays: 15,
        specificNeeds: ['Blister prevention kit', 'Electrolytes & hydration', 'Ihram fragrance-free soap & lotion', 'Chronic BP medications check'],
        selectedChecklistItems: [
          'Hydrocolloid blister pads and heel cushions for prolonged walking barefoot on marble',
          'Anti-chafing fragrance-free soothing cream / thigh protectant for state of Ihram',
          'WHO Formula ORS / Electrolyte sachets (5-10 sachets per person)',
          '100% Fragrance-free, non-scented pure soap bar'
        ],
        customMessage: 'Travelling with elderly parents. Please prepare a comprehensive travel pouch.',
        status: 'under_review',
        createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
        updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        adminNotes: 'Coordinating customized travel kit with blister pads and ORS.'
      }
    ];
    localStorage.setItem(KEYS.PILGRIMAGE_ENQUIRIES, JSON.stringify(sample));
    return sample;
  },

  createPilgrimageEnquiry(data: Omit<PilgrimageEnquiry, 'id' | 'refNumber' | 'createdAt' | 'updatedAt' | 'status'>): PilgrimageEnquiry {
    const list = this.getPilgrimageEnquiries();
    const count = list.length + 1;
    const refNumber = `MAG-PIL-2026-${String(count).padStart(3, '0')}`;
    const id = 'pil-' + Date.now();
    const now = new Date().toISOString();

    const newEnq: PilgrimageEnquiry = {
      ...data,
      id,
      refNumber,
      status: 'pending',
      createdAt: now,
      updatedAt: now
    };

    list.unshift(newEnq);
    localStorage.setItem(KEYS.PILGRIMAGE_ENQUIRIES, JSON.stringify(list));
    return newEnq;
  },

  updatePilgrimageStatus(id: string, status: PilgrimageEnquiry['status'], adminNotes?: string): void {
    const list = this.getPilgrimageEnquiries();
    const item = list.find(p => p.id === id);
    if (item) {
      item.status = status;
      item.updatedAt = new Date().toISOString();
      if (adminNotes !== undefined) item.adminNotes = adminNotes;
      localStorage.setItem(KEYS.PILGRIMAGE_ENQUIRIES, JSON.stringify(list));
    }
  },

  // Prescriptions
  getPrescriptions(): PrescriptionDoc[] {
    try {
      const data = localStorage.getItem(KEYS.PRESCRIPTIONS);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // fallback
    }
    return [];
  },

  savePrescription(prescription: Omit<PrescriptionDoc, 'id' | 'uploadedAt' | 'status'>): PrescriptionDoc {
    const list = this.getPrescriptions();
    const id = 'rx-' + Date.now();
    const newDoc: PrescriptionDoc = {
      ...prescription,
      id,
      uploadedAt: new Date().toISOString(),
      status: 'pending_review'
    };
    list.unshift(newDoc);
    localStorage.setItem(KEYS.PRESCRIPTIONS, JSON.stringify(list));
    return newDoc;
  },

  updatePrescriptionStatus(id: string, status: PrescriptionDoc['status'], notes?: string): void {
    const list = this.getPrescriptions();
    const doc = list.find(d => d.id === id);
    if (doc) {
      doc.status = status;
      if (notes) doc.notes = notes;
      localStorage.setItem(KEYS.PRESCRIPTIONS, JSON.stringify(list));
    }
  },

  // Current User / Auth Session
  getCurrentUser(): UserAccount | null {
    try {
      const data = localStorage.getItem(KEYS.CURRENT_USER);
      if (data) return JSON.parse(data);
    } catch {
      // fallback
    }
    return null;
  },

  setCurrentUser(user: UserAccount | null): void {
    if (user) {
      localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(KEYS.CURRENT_USER);
    }
  },

  // Reset to default sample state
  resetAllData(): void {
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(INITIAL_BUSINESS_SETTINGS));
    localStorage.setItem(KEYS.POLICIES, JSON.stringify(INITIAL_POLICIES));
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
    localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
    localStorage.setItem(KEYS.ENQUIRIES, JSON.stringify(SAMPLE_ENQUIRIES));
    localStorage.removeItem(KEYS.PRESCRIPTIONS);
    localStorage.removeItem(KEYS.CURRENT_USER);
  }
};

/**
 * Utility helper to generate safe, pre-filled WhatsApp links
 * Note: Never includes private medical records or prescription attachments in URL
 */
export function getWhatsAppUrl(message: string, customPhone?: string): string {
  const settings = storageService.getBusinessSettings();
  const phone = (customPhone || settings.whatsappNumber || '7620059437').replace(/\D/g, '');
  // Ensure India country code 91 if not present and is 10 digits
  const formattedPhone = phone.length === 10 ? `91${phone}` : phone;
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${formattedPhone}?text=${encodedText}`;
}
