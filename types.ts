
import React from 'react';

export enum AppMode {
  DISCOVER = 'DISCOVER',
  PROFESSIONAL = 'PROFESSIONAL'
}

export enum Theme {
  LIGHT = 'LIGHT',
  DARK = 'DARK'
}

export interface NavItem {
  label: string;
  id: string;
  icon: React.ReactNode;
}

export interface AutomationIdea {
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Advanced';
}

export interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}
