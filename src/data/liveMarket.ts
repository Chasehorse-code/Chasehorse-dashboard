import { FreightIndexPoint, LaneRate } from '../types';

export const TRUCK_TYPES = [
  { id: 't-32ft-mx', name: '32 Ft Multi-Axle Container (14–18 Ton)', capacity: '18 Tonnes', volume: '1850 cu.ft', ideal: 'FMCG, White Goods, Auto Parts' },
  { id: 't-32ft-sxl', name: '32 Ft Single Axle Container (7–9 Ton)', capacity: '9 Tonnes', volume: '1850 cu.ft', ideal: 'Lightweight volume cargo, E-commerce' },
  { id: 't-24ft', name: '24 Ft Container / Open Body (10–12 Ton)', capacity: '12 Tonnes', volume: '1350 cu.ft', ideal: 'Industrial machinery, Raw materials' },
  { id: 't-trailer-40ft', name: '40 Ft High-Bed Trailer (28–35 Ton)', capacity: '35 Tonnes', volume: 'Open Platform', ideal: 'Steel coils, Heavy equipment, Export containers' },
  { id: 't-14ft-eicher', name: '14 Ft Eicher / Light Commercial (3.5–4 Ton)', capacity: '4 Tonnes', volume: '650 cu.ft', ideal: 'Intra-state distribution, Secondary moves' },
];

export const TERMINAL_HUBS = [
  { id: 'hub-delhi', name: 'North Delhi KMP Transhipment Terminal', city: 'New Delhi / NCR', totalBays: 85, availableBays: 24, ratePerBayDay: 450, security: '24/7 CCTV, Armed Guards, Driver Restrooms, Mechanics' },
  { id: 'hub-mumbai', name: 'JNPT Maritime Gateway Terminal Space', city: 'Mumbai / Nhava Sheva', totalBays: 120, availableBays: 18, ratePerBayDay: 600, security: 'Customs bonded area, Reefer plug points, Heavy reach-stackers' },
  { id: 'hub-blr', name: 'Hosur Road South Distribution Terminal', city: 'Bengaluru', totalBays: 65, availableBays: 12, ratePerBayDay: 480, security: 'Biometric access, EV fast chargers, Weighbridge 100T' },
  { id: 'hub-chn', name: 'Sriperumbudur Auto Terminal Yard', city: 'Chennai', totalBays: 70, availableBays: 31, ratePerBayDay: 420, security: 'Floodlit secured yard, Tyre workshop, Spares warehouse' },
  { id: 'hub-kol', name: 'Dankuni Eastern Multimodal Terminal', city: 'Kolkata', totalBays: 55, availableBays: 14, ratePerBayDay: 390, security: 'Rail siding adjacent, 24/7 fuel bunkering, Driver canteen' },
  { id: 'hub-hyd', name: 'Shamshabad Aero Logistics Terminal', city: 'Hyderabad', totalBays: 60, availableBays: 22, ratePerBayDay: 410, security: 'Pharma certified temperature docks, 24/7 power backup' },
];

export const FREIGHT_INDEX_DATA: FreightIndexPoint[] = [
  { date: '15 Oct', ratePerKm: 41.2, dieselIndex: 89.5, demandIndex: 112 },
  { date: '17 Oct', ratePerKm: 41.8, dieselIndex: 89.5, demandIndex: 115 },
  { date: '19 Oct', ratePerKm: 42.1, dieselIndex: 90.2, demandIndex: 119 },
  { date: '21 Oct', ratePerKm: 41.9, dieselIndex: 90.2, demandIndex: 116 },
  { date: '23 Oct', ratePerKm: 42.3, dieselIndex: 90.8, demandIndex: 122 },
  { date: '25 Oct', ratePerKm: 42.8, dieselIndex: 91.2, demandIndex: 127 },
  { date: '27 Oct', ratePerKm: 42.5, dieselIndex: 91.2, demandIndex: 124 },
  { date: 'Today', ratePerKm: 42.5, dieselIndex: 91.2, demandIndex: 125 },
];

export const TOP_LANE_RATES: LaneRate[] = [
  { id: 'lane-1', origin: 'Delhi NCR', destination: 'Mumbai (Bhiwandi)', distance: '1,420 km', transitTime: '44–48 hrs', ratePerKm: 44.2, changePercent: +2.4, truckTypes: ['32ft MX', '40ft Trailer'] },
  { id: 'lane-2', origin: 'Mumbai', destination: 'Bengaluru', distance: '985 km', transitTime: '28–32 hrs', ratePerKm: 41.5, changePercent: -1.2, truckTypes: ['32ft SXL', '32ft MX'] },
  { id: 'lane-3', origin: 'Chennai', destination: 'Kolkata', distance: '1,660 km', transitTime: '52–56 hrs', ratePerKm: 39.8, changePercent: +1.8, truckTypes: ['32ft MX', '24ft'] },
  { id: 'lane-4', origin: 'Delhi NCR', destination: 'Bengaluru', distance: '2,150 km', transitTime: '65–70 hrs', ratePerKm: 45.6, changePercent: +3.1, truckTypes: ['32ft MX Express'] },
  { id: 'lane-5', origin: 'Hyderabad', destination: 'Mumbai', distance: '710 km', transitTime: '20–24 hrs', ratePerKm: 43.0, changePercent: +0.5, truckTypes: ['32ft SXL', '14ft'] },
  { id: 'lane-6', origin: 'Ahmedabad', destination: 'Chennai', distance: '1,720 km', transitTime: '54–58 hrs', ratePerKm: 40.9, changePercent: -0.8, truckTypes: ['40ft Trailer', '32ft MX'] },
];

export const ONFIELD_LEAD_SKILLS = [
  { id: 'lead-wh-audit', title: 'Senior Warehouse & 3PL Auditor', ratePerShift: '₹2,800 / shift', experience: '5+ years', tags: ['Inventory', 'WMS', 'Shrinkage Audit'] },
  { id: 'lead-dock-super', title: 'Loading & Unloading Dock Supervisor', ratePerShift: '₹2,200 / shift', experience: '3+ years', tags: ['Lashing', 'Vehicle Fitness', 'JIR Reports'] },
  { id: 'lead-gst-liaison', title: 'GST & Border Checkpoint Liaison Lead', ratePerShift: '₹3,200 / shift', experience: '6+ years', tags: ['E-Way Bills', 'Tax Officers', 'Rapid Release'] },
  { id: 'lead-incident', title: 'Roadside Incident & Transhipment Lead', ratePerShift: '₹3,500 / shift', experience: '7+ years', tags: ['Salvage', 'Police Liaison', 'Cranes & Fleet'] },
];

