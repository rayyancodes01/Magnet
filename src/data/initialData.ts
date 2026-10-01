import { BusinessSettings, Category, PolicyContent, Product } from '../types';

export const INITIAL_BUSINESS_SETTINGS: BusinessSettings = {
  businessName: 'MAGNET Pharmacy & Medical Store',
  phone: '76200 59437',
  whatsappNumber: '7620059437',
  email: 'rayyanansari7666@gmail.com',
  address: 'Main Road, Erandol, Jalgaon District, Maharashtra - 425109',
  storeTimings: '9:00 AM – 11:00 PM (Daily)',
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=MAGNET+Pharmacy+Main+Road+Erandol+Maharashtra+425109',
  tagline: 'Your trusted pharmacy for everyday healthcare and pilgrimage preparation in Erandol, Maharashtra.',
  disclaimerText: 'Information on this website is for general informational purposes and is not a substitute for professional medical advice. Product availability, prescription requirements, and final order confirmation are subject to pharmacist verification and applicable laws.',
  pilgrimageBannerText: 'Specialized healthcare essentials & medicine preparation support for Umrah & Hajj pilgrims travelling to Makkah & Madina.',
  heroHeadline: 'Your Trusted Pharmacy in Erandol, Maharashtra',
  heroSubtext: 'Find 100% genuine medicines, healthcare essentials and personal-care products with convenient counter pickup & local delivery in Erandol.'
};

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-medicines',
    name: 'Medicines',
    slug: 'medicines',
    iconName: 'Pill',
    description: 'General, acute & regular healthcare medicines with pharmacist verification support.',
    productCount: 16,
    isPopular: true
  },
  {
    id: 'cat-prescription',
    name: 'Prescription Medicines',
    slug: 'prescription-medicines',
    iconName: 'FileText',
    description: 'Medicines requiring valid doctor prescription and pharmacist approval before dispensing.',
    productCount: 12,
    isPopular: true
  },
  {
    id: 'cat-otc',
    name: 'OTC / General Healthcare',
    slug: 'otc-healthcare',
    iconName: 'HeartPulse',
    description: 'Over-the-counter pain relief, antacids, cold remedies, and wellness products.',
    productCount: 14,
    isPopular: true
  },
  {
    id: 'cat-pilgrimage',
    name: 'Travel & Pilgrimage Care',
    slug: 'pilgrimage-care',
    iconName: 'Compass',
    description: 'Curated essentials for Makkah, Madina, Umrah & Hajj journeys: hydration, blister care & unscented items.',
    productCount: 9,
    isPopular: true
  },
  {
    id: 'cat-first-aid',
    name: 'First Aid & Medical Devices',
    slug: 'first-aid',
    iconName: 'Cross',
    description: 'Bandages, antiseptics, digital thermometers, BP monitors, and first aid kits.',
    productCount: 7,
    isPopular: true
  },
  {
    id: 'cat-personal-care',
    name: 'Personal Care',
    slug: 'personal-care',
    iconName: 'Sparkles',
    description: 'Daily hygiene, oral care, dermatological lotions, and sanitation essentials.',
    productCount: 8,
    isPopular: true
  },
  {
    id: 'cat-beauty',
    name: 'Beauty & Skincare',
    slug: 'beauty',
    iconName: 'Smile',
    description: 'Moisturizers, sun protection creams, gentle face washes, and lip care.',
    productCount: 6,
    isPopular: false
  },
  {
    id: 'cat-baby-care',
    name: 'Baby Care',
    slug: 'baby-care',
    iconName: 'Baby',
    description: 'Gentle baby washes, diaper rash creams, feeding accessories, and pediatric care.',
    productCount: 5,
    isPopular: false
  },
  {
    id: 'cat-general-store',
    name: 'General Store',
    slug: 'general-store',
    iconName: 'ShoppingBag',
    description: 'Health beverages, nutritional supplements, glucose powders, and everyday essentials.',
    productCount: 6,
    isPopular: false
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  // 1. Paracetamol (Dolo 650)
  {
    id: 'prod-001',
    name: 'Dolo 650mg Paracetamol Tablets',
    genericName: 'Paracetamol 650 mg',
    category: 'Medicines',
    subcategory: 'Fever & Pain Relief',
    description: 'India’s most trusted antipyretic and analgesic for rapid relief from fever, headache, body aches and viral illness symptoms.',
    manufacturer: 'Micro Labs Ltd',
    packSize: 'Strip of 15 Tablets',
    price: 33.50,
    availability: 'in_stock',
    prescriptionRequired: false,
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
    sku: 'MED-DOL-650',
    dosageForm: 'Tablet',
    tags: ['fever', 'headache', 'paracetamol', 'pain', 'dolo 650', 'body ache'],
    isFeatured: true,
    usageInstructions: 'Take 1 tablet every 6 to 8 hours as advised by a doctor. Do not exceed 4 tablets in 24 hours.',
    storageCondition: 'Store in a cool, dry place below 30°C. Protect from direct sunlight.'
  },

  // 2. Azithromycin (Azithral 500mg)
  {
    id: 'prod-002-azithral',
    name: 'Azithral 500mg Azithromycin Tablets',
    genericName: 'Azithromycin 500 mg',
    category: 'Prescription Medicines',
    subcategory: 'Antibiotics',
    description: 'Broad-spectrum macrolide antibiotic effective against respiratory tract infections, bacterial throat infections, bronchitis, and sinusitis.',
    manufacturer: 'Alembic Pharmaceuticals Ltd',
    packSize: 'Strip of 5 Tablets',
    price: 128.50,
    availability: 'in_stock',
    prescriptionRequired: true,
    imageUrl: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&auto=format&fit=crop&q=80',
    sku: 'RX-AZI-500',
    dosageForm: 'Tablet',
    tags: ['antibiotic', 'azithromycin', 'azithral', 'throat infection', 'cough', 'prescription'],
    isFeatured: true,
    usageInstructions: 'Prescription only. Take 1 tablet daily 1 hour before or 2 hours after food, for the duration prescribed by your physician.',
    storageCondition: 'Store at a temperature not exceeding 25°C in a dry place.'
  },

  // 3. Vitamin D3 (Uprise-D3 60K)
  {
    id: 'prod-003-vitamind',
    name: 'Uprise-D3 60K Softgel Capsules (Vitamin D3)',
    genericName: 'Cholecalciferol (Vitamin D3) 60,000 IU',
    category: 'Medicines',
    subcategory: 'Vitamins & Minerals',
    description: 'High-potency weekly Vitamin D3 formulation for treating Vitamin D deficiency, strengthening bone density, and boosting immune defense.',
    manufacturer: 'Alkem Laboratories Ltd',
    packSize: 'Strip of 4 Softgel Capsules',
    price: 118.00,
    availability: 'in_stock',
    prescriptionRequired: false,
    imageUrl: 'https://images.unsplash.com/photo-1550572017-ed200f5e6343?w=600&auto=format&fit=crop&q=80',
    sku: 'MED-UPR-60K',
    dosageForm: 'Capsule',
    tags: ['vitamin d', 'vitamin d3', 'cholecalciferol', 'bones', 'immunity', 'uprise'],
    isFeatured: true,
    usageInstructions: 'Take 1 capsule weekly with a milk or fat-containing meal, or as directed by your physician.',
    storageCondition: 'Store in a cool, dry place away from direct sunlight.'
  },

  // 4. Montair-LC (Montelukast + Levocetirizine)
  {
    id: 'prod-004-montair',
    name: 'Montair-LC Tablets (Montelukast + Levocetirizine)',
    genericName: 'Montelukast (10mg) + Levocetirizine (5mg)',
    category: 'Prescription Medicines',
    subcategory: 'Allergy & Respiratory',
    description: 'Combined antiallergic medication for effective relief from allergic rhinitis, asthma symptoms, sneezing, runny nose, and nocturnal congestion.',
    manufacturer: 'Cipla Ltd',
    packSize: 'Strip of 10 Tablets',
    price: 198.00,
    availability: 'in_stock',
    prescriptionRequired: true,
    imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&auto=format&fit=crop&q=80',
    sku: 'RX-MON-LC10',
    dosageForm: 'Tablet',
    tags: ['allergy', 'montelukast', 'levocetirizine', 'asthma', 'cold', 'sneezing'],
    isFeatured: true,
    usageInstructions: 'Take 1 tablet once daily in the evening or at bedtime as advised by your doctor.',
    storageCondition: 'Store below 25°C protected from moisture.'
  },

  // 5. Telma 40 (Telmisartan 40mg)
  {
    id: 'prod-005-telma',
    name: 'Telma 40mg Blood Pressure Tablets',
    genericName: 'Telmisartan 40 mg',
    category: 'Prescription Medicines',
    subcategory: 'Cardiovascular & BP',
    description: 'Angiotensin receptor blocker (ARB) prescribed for managing essential hypertension (high blood pressure) and cardiovascular risk reduction.',
    manufacturer: 'Glenmark Pharmaceuticals Ltd',
    packSize: 'Strip of 15 Tablets',
    price: 224.00,
    availability: 'in_stock',
    prescriptionRequired: true,
    imageUrl: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=600&auto=format&fit=crop&q=80',
    sku: 'RX-TEL-40',
    dosageForm: 'Tablet',
    tags: ['blood pressure', 'bp', 'telmisartan', 'hypertension', 'heart', 'telma 40'],
    isFeatured: true,
    usageInstructions: 'Take once daily at the same time each day, with or without food. Strictly follow your cardiologist’s prescription.',
    storageCondition: 'Store in the original package in a dry place below 30°C.'
  },

  // 6. Shelcal 500 (Calcium + Vitamin D3)
  {
    id: 'prod-006-shelcal',
    name: 'Shelcal 500 Calcium & Vitamin D3 Tablets',
    genericName: 'Elemental Calcium (500mg) + Vitamin D3 (250 IU)',
    category: 'Medicines',
    subcategory: 'Vitamins & Minerals',
    description: 'Formulated to meet daily calcium requirements, maintain strong teeth and bone mineral density, and prevent osteoporosis in adults.',
    manufacturer: 'Torrent Pharmaceuticals Ltd',
    packSize: 'Strip of 15 Tablets',
    price: 131.00,
    availability: 'in_stock',
    prescriptionRequired: false,
    imageUrl: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=600&auto=format&fit=crop&q=80',
    sku: 'MED-SHE-500',
    dosageForm: 'Tablet',
    tags: ['calcium', 'shelcal', 'vitamin d3', 'bones', 'joints', 'osteoporosis'],
    isFeatured: true,
    usageInstructions: 'Take 1 tablet daily after food or as recommended by your physician.',
    storageCondition: 'Store in a cool and dry place.'
  },

  // 7. Becosules Z (B-Complex + Zinc + Vitamin C)
  {
    id: 'prod-007-becosules',
    name: 'Becosules Z Multivitamin & Zinc Capsules',
    genericName: 'Vitamin B-Complex Forte + Vitamin C (50mg) + Zinc Sulphate (41.4mg)',
    category: 'Medicines',
    subcategory: 'Vitamins & Minerals',
    description: 'Comprehensive vitamin B-complex with Vitamin C and Zinc to heal mouth ulcers, support energy metabolism, and speed recovery from illness.',
    manufacturer: 'Pfizer India / GSK',
    packSize: 'Strip of 20 Capsules',
    price: 52.50,
    availability: 'in_stock',
    prescriptionRequired: false,
    imageUrl: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=600&auto=format&fit=crop&q=80',
    sku: 'MED-BEC-Z20',
    dosageForm: 'Capsule',
    tags: ['becosules', 'vitamin b complex', 'mouth ulcers', 'zinc', 'multivitamin', 'energy'],
    isFeatured: true,
    usageInstructions: 'Take 1 capsule daily after a major meal with a full glass of water.',
    storageCondition: 'Store in a dry place protected from light and heat.'
  },

  // 8. Combiflam (Ibuprofen + Paracetamol)
  {
    id: 'prod-008-combiflam',
    name: 'Combiflam Pain Relief Tablets',
    genericName: 'Ibuprofen (400mg) + Paracetamol (325mg)',
    category: 'Medicines',
    subcategory: 'Fever & Pain Relief',
    description: 'Fast-action dual analgesics for relief of acute toothache, joint pain, muscle strain, arthritis inflammation, and fever.',
    manufacturer: 'Sanofi India Ltd',
    packSize: 'Strip of 20 Tablets',
    price: 45.00,
    availability: 'in_stock',
    prescriptionRequired: false,
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
    sku: 'MED-COM-20',
    dosageForm: 'Tablet',
    tags: ['pain relief', 'combiflam', 'ibuprofen', 'toothache', 'headache', 'joint pain'],
    isFeatured: true,
    usageInstructions: 'Take 1 tablet after meals with water. Do not take on an empty stomach.',
    storageCondition: 'Store below 25°C in a dry place.'
  },

  // 9. Glycomet 500 SR (Metformin)
  {
    id: 'prod-009-glycomet',
    name: 'Glycomet 500mg SR Diabetes Tablets',
    genericName: 'Metformin Hydrochloride (Sustained Release) 500 mg',
    category: 'Prescription Medicines',
    subcategory: 'Diabetes Care',
    description: 'First-line anti-hyperglycemic medication for the management of Type 2 diabetes mellitus to regulate blood glucose levels.',
    manufacturer: 'USV Ltd',
    packSize: 'Strip of 20 Tablets',
    price: 48.00,
    availability: 'in_stock',
    prescriptionRequired: true,
    imageUrl: 'https://images.unsplash.com/photo-1550572017-ed200f5e6343?w=600&auto=format&fit=crop&q=80',
    sku: 'RX-GLY-500SR',
    dosageForm: 'Tablet',
    tags: ['diabetes', 'sugar', 'metformin', 'glycomet', 'type 2 diabetes', 'prescription'],
    isFeatured: true,
    usageInstructions: 'Prescription only. Take strictly with or after meals to reduce stomach discomfort.',
    storageCondition: 'Store below 30°C in a dry place.'
  },

  // 10. Digene Gel Antacid (Mint Flavor)
  {
    id: 'prod-010-digene',
    name: 'Digene Acidity & Gas Relief Gel (Mint 200ml)',
    genericName: 'Magnesium Hydroxide + Aluminium Hydroxide + Simethicone',
    category: 'OTC / General Healthcare',
    subcategory: 'Gastrointestinal',
    description: 'Fast-acting scientifically proven sugar-free antacid suspension that provides instant cooling relief from acidity, heartburn, gas, and stomach upset.',
    manufacturer: 'Abbott Healthcare Pvt Ltd',
    packSize: '200 ml Bottle',
    price: 145.00,
    availability: 'in_stock',
    prescriptionRequired: false,
    imageUrl: 'https://images.unsplash.com/photo-1577401239170-897942555fb3?w=600&auto=format&fit=crop&q=80',
    sku: 'OTC-DIG-200ML',
    dosageForm: 'Syrup / Suspension',
    tags: ['acidity', 'gas', 'heartburn', 'digene', 'antacid', 'stomach ache'],
    isFeatured: true,
    usageInstructions: 'Shake well before use. Take 2-4 teaspoonfuls (10-20ml) after meals or at bedtime as needed.',
    storageCondition: 'Store at room temperature. Keep bottle tightly closed.'
  },

  // Augmentin 625 Duo
  {
    id: 'prod-011-augmentin',
    name: 'Augmentin 625 Duo Tablet',
    genericName: 'Amoxicillin (500mg) + Clavulanic Acid (125mg)',
    category: 'Prescription Medicines',
    subcategory: 'Antibiotics',
    description: 'Broad-spectrum antibiotic medication for bacterial infections of respiratory tract, ENT, skin and soft tissues.',
    manufacturer: 'GlaxoSmithKline Pharmaceuticals Ltd',
    packSize: 'Strip of 10 Tablets',
    price: 204.00,
    availability: 'in_stock',
    prescriptionRequired: true,
    imageUrl: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&auto=format&fit=crop&q=80',
    sku: 'RX-AUG-625',
    dosageForm: 'Tablet',
    tags: ['antibiotic', 'infection', 'bacterial', 'prescription', 'amoxicillin'],
    isFeatured: true,
    usageInstructions: 'Mandatory prescription medicine. Take strictly as prescribed by a qualified medical practitioner with meals.',
    storageCondition: 'Store protected from moisture at a temperature not exceeding 25°C.'
  },

  // Pan-D
  {
    id: 'prod-012-pand',
    name: 'Pan-D Capsule (Pantoprazole + Domperidone)',
    genericName: 'Pantoprazole (40mg) + Domperidone (30mg SR)',
    category: 'Prescription Medicines',
    subcategory: 'Gastrointestinal',
    description: 'Prescription gastro-resistant capsule indicated for acid reflux, GERD, hyperacidity and associated nausea or dyspepsia.',
    manufacturer: 'Alkem Laboratories Ltd',
    packSize: 'Strip of 15 Capsules',
    price: 199.00,
    availability: 'in_stock',
    prescriptionRequired: true,
    imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&auto=format&fit=crop&q=80',
    sku: 'RX-PAN-D15',
    dosageForm: 'Capsule',
    tags: ['acidity', 'gas', 'gerd', 'reflux', 'nausea'],
    isFeatured: true,
    usageInstructions: 'Take on an empty stomach in the morning 30-60 minutes before breakfast as prescribed.',
    storageCondition: 'Store in a dry place protected from light and moisture.'
  },

  // Allegra 120mg
  {
    id: 'prod-013-allegra',
    name: 'Allegra 120mg Fexofenadine Tablets',
    genericName: 'Fexofenadine Hydrochloride 120 mg',
    category: 'Medicines',
    subcategory: 'Allergy & Cold',
    description: 'Non-sedating antihistamine for effective relief of seasonal allergic rhinitis, sneezing, runny nose, and itchy watery eyes.',
    manufacturer: 'Sanofi India Ltd',
    packSize: 'Strip of 10 Tablets',
    price: 218.00,
    availability: 'in_stock',
    prescriptionRequired: false,
    imageUrl: 'https://images.unsplash.com/photo-1550572017-ed200f5e6343?w=600&auto=format&fit=crop&q=80',
    sku: 'MED-ALL-120',
    dosageForm: 'Tablet',
    tags: ['allergy', 'sneezing', 'cold', 'antihistamine', 'dust allergy'],
    isFeatured: false,
    usageInstructions: 'Take one tablet once daily with water or as advised by your physician.',
    storageCondition: 'Store below 25°C in a dry place.'
  },

  // Neurobion Forte
  {
    id: 'prod-014-neurobion',
    name: 'Neurobion Forte B-Complex with Vitamin B12',
    genericName: 'Vitamin B1, B2, B3, B5, B6 & Vitamin B12 (Cyanocobalamin)',
    category: 'Medicines',
    subcategory: 'Vitamins & Minerals',
    description: 'Nerve nourishing formula to support nervous system health, relieve tingling and numbness in hands and feet, and boost cellular energy.',
    manufacturer: 'Procter & Gamble Hygiene and Health Care Ltd',
    packSize: 'Strip of 30 Tablets',
    price: 38.00,
    availability: 'in_stock',
    prescriptionRequired: false,
    imageUrl: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=600&auto=format&fit=crop&q=80',
    sku: 'MED-NEU-30',
    dosageForm: 'Tablet',
    tags: ['neurobion', 'vitamin b12', 'nerve pain', 'multivitamin', 'tingling'],
    isFeatured: false,
    usageInstructions: 'Take 1 tablet daily with a meal or as directed by a doctor.',
    storageCondition: 'Store in a cool, dry place away from sunlight.'
  },

  // Electral ORS
  {
    id: 'prod-015-electral',
    name: 'Electral ORS Oral Rehydration Salts Sachet',
    genericName: 'WHO Recommended Formula Oral Electrolytes',
    category: 'OTC / General Healthcare',
    subcategory: 'Hydration & Electrolytes',
    description: 'Scientifically balanced electrolyte formulation for rapid recovery from dehydration caused by heat, physical exertion, travel or illness.',
    manufacturer: 'FDC Limited',
    packSize: 'Pack of 21.8g Sachet (Box of 10)',
    price: 22.00,
    availability: 'in_stock',
    prescriptionRequired: false,
    imageUrl: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=600&auto=format&fit=crop&q=80',
    sku: 'OTC-ELE-ORS',
    dosageForm: 'Powder',
    tags: ['ors', 'hydration', 'electrolytes', 'pilgrimage', 'travel', 'energy'],
    isFeatured: true,
    usageInstructions: 'Dissolve entire contents of one sachet in 1 liter of clean drinking water. Drink throughout the day.',
    storageCondition: 'Store in a cool dry place. Use prepared solution within 24 hours.'
  },

  // Volini Pain Relief
  {
    id: 'prod-016-volini',
    name: 'Volini Pain Relief Gel / Spray',
    genericName: 'Diclofenac Diethylamine + Methyl Salicylate + Menthol',
    category: 'OTC / General Healthcare',
    subcategory: 'Muscle & Joint Care',
    description: 'Fast-acting topical formulation that penetrates deep to relieve backache, neck pain, joint stiffness, sprains and muscle fatigue.',
    manufacturer: 'Sun Pharma',
    packSize: '50g Tube',
    price: 165.00,
    availability: 'in_stock',
    prescriptionRequired: false,
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
    sku: 'OTC-VOL-50G',
    dosageForm: 'Gel / Spray',
    tags: ['pain relief', 'muscle ache', 'joint pain', 'volini', 'pilgrimage walking care'],
    isFeatured: true,
    usageInstructions: 'Apply gently on affected area 3-4 times daily. Do not apply on broken skin or open wounds.',
    storageCondition: 'Store in a cool place. Keep container tightly closed.'
  },

  // Pilgrimage & Travel Care Essentials
  {
    id: 'prod-017-ihram-lotion',
    name: 'Ihram-Safe Fragrance-Free Gentle Moisturizing Lotion',
    genericName: 'Unscented Hypoallergenic Skin Protectant',
    category: 'Travel & Pilgrimage Care',
    subcategory: 'Ihram Essentials',
    description: '100% fragrance-free, alcohol-free skin protectant specially formulated for pilgrims in the state of Ihram to prevent skin chafing and dryness under desert climate.',
    manufacturer: 'Magnet Care Essentials',
    packSize: '150 ml Bottle',
    price: 180.00,
    availability: 'in_stock',
    prescriptionRequired: false,
    imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80',
    sku: 'PIL-IHR-LOT150',
    dosageForm: 'Personal Care',
    tags: ['ihram', 'umrah', 'hajj', 'fragrance-free', 'unscented', 'chafing', 'pilgrimage'],
    isFeatured: true,
    usageInstructions: 'Apply generously to thighs, underarms and dry skin areas before walking to prevent friction chafing.',
    storageCondition: 'Store in a cool dry place away from heat.'
  },
  {
    id: 'prod-018-blister-pads',
    name: 'Hydrocolloid Blister & Heel Protection Pads',
    genericName: 'Sterile Cushioned Hydrocolloid Dressing',
    category: 'Travel & Pilgrimage Care',
    subcategory: 'Foot Care',
    description: 'Medical-grade cushioned pads to protect heels, toes and feet from friction blisters during Tawaf, Sa’i, and long walking distances.',
    manufacturer: 'Medline Healthcare',
    packSize: 'Pack of 10 Assorted Pads',
    price: 195.00,
    availability: 'in_stock',
    prescriptionRequired: false,
    imageUrl: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=600&auto=format&fit=crop&q=80',
    sku: 'PIL-BLI-PAD10',
    dosageForm: 'Device',
    tags: ['blister', 'tawaf', 'foot care', 'pilgrimage', 'walking', 'pads', 'umrah'],
    isFeatured: true,
    usageInstructions: 'Clean and dry skin thoroughly before applying directly on prone friction spots or existing blisters.',
    storageCondition: 'Store in a clean, moisture-free pouch.'
  },
  {
    id: 'prod-019-thermometer',
    name: 'Dr. Morepen Digital Clinical Thermometer',
    genericName: 'High Accuracy Quick Digital Clinical Thermometer',
    category: 'First Aid & Medical Devices',
    subcategory: 'Monitoring Devices',
    description: 'Quick 60-second reading clinical digital thermometer with beeper alert, fever alarm and memory recall function.',
    manufacturer: 'Dr. Morepen Laboratories',
    packSize: '1 Unit with Protective Case',
    price: 149.00,
    availability: 'in_stock',
    prescriptionRequired: false,
    imageUrl: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=600&auto=format&fit=crop&q=80',
    sku: 'DEV-MOR-THERM',
    dosageForm: 'Device',
    tags: ['thermometer', 'fever', 'medical device', 'digital', 'home healthcare'],
    isFeatured: false,
    usageInstructions: 'Place under tongue or armpit until beep sounds. Wipe clean with alcohol swab after use.',
    storageCondition: 'Keep in protective case when not in use.'
  },
  {
    id: 'prod-020-omron',
    name: 'Omron Automatic Digital Blood Pressure Monitor HEM-7120',
    genericName: 'Upper Arm Digital BP Monitor with Intellisense',
    category: 'First Aid & Medical Devices',
    subcategory: 'Monitoring Devices',
    description: 'Clinically validated accurate digital blood pressure monitor with hypertension indicator and body movement detection.',
    manufacturer: 'Omron Healthcare',
    packSize: '1 Kit (Monitor, Cuff, Batteries, Manual)',
    price: 1850.00,
    availability: 'in_stock',
    prescriptionRequired: false,
    imageUrl: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=600&auto=format&fit=crop&q=80',
    sku: 'DEV-OMR-7120',
    dosageForm: 'Device',
    tags: ['bp monitor', 'blood pressure', 'hypertension', 'omron', 'health device'],
    isFeatured: true,
    usageInstructions: 'Sit comfortably with arm supported at heart level. Wrap cuff snugly 1-2 cm above elbow crease.',
    storageCondition: 'Store in dry place away from electromagnetic fields.'
  },
  {
    id: 'prod-021-cetaphil',
    name: 'Cetaphil Gentle Skin Cleanser',
    genericName: 'Hydrating Soap-Free Dermatological Formula',
    category: 'Beauty & Skincare',
    subcategory: 'Face Care',
    description: 'Clinically proven gentle cleanser for sensitive and dry skin. Hydrates while gently removing dirt and impurities without stripping natural moisture barrier.',
    manufacturer: 'Galderma India Pvt Ltd',
    packSize: '125 ml Bottle',
    price: 335.00,
    availability: 'in_stock',
    prescriptionRequired: false,
    imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80',
    sku: 'BTY-CET-125ML',
    dosageForm: 'Personal Care',
    tags: ['skincare', 'face cleanser', 'sensitive skin', 'cetaphil', 'hydrating'],
    isFeatured: false,
    usageInstructions: 'Apply to face, massage gently, and rinse with water or wipe with a soft cloth.',
    storageCondition: 'Store below 30°C.'
  },
  {
    id: 'prod-022-ensure',
    name: 'Ensure Complete Nutrition Drink Powder (Vanilla)',
    genericName: 'Balanced Adult Nutrition with 32 Essential Nutrients',
    category: 'General Store',
    subcategory: 'Nutritional Drinks',
    description: 'Scientifically designed adult nutritional health drink to support immune strength, physical energy and muscle health for adults and elderly.',
    manufacturer: 'Abbott Healthcare',
    packSize: '400g Refill Pack',
    price: 690.00,
    availability: 'in_stock',
    prescriptionRequired: false,
    imageUrl: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=600&auto=format&fit=crop&q=80',
    sku: 'GEN-ENS-400G',
    dosageForm: 'Powder',
    tags: ['nutrition', 'health drink', 'energy', 'elderly care', 'protein'],
    isFeatured: true,
    usageInstructions: 'Mix 6 level scoops with 190ml of lukewarm water or milk. Stir thoroughly until dissolved.',
    storageCondition: 'Store in airtight container in a dry place.'
  }
];

