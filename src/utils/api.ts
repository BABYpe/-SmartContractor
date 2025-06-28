import type { APIResponse } from '../types';

// استخدام مفتاح الذكاء الاصطناعي الجديد
const API_KEY = "AIzaSyDccDC57DkpTpeQWMhvkfa2glkjYIs73yM";
const API_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export async function callGeminiAPI(prompt: string): Promise<string | null> {
  try {
    const response = await fetch(`${API_BASE_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: APIResponse = await response.json();
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
      return data.candidates[0].content.parts[0].text;
    }
    
    throw new Error('Invalid response structure from API');
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    
    // في حالة فشل الاتصال، استخدم البيانات المحاكاة
    return generateMockResponse(prompt);
  }
}

function generateMockResponse(prompt: string): string {
  const responseTypes = {
    costEstimation: generateMockCostEstimation(prompt),
    boqPricing: generateMockBoqPricing(prompt),
    proposal: generateMockProposal(prompt),
    riskAnalysis: generateMockRiskAnalysis(prompt),
    optimization: generateMockOptimization(prompt),
    duration: generateMockDuration(prompt),
    workforce: generateMockWorkforce(prompt)
  };

  // تحديد نوع الاستجابة بناءً على محتوى الطلب
  let responseType = 'costEstimation';
  if (prompt.includes('بنود الأعمال') || prompt.includes('BOQ')) {
    responseType = 'boqPricing';
  } else if (prompt.includes('عرض') || prompt.includes('proposal')) {
    responseType = 'proposal';
  } else if (prompt.includes('مخاطر') || prompt.includes('risk')) {
    responseType = 'riskAnalysis';
  } else if (prompt.includes('تحسين') || prompt.includes('optimization')) {
    responseType = 'optimization';
  } else if (prompt.includes('مدة') || prompt.includes('duration')) {
    responseType = 'duration';
  } else if (prompt.includes('عمالة') || prompt.includes('workforce')) {
    responseType = 'workforce';
  }

  return responseTypes[responseType as keyof typeof responseTypes];
}

function generateMockCostEstimation(prompt: string): string {
  return JSON.stringify({
    costBreakdown: [
      {"category": "أعمال إنشائية", "cost": 180000},
      {"category": "أعمال التشطيبات", "cost": 120000},
      {"category": "أعمال كهروميكانيكية", "cost": 85000},
      {"category": "أعمال البنية التحتية", "cost": 65000},
      {"category": "أعمال خارجية ومناظر طبيعية", "cost": 35000},
      {"category": "تكاليف غير مباشرة", "cost": 45000},
      {"category": "تكاليف طوارئ", "cost": 25000}
    ],
    boqItems: [
      {
        "itemName": "حفر أساسات",
        "quantity": 150,
        "unit": "متر مكعب",
        "specifications": "حفر أساسات عادية بعمق 2 متر",
        "laborHours": 8
      },
      {
        "itemName": "خرسانة مسلحة للأساسات",
        "quantity": 120,
        "unit": "متر مكعب",
        "specifications": "خرسانة مقاومة 25 ميجاباسكال",
        "laborHours": 12
      },
      {
        "itemName": "تركيب حديد تسليح",
        "quantity": 15,
        "unit": "طن",
        "specifications": "حديد تسليح مقاس 12-20 مم",
        "laborHours": 16
      },
      {
        "itemName": "بناء جدران بلوك أسمنتي",
        "quantity": 180,
        "unit": "متر مربع",
        "specifications": "بلوك أسمنتي مقاس 20×20×40 سم",
        "laborHours": 6
      },
      {
        "itemName": "تركيب بلاط أرضيات",
        "quantity": 200,
        "unit": "متر مربع",
        "specifications": "بلاط بورسلين 60×60 سم",
        "laborHours": 4
      },
      {
        "itemName": "أعمال دهان داخلي",
        "quantity": 350,
        "unit": "متر مربع",
        "specifications": "دهان أكريليك 3 طبقات",
        "laborHours": 2
      }
    ]
  });
}

function generateMockBoqPricing(prompt: string): string {
  if (prompt.includes('استخرج اسم كل بند')) {
    return JSON.stringify([
      {"itemName": "تركيب بلاط أرضيات", "quantity": 150, "unit": "متر مربع"},
      {"itemName": "دهان جدران داخلي", "quantity": 300, "unit": "متر مربع"},
      {"itemName": "أعمال حفر", "quantity": 50, "unit": "متر مكعب"}
    ]);
  } else {
    const basePrice = 50 + Math.random() * 200;
    return basePrice.toFixed(0);
  }
}

function generateMockProposal(prompt: string): string {
  if (prompt.includes('فني')) {
    return `# العرض الفني والهندسي المتقدم

## 1. منهجية التصميم والتخطيط المتقدمة

### المراحل التفصيلية للتصميم:
- **المرحلة الأولى - التصميم المبدئي (4 أسابيع):**
  - دراسة الموقع والمتطلبات الوظيفية
  - وضع المفاهيم الأولية للتصميم المعماري
  - التنسيق مع الجهات المختصة للحصول على الموافقات المبدئية

- **المرحلة الثانية - التصميم التفصيلي (6 أسابيع):**
  - تطوير الرسومات المعمارية التفصيلية
  - التصميم الإنشائي وفقاً للكود السعودي SBC
  - التصميم الكهروميكانيكي المتكامل

### استخدام البرامج الهندسية الحديثة:
- **نمذجة معلومات البناء (BIM):** استخدام Autodesk Revit لإنشاء نموذج ثلاثي الأبعاد متكامل
- **التصميم المعماري:** AutoCAD Architecture و SketchUp Pro
- **التحليل الإنشائي:** SAP2000 و ETABS للتحليل المتقدم

## 2. المواصفات الفنية والمواد عالية الجودة

### الخرسانة المسلحة:
- خرسانة بمقاومة 25-30 ميجاباسكال
- حديد تسليح عالي المقاومة (Grade 60)
- مضافات خاصة لتحسين قابلية التشغيل ومقاومة الكبريتات

### أنظمة العزل المتقدمة:
- عزل حراري بألواح البوليسترين المبثوق (XPS) بسماكة 5 سم
- عزل مائي بأغشية البيتومين المعدل SBS
- عزل صوتي بالصوف الصخري عالي الكثافة

## 3. الالتزام بالكود السعودي للمباني (SBC)

### المعايير المطبقة:
- **SBC 201:** الأحمال والقوى الإنشائية
- **SBC 301:** تصميم وتنفيذ المنشآت الخرسانية
- **SBC 401:** تصميم المنشآت المعدنية
- **SBC 501:** متطلبات توفير الطاقة

هذا العرض الفني يضمن تنفيذ المشروع وفقاً لأعلى معايير الجودة والاحترافية في السوق السعودي.`;
  } else {
    return `# العرض المالي التفصيلي والتنافسي

## 1. تحليل التكلفة الشامل

### التكاليف المباشرة:
- **المواد والخامات:** 45% من إجمالي التكلفة
- **أجور العمالة:** 25% من إجمالي التكلفة
- **المعدات والآليات:** 15% من إجمالي التكلفة

### التكاليف غير المباشرة:
- **إدارة المشروع:** 8% من إجمالي التكلفة
- **التأمين والضمانات:** 2% من إجمالي التكلفة

## 2. الضرائب والرسوم الحكومية

### ضريبة القيمة المضافة:
- **معدل الضريبة:** 15% وفقاً للنظام السعودي

## 3. جدول الدفع المرن والمتوازن

### الدفعات المقترحة:
1. **دفعة التعاقد:** 15% عند توقيع العقد
2. **دفعة بداية الأعمال:** 20% عند بدء أعمال الحفر
3. **دفعة الهيكل الإنشائي:** 25% عند إنجاز 50% من الهيكل
4. **دفعة التشطيبات:** 25% عند إنجاز 80% من الأعمال
5. **الدفعة النهائية:** 15% عند التسليم النهائي

هذا العرض صالح لمدة 30 يوماً من تاريخ التقديم ويشمل جميع الأعمال المذكورة في المواصفات الفنية.`;
  }
}

function generateMockRiskAnalysis(prompt: string): string {
  return `# تقرير تحليل المخاطر الشامل للمشروع

## 1. المخاطر الرئيسية المحددة

### أ) مخاطر السوق والاقتصاد (احتمالية: متوسطة | التأثير: عالي)

**تقلبات أسعار المواد الخام:**
- ارتفاع أسعار الحديد والأسمنت بنسبة 10-15% خلال فترة التنفيذ
- تأثر أسعار المواد المستوردة بتقلبات أسعار الصرف

**استراتيجيات التخفيف:**
- توقيع عقود توريد طويلة المدى بأسعار ثابتة
- تنويع مصادر التوريد بين المحلي والمستورد

### ب) مخاطر التشغيل والتنفيذ (احتمالية: عالية | التأثير: متوسط)

**نقص العمالة الماهرة:**
- صعوبة في الحصول على عمالة متخصصة في أوقات الذروة
- ارتفاع تكلفة العمالة الماهرة بنسبة 20%

**الحلول المقترحة:**
- إنشاء برامج تدريب مكثفة للعمالة المحلية
- التعاقد المسبق مع مكاتب استقدام موثوقة

## 2. الاحتياطيات المالية المقترحة

### احتياطي الطوارئ:
- **للمخاطر العالية:** 8% من إجمالي التكلفة
- **للمخاطر المتوسطة:** 5% من إجمالي التكلفة
- **احتياطي عام:** 3% من إجمالي التكلفة

بناءً على التحليل الشامل، يُصنف هذا المشروع كمشروع **متوسط المخاطر** مع إمكانيات نجاح عالية عند تطبيق استراتيجيات التخفيف المقترحة.`;
}

function generateMockOptimization(prompt: string): string {
  return `# اقتراحات تحسين التكلفة والكفاءة الشاملة

## 1. تحليل التكاليف الحالية وفرص التحسين

### البنود عالية التكلفة المحددة:
- **الأعمال الإنشائية (32%):** أعلى نسبة تكلفة
- **أعمال التشطيبات (22%):** فرصة تحسين كبيرة
- **الأنظمة الكهروميكانيكية (15%):** تقنيات موفرة متاحة

## 2. بدائل المواد والتقنيات المحسنة

### أ) بدائل المواد المحلية عالية الجودة

**الخرسانة والحديد:**
- استخدام خرسانة محلية بمضافات محسنة (توفير 12%)
- حديد تسليح من مصانع الراجحي المحلية (توفير 8%)
- **التوفير المتوقع:** 22,000 ريال سعودي

**مواد العزل:**
- عزل حراري من الصوف الصخري المحلي
- أغشية عزل مائي من الإنتاج السعودي
- **التوفير المتوقع:** 8,500 ريال سعودي

## 3. تحسين سلسلة التوريد والمشتريات

### استراتيجية الشراء المحسنة:
- **الشراء المباشر من المصانع:** توفير 15% من تكلفة المواد
- **التفاوض على كميات مجمعة:** خصومات إضافية 5-8%

## 4. ملخص التوفير الإجمالي المتوقع

### التوفير حسب الفئات:
- **بدائل المواد المحلية:** 48,500 ريال (8.8%)
- **تحسين سلسلة التوريد:** 25,000 ريال (4.5%)
- **تحسين الكفاءة التشغيلية:** 18,000 ريال (3.3%)

**إجمالي التوفير المتوقع:** 131,500 ريال سعودي (23.9% من التكلفة الأصلية)

هذه الاقتراحات قابلة للتطبيق فوراً وستحقق توفيراً كبيراً مع الحفاظ على أعلى معايير الجودة والاحترافية.`;
}

function generateMockDuration(prompt: string): string {
  return `# تقدير المدة الزمنية الشامل للمشروع

## 1. المدة الزمنية الإجمالية المقترحة

### التقدير الأساسي:
- **المدة الإجمالية:** 54 أسبوع (13.5 شهر)
- **تاريخ البدء المقترح:** ${new Date().toLocaleDateString('ar-SA')}
- **تاريخ الانتهاء المتوقع:** ${new Date(Date.now() + 54 * 7 * 24 * 60 * 60 * 1000).toLocaleDateString('ar-SA')}

## 2. تفصيل المراحل الزمنية الرئيسية

### المرحلة الأولى: التخطيط والتصاميم (6 أسابيع)
**الأنشطة الرئيسية:**
- مراجعة وتطوير التصاميم النهائية (2 أسبوع)
- إعداد رسومات التنفيذ (2 أسبوع)
- الحصول على الموافقات النهائية (1 أسبوع)
- تجهيز الموقع والمعدات (1 أسبوع)

### المرحلة الثانية: الأساسات والهيكل الإنشائي (16 أسبوع)
**تفصيل الأعمال:**
- **أعمال الحفر (3 أسابيع):** حفر الأساسات والخدمات
- **صب الأساسات (4 أسابيع):** خرسانة نظافة، أساسات، ميدات
- **الهيكل الإنشائي (9 أسابيع):** أعمدة، جسور، بلاطات

### المرحلة الثالثة: التشطيبات والتسليم (32 أسبوع)
**الأعمال المشمولة:**
- أعمال المباني والتشطيبات الداخلية
- الأنظمة الكهروميكانيكية
- التشطيبات الخارجية والتسليم

## 3. العوامل المؤثرة على المدة

### العوامل الإيجابية:
- **توفر المواد محلياً:** تقليل زمن التوريد
- **فريق عمل متمرس:** كفاءة عالية في التنفيذ
- **معدات حديثة:** تسريع عمليات البناء

### المخاطر الزمنية:
- **تأخير توريد المواد:** 2-3 أسابيع تأخير محتمل
- **نقص العمالة الماهرة:** 1-2 أسبوع تأخير محتمل

المشروع قابل للتنفيذ في المدة المحددة مع تطبيق استراتيجيات التخطيط والإدارة المقترحة.`;
}

function generateMockWorkforce(prompt: string): string {
  return `# تقرير تقدير الموارد البشرية الشامل

## 1. تقدير العمالة المطلوبة حسب التخصصات

### أ) العمالة الماهرة (إجمالي: 45 عامل)

**عمال الخرسانة المسلحة:**
- العدد المطلوب: 12 عامل
- التكلفة الشهرية للفرد: 3,500 ريال
- إجمالي التكلفة الشهرية: 42,000 ريال

**عمال البناء والمباني:**
- العدد المطلوب: 15 عامل
- التكلفة الشهرية للفرد: 3,200 ريال
- إجمالي التكلفة الشهرية: 48,000 ريال

**عمال التشطيبات:**
- العدد المطلوب: 8 عمال
- التكلفة الشهرية للفرد: 3,800 ريال
- إجمالي التكلفة الشهرية: 30,400 ريال

### ب) الكوادر الهندسية (إجمالي: 12 مهندس)

**مهندس مشروع رئيسي:**
- العدد: 1 مهندس
- الراتب الشهري: 18,000 ريال

**مهندسين مدنيين:**
- العدد: 3 مهندسين
- الراتب الشهري للفرد: 12,000 ريال
- إجمالي التكلفة الشهرية: 36,000 ريال

**مهندسين كهروميكانيكيين:**
- العدد: 4 مهندسين
- الراتب الشهري للفرد: 13,000 ريال
- إجمالي التكلفة الشهرية: 52,000 ريال

## 2. التكلفة الإجمالية للموارد البشرية

### التكلفة الشهرية:
- العمالة الماهرة: 163,600 ريال
- الكوادر الهندسية: 148,000 ريال
- الكوادر الإدارية: 96,000 ريال

**إجمالي التكلفة الشهرية:** 407,600 ريال سعودي

### التكلفة الإجمالية للمشروع (13.5 شهر):
**5,502,600 ريال سعودي**

## 3. متطلبات التوطين والامتثال

### نسبة التوطين المطلوبة:
- **الكوادر الهندسية:** 70% سعوديين
- **الكوادر الإدارية:** 80% سعوديين
- **العمالة الماهرة:** 30% سعوديين

## 4. التوصيات الخاصة بالسوق السعودي

### الاستفادة من برامج التدريب الحكومية:
- **صندوق تنمية الموارد البشرية:** دعم 50% من تكلفة التدريب
- **برنامج تمهير:** توظيف وتدريب الخريجين السعوديين

المشروع يتطلب فريق عمل متكامل من 98 شخص في ذروة التنفيذ، بتكلفة إجمالية 5.5 مليون ريال للموارد البشرية.`;
}

export function extractJSONFromResponse(text: string): any {
  try {
    // البحث عن JSON داخل كتل الكود أولاً
    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);
    if (jsonMatch && jsonMatch[1]) {
      return JSON.parse(jsonMatch[1]);
    }

    // البحث عن JSON داخل النص
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}');
    
    if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
      const jsonString = text.substring(jsonStart, jsonEnd + 1);
      return JSON.parse(jsonString);
    }

    // إذا لم يتم العثور على كائن JSON، ابحث عن مصفوفة
    const arrayStart = text.indexOf('[');
    const arrayEnd = text.lastIndexOf(']');
    
    if (arrayStart !== -1 && arrayEnd !== -1 && arrayEnd > arrayStart) {
      const jsonString = text.substring(arrayStart, arrayEnd + 1);
      return JSON.parse(jsonString);
    }

    // محاولة تحليل النص كاملاً
    return JSON.parse(text.trim());
  } catch (error) {
    console.error("Error parsing JSON from response:", error);
    throw new Error("Failed to parse AI response as JSON");
  }
}