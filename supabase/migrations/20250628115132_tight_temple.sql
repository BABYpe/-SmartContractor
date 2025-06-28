/*
  # إنشاء قاعدة البيانات الشاملة لمنصة SmartContractor Pro

  1. جداول المستخدمين والمصادقة
    - `user_profiles` - ملفات المستخدمين التفصيلية

  2. جداول المشاريع
    - `projects` - المشاريع الأساسية
    - `project_details` - تفاصيل المشاريع
    - `project_boq_items` - بنود جدول الكميات
    - `project_cost_breakdown` - تفصيل التكاليف
    - `project_payment_milestones` - مراحل الدفع

  3. جداول التقارير والقوالب
    - `project_reports` - التقارير المولدة
    - `project_templates` - قوالب المشاريع
    - `saved_calculations` - الحسابات المحفوظة

  4. جداول النظام
    - `system_settings` - إعدادات النظام
    - `audit_logs` - سجلات التدقيق
    - `market_data` - بيانات السوق
*/

-- إنشاء جدول المستخدمين المخصص
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  company_name text,
  phone text,
  city text,
  subscription_type text DEFAULT 'free' CHECK (subscription_type IN ('free', 'basic', 'premium', 'enterprise')),
  subscription_expires_at timestamptz,
  is_active boolean DEFAULT true,
  preferences jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- إنشاء جدول المشاريع
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  project_type text NOT NULL,
  city text NOT NULL,
  area numeric NOT NULL CHECK (area > 0),
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'in_progress', 'completed', 'archived')),
  estimated_cost numeric,
  actual_cost numeric,
  profit_margin numeric DEFAULT 15,
  waste_percentage numeric DEFAULT 5,
  start_date date,
  end_date date,
  client_name text,
  client_email text,
  client_phone text,
  is_template boolean DEFAULT false,
  template_name text,
  tags text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- إنشاء جدول تفاصيل المشاريع
CREATE TABLE IF NOT EXISTS project_details (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  company_name text,
  company_logo text,
  project_date date,
  engineering_drawings text,
  specifications jsonb DEFAULT '{}',
  requirements text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- إنشاء جدول بنود جدول الكميات
CREATE TABLE IF NOT EXISTS project_boq_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  item_name text NOT NULL,
  quantity numeric NOT NULL CHECK (quantity > 0),
  unit text NOT NULL,
  unit_price numeric,
  total_price numeric,
  specifications text,
  labor_hours numeric DEFAULT 0,
  source text DEFAULT 'manual' CHECK (source IN ('manual', 'ai', 'database', 'pdf')),
  category text,
  subcategory text,
  priority text DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'critical')),
  is_verified boolean DEFAULT false,
  confidence_score numeric CHECK (confidence_score >= 0 AND confidence_score <= 1),
  market_price_data jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- إنشاء جدول تفصيل التكاليف
CREATE TABLE IF NOT EXISTS project_cost_breakdown (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  category text NOT NULL,
  cost numeric NOT NULL CHECK (cost >= 0),
  percentage numeric,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- إنشاء جدول مراحل الدفع
CREATE TABLE IF NOT EXISTS project_payment_milestones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  milestone_name text NOT NULL,
  percentage numeric NOT NULL CHECK (percentage > 0 AND percentage <= 100),
  amount numeric,
  due_date date,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue')),
  description text,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- إنشاء جدول التقارير
CREATE TABLE IF NOT EXISTS project_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  report_type text NOT NULL CHECK (report_type IN ('technical', 'financial', 'risk', 'optimization', 'workforce', 'duration', 'summary')),
  title text NOT NULL,
  content text NOT NULL,
  metadata jsonb DEFAULT '{}',
  file_url text,
  is_public boolean DEFAULT false,
  generated_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- إنشاء جدول قوالب المشاريع
CREATE TABLE IF NOT EXISTS project_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  category text NOT NULL,
  project_type text NOT NULL,
  is_public boolean DEFAULT false,
  is_featured boolean DEFAULT false,
  template_data jsonb NOT NULL,
  usage_count integer DEFAULT 0,
  rating numeric DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  rating_count integer DEFAULT 0,
  tags text[],
  thumbnail_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- إنشاء جدول الحسابات المحفوظة
CREATE TABLE IF NOT EXISTS saved_calculations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  calculation_type text NOT NULL,
  input_data jsonb NOT NULL,
  result_data jsonb NOT NULL,
  notes text,
  is_favorite boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- إنشاء جدول إعدادات النظام
CREATE TABLE IF NOT EXISTS system_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  setting_key text NOT NULL,
  setting_value jsonb NOT NULL,
  is_global boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, setting_key)
);

