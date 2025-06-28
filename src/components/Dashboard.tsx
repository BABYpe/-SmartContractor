import React from 'react';
import SmartDashboard from './SmartDashboard';

interface DashboardProps {
  lang: string;
  t: any;
}

export default function Dashboard({ lang, t }: DashboardProps) {
  return <SmartDashboard lang={lang as 'ar' | 'en'} />;
}