import React from 'react';
import { motion } from 'framer-motion';

const jobOpportunities = [
  { id: 1, title: 'Software Engineer', company: 'Tech Corp', location: 'Bangalore, India', sector: 'IT' },
  { id: 2, title: 'Data Scientist', company: 'Data Inc.', location: 'Hyderabad, India', sector: 'IT' },
  { id: 3, title: 'Product Manager', company: 'Product Co.', location: 'Mumbai, India', sector: 'IT' },
  { id: 4, title: 'UX Designer', company: 'Design Studio', location: 'Pune, India', sector: 'Design' },
  { id: 5, title: 'Marketing Specialist', company: 'Marketing Experts', location: 'Delhi, India', sector: 'Marketing' },
  { id: 6, title: 'Sales Manager', company: 'Sales Solutions', location: 'Chennai, India', sector: 'Sales' },
  { id: 7, title: 'Business Analyst', company: 'Business Insights', location: 'Kolkata, India', sector: 'Business' },
  { id: 8, title: 'HR Manager', company: 'HR Hub', location: 'Ahmedabad, India', sector: 'Human Resources' },
  { id: 9, title: 'Financial Analyst', company: 'Finance Pros', location: 'Jaipur, India', sector: 'Finance' },
  { id: 10, title: 'Operations Manager', company: 'Operations Inc.', location: 'Surat, India', sector: 'Operations' },
  { id: 11, title: 'Graphic Designer', company: 'Creative Minds', location: 'Bangalore, India', sector: 'Design' },
  { id: 12, title: 'Content Writer', company: 'Content Creators', location: 'Hyderabad, India', sector: 'Content' },
  { id: 13, title: 'Customer Support Specialist', company: 'Support Solutions', location: 'Mumbai, India', sector: 'Customer Support' },
  { id: 14, title: 'IT Support Technician', company: 'Tech Support', location: 'Pune, India', sector: 'IT' },
  { id: 15, title: 'Project Manager', company: 'Project Pros', location: 'Delhi, India', sector: 'Project Management' },
  { id: 16, title: 'DevOps Engineer', company: 'DevOps Solutions', location: 'Chennai, India', sector: 'IT' },
  { id: 17, title: 'Cybersecurity Analyst', company: 'Security Experts', location: 'Kolkata, India', sector: 'IT' },
  { id: 18, title: 'Cloud Engineer', company: 'Cloud Services', location: 'Ahmedabad, India', sector: 'IT' },
  { id: 19, title: 'AI Researcher', company: 'AI Innovations', location: 'Jaipur, India', sector: 'IT' },
  { id: 20, title: 'Mobile App Developer', company: 'App Creators', location: 'Surat, India', sector: 'IT' },
  { id: 21, title: 'Network Engineer', company: 'Network Solutions', location: 'Bangalore, India', sector: 'IT' },
  { id: 22, title: 'Database Administrator', company: 'Data Management', location: 'Hyderabad, India', sector: 'IT' },
  { id: 23, title: 'Quality Assurance Engineer', company: 'QA Experts', location: 'Mumbai, India', sector: 'IT' },
  { id: 24, title: 'Systems Analyst', company: 'System Solutions', location: 'Pune, India', sector: 'IT' },
  { id: 25, title: 'Technical Writer', company: 'Tech Writers', location: 'Delhi, India', sector: 'Content' },
  { id: 26, title: 'SEO Specialist', company: 'SEO Pros', location: 'Chennai, India', sector: 'Marketing' },
  { id: 27, title: 'Social Media Manager', company: 'Social Media Experts', location: 'Kolkata, India', sector: 'Marketing' },
  { id: 28, title: 'Digital Marketing Manager', company: 'Digital Marketing Co.', location: 'Ahmedabad, India', sector: 'Marketing' },
  { id: 29, title: 'E-commerce Manager', company: 'E-commerce Solutions', location: 'Jaipur, India', sector: 'E-commerce' },
  { id: 30, title: 'Supply Chain Manager', company: 'Supply Chain Co.', location: 'Surat, India', sector: 'Operations' },
  { id: 31, title: 'Logistics Coordinator', company: 'Logistics Solutions', location: 'Bangalore, India', sector: 'Operations' },
  { id: 32, title: 'Procurement Manager', company: 'Procurement Pros', location: 'Hyderabad, India', sector: 'Operations' },
  { id: 33, title: 'Warehouse Manager', company: 'Warehouse Solutions', location: 'Mumbai, India', sector: 'Operations' },
  { id: 34, title: 'Manufacturing Engineer', company: 'Manufacturing Co.', location: 'Pune, India', sector: 'Manufacturing' },
  { id: 35, title: 'Mechanical Engineer', company: 'Mechanical Solutions', location: 'Delhi, India', sector: 'Engineering' },
  { id: 36, title: 'Electrical Engineer', company: 'Electrical Co.', location: 'Chennai, India', sector: 'Engineering' },
  { id: 37, title: 'Civil Engineer', company: 'Civil Solutions', location: 'Kolkata, India', sector: 'Engineering' },
  { id: 38, title: 'Chemical Engineer', company: 'Chemical Co.', location: 'Ahmedabad, India', sector: 'Engineering' },
  { id: 39, title: 'Biomedical Engineer', company: 'Biomedical Innovations', location: 'Jaipur, India', sector: 'Engineering' },
  { id: 40, title: 'Environmental Engineer', company: 'Environmental Solutions', location: 'Surat, India', sector: 'Engineering' },
  { id: 41, title: 'Research Scientist', company: 'Research Co.', location: 'Bangalore, India', sector: 'Research' },
  { id: 42, title: 'Lab Technician', company: 'Lab Solutions', location: 'Hyderabad, India', sector: 'Research' },
  { id: 43, title: 'Clinical Research Coordinator', company: 'Clinical Research Co.', location: 'Mumbai, India', sector: 'Research' },
  { id: 44, title: 'Pharmaceutical Sales Representative', company: 'Pharma Sales', location: 'Pune, India', sector: 'Sales' },
  { id: 45, title: 'Medical Device Sales Representative', company: 'Medical Sales', location: 'Delhi, India', sector: 'Sales' },
  { id: 46, title: 'Healthcare Administrator', company: 'Healthcare Solutions', location: 'Chennai, India', sector: 'Healthcare' },
  { id: 47, title: 'Nurse', company: 'Nursing Co.', location: 'Kolkata, India', sector: 'Healthcare' },
  { id: 48, title: 'Physician Assistant', company: 'Medical Co.', location: 'Ahmedabad, India', sector: 'Healthcare' },
  { id: 49, title: 'Pharmacist', company: 'Pharmacy Co.', location: 'Jaipur, India', sector: 'Healthcare' },
  { id: 50, title: 'Dentist', company: 'Dental Solutions', location: 'Surat, India', sector: 'Healthcare' },
];

const JobOpportunities = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="relative bg-indigo-600 text-white py-12 px-4 sm:px-6 lg:px-8 mb-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold text-center">Job Opportunities</h1>
        <p className="mt-4 text-center text-lg">Explore a wide range of career opportunities across various sectors within India.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {jobOpportunities.map(job => (
          <motion.div
            key={job.id}
            className="p-6 bg-white rounded-lg shadow-md transition-shadow duration-300 hover:bg-indigo-100"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
            <p className="text-gray-600">{job.company}</p>
            <p className="text-gray-600">{job.location}</p>
            <p className="text-gray-600">{job.sector}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default JobOpportunities;