-- إنشاء جدول سجلات التدقيق
CREATE TABLE IF NOT EXISTS audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  action text NOT NULL,
  resource_type text NOT NULL,
  resource_id uuid,
  old_data jsonb,
  new_data jsonb,
  ip_address inet,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- إنشاء جدول بيانات السوق
CREATE TABLE IF NOT EXISTS market_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  item_code text NOT NULL,
  item_name text NOT NULL,
  category text NOT NULL,
  unit text NOT NULL,
  current_price numeric NOT NULL CHECK (current_price >= 0),
  previous_price numeric,
  price_change_percentage numeric,
  region text NOT NULL,
  supplier text,
  last_updated timestamptz DEFAULT now(),
  is_active boolean DEFAULT true,
  metadata jsonb DEFAULT '{}'
);

-- تفعيل RLS على جميع الجداول
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_boq_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_cost_breakdown ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_payment_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_calculations ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE market_data ENABLE ROW LEVEL SECURITY;

-- سياسات الأمان للمستخدمين
CREATE POLICY "Users can read own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- سياسات الأمان للمشاريع
CREATE POLICY "Users can read own projects"
  ON projects
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create projects"
  ON projects
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projects"
  ON projects
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own projects"
  ON projects
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- سياسات الأمان لتفاصيل المشاريع
CREATE POLICY "Users can read own project details"
  ON project_details
  FOR SELECT
  TO authenticated
  USING (
    project_id IN (
      SELECT id FROM projects WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage own project details"
  ON project_details
  FOR ALL
  TO authenticated
  USING (
    project_id IN (
      SELECT id FROM projects WHERE user_id = auth.uid()
    )
  );

-- سياسات الأمان لبنود BOQ
CREATE POLICY "Users can manage own project BOQ items"
  ON project_boq_items
  FOR ALL
  TO authenticated
  USING (
    project_id IN (
      SELECT id FROM projects WHERE user_id = auth.uid()
    )
  );

-- سياسات الأمان لتفصيل التكاليف
CREATE POLICY "Users can manage own project cost breakdown"
  ON project_cost_breakdown
  FOR ALL
  TO authenticated
  USING (
    project_id IN (
      SELECT id FROM projects WHERE user_id = auth.uid()
    )
  );

-- سياسات الأمان لمراحل الدفع
CREATE POLICY "Users can manage own project payment milestones"
  ON project_payment_milestones
  FOR ALL
  TO authenticated
  USING (
    project_id IN (
      SELECT id FROM projects WHERE user_id = auth.uid()
    )
  );

-- سياسات الأمان للتقارير
CREATE POLICY "Users can read own reports"
  ON project_reports
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR is_public = true);

CREATE POLICY "Users can create reports"
  ON project_reports
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reports"
  ON project_reports
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- سياسات الأمان للقوالب
CREATE POLICY "Users can read public templates"
  ON project_templates
  FOR SELECT
  TO authenticated
  USING (is_public = true OR auth.uid() = user_id);

CREATE POLICY "Users can create templates"
  ON project_templates
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own templates"
  ON project_templates
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- سياسات الأمان للحسابات المحفوظة
CREATE POLICY "Users can manage own calculations"
  ON saved_calculations
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- سياسات الأمان للإعدادات
CREATE POLICY "Users can manage own settings"
  ON system_settings
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id OR is_global = true);

-- سياسات الأمان لسجلات التدقيق
CREATE POLICY "Users can read own audit logs"
  ON audit_logs
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- سياسات الأمان لبيانات السوق
CREATE POLICY "All users can read market data"
  ON market_data
  FOR SELECT
  TO authenticated
  USING (is_active = true);

