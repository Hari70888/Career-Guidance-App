import React from 'react';
import { GraduationCap } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-indigo-400" />
              <span className="ml-2 text-xl font-bold text-white">CareerGuide</span>
            </div>
            <p className="text-gray-300 text-base">
              Empowering students to make informed career decisions through structured guidance and resources.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Solutions</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a href="#" className="text-base text-gray-300 hover:text-white">
                      Career Assessment
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-gray-300 hover:text-white">
                      Skill Development
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-gray-300 hover:text-white">
                      Industry Insights
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Support</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a href="#" className="text-base text-gray-300 hover:text-white">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-gray-300 hover:text-white">
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-gray-300 hover:text-white">
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-300 xl:text-center">
            &copy; 2025 CareerGuide. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;