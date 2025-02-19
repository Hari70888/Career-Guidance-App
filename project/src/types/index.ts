import { DivideIcon as LucideIcon } from 'lucide-react';

export interface Feature {
  name: string;
  description: string;
  icon: typeof LucideIcon;
}

export interface Resource {
  title: string;
  description: string;
  link: string;
  image: string;
}

export interface CareerPath {
  title: string;
  description: string;
  image: string;
}

export interface CareerInsights {
  overview: {
    description: string;
    demand: string;
    workEnvironment: string;
  };
  skills: {
    technical: string[];
    soft: string[];
  };
  salary: {
    entryLevel: number;
    midLevel: number;
    seniorLevel: number;
  };
  growth: {
    outlook: string;
    growthRate: string;
  };
}