export const INITIAL_POLICIES: PolicyContent = {
  medicinePolicy: `## Medicine Availability & Dispensing Policy

1. **Availability Verification**: Products displayed on Magnet are subject to physical in-store stock availability and wholesale distributor supply. An enquiry made online does not automatically constitute a confirmed stock reservation until verified by our pharmacy team.
2. **Quality & Authenticity**: Magnet supplies only 100% genuine medications, sourced directly from authorized manufacturers and licensed pharmaceutical distributors.
3. **Storage & Handling**: All medications are stored in strict compliance with pharmaceutical temperature and humidity standards.
4. **General Healthcare Information**: Descriptions and information on this website are provided for general educational purposes and do not replace personalized medical consultations with a registered medical practitioner.`,

  prescriptionPolicy: `## Prescription Requirement & Verification Policy

1. **Mandatory Doctor's Prescription**: Schedule H, H1, and X medications as per applicable drug regulations require a valid, non-expired prescription issued by a registered medical practitioner.
2. **Review Process**: Every uploaded prescription is carefully examined by our qualified pharmacist for:
   - Patient name and date of consultation
   - Registered doctor's name, qualification and registration number
   - Medicine name, strength, dosage and treatment duration
3. **Clarification & Safety**: If a prescription is incomplete, illegible, or expired, our pharmacy staff will contact the customer for clarification or advise them to obtain an updated prescription.
4. **Data Confidentiality**: Prescription files are securely stored and accessed strictly by authorized pharmacy staff for dispensing verification.`,

  enquiryPolicy: `## Medicine Enquiry & Booking Workflow

1. **Submission**: Customers may request regular medicines, prescription items, or unlisted healthcare products through the enquiry form or directly via WhatsApp.
2. **Reference Number**: Upon submission, a unique enquiry reference number (e.g. MAG-2026-000123) is assigned for tracking.
3. **Pharmacist Response**: Our team reviews your request, verifies stock availability, checks prescription validity (if applicable), and contacts you via WhatsApp, phone, or email with price and pickup/delivery options.
4. **Order Confirmation**: The request is marked 'Confirmed' only after customer concurrence on price, quantity, and dispensing terms.`,

  cancellationPolicy: `## Modification & Cancellation Terms

1. **Before Confirmation**: Customers may cancel or modify their enquiry at any time prior to pharmacist confirmation by contacting us on WhatsApp or phone with their Reference Number.
2. **After Dispensing**: Once prescription medicines or sealed sterile healthcare supplies are prepared or handed over, returns are subject to regulatory health safety guidelines and cannot be accepted if seals are broken or temperature chain is interrupted.
3. **Unavailability**: If a requested item cannot be arranged from distributors, our team will promptly inform the customer and suggest suitable alternatives with doctor approval.`,

  deliveryPolicy: `## Store Pickup & Local Delivery Guidelines

1. **In-Store Pickup**: Customers can collect verified medicine requests directly from the Magnet pharmacy counter during store hours (9:00 AM – 11:00 PM).
2. **Local Delivery Assistance**: Delivery availability, applicable delivery zones, and timeline are discussed individually with each customer during the enquiry confirmation stage.
3. **Prescription Presentation at Delivery/Pickup**: For prescription-required items, the physical original prescription must be presented for verification where required by law.`,

  privacyPolicy: `## Privacy & Data Protection

1. **Customer Data**: Magnet collects minimal personal details (Name, Phone number, Email, Address) solely for the purpose of communicating about medicine enquiries and dispensing services.
2. **No Third-Party Sharing**: We do not sell, rent, or trade customer contact details or medical information to any third-party marketing entities.
3. **Prescription Security**: Uploaded prescription files are transmitted securely, stored in protected repositories, and accessed only by licensed pharmacy staff.`,

  termsConditions: `## General Terms & Conditions

1. **Website Use**: By using the Magnet platform, you agree to submit truthful, accurate contact details and valid medical documentation.
2. **No Medical Claims**: Magnet does not provide medical diagnosis, clinical prescribing, or emergency medical treatment. In any medical emergency, please visit the nearest hospital or emergency room immediately.
3. **Modifications**: Magnet reserves the right to update product listings, store policies, and operational hours as necessary.`,

  lastUpdated: 'September 2026'
};

