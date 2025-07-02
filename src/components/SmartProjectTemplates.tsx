import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Star, Download, Eye, Copy, Trash2, Edit3 } from 'lucide-react';
import type { Language } from '../types';

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  project_type: string;
  is_public: boolean;
  is_featured: boolean;
  usage_count: number;
  rating: number;
  rating_count: number;
  tags: string[];
  thumbnail_url?: string;
  created_at: string;
  template_data: any;
}

interface SmartProjectTemplatesProps {
  lang: Language;
}

export default function SmartProjectTemplates({ lang }: SmartProjectTemplatesProps) {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Mock data for demonstration
  useEffect(() => {
    const mockTemplates: Template[] = [
      {
        id: '1',
        name: 'Residential Building Template',
        description: 'Complete template for residential construction projects including BOQ items, cost breakdown, and payment milestones.',
        category: 'Construction',
        project_type: 'Residential',
        is_public: true,
        is_featured: true,
        usage_count: 245,
        rating: 4.8,
        rating_count: 32,
        tags: ['residential', 'construction', 'building'],
        created_at: '2024-01-15',
        template_data: {}
      },
      {
        id: '2',
        name: 'Commercial Office Complex',
        description: 'Template for large-scale commercial office construction with detailed specifications and cost analysis.',
        category: 'Construction',
        project_type: 'Commercial',
        is_public: true,
        is_featured: true,
        usage_count: 189,
        rating: 4.6,
        rating_count: 28,
        tags: ['commercial', 'office', 'complex'],
        created_at: '2024-01-20',
        template_data: {}
      },
      {
        id: '3',
        name: 'Road Infrastructure Project',
        description: 'Comprehensive template for road construction and infrastructure development projects.',
        category: 'Infrastructure',
        project_type: 'Roads',
        is_public: true,
        is_featured: false,
        usage_count: 156,
        rating: 4.5,
        rating_count: 22,
        tags: ['infrastructure', 'roads', 'transportation'],
        created_at: '2024-02-01',
        template_data: {}
      },
      {
        id: '4',
        name: 'Bridge Construction Template',
        description: 'Specialized template for bridge construction projects with engineering specifications.',
        category: 'Infrastructure',
        project_type: 'Bridges',
        is_public: true,
        is_featured: false,
        usage_count: 98,
        rating: 4.7,
        rating_count: 15,
        tags: ['infrastructure', 'bridges', 'engineering'],
        created_at: '2024-02-10',
        template_data: {}
      }
    ];

    setTimeout(() => {
      setTemplates(mockTemplates);
      setLoading(false);
    }, 1000);
  }, []);

  const categories = ['all', 'Construction', 'Infrastructure', 'Industrial', 'Renovation'];
  const projectTypes = ['all', 'Residential', 'Commercial', 'Roads', 'Bridges', 'Industrial'];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesType = selectedType === 'all' || template.project_type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const handleUseTemplate = (template: Template) => {
    // Implementation for using a template
    console.log('Using template:', template.name);
  };

  const handlePreviewTemplate = (template: Template) => {
    // Implementation for previewing a template
    console.log('Previewing template:', template.name);
  };

  const handleCopyTemplate = (template: Template) => {
    // Implementation for copying a template
    console.log('Copying template:', template.name);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Project Templates</h1>
          <p className="text-gray-600 mt-1">Choose from pre-built templates to accelerate your project setup</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create Template
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>

          {/* Project Type Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              {projectTypes.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Featured Templates */}
      {filteredTemplates.some(t => t.is_featured) && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Featured Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.filter(t => t.is_featured).map(template => (
              <TemplateCard
                key={template.id}
                template={template}
                onUse={handleUseTemplate}
                onPreview={handlePreviewTemplate}
                onCopy={handleCopyTemplate}
                featured
              />
            ))}
          </div>
        </div>
      )}

      {/* All Templates */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          All Templates ({filteredTemplates.length})
        </h2>
        {filteredTemplates.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">No templates found</div>
            <p className="text-gray-600">Try adjusting your search criteria or create a new template</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map(template => (
              <TemplateCard
                key={template.id}
                template={template}
                onUse={handleUseTemplate}
                onPreview={handlePreviewTemplate}
                onCopy={handleCopyTemplate}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface TemplateCardProps {
  template: Template;
  onUse: (template: Template) => void;
  onPreview: (template: Template) => void;
  onCopy: (template: Template) => void;
  featured?: boolean;
}

function TemplateCard({ template, onUse, onPreview, onCopy, featured }: TemplateCardProps) {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow ${featured ? 'ring-2 ring-blue-500' : ''}`}>
      {/* Template Image/Thumbnail */}
      <div className="h-48 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        {template.thumbnail_url ? (
          <img src={template.thumbnail_url} alt={template.name} className="w-full h-full object-cover" />
        ) : (
          <div className="text-blue-600 text-6xl font-bold opacity-20">
            {template.name.charAt(0)}
          </div>
        )}
        {featured && (
          <div className="absolute top-3 right-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <Star className="w-3 h-3" />
            Featured
          </div>
        )}
      </div>

      {/* Template Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{template.name}</h3>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{template.description}</p>

        {/* Template Meta */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span className="bg-gray-100 px-2 py-1 rounded">{template.project_type}</span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>{template.rating}</span>
              <span>({template.rating_count})</span>
            </div>
            <div className="flex items-center gap-1">
              <Download className="w-4 h-4" />
              <span>{template.usage_count}</span>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {template.tags.slice(0, 3).map(tag => (
            <span key={tag} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
              {tag}
            </span>
          ))}
          {template.tags.length > 3 && (
            <span className="text-gray-500 text-xs">+{template.tags.length - 3} more</span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => onUse(template)}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Use Template
          </button>
          <button
            onClick={() => onPreview(template)}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            title="Preview"
          >
            <Eye className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={() => onCopy(template)}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            title="Copy"
          >
            <Copy className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}