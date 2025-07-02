import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  Eye, 
  Phone, 
  Mail, 
  Building, 
  MapPin,
  Calendar,
  DollarSign,
  TrendingUp,
  Star,
  MoreVertical,
  Download,
  Upload,
  UserPlus,
  MessageCircle,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3
} from 'lucide-react';
import GlassCard from './GlassCard';
import AnimatedButton from './AnimatedButton';
import toast from 'react-hot-toast';
import type { Language } from '../types';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  city: string;
  avatar?: string;
  status: 'active' | 'inactive' | 'potential';
  rating: number;
  totalProjects: number;
  totalValue: number;
  lastContact: string;
  notes: string;
  tags: string[];
  createdAt: string;
  projects: {
    id: string;
    name: string;
    status: 'planning' | 'in_progress' | 'completed' | 'on_hold';
    value: number;
    startDate: string;
    endDate?: string;
  }[];
}

interface ClientManagementProps {
  lang: Language;
  t: any;
}

export default function ClientManagement({ lang, t }: ClientManagementProps) {
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'potential'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'totalValue' | 'lastContact' | 'rating'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Sample data
  useEffect(() => {
    const sampleClients: Client[] = [
      {
        id: '1',
        name: 'أحمد محمد السعيد',
        email: 'ahmed@example.com',
        phone: '+966501234567',
        company: 'شركة التطوير العقاري',
        address: 'حي الملك فهد، الرياض',
        city: 'الرياض',
        status: 'active',
        rating: 4.8,
        totalProjects: 5,
        totalValue: 2500000,
        lastContact: '2024-01-15',
        notes: 'عميل مميز، يفضل التواصل عبر الهاتف',
        tags: ['VIP', 'عقاري', 'مقاول رئيسي'],
        createdAt: '2023-06-15',
        projects: [
          {
            id: 'p1',
            name: 'مجمع سكني - الرياض',
            status: 'in_progress',
            value: 1200000,
            startDate: '2024-01-01',
            endDate: '2024-06-30'
          },
          {
            id: 'p2',
            name: 'فيلا خاصة',
            status: 'completed',
            value: 800000,
            startDate: '2023-08-01',
            endDate: '2023-12-15'
          }
        ]
      },
      {
        id: '2',
        name: 'فاطمة عبدالله',
        email: 'fatima@company.com',
        phone: '+966507654321',
        company: 'مؤسسة البناء الحديث',
        address: 'حي النزهة، جدة',
        city: 'جدة',
        status: 'active',
        rating: 4.5,
        totalProjects: 3,
        totalValue: 1800000,
        lastContact: '2024-01-10',
        notes: 'تركز على المشاريع التجارية',
        tags: ['تجاري', 'مقاول'],
        createdAt: '2023-09-20',
        projects: [
          {
            id: 'p3',
            name: 'مركز تجاري',
            status: 'planning',
            value: 1500000,
            startDate: '2024-03-01'
          }
        ]
      },
      {
        id: '3',
        name: 'محمد علي الشمري',
        email: 'mohammed@email.com',
        phone: '+966509876543',
        company: 'شركة الإنشاءات المتقدمة',
        address: 'حي الفيصلية، الدمام',
        city: 'الدمام',
        status: 'potential',
        rating: 0,
        totalProjects: 0,
        totalValue: 0,
        lastContact: '2024-01-05',
        notes: 'عميل محتمل، مهتم بالمشاريع الصناعية',
        tags: ['محتمل', 'صناعي'],
        createdAt: '2024-01-05',
        projects: []
      }
    ];

    setTimeout(() => {
      setClients(sampleClients);
      setFilteredClients(sampleClients);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter and sort clients
  useEffect(() => {
    let filtered = clients.filter(client => {
      const matchesSearch = searchTerm === '' || 
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.company.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });

    // Sort clients
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'totalValue':
          aValue = a.totalValue;
          bValue = b.totalValue;
          break;
        case 'lastContact':
          aValue = new Date(a.lastContact).getTime();
          bValue = new Date(b.lastContact).getTime();
          break;
        case 'rating':
          aValue = a.rating;
          bValue = b.rating;
          break;
        default:
          aValue = a.name;
          bValue = b.name;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredClients(filtered);
  }, [clients, searchTerm, statusFilter, sortBy, sortOrder]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'potential': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return lang === 'ar' ? 'نشط' : 'Active';
      case 'inactive': return lang === 'ar' ? 'غير نشط' : 'Inactive';
      case 'potential': return lang === 'ar' ? 'محتمل' : 'Potential';
      default: return status;
    }
  };

  const getProjectStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-orange-100 text-orange-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'on_hold': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProjectStatusLabel = (status: string) => {
    switch (status) {
      case 'planning': return lang === 'ar' ? 'تخطيط' : 'Planning';
      case 'in_progress': return lang === 'ar' ? 'قيد التنفيذ' : 'In Progress';
      case 'completed': return lang === 'ar' ? 'مكتمل' : 'Completed';
      case 'on_hold': return lang === 'ar' ? 'متوقف' : 'On Hold';
      default: return status;
    }
  };

  const handleDeleteClient = (clientId: string) => {
    if (window.confirm(lang === 'ar' ? 'هل تريد حذف هذا العميل؟' : 'Delete this client?')) {
      setClients(prev => prev.filter(c => c.id !== clientId));
      toast.success(lang === 'ar' ? 'تم حذف العميل' : 'Client deleted');
    }
  };

  const exportClients = () => {
    const csvContent = [
      'Name,Email,Phone,Company,City,Status,Total Projects,Total Value',
      ...filteredClients.map(client => 
        `${client.name},${client.email},${client.phone},${client.company},${client.city},${client.status},${client.totalProjects},${client.totalValue}`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'clients-export.csv';
    link.click();
    URL.revokeObjectURL(url);
    toast.success(lang === 'ar' ? 'تم تصدير البيانات' : 'Data exported');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <motion.div
            className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Users className="w-8 h-8 text-white" />
          </motion.div>
          <p className="text-gray-600">جاري تحميل بيانات العملاء...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            <Users className="inline-block w-10 h-10 mr-3 text-blue-600" />
            {lang === 'ar' ? 'إدارة العملاء' : 'Client Management'}
          </h1>
          <p className="text-gray-600 text-lg mt-2">
            {lang === 'ar' 
              ? 'إدارة شاملة لقاعدة عملائك ومشاريعهم'
              : 'Comprehensive management of your client base and their projects'
            }
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <AnimatedButton
            onClick={exportClients}
            variant="secondary"
            size="md"
          >
            <Download className="w-4 h-4 mr-2" />
            {lang === 'ar' ? 'تصدير' : 'Export'}
          </AnimatedButton>
          
          <AnimatedButton
            onClick={() => setShowAddModal(true)}
            variant="primary"
            size="md"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            {lang === 'ar' ? 'عميل جديد' : 'New Client'}
          </AnimatedButton>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <GlassCard className="p-6 text-center">
          <Users className="w-8 h-8 text-blue-600 mx-auto mb-3" />
          <p className="text-2xl font-bold text-blue-600">{clients.length}</p>
          <p className="text-sm text-gray-600">{lang === 'ar' ? 'إجمالي العملاء' : 'Total Clients'}</p>
        </GlassCard>

        <GlassCard className="p-6 text-center">
          <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
          <p className="text-2xl font-bold text-green-600">
            {clients.filter(c => c.status === 'active').length}
          </p>
          <p className="text-sm text-gray-600">{lang === 'ar' ? 'عملاء نشطون' : 'Active Clients'}</p>
        </GlassCard>

        <GlassCard className="p-6 text-center">
          <DollarSign className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
          <p className="text-2xl font-bold text-emerald-600">
            {clients.reduce((sum, c) => sum + c.totalValue, 0).toLocaleString()}
          </p>
          <p className="text-sm text-gray-600">{lang === 'ar' ? 'إجمالي القيمة' : 'Total Value'}</p>
        </GlassCard>

        <GlassCard className="p-6 text-center">
          <BarChart3 className="w-8 h-8 text-purple-600 mx-auto mb-3" />
          <p className="text-2xl font-bold text-purple-600">
            {clients.reduce((sum, c) => sum + c.totalProjects, 0)}
          </p>
          <p className="text-sm text-gray-600">{lang === 'ar' ? 'إجمالي المشاريع' : 'Total Projects'}</p>
        </GlassCard>
      </div>

      {/* Search and Filters */}
      <GlassCard className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={lang === 'ar' ? 'البحث في العملاء...' : 'Search clients...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/50 border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              dir={lang === 'ar' ? 'rtl' : 'ltr'}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-4 py-3 bg-white/50 border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500"
            dir={lang === 'ar' ? 'rtl' : 'ltr'}
          >
            <option value="all">{lang === 'ar' ? 'جميع الحالات' : 'All Status'}</option>
            <option value="active">{lang === 'ar' ? 'نشط' : 'Active'}</option>
            <option value="inactive">{lang === 'ar' ? 'غير نشط' : 'Inactive'}</option>
            <option value="potential">{lang === 'ar' ? 'محتمل' : 'Potential'}</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-3 bg-white/50 border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500"
            dir={lang === 'ar' ? 'rtl' : 'ltr'}
          >
            <option value="name">{lang === 'ar' ? 'الاسم' : 'Name'}</option>
            <option value="totalValue">{lang === 'ar' ? 'القيمة الإجمالية' : 'Total Value'}</option>
            <option value="lastContact">{lang === 'ar' ? 'آخر تواصل' : 'Last Contact'}</option>
            <option value="rating">{lang === 'ar' ? 'التقييم' : 'Rating'}</option>
          </select>

          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="px-4 py-3 bg-white/50 border border-white/30 rounded-xl hover:bg-white/60 transition-colors"
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </GlassCard>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredClients.map((client, index) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
            >
              <GlassCard className="p-6 hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {client.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                        {client.name}
                      </h3>
                      <p className="text-sm text-gray-600">{client.company}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                      {getStatusLabel(client.status)}
                    </span>
                    <div className="relative">
                      <button className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                        <MoreVertical className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    <span className="truncate">{client.email}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    <span>{client.phone}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{client.city}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-lg font-bold text-blue-600">{client.totalProjects}</p>
                    <p className="text-xs text-gray-600">{lang === 'ar' ? 'مشاريع' : 'Projects'}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-green-600">
                      {client.totalValue.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-600">{lang === 'ar' ? 'ريال' : 'SAR'}</p>
                  </div>
                </div>

                {client.rating > 0 && (
                  <div className="flex items-center justify-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(client.rating) 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">{client.rating}</span>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-white/20">
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    {lang === 'ar' ? 'آخر تواصل:' : 'Last contact:'} {new Date(client.lastContact).toLocaleDateString('ar-SA')}
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => {
                        setSelectedClient(client);
                        setShowDetailsModal(true);
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title={lang === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    
                    <button
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title={lang === 'ar' ? 'تواصل' : 'Contact'}
                    >
                      <MessageCircle className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => handleDeleteClient(client.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title={lang === 'ar' ? 'حذف' : 'Delete'}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredClients.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            {lang === 'ar' ? 'لا توجد عملاء' : 'No clients found'}
          </h3>
          <p className="text-gray-600 mb-6">
            {lang === 'ar' 
              ? 'ابدأ بإضافة عملائك لإدارة مشاريعهم بفعالية'
              : 'Start by adding clients to manage their projects effectively'
            }
          </p>
          <AnimatedButton
            onClick={() => setShowAddModal(true)}
            variant="primary"
            size="lg"
          >
            <UserPlus className="w-5 h-5 mr-2" />
            {lang === 'ar' ? 'إضافة عميل جديد' : 'Add New Client'}
          </AnimatedButton>
        </div>
      )}

      {/* Client Details Modal */}
      <AnimatePresence>
        {showDetailsModal && selectedClient && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowDetailsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {lang === 'ar' ? 'تفاصيل العميل' : 'Client Details'}
                </h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Client Info */}
                <div className="lg:col-span-1">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                      {selectedClient.name.charAt(0)}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">{selectedClient.name}</h3>
                    <p className="text-gray-600">{selectedClient.company}</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${getStatusColor(selectedClient.status)}`}>
                      {getStatusLabel(selectedClient.status)}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-gray-700">{selectedClient.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-gray-700">{selectedClient.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-gray-700">{selectedClient.address}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-gray-700">
                        {lang === 'ar' ? 'عميل منذ:' : 'Client since:'} {new Date(selectedClient.createdAt).toLocaleDateString('ar-SA')}
                      </span>
                    </div>
                  </div>

                  {selectedClient.notes && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">
                        {lang === 'ar' ? 'ملاحظات' : 'Notes'}
                      </h4>
                      <p className="text-sm text-gray-600">{selectedClient.notes}</p>
                    </div>
                  )}
                </div>

                {/* Projects */}
                <div className="lg:col-span-2">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">
                    {lang === 'ar' ? 'المشاريع' : 'Projects'} ({selectedClient.projects.length})
                  </h4>
                  
                  {selectedClient.projects.length > 0 ? (
                    <div className="space-y-4">
                      {selectedClient.projects.map((project) => (
                        <div key={project.id} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium text-gray-800">{project.name}</h5>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getProjectStatusColor(project.status)}`}>
                              {getProjectStatusLabel(project.status)}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                            <div>
                              <span className="font-medium">{lang === 'ar' ? 'القيمة:' : 'Value:'}</span>
                              <span className="ml-2">{project.value.toLocaleString()} {lang === 'ar' ? 'ريال' : 'SAR'}</span>
                            </div>
                            <div>
                              <span className="font-medium">{lang === 'ar' ? 'تاريخ البدء:' : 'Start Date:'}</span>
                              <span className="ml-2">{new Date(project.startDate).toLocaleDateString('ar-SA')}</span>
                            </div>
                            {project.endDate && (
                              <div>
                                <span className="font-medium">{lang === 'ar' ? 'تاريخ الانتهاء:' : 'End Date:'}</span>
                                <span className="ml-2">{new Date(project.endDate).toLocaleDateString('ar-SA')}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600">
                        {lang === 'ar' ? 'لا توجد مشاريع بعد' : 'No projects yet'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}