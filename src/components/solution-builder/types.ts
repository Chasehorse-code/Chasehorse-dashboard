export type TierId = 'T1' | 'T2' | 'T3' | 'CX';

export interface Service {
  id: string;
  tier: TierId;
  group: string;
  name: string;
  price: number;          // INR, integer
  description: string;    // one short line, max ~10 words
}

export interface TierMeta {
  id: TierId;
  title: string;
  tagline: string;
}

export type ThemeId = 'classic' | 'dark' | 'blue' | 'glass';

export interface ThemeOption {
  id: ThemeId;
  label: string;
  dotColor: string;
}

