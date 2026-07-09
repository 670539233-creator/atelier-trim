/* ============================================================
   I18n - Internationalization System (Embedded Translations)
   Works with file:// protocol - no server required!
   ============================================================ */

const I18n = (function () {
    'use strict';

    // ---- Configuration ----
    const CONFIG = {
        defaultLang: 'zh',
        fallbackLang: 'en',
        supportedLangs: ['zh', 'en', 'es', 'ar'],
        langLabels: { zh: '中文', en: 'English', es: 'Español', ar: 'العربية' },
        langFlags:  { zh: '🇨🇳', en: '🇺🇸', es: '🇪🇸', ar: '🇸🇦' },
        storageKey: 'acctrims_lang'
    };

    // ---- State ----
    let currentLang = CONFIG.defaultLang;
    let translations = {};
    let listeners = [];

    // ============================================================
    // EMBEDDED TRANSLATIONS (works offline & file:// protocol)
    // ============================================================
    const EMBEDDED = {};

    // -- 中文 --
    EMBEDDED['zh'] = {
        "site": {"title":"专业服装辅料供应商 | Atelier Trim"},
        "nav": {"home":"首页","products":"产品","contact":"联系我们"},
        "hero": {"badge":"专业辅料 · 品质之选","title":"专业服装辅料供应商","subtitle":"吊牌 · 织唛 · 织带 · 纽扣 · 飞机盒 · 服装袋","viewProducts":"查看产品","contactUs":"联系我们","badge2":"定制生产 · 全球交付","title2":"定制您的品牌辅料","subtitle2":"从设计到交付，一站式辅料解决方案"},
        "about": {"label":"关于我们","title":"专业的服装辅料解决方案提供商","p1":"我们是一家专注于服装辅料研发、生产和销售的综合性企业，拥有超过15年的行业经验。我们的产品涵盖吊牌、织唛、织带、纽扣、飞机盒、服装袋等全系列服装辅料，为客户提供一站式采购服务。","p2":"公司拥有先进的生产设备和严格的质量控制体系，产品远销欧美、东南亚、中东等全球30多个国家和地区。我们致力于为客户提供高品质、高性价比的辅料产品，帮助您的品牌提升价值。","years":"年行业经验","clients":"服务客户","countries":"出口国家"},
        "categories": {"label":"产品分类","title":"六大产品系列","hangtags":"吊牌","hangtags_desc":"各类服装品牌吊牌、价格牌、挂牌，支持多种材质与工艺定制","wovenlabels":"织唛","wovenlabels_desc":"高品质织标、织唛，精细织造工艺，清晰展示品牌信息","woventape":"织带","woventape_desc":"各类服装用织带、绳带、松紧带，颜色尺寸均可定制","buttons":"纽扣","buttons_desc":"树脂扣、金属扣、贝壳扣等多种材质纽扣，满足不同服装需求","mailerboxes":"飞机盒","mailerboxes_desc":"服装包装飞机盒、快递盒，可定制印刷品牌Logo及图案","garmentbags":"服装袋","garmentbags_desc":"OPP袋、PE袋、无纺布袋等服装包装袋，支持定制印刷"},
        "advantages": {"label":"为什么选择我们","title":"我们的核心优势","quality":{"title":"品质保证","desc":"严格的质量控制体系，每批产品出厂前经过多道检测流程"},"delivery":{"title":"快速交付","desc":"高效的供应链管理，常规订单7-15天完成交付"},"custom":{"title":"定制服务","desc":"支持来样定制、OEM/ODM服务，满足您的个性化需求"},"logistics":{"title":"全球物流","desc":"海运、空运、快递多渠道发货，覆盖全球30+国家"}},
        "products": {"label":"产品展示","title":"全部产品","viewDetails":"查看详情","inquiry":"询价","specs":"产品规格","description":"产品描述"},
        "filter": {"all":"全部","hangtags":"吊牌","wovenlabels":"织唛","woventape":"织带","buttons":"纽扣","mailerboxes":"飞机盒","garmentbags":"服装袋"},
        "contact": {"label":"联系我们","title":"获取报价与咨询","infoTitle":"联系方式","email":"邮箱","phone":"电话","address":"地址","hours":"工作时间","hoursText":"周一至周五：9:00 - 18:00（北京时间）\n我们将在24小时内回复您的询盘"},
        "form": {"name":"姓名 *","email":"邮箱 *","phone":"电话","company":"公司名称","productInterest":"产品意向","selectProduct":"请选择产品","message":"留言内容 *","submit":"发送询盘","success":"✓ 询盘已提交！我们会尽快联系您。","error":"✗ 请填写所有必填项（姓名、邮箱、留言）。"},
        "inquiry": {"title":"快速询价","success":"✓ 即将打开邮件客户端发送询盘。","error":"✗ 请填写所有必填项。"},
        "factory": {"label":"工厂展示","title":"生产车间与设备","img1":"织标生产车间","img2":"织带生产线","img3":"吊牌印刷车间","img4":"质检与包装","img5":"仓储物流中心","img6":"样品展示厅"},
        "footer": {"desc":"专业服装辅料供应商，一站式采购解决方案","quickLinks":"快速链接","products":"产品分类","contact":"联系方式","rights":"保留所有权利。"},
        "product_data": {
            "hangtags":{"name":"吊牌 / Hang Tags","category":"吊牌","description":"我们提供各类高品质服装吊牌，包括品牌吊牌、价格牌、水洗标等。支持铜版纸、牛皮纸、PVC、白卡纸等多种材质，以及烫金、压纹、UV、凹凸等多种工艺。可根据您的品牌需求量身定制，是提升品牌形象的重要载体。","specs":{"material":"铜版纸、牛皮纸、PVC、白卡纸、特种纸","process":"烫金/烫银、UV印刷、凹凸压纹、覆膜、击凸","size":"可定制 / Customizable","moq":"1000张起订","delivery":"7-15个工作日"}},
            "wovenlabels":{"name":"织唛 / Woven Labels","category":"织唛","description":"采用高精密织造设备，生产各类品牌织标、织唛。包括主唛、洗水唛、侧唛、旗唛等。使用优质涤纶丝线，色彩鲜艳、文字清晰、手感柔软、耐水洗不掉色。广泛应用于服装、鞋帽、箱包等行业。","specs":{"material":"涤纶丝、棉线、金银线","type":"织标、印标、热转印标、硅胶标","folding":"对折、切折、两边折、书本折等","moq":"1000个起订","delivery":"7-15个工作日"}},
            "woventape":{"name":"织带 / Woven Tape","category":"织带","description":"专业生产各类服装用织带、绳带、松紧带、缎带等。采用高速织带机生产，品质稳定。支持提花、印花、染色等多种工艺，颜色、宽度、厚度均可按需定制。广泛应用于服装、箱包、鞋类、工艺品等领域。","specs":{"material":"涤纶、尼龙、棉、PP丙纶","type":"平纹带、缎带、松紧带、提花带、人字带","width":"3mm - 150mm","color":"任何颜色均可定制 / Any Color","moq":"500米起订","delivery":"7-15个工作日"}},
            "buttons":{"name":"纽扣 / Buttons","category":"纽扣","description":"提供全品类服装纽扣，包括树脂扣、金属扣、贝壳扣、椰子扣、牛角扣、包布扣等。支持定制LOGO、颜色、尺寸。产品通过环保检测认证，符合出口标准。适用于衬衫、外套、裤子、大衣等各类服装。","specs":{"material":"树脂、金属、贝壳、椰子壳、牛角、塑料","type":"四眼扣、两眼扣、暗扣、工字扣、四合扣","size":"10mm - 50mm（多种尺寸可选）","color":"可定制各种颜色及效果","moq":"1000颗起订","delivery":"10-15个工作日"}},
            "mailerboxes":{"name":"飞机盒 / Mailer Boxes","category":"飞机盒","description":"专业生产服装包装用飞机盒、快递盒、翻盖盒。采用优质瓦楞纸板和白卡纸，承重好、抗压性强。支持定制尺寸、印刷品牌LOGO和图案，提升品牌开箱体验。适用于服装、鞋帽、礼品等行业。","specs":{"material":"瓦楞纸、白卡纸、牛皮纸","type":"飞机盒、翻盖盒、抽屉盒、天地盖盒","printing":"单色/多色印刷、覆膜、烫金/烫银","size":"可定制任意尺寸","moq":"500个起订","delivery":"10-20个工作日"}},
            "garmentbags":{"name":"服装袋 / Garment Bags","category":"服装袋","description":"提供各类服装包装袋，包括OPP自粘袋、PE拉链袋、无纺布袋、PVC袋等。透明度高、密封性好、韧性强。支持多种尺寸定制和品牌LOGO印刷。适用于服装的储存、运输和展示包装。","specs":{"material":"OPP、PE、CPE、无纺布、PVC","type":"自粘袋、拉链袋、扣手袋、背心袋、挂衣袋","thickness":"单面1.5丝 - 20丝","size":"可定制任意尺寸","printing":"支持1-8色印刷","moq":"1000个起订","delivery":"7-15个工作日"}}
        }
    };

    // -- English --
    EMBEDDED['en'] = {
        "site":{"title":"Professional Garment Accessories Supplier | Atelier Trim"},
        "nav":{"home":"Home","products":"Products","contact":"Contact"},
        "hero":{"badge":"Quality Trims · Trusted Partner","title":"Professional Garment Accessories Supplier","subtitle":"Hang Tags · Woven Labels · Tape · Buttons · Mailer Boxes · Garment Bags","viewProducts":"View Products","contactUs":"Contact Us","badge2":"Custom Manufacturing · Global Delivery","title2":"Customize Your Brand Trims","subtitle2":"One-stop trims solutions from design to delivery"},
        "about":{"label":"About Us","title":"Your Professional Garment Trims Solution Provider","p1":"We are a comprehensive enterprise specializing in the R&D, production and sales of garment accessories, with over 15 years of industry experience. Our products cover hang tags, woven labels, woven tape, buttons, mailer boxes, garment bags and a full range of garment trims, providing one-stop procurement services for our clients.","p2":"Equipped with advanced production facilities and a strict quality control system, our products are exported to over 30 countries and regions across Europe, America, Southeast Asia, and the Middle East. We are committed to delivering high-quality, cost-effective trims to help elevate your brand.","years":"Years Experience","clients":"Clients Served","countries":"Export Countries"},
        "categories":{"label":"Product Categories","title":"Six Major Product Series","hangtags":"Hang Tags","hangtags_desc":"Brand hang tags, price tags, swing tickets with customizable materials and finishes","wovenlabels":"Woven Labels","wovenlabels_desc":"High-quality woven labels with fine craftsmanship, clearly showcasing brand information","woventape":"Woven Tape","woventape_desc":"Garment tapes, drawcords, elastic bands with customizable colors and sizes","buttons":"Buttons","buttons_desc":"Resin, metal, shell buttons in various materials to meet different garment needs","mailerboxes":"Mailer Boxes","mailerboxes_desc":"Custom mailer boxes, shipping boxes with brand logo and pattern printing","garmentbags":"Garment Bags","garmentbags_desc":"OPP, PE, non-woven garment packaging bags available with custom printing"},
        "advantages":{"label":"Why Choose Us","title":"Our Core Advantages","quality":{"title":"Quality Assurance","desc":"Strict quality control system with multiple inspection processes before shipment"},"delivery":{"title":"Fast Delivery","desc":"Efficient supply chain management, regular orders delivered within 7-15 days"},"custom":{"title":"Customization","desc":"Sample-based customization, OEM/ODM services to meet your unique requirements"},"logistics":{"title":"Global Logistics","desc":"Sea, air, and express shipping to 30+ countries worldwide"}},
        "products":{"label":"Product Showcase","title":"All Products","viewDetails":"View Details","inquiry":"Inquiry","specs":"Specifications","description":"Description"},
        "filter":{"all":"All","hangtags":"Hang Tags","wovenlabels":"Woven Labels","woventape":"Woven Tape","buttons":"Buttons","mailerboxes":"Mailer Boxes","garmentbags":"Garment Bags"},
        "contact":{"label":"Contact Us","title":"Get a Quote & Consultation","infoTitle":"Contact Information","email":"Email","phone":"Phone","address":"Address","hours":"Working Hours","hoursText":"Mon-Fri: 9:00 - 18:00 (Beijing Time)\nWe will reply to your inquiry within 24 hours"},
        "form":{"name":"Name *","email":"Email *","phone":"Phone","company":"Company","productInterest":"Product Interest","selectProduct":"Select a product","message":"Message *","submit":"Send Inquiry","success":"✓ Inquiry submitted! We will contact you shortly.","error":"✗ Please fill in all required fields (Name, Email, Message)."},
        "inquiry":{"title":"Quick Inquiry","success":"✓ Inquiry submitted! We will reply shortly.","error":"✗ Submission failed. Please try again."},
        "factory":{"label":"Factory Tour","title":"Production Workshop & Equipment","img1":"Woven Label Workshop","img2":"Tape Production Line","img3":"Hang Tag Printing","img4":"QC & Packaging","img5":"Warehouse & Logistics","img6":"Showroom"},
        "footer":{"desc":"Professional garment accessories supplier, one-stop procurement solutions","quickLinks":"Quick Links","products":"Products","contact":"Contact","rights":"All rights reserved."},
        "product_data":{
            "hangtags":{"name":"Hang Tags","category":"Hang Tags","description":"We offer a wide range of high-quality garment hang tags, including brand tags, price tags, care labels, and more. Available in coated paper, kraft paper, PVC, white cardstock, and various specialty papers. Processes include hot stamping, embossing, UV coating, and debossing. Fully customizable to your brand requirements.","specs":{"material":"Coated Paper, Kraft Paper, PVC, White Cardstock, Specialty Paper","process":"Hot Stamping, UV Printing, Embossing, Lamination, Debossing","size":"Customizable","moq":"1,000 pcs","delivery":"7-15 working days"}},
            "wovenlabels":{"name":"Woven Labels","category":"Woven Labels","description":"Using high-precision weaving equipment, we produce various brand labels including main labels, care labels, side labels, and flag labels. Made with premium polyester yarns, our labels feature vibrant colors, clear text, soft hand feel, and excellent wash resistance. Widely used in apparel, footwear, hats, and bags.","specs":{"material":"Polyester Yarn, Cotton Thread, Metallic Thread","type":"Woven Labels, Printed Labels, Heat Transfer Labels, Silicone Labels","folding":"Center Fold, End Fold, Manhattan Fold, Book Fold, etc.","moq":"1,000 pcs","delivery":"7-15 working days"}},
            "woventape":{"name":"Woven Tape","category":"Woven Tape","description":"Professional production of various garment tapes, drawcords, elastic bands, and satin ribbons. Produced with high-speed looms for consistent quality. Available in jacquard, printed, and dyed finishes. Width, thickness, and colors are fully customizable. Widely used in garments, bags, footwear, and crafts.","specs":{"material":"Polyester, Nylon, Cotton, PP Polypropylene","type":"Plain Tape, Satin Ribbon, Elastic Band, Jacquard Tape, Herringbone Tape","width":"3mm - 150mm","color":"Any Color Available","moq":"500 meters","delivery":"7-15 working days"}},
            "buttons":{"name":"Buttons","category":"Buttons","description":"Full range of garment buttons including resin buttons, metal buttons, shell buttons, coconut buttons, horn buttons, and fabric-covered buttons. Custom LOGO, color, and size available. Products pass environmental certification and meet export standards. Suitable for shirts, jackets, trousers, coats, and all types of garments.","specs":{"material":"Resin, Metal, Shell, Coconut Shell, Horn, Plastic","type":"4-Hole, 2-Hole, Snap, Tack, Jeans Button","size":"10mm - 50mm (various sizes)","color":"Customizable Colors & Finishes","moq":"1,000 pcs","delivery":"10-15 working days"}},
            "mailerboxes":{"name":"Mailer Boxes","category":"Mailer Boxes","description":"Professional production of mailer boxes, shipping boxes, and flip-top boxes for garment packaging. Made with high-quality corrugated board and coated paper, offering excellent weight-bearing and crush resistance. Custom sizes and brand LOGO printing available to enhance the unboxing experience. Suitable for apparel, footwear, gifts, and more.","specs":{"material":"Corrugated Board, Coated Paper, Kraft Paper","type":"Mailer Box, Flip-top Box, Drawer Box, Lid-off Box","printing":"Single/Multi-color Printing, Lamination, Hot Stamping","size":"Fully Customizable","moq":"500 pcs","delivery":"10-20 working days"}},
            "garmentbags":{"name":"Garment Bags","category":"Garment Bags","description":"Various garment packaging bags including OPP self-adhesive bags, PE zipper bags, non-woven bags, and PVC bags. High transparency, excellent sealing, and strong durability. Custom sizes and brand LOGO printing available. Suitable for garment storage, shipping, and retail display packaging.","specs":{"material":"OPP, PE, CPE, Non-Woven, PVC","type":"Self-adhesive Bag, Zipper Bag, Handle Bag, Vest Bag, Garment Cover","thickness":"Single side 1.5 - 20 microns","size":"Fully Customizable","printing":"1-8 Color Printing Available","moq":"1,000 pcs","delivery":"7-15 working days"}}
        }
    };

    // -- Spanish (basic) --
    EMBEDDED['es'] = {
        "site":{"title":"Proveedor de Accesorios de Confección | Atelier Trim"},
        "nav":{"home":"Inicio","products":"Productos","contact":"Contacto"},
        "hero":{"badge":"Accesorios de Calidad","title":"Proveedor Profesional de Accesorios","subtitle":"Etiquetas · Tejidos · Cintas · Botones · Cajas · Bolsas","viewProducts":"Ver Productos","contactUs":"Contáctenos","badge2":"Fabricación a Medida","title2":"Personalice sus Accesorios","subtitle2":"Soluciones integrales desde el diseño hasta la entrega"},
        "about":{"label":"Sobre Nosotros","title":"Su Proveedor Profesional de Accesorios","p1":"Somos una empresa especializada en accesorios de confección con más de 15 años de experiencia.","p2":"Nuestros productos se exportan a más de 30 países en todo el mundo.","years":"Años de Experiencia","clients":"Clientes Atendidos","countries":"Países de Exportación"},
        "categories":{"label":"Categorías","title":"Seis Series de Productos","hangtags":"Etiquetas Colgantes","hangtags_desc":"Etiquetas de marca personalizables","wovenlabels":"Etiquetas Tejidas","wovenlabels_desc":"Etiquetas tejidas de alta calidad","woventape":"Cintas Tejidas","woventape_desc":"Cintas y cordones personalizables","buttons":"Botones","buttons_desc":"Botones en diversos materiales","mailerboxes":"Cajas de Envío","mailerboxes_desc":"Cajas con impresión de marca personalizada","garmentbags":"Bolsas para Prendas","garmentbags_desc":"Bolsas de embalaje con impresión personalizada"},
        "advantages":{"label":"Por Qué Elegirnos","title":"Nuestras Ventajas","quality":{"title":"Calidad Garantizada","desc":"Estricto sistema de control de calidad"},"delivery":{"title":"Entrega Rápida","desc":"Pedidos entregados en 7-15 días"},"custom":{"title":"Personalización","desc":"Servicios OEM/ODM disponibles"},"logistics":{"title":"Logística Global","desc":"Envíos a más de 30 países"}},
        "products":{"label":"Productos","title":"Todos los Productos","viewDetails":"Ver Detalles","inquiry":"Consultar","specs":"Especificaciones","description":"Descripción"},
        "filter":{"all":"Todos","hangtags":"Etiquetas","wovenlabels":"Etiquetas Tejidas","woventape":"Cintas","buttons":"Botones","mailerboxes":"Cajas","garmentbags":"Bolsas"},
        "contact":{"label":"Contacto","title":"Solicitar Cotización","infoTitle":"Información de Contacto","email":"Correo","phone":"Teléfono","address":"Dirección","hours":"Horario","hoursText":"Lun-Vie: 9:00 - 18:00 (hora de Beijing)"},
        "form":{"name":"Nombre *","email":"Correo *","phone":"Teléfono","company":"Empresa","productInterest":"Producto de Interés","selectProduct":"Seleccione un producto","message":"Mensaje *","submit":"Enviar Consulta","success":"✓ ¡Consulta enviada con éxito!","error":"✗ Error al enviar. Intente nuevamente."},
        "inquiry":{"title":"Consulta Rápida","success":"✓ ¡Consulta enviada!","error":"✗ Error. Intente nuevamente."},
        "factory":{"label":"Fábrica","title":"Taller de Producción y Equipos","img1":"Taller de Etiquetas","img2":"Línea de Cintas","img3":"Impresión de Etiquetas","img4":"Control de Calidad","img5":"Almacén y Logística","img6":"Sala de Muestras"},
        "footer":{"desc":"Proveedor profesional de accesorios para prendas","quickLinks":"Enlaces Rápidos","products":"Productos","contact":"Contacto","rights":"Todos los derechos reservados."},
        "product_data":{}
    };

    // -- Arabic (basic) --
    EMBEDDED['ar'] = {
        "site":{"title":"مورد إكسسوارات الملابس | Atelier Trim"},
        "nav":{"home":"الرئيسية","products":"المنتجات","contact":"اتصل بنا"},
        "hero":{"badge":"إكسسوارات عالية الجودة","title":"مورد محترف لإكسسوارات الملابس","subtitle":"بطاقات · ملصقات · أشرطة · أزرار · صناديق · أكياس","viewProducts":"عرض المنتجات","contactUs":"اتصل بنا","badge2":"تصنيع حسب الطلب","title2":"خصص إكسسوارات علامتك التجارية","subtitle2":"حلول متكاملة من التصميم إلى التسليم"},
        "about":{"label":"من نحن","title":"مزود حلول إكسسوارات الملابس المحترف","p1":"نحن مؤسسة شاملة متخصصة في إكسسوارات الملابس مع أكثر من 15 عامًا من الخبرة.","p2":"يتم تصدير منتجاتنا إلى أكثر من 30 دولة حول العالم.","years":"سنوات الخبرة","clients":"عميل خدمنا","countries":"دولة تصدير"},
        "categories":{"label":"فئات المنتجات","title":"ست سلاسل منتجات رئيسية","hangtags":"بطاقات معلقة","hangtags_desc":"بطاقات علامات تجارية قابلة للتخصيص","wovenlabels":"ملصقات منسوجة","wovenlabels_desc":"ملصقات منسوجة عالية الجودة","woventape":"أشرطة منسوجة","woventape_desc":"أشرطة وحبال قابلة للتخصيص","buttons":"أزرار","buttons_desc":"أزرار بمواد مختلفة","mailerboxes":"صناديق الشحن","mailerboxes_desc":"صناديق بطباعة شعار مخصصة","garmentbags":"أكياس الملابس","garmentbags_desc":"أكياس تغليف بطباعة مخصصة"},
        "advantages":{"label":"لماذا تختارنا","title":"مزايانا الأساسية","quality":{"title":"ضمان الجودة","desc":"نظام صارم لمراقبة الجودة"},"delivery":{"title":"تسليم سريع","desc":"تسليم الطلبات خلال 7-15 يوم"},"custom":{"title":"تخصيص","desc":"خدمات OEM/ODM متاحة"},"logistics":{"title":"خدمات لوجستية عالمية","desc":"شحن إلى أكثر من 30 دولة"}},
        "products":{"label":"المنتجات","title":"جميع المنتجات","viewDetails":"عرض التفاصيل","inquiry":"استفسار","specs":"المواصفات","description":"الوصف"},
        "filter":{"all":"الكل","hangtags":"بطاقات","wovenlabels":"ملصقات","woventape":"أشرطة","buttons":"أزرار","mailerboxes":"صناديق","garmentbags":"أكياس"},
        "contact":{"label":"اتصل بنا","title":"احصل على عرض سعر","infoTitle":"معلومات الاتصال","email":"البريد الإلكتروني","phone":"الهاتف","address":"العنوان","hours":"ساعات العمل","hoursText":"الإثنين-الجمعة: 9:00 - 18:00 (بتوقيت بكين)"},
        "form":{"name":"الاسم *","email":"البريد الإلكتروني *","phone":"الهاتف","company":"الشركة","productInterest":"المنتج المهتم به","selectProduct":"اختر منتجًا","message":"الرسالة *","submit":"إرسال الاستفسار","success":"✓ تم إرسال الاستفسار بنجاح!","error":"✗ فشل الإرسال. يرجى المحاولة مرة أخرى."},
        "inquiry":{"title":"استفسار سريع","success":"✓ تم تقديم الاستفسار!","error":"✗ فشل التقديم. يرجى المحاولة مرة أخرى."},
        "factory":{"label":"جولة في المصنع","title":"ورشة الإنتاج والمعدات","img1":"ورشة الملصقات المنسوجة","img2":"خط إنتاج الأشرطة","img3":"طباعة البطاقات","img4":"مراقبة الجودة والتعبئة","img5":"المستودعات والخدمات اللوجستية","img6":"صالة العرض"},
        "footer":{"desc":"مورد محترف لإكسسوارات الملابس","quickLinks":"روابط سريعة","products":"المنتجات","contact":"اتصل بنا","rights":"جميع الحقوق محفوظة."},
        "product_data":{}
    };

    // ============================================================
    // INIT
    // ============================================================
    function init() {
        const saved = localStorage.getItem(CONFIG.storageKey);
        if (saved && CONFIG.supportedLangs.includes(saved)) {
            currentLang = saved;
        } else {
            currentLang = detectBrowserLang();
        }
        return loadLanguage(currentLang);
    }

    function detectBrowserLang() {
        const navLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
        for (const lang of CONFIG.supportedLangs) {
            if (navLang.startsWith(lang)) return lang;
        }
        if (navLang.startsWith('zh')) return 'zh';
        return CONFIG.defaultLang;
    }

    // ---- Load Language (embedded-first, no fetch needed!) ----
    function loadLanguage(lang) {
        // Use embedded translations directly - no network request needed!
        if (EMBEDDED[lang]) {
            translations = EMBEDDED[lang];
            currentLang = lang;
            localStorage.setItem(CONFIG.storageKey, lang);
            applyTranslations();
            notifyListeners(lang);
            return Promise.resolve();
        }
        // Fallback: try to fetch from locales/ folder (works with server)
        return fetchLocaleFile(lang);
    }

    // Fallback fetch for languages not embedded (if server available)
    async function fetchLocaleFile(lang) {
        try {
            const response = await fetch('locales/' + lang + '.json');
            if (!response.ok) throw new Error('HTTP ' + response.status);
            const data = await response.json();
            EMBEDDED[lang] = data;
            translations = data;
            currentLang = lang;
            localStorage.setItem(CONFIG.storageKey, lang);
            applyTranslations();
            notifyListeners(lang);
        } catch (err) {
            console.warn('Failed to load language "' + lang + '":', err.message);
            if (lang !== CONFIG.fallbackLang) {
                return loadLanguage(CONFIG.fallbackLang);
            }
        }
    }

    async function setLanguage(lang) {
        if (!CONFIG.supportedLangs.includes(lang)) return;
        if (lang === currentLang && EMBEDDED[lang]) return;
        await loadLanguage(lang);
    }

    // ---- Get Translation ----
    function t(key, params) {
        let text = getNestedValue(translations, key);
        if (text === undefined) {
            // Try fallback language
            if (currentLang !== CONFIG.fallbackLang && EMBEDDED[CONFIG.fallbackLang]) {
                text = getNestedValue(EMBEDDED[CONFIG.fallbackLang], key);
            }
            if (text === undefined) {
                console.warn('Missing translation key: ' + key);
                return key;
            }
        }
        // Replace placeholders like {name}
        if (params && typeof text === 'string') {
            Object.keys(params).forEach(function (p) {
                text = text.replace(new RegExp('\\{' + p + '\\}', 'g'), params[p]);
            });
        }
        return text;
    }

    function getNestedValue(obj, path) {
        return path.split('.').reduce(function (o, k) {
            return (o && o[k] !== undefined ? o[k] : undefined);
        }, obj);
    }

    // ---- Apply Translations to DOM ----
    function applyTranslations() {
        // Update <title>
        const titleEl = document.querySelector('title[data-i18n]');
        if (titleEl) {
            const translated = t(titleEl.getAttribute('data-i18n'));
            if (translated) titleEl.textContent = translated;
        }

        // Update all [data-i18n] elements
        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            const key = el.getAttribute('data-i18n');
            const translated = t(key);
            if (translated && translated !== key) {
                if (el.tagName === 'OPTION' && !el.value) {
                    el.textContent = translated;
                } else if ((el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') && el.hasAttribute('placeholder')) {
                    el.placeholder = translated;
                } else if (el.tagName === 'TITLE') {
                    el.textContent = translated;
                } else {
                    el.textContent = translated;
                }
            }
        });

        // Update <html lang>
        document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : currentLang;

        // Update language switcher label
        updateLangLabel();
    }

    function updateLangLabel() {
        const label = document.getElementById('currentLangLabel');
        if (label) {
            label.textContent = CONFIG.langLabels[currentLang] || currentLang;
        }
    }

    // Apply translations to a dynamically created element
    function applyToElement(el) {
        if (!el) return;
        if (el.hasAttribute && el.hasAttribute('data-i18n')) {
            const key = el.getAttribute('data-i18n');
            const translated = t(key);
            if (translated && translated !== key) el.textContent = translated;
        }
        if (el.querySelectorAll) {
            el.querySelectorAll('[data-i18n]').forEach(function (child) {
                const key = child.getAttribute('data-i18n');
                const translated = t(key);
                if (translated && translated !== key) {
                    if ((child.tagName === 'INPUT' || child.tagName === 'TEXTAREA') && child.hasAttribute('placeholder')) {
                        child.placeholder = translated;
                    } else {
                        child.textContent = translated;
                    }
                }
            });
        }
    }

    // ---- Event Listeners ----
    function onChange(fn) { listeners.push(fn); }
    function notifyListeners(lang) { listeners.forEach(function (fn) { fn(lang); }); }

    // ---- Public API ----
    return {
        init: init,
        setLanguage: setLanguage,
        getLang: function () { return currentLang; },
        t: t,
        applyToElement: applyToElement,
        onChange: onChange,
        getSupportedLangs: function () { return CONFIG.supportedLangs; },
        getLangLabel: function (lang) { return CONFIG.langLabels[lang] || lang; }
    };
})();
