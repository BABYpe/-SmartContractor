import React from 'react';
import SmartProjectTemplates from './SmartProjectTemplates';
import type { Language } from '../types';

interface ProjectTemplatesProps {
  lang: Language;
  t: any;
}

export default function ProjectTemplates({ lang, t }: ProjectTemplatesProps) {
  return <SmartProjectTemplates lang={lang} />;
}