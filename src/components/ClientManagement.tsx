import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  Phone, 
  Mail, 
  MapPin,
  Building,
  Star,
  Calendar,
  DollarSign
} from 'lucide-react';
import GlassCard from './GlassCard';
import AnimatedButton from './AnimatedButton';
import toast from 'react-hot-toast';

interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  projectsCount: number;
  totalValue: number;
  rating: number;
  lastProject: string;
  status: 'active' | 'inactive' | 'potential';
  avatar?: string;
}

export default function ClientManagement() {
  const [clients, setClients] = useState<Client[]>([
    {
      id: '1',
      name: 'أحمد محمد السعيد',
      company: 'شركة التطوير العقاري المتقدم',
      email: 'ahmed@realestate.com',
      phone: '+966501234567',
      address: 'حي النرجس، شارع الملك فهد',
      city: 'الرياض',
      projectsCount: 5,
      totalValue: 2500000,
      rating: 4.8,
      lastProject: '2024-01-10',
      status: 'active'
    },
    {
      id: '2',
      name: 'فاطمة علي الزهراني',
      company: 'مؤسسة البناء الحديث',
      email: 'fatima@modernbuild.com',
      phone: '+966502345678',
      address: 'حي الملقا، طريق الملك عبدالعزيز',
      city: 'الرياض',
      projectsCount: 3,
      totalValue: 1800000,
      rating: 4.5,
      lastProject: '2024-01-05',
      status: 'active'
    },
    {
      id: '3',
      name: 'خالد عبدالله القحطاني',
      company: 'شركة المشاريع الكبرى',
      email: 'khalid@bigprojects.com',
      phone: '+966503456789',
      address: 'حي العليا، شارع العروبة',
      city: 'الرياض',
      projectsCount: 8,
      totalValue: 4200000,
      rating: 4.9,
      lastProject: '2023-12-28',
      status: 'active'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'potential'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [newClient, setNewClient] = useState<Partial<Client>>({
    name: '',
    company: '',
    email: '',
    phone: '',
    address: '',
    city: 'الرياض',
    status: 'potential'
  });

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || client.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleAddClient = () => {
    if (!newClient.name || !newClient.email || !newClient.phone) {
      toast.error('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    const client: Client = {
      id: Date.now().toString(),
      name: newClient.name!,
      company: newClient.company || '',
      email: newClient.email!,
      phone: newClient.phone!,
      address: newClient.address || '',
      city: newClient.city || 'الرياض',
      projectsCount: 0,
      totalValue: 0,
      rating: 0,
      lastProject: '',
      status: newClient.status as 'active' | 'inactive' | 'potential' || 'potential'
    };

    setClients([...clients, client]);
    setNewClient({
      name: '',
      company: '',
      email: '',
      phone: '',
      address: '',
      city: 'الرياض',
      status: 'potential'
    });
    setShowAddModal(false);
    toast.success('تم إضافة العميل بنجاح');
  };

  const handleDeleteClient = (clientId: string) => {
    setClients(clients.filter(client => client.id !== clientId));
    toast.success('تم حذف العميل بنجاح');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'potential': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'inactive': return 'غير نشط';
      case 'potential': return 'محتمل';
      default: return 'غير محدد';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <Users className="w-8 h-8 mr-3 text-blue-600" />
            إدارة العملاء
          </h1>
          <p className="text-gray-600 mt-2">إدارة قاعدة بيانات العملاء والمشاريع</p>
        </div>
        
        <AnimatedButton
          onClick={() => setShowAddModal(true)}
          variant="primary"
          size="lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          إضافة عميل جديد
        </AnimatedButton>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">إجمالي العملاء</p>
              <p className="text-3xl font-bold text-blue-600">{clients.length}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">العملاء النشطون</p>
              <p className="text-3xl font-bold text-green-600">
                {clients.filter(c => c.status === 'active').length}
              </p>
            </div>
            <Star className="w-8 h-8 text-green-600" />
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">إجمالي القيمة</p>
              <p className="text-3xl font-bold text-purple-600">
                {clients.reduce((sum, client) => sum + client.totalValue, 0).toLocaleString()}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-purple-600" />
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">متوسط التقييم</p>
              <p className="text-3xl font-bold text-yellow-600">
                {(clients.reduce((sum, client) => sum + client.rating, 0) / clients.length).toFixed(1)}
              </p>
            </div>
            <Star className="w-8 h-8 text-yellow-600" />
          </div>
        </GlassCard>
      </div>

      {/* Search and Filter */}
      <GlassCard className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="البحث عن عميل..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              dir="rtl"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-4 py-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            dir="rtl"
          >
            <option value="all">جميع الحالات</option>
            <option value="active">نشط</option>
            <option value="inactive">غير نشط</option>
            <option value="potential">محتمل</option>
          </select>
        </div>
      </GlassCard>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredClients.map((client) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <GlassCard className="p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {client.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{client.name}</h3>
                      <p className="text-sm text-gray-600">{client.company}</p>
                    </div>
                  </div>
                  
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                    {getStatusText(client.status)}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    {client.email}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    {client.phone}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    {client.city}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-lg font-bold text-blue-600">{client.projectsCount}</p>
                    <p className="text-xs text-gray-600">مشروع</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-green-600">{client.totalValue.toLocaleString()}</p>
                    <p className="text-xs text-gray-600">ريال</p>
                  </div>
                </div>

                {client.rating > 0 && (
                  <div className="flex items-center justify-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(client.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">{client.rating}</span>
                    </div>
                  </div>
                )}

                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingClient(client)}
                    className="flex-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium flex items-center justify-center"
                  >
                    <Edit3 className="w-4 h-4 mr-1" />
                    تعديل
                  </button>
                  <button
                    onClick={() => handleDeleteClient(client.id)}
                    className="flex-1 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium flex items-center justify-center"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    حذف
                  </button>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add Client Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-6">إضافة عميل جديد</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الاسم *</label>
                  <input
                    type="text"
                    value={newClient.name || ''}
                    onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    dir="rtl"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الشركة</label>
                  <input
                    type="text"
                    value={newClient.company || ''}
                    onChange={(e) => setNewClient({ ...newClient, company: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    dir="rtl"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني *</label>
                  <input
                    type="email"
                    value={newClient.email || ''}
                    onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    dir="ltr"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف *</label>
                  <input
                    type="tel"
                    value={newClient.phone || ''}
                    onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    dir="ltr"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">العنوان</label>
                  <input
                    type="text"
                    value={newClient.address || ''}
                    onChange={(e) => setNewClient({ ...newClient, address: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    dir="rtl"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">المدينة</label>
                  <select
                    value={newClient.city || 'الرياض'}
                    onChange={(e) => setNewClient({ ...newClient, city: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    dir="rtl"
                  >
                    <option value="الرياض">الرياض</option>
                    <option value="جدة">جدة</option>
                    <option value="الدمام">الدمام</option>
                    <option value="المدينة المنورة">المدينة المنورة</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الحالة</label>
                  <select
                    value={newClient.status || 'potential'}
                    onChange={(e) => setNewClient({ ...newClient, status: e.target.value as any })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    dir="rtl"
                  >
                    <option value="potential">محتمل</option>
                    <option value="active">نشط</option>
                    <option value="inactive">غير نشط</option>
                  </select>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <AnimatedButton
                  onClick={handleAddClient}
                  variant="primary"
                  size="md"
                  className="flex-1"
                >
                  إضافة العميل
                </AnimatedButton>
                <AnimatedButton
                  onClick={() => setShowAddModal(false)}
                  variant="secondary"
                  size="md"
                  className="flex-1"
                >
                  إلغاء
                </AnimatedButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}