import React from 'react';
import type { Resource } from '../types';

const resources: Resource[] = [
  {
    title: 'Career Guides',
    description: 'Comprehensive guides covering various career paths',
    link: '#',
  },
  {
    title: 'Skill Assessments',
    description: 'Tools to evaluate your technical and soft skills',
    link: '#',
  },
  {
    title: 'Industry Reports',
    description: 'Latest trends and insights from different sectors',
    link: '#',
  },
  {
    title: 'Interview Prep',
    description: 'Resources to help you ace your interviews',
    link: '#',
  },
];

const Resources: React.FC = () => {
  return (
    <div id="resources" className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Resources</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Helpful Career Resources
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Access our collection of resources to help you succeed in your career journey
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {resources.map((resource) => (
              <div
                key={resource.title}
                className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-indigo-500 hover:ring-1 hover:ring-indigo-500"
              >
                <div className="min-h-48">
                  <h3 className="text-lg font-medium text-gray-900">{resource.title}</h3>
                  <p className="mt-2 text-sm text-gray-500">{resource.description}</p>
                </div>
                <a
                  href={resource.link}
                  className="mt-4 inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Learn more
                  <svg
                    className="ml-1 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;