-- إنشاء الفهارس لتحسين الأداء
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_project_type ON projects(project_type);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_project_boq_items_project_id ON project_boq_items(project_id);
CREATE INDEX IF NOT EXISTS idx_project_boq_items_category ON project_boq_items(category);
CREATE INDEX IF NOT EXISTS idx_project_cost_breakdown_project_id ON project_cost_breakdown(project_id);
CREATE INDEX IF NOT EXISTS idx_project_payment_milestones_project_id ON project_payment_milestones(project_id);
CREATE INDEX IF NOT EXISTS idx_project_reports_project_id ON project_reports(project_id);
CREATE INDEX IF NOT EXISTS idx_project_reports_user_id ON project_reports(user_id);
CREATE INDEX IF NOT EXISTS idx_project_reports_type ON project_reports(report_type);
CREATE INDEX IF NOT EXISTS idx_project_templates_category ON project_templates(category);
CREATE INDEX IF NOT EXISTS idx_project_templates_public ON project_templates(is_public);
CREATE INDEX IF NOT EXISTS idx_saved_calculations_user_id ON saved_calculations(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_calculations_project_id ON saved_calculations(project_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_market_data_item_code ON market_data(item_code);
CREATE INDEX IF NOT EXISTS idx_market_data_category ON market_data(category);
CREATE INDEX IF NOT EXISTS idx_market_data_region ON market_data(region);

-- إنشاء دوال مساعدة
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- دالة لحساب total_price تلقائياً
CREATE OR REPLACE FUNCTION calculate_total_price()
RETURNS TRIGGER AS $$
BEGIN
  NEW.total_price = NEW.quantity * COALESCE(NEW.unit_price, 0);
  RETURN NEW;
END;
$$ language 'plpgsql';

-- دالة لحساب النسبة المئوية للتكاليف
CREATE OR REPLACE FUNCTION calculate_cost_percentage()
RETURNS TRIGGER AS $$
DECLARE
  total_cost numeric;
BEGIN
  SELECT SUM(cost) INTO total_cost 
  FROM project_cost_breakdown 
  WHERE project_id = NEW.project_id;
  
  IF total_cost > 0 THEN
    NEW.percentage = (NEW.cost * 100.0) / total_cost;
  ELSE
    NEW.percentage = 0;
  END IF;
  
  RETURN NEW;
END;
$$ language 'plpgsql';

-- إضافة triggers لتحديث updated_at تلقائياً
CREATE TRIGGER update_user_profiles_updated_at 
  BEFORE UPDATE ON user_profiles 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at 
  BEFORE UPDATE ON projects 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_project_details_updated_at 
  BEFORE UPDATE ON project_details 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_project_boq_items_updated_at 
  BEFORE UPDATE ON project_boq_items 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER calculate_boq_total_price 
  BEFORE INSERT OR UPDATE ON project_boq_items 
  FOR EACH ROW EXECUTE FUNCTION calculate_total_price();

CREATE TRIGGER update_project_cost_breakdown_updated_at 
  BEFORE UPDATE ON project_cost_breakdown 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER calculate_breakdown_percentage 
  BEFORE INSERT OR UPDATE ON project_cost_breakdown 
  FOR EACH ROW EXECUTE FUNCTION calculate_cost_percentage();

CREATE TRIGGER update_project_payment_milestones_updated_at 
  BEFORE UPDATE ON project_payment_milestones 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_project_templates_updated_at 
  BEFORE UPDATE ON project_templates 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_saved_calculations_updated_at 
  BEFORE UPDATE ON saved_calculations 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_system_settings_updated_at 
  BEFORE UPDATE ON system_settings 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- إدراج بيانات السوق الأساسية
INSERT INTO market_data (item_code, item_name, category, unit, current_price, region) VALUES
('CON001', 'خرسانة مسلحة درجة 25', 'أعمال إنشائية', 'متر مكعب', 285, 'riyadh'),
('STL001', 'حديد تسليح قطر 12 مم', 'أعمال إنشائية', 'طن', 2750, 'riyadh'),
('EXC001', 'حفر أساسات عادية', 'أعمال إنشائية', 'متر مكعب', 47, 'riyadh'),
('MAS001', 'بناء جدران بلوك أسمنتي 20 سم', 'أعمال إنشائية', 'متر مربع', 87, 'riyadh'),
('TIL001', 'تركيب بلاط سيراميك 60×60', 'أعمال التشطيبات', 'متر مربع', 98, 'riyadh'),
('PNT001', 'دهان جدران داخلي 3 طبقات', 'أعمال التشطيبات', 'متر مربع', 33, 'riyadh'),
('ELE001', 'تركيب نقطة إنارة مع مفتاح ومقبس', 'أعمال كهروميكانيكية', 'نقطة', 47, 'riyadh'),
('PLB001', 'تمديد أنابيب مياه PPR 20 مم', 'أعمال كهروميكانيكية', 'متر طولي', 25, 'riyadh'),
('INS001', 'عزل مائي للأسطح برولات البيتومين', 'أعمال التشطيبات', 'متر مربع', 32, 'riyadh')
ON CONFLICT DO NOTHING;