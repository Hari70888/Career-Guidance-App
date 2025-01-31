import React from 'react';
import { BookOpen, Compass, Users, Briefcase } from 'lucide-react';
import type { Feature } from '../types';

const features: Feature[] = [
  {
    name: 'Structured Learning Paths',
    description: 'Follow detailed roadmaps tailored for different career trajectories in engineering and technology.',
    icon: BookOpen,
  },
  {
    name: 'Career Assessment',
    description: 'Take comprehensive assessments to understand your strengths, interests, and suitable career options.',
    icon: Compass,
  },
  {
    name: 'Industry Insights',
    description: 'Access real-world information about various industries, job roles, and required skills.',
    icon: Briefcase,
  },
  {
    name: 'Mentorship Network',
    description: 'Connect with industry professionals and experienced mentors for guidance and advice.',
    icon: Users,
  },
];

const Features: React.FC = () => {
  return (
    <div id="features" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need for career success
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Comprehensive tools and resources to help you make informed career decisions
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">{feature.name}</h3>
                  <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;