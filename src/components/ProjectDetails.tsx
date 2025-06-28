import React from 'react';
import { motion } from 'framer-motion';
import { Building, Calendar, FileText, ImageIcon } from 'lucide-react';
import GlassCard from './GlassCard';
import type { ProjectDetails as ProjectDetailsType, Language } from '../types';

interface ProjectDetailsProps {
  projectDetails: ProjectDetailsType;
  setProjectDetails: (details: ProjectDetailsType) => void;
  lang: Language;
  t: any;
}

export default function ProjectDetails({
  projectDetails,
  setProjectDetails,
  lang,
  t
}: ProjectDetailsProps) {
  return (
    <GlassCard gradient="from-gray-500/20 to-slate-500/10" className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center mb-6">
          <Building className="w-8 h-8 text-gray-600 mr-3" />
          <h2 className="text-3xl font-bold text-gray-800">{t.projectDetails}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col">
            <label htmlFor="companyName" className="text-gray-700 font-medium mb-2 flex items-center">
              <Building className="w-4 h-4 mr-2" />
              {t.companyName}
            </label>
            <input
              type="text"
              id="companyName"
              value={projectDetails.companyName}
              onChange={(e) => setProjectDetails({ ...projectDetails, companyName: e.target.value })}
              placeholder={t.companyNamePlaceholder}
              className="w-full p-4 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200"
              dir={lang === 'ar' ? 'rtl' : 'ltr'}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="companyLogo" className="text-gray-700 font-medium mb-2 flex items-center">
              <ImageIcon className="w-4 h-4 mr-2" />
              {t.companyLogo}
            </label>
            <input
              type="url"
              id="companyLogo"
              value={projectDetails.companyLogo}
              onChange={(e) => setProjectDetails({ ...projectDetails, companyLogo: e.target.value })}
              placeholder={t.companyLogoPlaceholder}
              className="w-full p-4 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200"
              dir="ltr"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="projectDate" className="text-gray-700 font-medium mb-2 flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {t.projectDate}
            </label>
            <input
              type="date"
              id="projectDate"
              value={projectDetails.projectDate}
              onChange={(e) => setProjectDetails({ ...projectDetails, projectDate: e.target.value })}
              className="w-full p-4 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200"
              dir="ltr"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="engineeringDrawings" className="text-gray-700 font-medium mb-2 flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              {t.engineeringDrawings}
            </label>
            <textarea
              id="engineeringDrawings"
              value={projectDetails.engineeringDrawings}
              onChange={(e) => setProjectDetails({ ...projectDetails, engineeringDrawings: e.target.value })}
              placeholder={t.engineeringDrawingsPlaceholder}
              rows={3}
              className="w-full p-4 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 resize-none"
              dir={lang === 'ar' ? 'rtl' : 'ltr'}
            />
          </div>
        </div>

        {projectDetails.companyLogo && (
          <motion.div 
            className="mt-6 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block p-4 bg-white/30 backdrop-blur-sm rounded-2xl border border-white/40 shadow-lg">
              <img 
                src={projectDetails.companyLogo} 
                alt="Company Logo" 
                className="max-h-20 mx-auto rounded-lg shadow-md" 
                onError={(e) => {
                  e.currentTarget.src = 'https://placehold.co/100x50/DDDDDD/666666?text=شعار+غير+موجود';
                }} 
              />
            </div>
          </motion.div>
        )}
      </motion.div>
    </GlassCard>
  );
}