export const PILGRIMAGE_CHECKLIST_ITEMS = [
  {
    category: 'Regular Chronic Medications',
    items: [
      'Enough supply of daily prescribed BP, Diabetes, Thyroid or Cardiac medicines (minimum 3-4 weeks supply)',
      'Doctor’s medical prescription & summary letter for airport customs and airline clearance',
      'Small insulated pouch if carrying temperature-sensitive medications (like Insulin pens)'
    ]
  },
  {
    category: 'Walking & Physical Support (Tawaf & Sa’i)',
    items: [
      'Hydrocolloid blister pads and heel cushions for prolonged walking barefoot on marble',
      'Anti-chafing fragrance-free soothing cream / thigh protectant for state of Ihram',
      'Pain relief muscle spray or gel for calf, knee and back soreness',
      'Comfortable medical arch-support socks for elderly'
    ]
  },
  {
    category: 'Hydration & Heat Protection (Makkah & Madina Climate)',
    items: [
      'WHO Formula ORS / Electrolyte sachets (5-10 sachets per person)',
      'Glucose instant energy powder packets',
      'Hydrating lip balm and fragrance-free skin moisturizer'
    ]
  },
  {
    category: 'Respiratory Hygiene & General First Aid',
    items: [
      'High-filtration 3-ply breathable face masks for crowded Tawaf & Jamarat areas',
      'Throat lozenges for dry/sore throat from air-conditioned hotel and transit',
      'Nasal saline drops / decongestant for dry desert air & flight congestion',
      'Antiseptic wipes and waterproof adhesive bandages for minor scratches',
      'Digital thermometer for quick temperature check'
    ]
  },
  {
    category: 'Ihram-Compliant Hygiene Supplies',
    items: [
      '100% Fragrance-free, non-scented pure soap bar',
      'Unscented moisturizing lotion / petroleum jelly',
      'Unscented lip care balm'
    ]
  }
];
