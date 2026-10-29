# ChaseHorse (GELP) — Content & Approval Gaps Register
**Version:** 1.0 (Phase 1 Frontend Prototype)  
**Last Updated:** October 2026  
**Status:** All prototype pages functional with typed mock data. Items below require formal client sign-off before production release.

---

## 1. Commercial Pricing Approvals
| Service ID | Service Name | Reference Mockup Rate | Production Status | Required Action from ChaseHorse |
|---|---|---|---|---|
| `t1-digital-transformation` | Digital Transformation | $500.00 / mo | `approved: false` | Provide verified enterprise SaaS rate card in INR or confirm USD tier. |
| `t1-ch-deploy` | CH Deploy (Dock Leads) | $350.00 / shift | `approved: false` | Confirm shift-rate vs monthly retainer model for dock supervisors. |
| `t1-8d-customer-complaints`| 8D Complaints Management | $300.00 / incident | `approved: false` | Confirm pricing unit (per incident SLA vs monthly managed service). |
| `t1-merchandise-ppe` | Merchandise & PPE Store | $200.00 / mo | `approved: false` | Provide official wholesale price list for boots, helmets, vests. |
| `t1-returns-management` | Returns Management (Reverse) | $250.00 / mo | `approved: false` | Confirm reverse logistics volume pricing matrix. |
| `t2-fleet-driver-management`| Fleet & Driver Management | $400.00 / truck | `approved: false` | Confirm per-vehicle subscription tier. |
| `t3-scm-process` | SCM Standardization | $300.00 / mo | `approved: false` | Confirm consulting retainer pricing. |
| *Other Tier 2 & 3 Services* | Drones, Robotics, ESG | Estimated $450–$900 | `approved: false` | Set quotation rules (e.g. "Price on Request" vs fixed pilots). |

*Configuration file:* `src/data/pricing.ts`

---

## 2. Communications & Partner Contact Points
| Item | Current Prototype Placeholder | Required Production Value | Location in Code |
|---|---|---|---|
| Central WhatsApp Number | `+91 98765 43210` | Real verified ChaseHorse business WhatsApp number | `src/lib/config.ts` (`WHATSAPP_NUMBER`) |
| Partner WhatsApp Group Link | `https://chat.whatsapp.com/DEMO_CHASEHORSE_PARTNERS` | Official verified invite link for transporter community | `src/lib/config.ts` (`WHATSAPP_GROUP_LINK`) |
| Corporate Support Email | `contact@chasehorse.com` | Official domain inbox | `src/lib/config.ts` (`SUPPORT_EMAIL`) |
| Central Phone Hotline | `+91 (80) 4560-9900` | Verified PBX / IVR number | `src/lib/config.ts` (`SUPPORT_PHONE`) |
| Google Partner Form | `https://forms.gle/QmiddiuRkaRLbesEA` | **Verified & Active** (exact link supplied by client) | `src/lib/config.ts` (`GOOGLE_PARTNER_FORM`) |

---

## 3. Marketing Statistics & Hero Claims
| Statistic | Mockup Display | Current Code Flag | Business Action |
|---|---|---|---|
| Field Workers Count | `50K+` | `approved: false` | Confirm active vetted field worker pool number. |
| Metro Service Locations | `6 Hubs` | `approved: true` | Grounded by the 6 metro gateways: Delhi NCR, Mumbai, Bengaluru, Chennai, Kolkata, Hyderabad. |
| Operations Command | `24/7` | `approved: false` | Confirm 24/7 operations control desk SLA. |
| Task Completion Rate | `99.8%` | `approved: false` | Confirm verified customer OTIF / dock audit success rate. |

*Configuration file:* `src/lib/config.ts` (`APP_CONFIG.STATS`)

---

## 4. Branch Office Physical Addresses & Capacity
| Metro City | Prototype Location | Details Needed from ChaseHorse |
|---|---|---|
| New Delhi | Gurugram / Sector 82A KMP Corridor | Exact building name, PIN code, and registered branch GSTIN. |
| Mumbai | Nhava Sheva / JNPT Sector 15 | Exact terminal yard address and facility manager contact. |
| Bengaluru (HQ) | Hosur Road Logistics Hub | Exact corporate office floor and legal entity address. |
| Chennai | Sriperumbudur Industrial Highway | Exact automotive logistics hub address. |
| Kolkata | Dankuni Logistics Park NH-19 | Exact multimodal hub address. |
| Hyderabad | Shamshabad Aero Logistics Zone | Exact pharma-cold-chain terminal address. |

*Configuration file:* `src/data/locations.ts`

---

## 5. Media Assets (Videos & Photography)
| Slot | Prototype Asset | Production Action |
|---|---|---|
| Hero Video 1 (Tech & Automation) | High-resolution Unsplash IoT/Cloud asset | Provide 1080p MP4 (15s, loopable, <5MB) of proprietary control room/GELP software. |
| Hero Video 2 (Consulting & Strategy) | High-resolution Unsplash corporate strategy asset | Provide 1080p MP4 of executive review / supply chain consultation. |
| Hero Video 3 (Field & Fleet Scale) | High-resolution Unsplash fleet & dock asset | Provide 1080p MP4 of truck staging, lashing, or dock unloading. |
| WhatsApp Contact Avatar | Stock business professional photo | Provide approved photo of ChaseHorse operations desk lead. |

*Specification file:* `public/videos/README.md` and `public/images/README.md`

---

## 6. Key Business & UX Decisions for Client Confirmation
1. **Terminology Resolution:** The source PDF mentioned "Eyeball Management" in one place and "Ewaybill Management" in another. We implemented both (E-Way bill verification + photographic eyeball dock inspection). Confirm preferred formal nomenclature.
2. **Login Navigation:** Currently configured to open in a separate tab (`target="_blank" rel="noopener"`) per source PDF bullet #89. Confirm if this behavior should be preserved or transitioned to in-app routing.
3. **Customer Case Studies:** Currently written as enterprise industry profiles (Tier 1 Automotive Transmission, FMCG Consumer Durables, Solar EPC). Provide approved brand names and logos once non-disclosure agreements allow public release.

