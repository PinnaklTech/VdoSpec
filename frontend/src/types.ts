export type Theme = 'light' | 'dark';

export interface NavItem {
  label: string;
  href: string;
}

export interface FeatureCard {
  title: string;
  description: string;
  icon: React.ComponentType;
}