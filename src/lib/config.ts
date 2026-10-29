/**
 * ChaseHorse Platform Configuration & Central Constants
 * Flags unapproved data and provides standardized contact/API helpers.
 */

export const APP_CONFIG = {
  // Brand details
  companyName: 'ChaseHorse',
  tagline: 'Growth Enabling Logiworkx Partner',
  platformName: 'Growth Enabler Logiworkx Platform (GELP)',

  // Contact placeholders (to be confirmed by ChaseHorse)
  WHATSAPP_NUMBER: '919876543210', // [CONTENT TO BE APPROVED: Real WhatsApp contact number]
  WHATSAPP_GROUP_LINK: 'https://chat.whatsapp.com/DEMO_CHASEHORSE_PARTNERS', // [CONTENT TO BE APPROVED: Official Partner Group]
  SUPPORT_EMAIL: 'contact@chasehorse.com', // [CONTENT TO BE APPROVED]
  SUPPORT_PHONE: '+91 (80) 4560-9900', // [CONTENT TO BE APPROVED]

  // Official verified Google Partner Form link (exact)
  GOOGLE_PARTNER_FORM: 'https://forms.gle/QmiddiuRkaRLbesEA',

  // Prototype & Demo state flags
  IS_DEMO_MODE: true,
  DEMO_NOTICE: 'Demo Prototype (Phase 1 — Frontend). Real-time APIs, bookings, payments and live data planned for backend phase.',

  // Operational Statistics (Flagged as placeholders pending client verification)
  STATS: [
    {
      id: 'workers',
      label: 'Field Workers Deployed',
      value: '50K+',
      approved: false, // [CONTENT TO BE APPROVED: Verify active workforce number]
      note: 'Sample metric from mockup pending business confirmation',
    },
    {
      id: 'locations',
      label: 'Service Locations Pan-India',
      value: '6',
      approved: true, // Grounded by the 6 metro hubs: Delhi, Mumbai, Bengaluru, Chennai, Kolkata, Hyderabad
      note: 'Verified: New Delhi, Mumbai, Bengaluru, Chennai, Kolkata, Hyderabad',
    },
    {
      id: 'support',
      label: 'Operations Command',
      value: '24/7',
      approved: false, // [CONTENT TO BE APPROVED]
      note: 'Planned 24/7 monitoring desk coverage',
    },
    {
      id: 'completion',
      label: 'Dock SLA Task Completion',
      value: '99.8%',
      approved: false, // [CONTENT TO BE APPROVED]
      note: 'Sample benchmark from design mockup',
    },
  ],

  // 6 Hub Cities
  METRO_HUBS: [
    'New Delhi',
    'Mumbai',
    'Bengaluru',
    'Chennai',
    'Kolkata',
    'Hyderabad',
  ],
};

/**
 * Constructs a verified WhatsApp direct connect link with a context-specific prefilled message.
 */
export function getWhatsAppUrl(prefilledText: string): string {
  const cleanNumber = APP_CONFIG.WHATSAPP_NUMBER.replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(prefilledText);
  return `https://wa.me/${cleanNumber}?text=${encodedText}`;
}

