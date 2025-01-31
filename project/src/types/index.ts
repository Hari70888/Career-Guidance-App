import { DivideIcon as LucideIcon } from 'lucide-react';

export interface Feature {
  name: string;
  description: string;
  icon: LucideIcon;
}

export interface Resource {
  title: string;
  description: string;
  link: string;
}

export interface CareerPath {
  title: string;
  description: string;
  image: string;
}