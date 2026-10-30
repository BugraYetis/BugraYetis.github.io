/* =====================================================
   INCRESIS — Modern E-Commerce JavaScript
   ===================================================== */

'use strict';

/* ── i18n TRANSLATIONS ───────────────────────────────── */
const LANG = {
    tr: {
        // Nav
        'nav.collections': 'KOLEKSİYONLAR',
        'nav.about': 'HAKKIMIZDA',
        'nav.contact': 'İLETİŞİM',

        // Hero
        'hero.tag': 'SS 2026 — YENİ SEZON',
        'hero.title': 'VAROLUŞUNU<br><span class="hero-title-accent">YENİDEN TANIMLA</span>',
        'hero.sub': 'Giydiğin şey kim olduğunu anlatır.',
        'hero.cta': 'KOLEKSİYONLARI KEŞFET',

        // Categories
        'cat.tee': 'TİŞÖRT',
        'cat.hoodie': 'KAPÜŞONLU',
        'cat.jacket': 'CEKET',
        'cat.sweatpants': 'EŞOFMAN ALTI',
        'cat.shorts': 'ŞORT',

        // Banners
        'banner.view': 'KOLEKSİYONU GÖR →',
        'banner.viewFull': 'TÜM KOLEKSİYONU GÖR →',

        // Featured
        'featured.tag': 'NOIR KOLEKSİYON',
        'featured.title': 'KARANLIK<br>BİR LÜKS',

        // Home
        'home.bestsellers': 'ÇOK SATANLAR',
        'home.bestsellersTag': 'EN ÇOK SATANLAR',
        'home.seeAll': 'Tümünü Gör →',

        // Category page
        'category.comingSoon': 'Bu kategoride yakında ürünler eklenecek',
        'category.back': 'Ana Sayfa',

        // Collections page
        'collections.tag': 'SS 2026',
        'collections.desc': 'Her koleksiyon bir hikaye anlatır.',
        'col.f1.tag': 'KOLEKSİYON 05 — SS 2026',
        'col.f1.name': 'POLE POZİSYONU',
        'col.f1.desc': 'Hız tutkusu kumaşla buluşuyor. Formula 1 ruhu sokağa taşınıyor.',
        'col.tanrilar.tag': 'KOLEKSİYON 06 — SS 2026',
        'col.tanrilar.name': 'TANRILAR',
        'col.tanrilar.desc': 'Antik tanrıların gücü modern kumaşlarla buluşuyor.',
        'col.haliaraba.tag': 'KOLEKSİYON 07 — SS 2026',
        'col.haliaraba.name': 'KRALİYET SÜRÜŞÜ',
        'col.haliaraba.desc': 'Doğu\'nun dokuması, batının hızı. Halı motiflerinin zarafeti yarış ruhuyla buluşuyor.',
        'col.animal.tag': 'KOLEKSİYON 08 — SS 2026',
        'col.animal.name': 'İLKEL ÇİZGİLER',
        'col.animal.desc': 'Doğanın gücü minimalist çizgilerle buluşuyor. Hayvan silüetlerinin zarif estetiği.',
        'col.animalheadphone.tag': 'KOLEKSİYON 09 — SS 2026',
        'col.animalheadphone.name': 'ANIMAL HEADPHONE',
        'col.animalheadphone.desc': 'Müziğin ritmi hayvan dünyasıyla buluşuyor. Kulaklıklı hayvan silüetlerinin eşsiz estetiği.',
        'col.skateboard.tag': 'KOLEKSİYON 10 — SS 2026',
        'col.skateboard.name': 'SKATE BOARD',
        'col.skateboard.desc': 'Sokak kültürünün özgür ruhu kaykay estetiğiyle buluşuyor. Asfaltta özgürlük.',
        'products.4': '4 ÜRÜN',
        'products.5': '5 ÜRÜN',
        'products.6': '6 ÜRÜN',
        'products.7': '7 ÜRÜN',

        // Collection detail page
        'col.backCollections': '← Koleksiyonlar',
        'col.backAll': '← TÜM KOLEKSİYONLAR',
        'col.productCount': '{n} ÜRÜN',

        // Filters
        'filter.size': 'Beden <span class="filter-arrow">▾</span>',
        'filter.color': 'Renk <span class="filter-arrow">▾</span>',
        'filter.cut': 'Kesim <span class="filter-arrow">▾</span>',
        'filter.hooded': 'Kapüşonlu <span class="filter-arrow">▾</span>',
        'filter.black': 'Siyah',
        'filter.white': 'Beyaz',
        'filter.gray': 'Gri',
        'filter.yes': 'Evet',
        'filter.no': 'Hayır',

        // About
        'about.headerDesc': 'Markanın arkasındaki hikaye.',
        'about.storyLabel': 'HİKAYEMİZ',
        'about.storyHeading': 'Varoluşu Yeniden<br>Tanımlamak',
        'about.story1': 'INCRESIS, 2024 yılında İstanbul\'da doğdu. Sokak modasının enerjisini, minimalist tasarımın zarafetiyle birleştiren bir streetwear markası olarak yola çıktık.',
        'about.story2': 'Her koleksiyonumuz bir hikaye anlatır. Void\'un sessizliğinden Origin\'in ham gücüne, Noir\'ın karanlık lüksünden Ritual\'ın seremonisine — her parça bir manifestodur.',
        'about.story3': 'Amacımız sadece giysi üretmek değil, kimlik inşa etmek. Giydiğin şey kim olduğunu anlatır — biz buna inanıyoruz.',
        'about.valuesTitle': 'DEĞERLERİMİZ',
        'about.quality': 'KALİTE',
        'about.qualityDesc': 'Premium kumaşlar, titiz işçilik. Her dikişte mükemmellik arayışı.',
        'about.design': 'TASARIM',
        'about.designDesc': 'Minimalizm ve cesaret arasındaki denge. Trendleri takip etmek yerine yaratırız.',
        'about.sustainability': 'SÜRDÜRÜLEBİLİRLİK',
        'about.sustainabilityDesc': 'Bilinçli üretim, sorumlu tedarik. Gelecek nesiller için moda.',
        'about.community': 'TOPLULUK',
        'about.communityDesc': 'INCRESIS sadece bir marka değil, bir harekettir. Birlikte yaratırız.',
        'about.atelierTag': 'ATÖLYE',
        'about.atelierTitle': 'İSTANBUL\'DAN<br>DÜNYAYA',
        'about.atelierDesc': 'Tasarımlarımız İstanbul\'daki atölyemizde hayat buluyor. Her parça, yerel zanaatkarlarımızın ellerinden geçerek dünyanın dört bir yanına ulaşıyor.',

        // Contact
        'contact.headerDesc': 'Bizimle bağlantıya geçin.',
        'contact.formTitle': 'BİZE YAZIN',
        'contact.name': 'Ad Soyad',
        'contact.namePh': 'Adınız Soyadınız',
        'contact.email': 'E-posta',
        'contact.subject': 'Konu',
        'contact.subjectPh': 'Konu seçin',
        'contact.subjectOrder': 'Sipariş Bilgisi',
        'contact.subjectReturn': 'İade & Değişim',
        'contact.subjectCollab': 'İş Birliği',
        'contact.subjectOther': 'Diğer',
        'contact.message': 'Mesajınız',
        'contact.messagePh': 'Mesajınızı yazın...',
        'contact.send': 'GÖNDER',
        'contact.address': 'ADRES',
        'contact.emailTitle': 'E-POSTA',
        'contact.phone': 'TELEFON',
        'contact.phoneInfo': '+90 (212) 555 01 42<br>Pzt — Cuma, 09:00 — 18:00',
        'contact.social': 'SOSYAL MEDYA',
        'contact.formSuccess': 'Mesajınız gönderildi, teşekkürler!',

        // Footer
        'footer.info': 'BİLGİ',
        'footer.about': 'Hakkımızda',
        'footer.contact': 'İletişim',
        'footer.shipping': 'Kargo & İade',
        'footer.privacy': 'Gizlilik',
        'footer.tagline': 'Varoluşunu Yeniden Tanımla',
        'footer.copyright': '© 2026 INCRESIS — Tüm hakları saklıdır.',
        'footer.account': 'HESABIM',
        'footer.login': 'Giriş Yap',
        'footer.orders': 'Siparişler',
        'footer.register': 'Kayıt Ol',
        'footer.policies': 'POLİTİKALARIMIZ',
        'footer.terms': 'Kullanım Koşulları',
        'footer.distanceSales': 'Mesafeli Satış Sözleşmesi',
        'footer.deliveryReturn': 'Teslimat ve İade Koşulları',
        'footer.cookies': 'Çerez Politikası',
        'footer.privacyPolicy': 'Gizlilik Politikası',
        'footer.addressText': 'Nişantaşı, Abdi İpekçi Cad.<br>No: 42, Şişli / İstanbul',

        // Shipping & Returns
        'shipping.headerDesc': 'Teslimat ve iade süreçleri hakkında bilgiler.',
        'shipping.domesticTitle': 'YURTİÇİ KARGO',
        'shipping.domesticDesc': 'Türkiye genelinde 2-4 iş günü içinde teslimat. 500 ₺ ve üzeri siparişlerde ücretsiz kargo. Standart kargo ücreti 49,90 ₺\'dir.',
        'shipping.internationalTitle': 'ULUSLARARASI KARGO',
        'shipping.internationalDesc': 'Dünya genelinde 5-10 iş günü teslimat. Kargo ücreti ülkeye göre ödeme aşamasında hesaplanır. 150$ üzeri siparişlerde ücretsiz.',
        'shipping.trackingTitle': 'KARGO TAKİBİ',
        'shipping.trackingDesc': 'Siparişiniz kargoya verildikten sonra takip numarası e-posta ile gönderilir. Sipariş durumunuzu hesabınızdan da takip edebilirsiniz.',
        'shipping.returnTitle': 'İADE POLİTİKASI',
        'shipping.returnDesc': 'Ürünleri teslim aldıktan sonra 14 gün içinde, etiketleri sökülmemiş ve kullanılmamış olmaları koşuluyla iade edebilirsiniz. Yurt dışından iade kabul edilmemektedir.',
        'shipping.exchangeTitle': 'DEĞİŞİM',
        'shipping.exchangeDesc': 'Beden değişimi için ürünü iade edip yeni sipariş oluşturmanızı öneriyoruz. Değişim kargo ücreti tarafımızca karşılanır. Yurt dışından değişim kabul edilmemektedir.',
        'shipping.refundTitle': 'GERİ ÖDEME',
        'shipping.refundDesc': 'İade onaylandıktan sonra 3-5 iş günü içinde ödeme, orijinal ödeme yönteminize iade edilir. Kredi kartı iadelerinde banka süreci 7-14 gün sürebilir.',

        // Privacy
        'privacy.headerDesc': 'Kişisel verilerinizin korunması bizim için önceliklidir.',
        'privacy.collectTitle': 'VERİ TOPLAMA',
        'privacy.collectDesc': 'Sipariş oluşturma, hesap açma ve iletişim formları aracılığıyla adınız, e-posta adresiniz, telefon numaranız ve teslimat adresiniz gibi kişisel bilgilerinizi toplarız. Bu bilgiler yalnızca hizmet sunumu için kullanılır.',
        'privacy.useTitle': 'VERİ KULLANIMI',
        'privacy.useDesc': 'Topladığımız veriler sipariş işleme, teslimat, müşteri desteği ve — izniniz dahilinde — kampanya bildirimleri için kullanılır. Verileriniz hiçbir koşulda üçüncü taraflarla ticari amaçlı paylaşılmaz.',
        'privacy.cookieTitle': 'ÇEREZLER',
        'privacy.cookieDesc': 'Sitemiz, kullanıcı deneyimini iyileştirmek için çerez kullanır. Oturum çerezleri, dil tercihi ve tema seçimi gibi bilgileri saklar. Tarayıcı ayarlarınızdan çerezleri yönetebilirsiniz.',
        'privacy.securityTitle': 'GÜVENLİK',
        'privacy.securityDesc': 'Tüm ödeme işlemleri SSL şifreleme ile korunur. Kredi kartı bilgileriniz sunucularımızda saklanmaz; PCI-DSS uyumlu ödeme altyapısı kullanılır.',
        'privacy.rightsTitle': 'HAKLARINIZ',
        'privacy.rightsDesc': 'KVKK kapsamında kişisel verilerinize erişim, düzeltme ve silme haklarına sahipsiniz. Bu haklarınızı kullanmak için info@incresis.com adresine başvurabilirsiniz.',
        'privacy.updateTitle': 'POLİTİKA GÜNCELLEMELERİ',
        'privacy.updateDesc': 'Bu gizlilik politikası zaman zaman güncellenebilir. Önemli değişikliklerde kayıtlı e-posta adresinize bildirim gönderilir. Son güncelleme: Mart 2026.',

        // Terms
        'terms.title': 'KULLANIM KOŞULLARI',
        'terms.headerDesc': 'Web sitemizin kullanım şartları ve koşulları.',
        'terms.generalTitle': 'GENEL HÜKÜMLER',
        'terms.generalDesc': 'Bu web sitesini (incresis.com) kullanarak aşağıdaki kullanım koşullarını kabul etmiş sayılırsınız. Siteye erişiminiz tamamen bu sözleşmeyi kabulünüze ve belirlenen şartlara uymanıza bağlıdır.',
        'terms.ipTitle': 'FİKRİ MÜLKİYET',
        'terms.ipDesc': 'Site üzerindeki tüm içerik, tasarım, logo, metin, grafik ve görseller INCRESIS\'in mülkiyetindedir. İzinsiz kopyalama, dağıtım veya ticari amaçlı kullanım yasaktır.',
        'terms.accountTitle': 'HESAP SORUMLULUĞU',
        'terms.accountDesc': 'Hesap oluşturduğunuzda bilgilerinizin doğruluğundan ve hesap güvenliğinden siz sorumlusunuz. Hesabınızda gerçekleştirilen tüm işlemlerden siz sorumlu tutulursunuz.',
        'terms.productTitle': 'ÜRÜN BİLGİLERİ',
        'terms.productDesc': 'Ürün fotoğrafları ve açıklamaları mümkün olduğunca doğru şekilde sunulmaktadır. Ancak renk tonlarında ekran ayarlarına bağlı farklılıklar oluşabilir.',
        'terms.liabilityTitle': 'SORUMLULUK SINIRLAMASI',
        'terms.liabilityDesc': 'INCRESIS, site kullanımından kaynaklanan dolaylı zararlardan sorumlu tutulamaz. Bakım, güncelleme veya mücbir sebepler nedeniyle hizmet kesintileri oluşabilir.',
        'terms.lawTitle': 'UYGULANACAK HUKUK',
        'terms.lawDesc': 'Bu kullanım koşulları Türkiye Cumhuriyeti kanunlarına tabidir. Uyuşmazlıklarda İstanbul Mahkemeleri ve İcra Daireleri yetkilidir.',

        // Distance Sales
        'distance.title': 'MESAFELİ SATIŞ SÖZLEŞMESİ',
        'distance.headerDesc': 'Mesafeli satış sözleşmesi ön bilgilendirme formu.',
        'distance.sellerTitle': 'SATICI BİLGİLERİ',
        'distance.sellerDesc': 'Ünvan: INCRESIS Giyim San. ve Tic. Ltd. Şti. — Adres: Nişantaşı, Abdi İpekçi Cad. No: 42, Şişli / İstanbul — E-posta: info@incresis.com — Telefon: +90 212 XXX XX XX',
        'distance.contractTitle': 'SÖZLEŞME KONUSU',
        'distance.contractDesc': 'İşbu sözleşmenin konusu, ALICI\'nın SATICI\'ya ait web sitesinden elektronik ortamda siparişini verdiği ürünlerin satışı ve teslimi ile ilgili 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümleri gereğince tarafların hak ve yükümlülüklerinin belirlenmesidir.',
        'distance.priceTitle': 'FİYAT VE ÖDEME',
        'distance.priceDesc': 'Ürün fiyatları KDV dahildir. Ödeme; kredi kartı, banka kartı veya havale/EFT ile yapılabilir.',
        'distance.deliveryTitle': 'TESLİMAT',
        'distance.deliveryDesc': 'Sipariş onayından itibaren yurtiçi teslimatlar 2-4 iş günü, yurtdışı teslimatlar 5-10 iş günü içinde gerçekleştirilir.',
        'distance.withdrawTitle': 'CAYMA HAKKI',
        'distance.withdrawDesc': 'ALICI, ürünü teslim aldığı tarihten itibaren 14 gün içinde herhangi bir gerekçe göstermeksizin cayma hakkını kullanabilir. Ürünlerin kullanılmamış ve etiketleri sökülmemiş olması gerekmektedir.',
        'distance.disputeTitle': 'UYUŞMAZLIK',
        'distance.disputeDesc': 'İşbu sözleşmeden doğan uyuşmazlıklarda Tüketici Hakem Heyetleri ve Tüketici Mahkemeleri yetkilidir.',

        // Cookies
        'cookies.title': 'ÇEREZ POLİTİKASI',
        'cookies.headerDesc': 'Çerezlerin kullanımı hakkında bilgilendirme.',
        'cookies.whatTitle': 'ÇEREZ NEDİR?',
        'cookies.whatDesc': 'Çerezler, web sitelerinin tarayıcınıza kaydettiği küçük metin dosyalarıdır. Siteyi tekrar ziyaret ettiğinizde tercihlerinizi hatırlamak ve deneyiminizi kişiselleştirmek için kullanılır.',
        'cookies.typesTitle': 'KULLANILAN ÇEREZ TÜRLERİ',
        'cookies.typesDesc': 'Zorunlu Çerezler: Sitenin çalışması için gereklidir. Tercih Çerezleri: Dil ve tema seçiminizi hatırlar. Analitik Çerezler: Site kullanım istatistiklerini toplar. Pazarlama Çerezleri: İlgi alanlarınıza uygun reklamlar sunar.',
        'cookies.whyTitle': 'ÇEREZ KULLANIM AMAÇLARI',
        'cookies.whyDesc': 'Çerezleri; sitenin düzgün çalışmasını sağlamak, kullanıcı deneyimini iyileştirmek, güvenliği artırmak, tercihlerinizi hatırlamak ve anonim istatistikler toplamak amacıyla kullanıyoruz.',
        'cookies.manageTitle': 'ÇEREZ YÖNETİMİ',
        'cookies.manageDesc': 'Tarayıcı ayarlarınızdan çerezleri silebilir veya engelleyebilirsiniz. Ancak zorunlu çerezleri devre dışı bırakmak sitenin bazı özelliklerinin çalışmamasına neden olabilir.',

        // Auth
        'login.title': 'GİRİŞ YAP',
        'login.headerDesc': 'Hesabınıza giriş yapın.',
        'login.email': 'E-posta',
        'login.emailPh': 'ornek@email.com',
        'login.password': 'Şifre',
        'login.passwordPh': '••••••••',
        'login.submit': 'GİRİŞ YAP',
        'login.noAccount': 'Hesabınız yok mu?',
        'login.registerLink': 'Kayıt Ol',
        'login.success': 'Giriş başarılı!',

        'register.title': 'KAYIT OL',
        'register.headerDesc': 'Yeni hesap oluşturun.',
        'register.name': 'Ad Soyad',
        'register.namePh': 'Ad Soyad',
        'register.phone': 'Telefon',
        'register.email': 'E-posta',
        'register.emailPh': 'ornek@email.com',
        'register.password': 'Şifre',
        'register.passwordPh': '••••••••',
        'register.password2': 'Şifre Tekrar',
        'register.password2Ph': '••••••••',
        'register.terms': 'Kullanım koşullarını ve gizlilik politikasını okudum, kabul ediyorum.',
        'register.submit': 'KAYIT OL',
        'register.hasAccount': 'Zaten hesabınız var mı?',
        'register.loginLink': 'Giriş Yap',
        'register.success': 'Kayıt başarılı! Hoş geldiniz.',

        'orders.title': 'SİPARİŞLERİM',
        'orders.headerDesc': 'Sipariş geçmişinizi görüntüleyin.',
        'orders.emptyTitle': 'Henüz siparişiniz yok',
        'orders.emptyDesc': 'Sipariş verdikten sonra burada takip edebilirsiniz.',
        'orders.shopNow': 'ALIŞVERİŞE BAŞLA',

        // Checkout Modal
        'checkout.title': 'SİPARİŞİ ONAYLA',
        'checkout.desc': 'Devam etmek için giriş yapın veya kayıt olun.',
        'checkout.login': 'GİRİŞ YAP',
        'checkout.register': 'KAYIT OL',
        'checkout.or': 'veya',
        'checkout.guest': 'KAYIT OLMADAN DEVAM ET →',
        'checkout.guestSuccess': 'Siparişiniz alındı! Teşekkürler.',

        // Search
        'search.placeholder': 'Ürün ara...',
        'search.noResults': 'Sonuç bulunamadı',

        // Cart
        'cart.title': 'SEPETİM',
        'cart.empty': 'Sepetiniz boş',
        'cart.emptyHint': 'Ürün ekleyerek başlayın',
        'cart.total': 'TOPLAM',
        'cart.freeShipping': 'Ücretsiz kargo',
        'cart.checkout': 'SİPARİŞ VER',
        'cart.addedToast': '{name} — {size} sepete eklendi',

        // Modal
        'modal.selectSize': 'BEDEN SEÇİN',
        'modal.sizeError': 'Lütfen beden seçin',
        'modal.addToCart': 'SEPETE EKLE',
        'modal.color': 'RENK',
        'detail.color': 'RENK',

        // Product buttons
        'product.addToCart': 'SEPETE EKLE →',

        // Piece labels (inside circles & product cards)
        'piece.TEE': 'TİŞÖRT',
        'piece.HOOD': 'KAPÜŞON',
        'piece.JKT': 'CEKET',
        'piece.CARGO': 'KARGO',
        'piece.SHIRT': 'GÖMLEK',
        'piece.DENIM': 'DENİM',
        'piece.VEST': 'YELEK',
        'piece.TROUS': 'PANT.',
        'piece.BLZR': 'BLAZER',
        'piece.COAT': 'PALTO',
        'piece.PANT': 'PANT.',
        'piece.TRTL': 'BALK.',
        'piece.OC': 'PALTO',
        'piece.KIM': 'KİMONO',
        'piece.WIDE': 'GENİŞ',
        'piece.TOP': 'ÜST',
        'piece.WRAP': 'SARIŞ',
        'piece.STR': 'YAPISAL',
        'piece.LAYR': 'KATMAN',
        'piece.SHT': 'ŞORT',
        'piece.LS': 'UZUN K.',
        'piece.F1': 'POLE POZİSYONU',
        'piece.GODS': 'TANRILAR',
        'piece.HALIARABA': 'KRALİYET SÜRÜŞÜ',
        'piece.ANIMAL': 'İLKEL ÇİZGİLER',
        'piece.ANIMALHEADPHONE': 'ANIMAL HP',
        'piece.SKATEBOARD': 'SKATE BOARD',
    },
    en: {
        // Nav
        'nav.collections': 'COLLECTIONS',
        'nav.about': 'ABOUT US',
        'nav.contact': 'CONTACT',

        // Hero
        'hero.tag': 'SS 2026 — NEW SEASON',
        'hero.title': 'REDEFINE<br><span class="hero-title-accent">YOUR EXISTENCE</span>',
        'hero.sub': 'What you wear tells who you are.',
        'hero.cta': 'EXPLORE COLLECTIONS',

        // Categories
        'cat.tee': 'TEE',
        'cat.hoodie': 'HOODIE',
        'cat.jacket': 'JACKET',
        'cat.sweatpants': 'SWEATPANTS',
        'cat.shorts': 'SHORTS',

        // Banners
        'banner.view': 'VIEW COLLECTION →',
        'banner.viewFull': 'VIEW FULL COLLECTION →',

        // Featured
        'featured.tag': 'NOIR COLLECTION',
        'featured.title': 'DARKNESS<br>AS LUXURY',

        // Home
        'home.bestsellers': 'BESTSELLERS',
        'home.bestsellersTag': 'BESTSELLERS',
        'home.seeAll': 'See All →',

        // Category page
        'category.comingSoon': 'Products in this category coming soon',
        'category.back': 'Home',

        // Collections page
        'collections.tag': 'SS 2026',
        'collections.desc': 'Every collection tells a story.',
        'col.f1.tag': 'COLLECTION 05 — SS 2026',
        'col.f1.name': 'POLE POSITION',
        'col.f1.desc': 'The passion for speed meets fabric. The spirit of Formula 1 hits the streets.',
        'col.tanrilar.tag': 'COLLECTION 06 — SS 2026',
        'col.tanrilar.name': 'GODS',
        'col.tanrilar.desc': 'The power of ancient gods meets modern fabric.',
        'col.haliaraba.tag': 'COLLECTION 07 — SS 2026',
        'col.haliaraba.name': 'DRIVE ROYALE',
        'col.haliaraba.desc': 'Eastern weaving meets western speed. The elegance of carpet motifs merges with racing spirit.',
        'col.animal.tag': 'COLLECTION 08 — SS 2026',
        'col.animal.name': 'PRIMAL LINES',
        'col.animal.desc': 'The power of nature meets minimalist lines. The elegant aesthetic of animal silhouettes.',
        'col.animalheadphone.tag': 'COLLECTION 09 — SS 2026',
        'col.animalheadphone.name': 'ANIMAL HEADPHONE',
        'col.animalheadphone.desc': 'The rhythm of music meets the animal world. The unique aesthetic of headphone-wearing animal silhouettes.',
        'col.skateboard.tag': 'COLLECTION 10 — SS 2026',
        'col.skateboard.name': 'SKATE BOARD',
        'col.skateboard.desc': 'The free spirit of street culture meets skateboard aesthetics. Freedom on asphalt.',
        'products.4': '4 PRODUCTS',
        'products.5': '5 PRODUCTS',
        'products.6': '6 PRODUCTS',
        'products.7': '7 PRODUCTS',

        // Collection detail page
        'col.backCollections': '← Collections',
        'col.backAll': '← ALL COLLECTIONS',
        'col.productCount': '{n} PRODUCTS',

        // Filters
        'filter.size': 'Size <span class="filter-arrow">▾</span>',
        'filter.color': 'Color <span class="filter-arrow">▾</span>',
        'filter.cut': 'Fit <span class="filter-arrow">▾</span>',
        'filter.hooded': 'Hooded <span class="filter-arrow">▾</span>',
        'filter.black': 'Black',
        'filter.white': 'White',
        'filter.gray': 'Gray',
        'filter.yes': 'Yes',
        'filter.no': 'No',

        // About
        'about.headerDesc': 'The story behind the brand.',
        'about.storyLabel': 'OUR STORY',
        'about.storyHeading': 'Redefining<br>Existence',
        'about.story1': 'INCRESIS was born in Istanbul in 2024. We set out as a streetwear brand that merges the energy of street fashion with the elegance of minimalist design.',
        'about.story2': 'Each collection tells a story. From the silence of Void to the raw power of Origin, from Noir\'s dark luxury to Ritual\'s ceremony — every piece is a manifesto.',
        'about.story3': 'Our purpose is not just to produce clothing, but to build identity. What you wear tells who you are — we believe in that.',
        'about.valuesTitle': 'OUR VALUES',
        'about.quality': 'QUALITY',
        'about.qualityDesc': 'Premium fabrics, meticulous craftsmanship. A pursuit of excellence in every stitch.',
        'about.design': 'DESIGN',
        'about.designDesc': 'The balance between minimalism and boldness. We create trends, not follow them.',
        'about.sustainability': 'SUSTAINABILITY',
        'about.sustainabilityDesc': 'Conscious production, responsible sourcing. Fashion for future generations.',
        'about.community': 'COMMUNITY',
        'about.communityDesc': 'INCRESIS is not just a brand, it\'s a movement. We create together.',
        'about.atelierTag': 'ATELIER',
        'about.atelierTitle': 'FROM ISTANBUL<br>TO THE WORLD',
        'about.atelierDesc': 'Our designs come to life in our Istanbul atelier. Each piece passes through the hands of our local artisans, reaching every corner of the world.',

        // Contact
        'contact.headerDesc': 'Get in touch with us.',
        'contact.formTitle': 'WRITE TO US',
        'contact.name': 'Full Name',
        'contact.namePh': 'Your Full Name',
        'contact.email': 'Email',
        'contact.subject': 'Subject',
        'contact.subjectPh': 'Select a subject',
        'contact.subjectOrder': 'Order Information',
        'contact.subjectReturn': 'Returns & Exchange',
        'contact.subjectCollab': 'Collaboration',
        'contact.subjectOther': 'Other',
        'contact.message': 'Your Message',
        'contact.messagePh': 'Write your message...',
        'contact.send': 'SEND',
        'contact.address': 'ADDRESS',
        'contact.emailTitle': 'EMAIL',
        'contact.phone': 'PHONE',
        'contact.phoneInfo': '+90 (212) 555 01 42<br>Mon — Fri, 09:00 — 18:00',
        'contact.social': 'SOCIAL MEDIA',
        'contact.formSuccess': 'Your message has been sent, thank you!',

        // Footer
        'footer.info': 'INFO',
        'footer.about': 'About Us',
        'footer.contact': 'Contact',
        'footer.shipping': 'Shipping & Returns',
        'footer.privacy': 'Privacy',
        'footer.tagline': 'Redefine Your Existence',
        'footer.copyright': '© 2026 INCRESIS — All rights reserved.',

        // Shipping & Returns
        'shipping.headerDesc': 'Information about delivery and return processes.',
        'shipping.domesticTitle': 'DOMESTIC SHIPPING',
        'shipping.domesticDesc': 'Delivery within Turkey in 2-4 business days. Free shipping on orders over 500 ₺. Standard shipping fee is 49.90 ₺.',
        'shipping.internationalTitle': 'INTERNATIONAL SHIPPING',
        'shipping.internationalDesc': 'Worldwide delivery in 5-10 business days. Shipping costs calculated at checkout based on destination. Free on orders over $150.',
        'shipping.trackingTitle': 'ORDER TRACKING',
        'shipping.trackingDesc': 'A tracking number will be sent via email once your order ships. You can also track your order status through your account.',
        'shipping.returnTitle': 'RETURN POLICY',
        'shipping.returnDesc': 'Items can be returned within 14 days of delivery, provided tags are intact and items are unworn. International returns are not accepted.',
        'shipping.exchangeTitle': 'EXCHANGES',
        'shipping.exchangeDesc': 'For size exchanges, we recommend returning the item and placing a new order. Exchange shipping costs are covered by us. International exchanges are not accepted.',
        'shipping.refundTitle': 'REFUNDS',
        'shipping.refundDesc': 'After return approval, refunds are processed within 3-5 business days to your original payment method. Credit card refunds may take 7-14 days due to bank processing.',

        // Privacy
        'privacy.headerDesc': 'Protecting your personal data is our priority.',
        'privacy.collectTitle': 'DATA COLLECTION',
        'privacy.collectDesc': 'We collect personal information such as your name, email address, phone number, and delivery address through order placement, account creation, and contact forms. This data is used solely for service delivery.',
        'privacy.useTitle': 'DATA USAGE',
        'privacy.useDesc': 'Collected data is used for order processing, delivery, customer support, and — with your consent — promotional notifications. Your data is never shared with third parties for commercial purposes.',
        'privacy.cookieTitle': 'COOKIES',
        'privacy.cookieDesc': 'Our site uses cookies to enhance user experience. Session cookies store information such as language preference and theme selection. You can manage cookies through your browser settings.',
        'privacy.securityTitle': 'SECURITY',
        'privacy.securityDesc': 'All payment transactions are protected with SSL encryption. Your credit card information is not stored on our servers; PCI-DSS compliant payment infrastructure is used.',
        'privacy.rightsTitle': 'YOUR RIGHTS',
        'privacy.rightsDesc': 'Under GDPR/KVKK regulations, you have the right to access, correct, and delete your personal data. To exercise these rights, contact info@incresis.com.',
        'privacy.updateTitle': 'POLICY UPDATES',
        'privacy.updateDesc': 'This privacy policy may be updated from time to time. You will be notified via email of any significant changes. Last updated: March 2026.',

        // Footer extras
        'footer.account': 'MY ACCOUNT',
        'footer.login': 'Sign In',
        'footer.orders': 'Orders',
        'footer.register': 'Sign Up',
        'footer.policies': 'OUR POLICIES',
        'footer.terms': 'Terms of Use',
        'footer.distanceSales': 'Distance Sales Agreement',
        'footer.deliveryReturn': 'Delivery & Returns',
        'footer.cookies': 'Cookie Policy',
        'footer.privacyPolicy': 'Privacy Policy',
        'footer.addressText': 'Nişantaşı, Abdi İpekçi Cad.<br>No: 42, Şişli / İstanbul',

        // Terms
        'terms.title': 'TERMS OF USE',
        'terms.headerDesc': 'Terms and conditions of our website.',
        'terms.generalTitle': 'GENERAL PROVISIONS',
        'terms.generalDesc': 'By using this website (incresis.com) you accept the following terms and conditions. Your access to the site is subject to your acceptance of this agreement.',
        'terms.ipTitle': 'INTELLECTUAL PROPERTY',
        'terms.ipDesc': 'All content, designs, logos, text, graphics and images on this site are the property of INCRESIS. Unauthorized copying, distribution or commercial use is prohibited.',
        'terms.accountTitle': 'ACCOUNT RESPONSIBILITY',
        'terms.accountDesc': 'When you create an account, you are responsible for the accuracy of your information and account security. You are liable for all activities under your account.',
        'terms.productTitle': 'PRODUCT INFORMATION',
        'terms.productDesc': 'Product photos and descriptions are presented as accurately as possible. However, color differences may occur due to screen settings.',
        'terms.liabilityTitle': 'LIMITATION OF LIABILITY',
        'terms.liabilityDesc': 'INCRESIS cannot be held liable for indirect damages arising from site use. Service interruptions may occur due to maintenance, updates or force majeure.',
        'terms.lawTitle': 'APPLICABLE LAW',
        'terms.lawDesc': 'These terms are governed by the laws of the Republic of Turkey. Istanbul Courts and Enforcement Offices have jurisdiction over disputes.',

        // Distance Sales
        'distance.title': 'DISTANCE SALES AGREEMENT',
        'distance.headerDesc': 'Distance sales agreement pre-information form.',
        'distance.sellerTitle': 'SELLER INFORMATION',
        'distance.sellerDesc': 'Company: INCRESIS Clothing Inc. — Address: Nişantaşı, Abdi İpekçi Cad. No: 42, Şişli / Istanbul — Email: info@incresis.com — Phone: +90 212 XXX XX XX',
        'distance.contractTitle': 'SUBJECT OF AGREEMENT',
        'distance.contractDesc': 'This agreement governs the sale and delivery of products ordered electronically through the SELLER\'s website, determining the rights and obligations of the parties.',
        'distance.priceTitle': 'PRICE & PAYMENT',
        'distance.priceDesc': 'Product prices include VAT. Payment can be made by credit card, debit card or bank transfer.',
        'distance.deliveryTitle': 'DELIVERY',
        'distance.deliveryDesc': 'Domestic deliveries are made within 2-4 business days, international deliveries within 5-10 business days from order confirmation.',
        'distance.withdrawTitle': 'RIGHT OF WITHDRAWAL',
        'distance.withdrawDesc': 'The BUYER may exercise the right of withdrawal within 14 days from delivery without giving any reason. Products must be unused with tags intact.',
        'distance.disputeTitle': 'DISPUTES',
        'distance.disputeDesc': 'Consumer Arbitration Committees and Consumer Courts have jurisdiction over disputes arising from this agreement.',

        // Cookies
        'cookies.title': 'COOKIE POLICY',
        'cookies.headerDesc': 'Information about the use of cookies.',
        'cookies.whatTitle': 'WHAT ARE COOKIES?',
        'cookies.whatDesc': 'Cookies are small text files stored by websites in your browser. They are used to remember your preferences and personalize your experience.',
        'cookies.typesTitle': 'TYPES OF COOKIES USED',
        'cookies.typesDesc': 'Essential Cookies: Required for site operation. Preference Cookies: Remember your language and theme. Analytics Cookies: Collect usage statistics. Marketing Cookies: Serve relevant ads.',
        'cookies.whyTitle': 'PURPOSE OF COOKIES',
        'cookies.whyDesc': 'We use cookies to ensure proper site functionality, improve user experience, enhance security, remember your preferences, and collect anonymous statistics.',
        'cookies.manageTitle': 'MANAGING COOKIES',
        'cookies.manageDesc': 'You can delete or block cookies through your browser settings. However, disabling essential cookies may cause some site features to stop working.',

        // Auth
        'login.title': 'SIGN IN',
        'login.headerDesc': 'Sign in to your account.',
        'login.email': 'Email',
        'login.emailPh': 'example@email.com',
        'login.password': 'Password',
        'login.passwordPh': '••••••••',
        'login.submit': 'SIGN IN',
        'login.noAccount': 'Don\'t have an account?',
        'login.registerLink': 'Sign Up',
        'login.success': 'Login successful!',

        'register.title': 'SIGN UP',
        'register.headerDesc': 'Create a new account.',
        'register.name': 'Full Name',
        'register.namePh': 'Full Name',
        'register.phone': 'Phone',
        'register.email': 'Email',
        'register.emailPh': 'example@email.com',
        'register.password': 'Password',
        'register.passwordPh': '••••••••',
        'register.password2': 'Confirm Password',
        'register.password2Ph': '••••••••',
        'register.terms': 'I have read and accept the terms of use and privacy policy.',
        'register.submit': 'SIGN UP',
        'register.hasAccount': 'Already have an account?',
        'register.loginLink': 'Sign In',
        'register.success': 'Registration successful! Welcome.',

        'orders.title': 'MY ORDERS',
        'orders.headerDesc': 'View your order history.',
        'orders.emptyTitle': 'No orders yet',
        'orders.emptyDesc': 'After placing an order, you can track it here.',
        'orders.shopNow': 'START SHOPPING',

        // Checkout Modal
        'checkout.title': 'CONFIRM ORDER',
        'checkout.desc': 'Sign in or create an account to continue.',
        'checkout.login': 'SIGN IN',
        'checkout.register': 'SIGN UP',
        'checkout.or': 'or',
        'checkout.guest': 'CONTINUE AS GUEST →',
        'checkout.guestSuccess': 'Your order has been placed! Thank you.',

        // Search
        'search.placeholder': 'Search products...',
        'search.noResults': 'No results found',

        // Cart
        'cart.title': 'MY CART',
        'cart.empty': 'Your cart is empty',
        'cart.emptyHint': 'Start by adding products',
        'cart.total': 'TOTAL',
        'cart.freeShipping': 'Free shipping',
        'cart.checkout': 'CHECKOUT',
        'cart.addedToast': '{name} — {size} added to cart',

        // Modal
        'modal.selectSize': 'SELECT SIZE',
        'modal.sizeError': 'Please select a size',
        'modal.addToCart': 'ADD TO CART',
        'modal.color': 'COLOR',
        'detail.color': 'COLOR',

        // Product buttons
        'product.addToCart': 'ADD TO CART →',

        // Piece labels (inside circles & product cards)
        'piece.TEE': 'TEE',
        'piece.HOOD': 'HOOD',
        'piece.JKT': 'JKT',
        'piece.CARGO': 'CARGO',
        'piece.SHIRT': 'SHIRT',
        'piece.DENIM': 'DENIM',
        'piece.VEST': 'VEST',
        'piece.TROUS': 'TROUS',
        'piece.BLZR': 'BLZR',
        'piece.COAT': 'COAT',
        'piece.PANT': 'PANT',
        'piece.TRTL': 'TRTL',
        'piece.OC': 'OC',
        'piece.KIM': 'KIM',
        'piece.WIDE': 'WIDE',
        'piece.TOP': 'TOP',
        'piece.WRAP': 'WRAP',
        'piece.STR': 'STR',
        'piece.LAYR': 'LAYR',
        'piece.SHT': 'SHT',
        'piece.LS': 'LS',
        'piece.F1': 'POLE POSITION',
        'piece.GODS': 'GODS',
        'piece.HALIARABA': 'DRIVE ROYALE',
        'piece.ANIMAL': 'PRIMAL LINES',
        'piece.ANIMALHEADPHONE': 'ANIMAL HP',
        'piece.SKATEBOARD': 'SKATE BOARD',
    }
};

let currentLang = localStorage.getItem('incresis-lang') || 'tr';

/* ── CURRENCY — location-based (geo-locked) ──────────── */
let userCurrency = null;   // 'TRY' or 'USD' — set by geo-detection

// Get price value based on user's currency (location-locked)
function getPrice(priceObj) {
    if (typeof priceObj === 'object' && priceObj !== null) {
        return userCurrency === 'USD' ? (priceObj.en || 0) : (priceObj.tr || 0);
    }
    return priceObj || 0; // backward compat
}

// Format price with currency symbol
function formatPrice(priceObj) {
    const val = (typeof priceObj === 'number') ? priceObj : getPrice(priceObj);
    if (userCurrency === 'USD') {
        return '$' + val.toLocaleString('en-US');
    }
    return val.toLocaleString('tr-TR') + ' ₺';
}

// Format a raw numeric total
function formatTotal(num) {
    if (userCurrency === 'USD') return '$' + num.toLocaleString('en-US');
    return num.toLocaleString('tr-TR') + ' ₺';
}

// Detect user country via IP
(async function detectCurrency() {
    try {
        const res = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(3000) });
        const data = await res.json();
        const country = data.country_code || 'TR';
        userCurrency = (country === 'TR') ? 'TRY' : 'USD';
        localStorage.setItem('incresis-country', country);
        // First visit: auto-set language based on country
        if (!localStorage.getItem('incresis-lang')) {
            const autoLang = (country === 'TR') ? 'tr' : 'en';
            setLanguage(autoLang);
        }
    } catch {
        // Fallback: match language as last resort
        userCurrency = (currentLang === 'tr') ? 'TRY' : 'USD';
    }
    localStorage.setItem('incresis-currency', userCurrency);
    // Re-render prices with detected currency
    renderBestsellers();
    renderCart();
    // Update any open collection page
    const detailPage = document.getElementById('page-collection-detail');
    if (detailPage && detailPage.classList.contains('active') && window._currentCollectionKey) {
        showCollection(window._currentCollectionKey);
    }
})();

function t(key, replacements) {
    let text = LANG[currentLang]?.[key] || LANG.tr[key] || key;
    if (replacements) {
        Object.keys(replacements).forEach(k => {
            text = text.replace(`{${k}}`, replacements[k]);
        });
    }
    return text;
}

/* Helper: get localized text from bilingual object or plain string */
function loc(val) {
    if (typeof val === 'object' && val !== null) return val[currentLang] || val.en || val.tr || '';
    return val || '';
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('incresis-lang', lang);
    document.documentElement.lang = lang;

    // Update slider toggle
    const langSwitch = document.getElementById('lang-toggle');
    if (langSwitch) {
        langSwitch.dataset.lang = lang;
        langSwitch.querySelectorAll('.lang-option').forEach(opt => {
            opt.classList.toggle('active', opt.dataset.lang === lang);
        });
    }

    // Update all data-i18n elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        const val = t(key);
        if (val) el.innerHTML = val;
    });

    // Update all data-i18n-placeholder elements
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.dataset.i18nPlaceholder;
        const val = t(key);
        if (val) el.placeholder = val;
    });

    // Update all data-piece attributes (circle labels & product card deco text)
    document.querySelectorAll('[data-piece]').forEach(el => {
        const originalPiece = el.dataset.originalPiece || el.dataset.piece;
        if (!el.dataset.originalPiece) el.dataset.originalPiece = originalPiece;
        const translated = t('piece.' + originalPiece);
        if (translated && translated !== 'piece.' + originalPiece) {
            el.dataset.piece = translated;
        }
    });

    // Update hero background (always use EN version)
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) heroBg.style.backgroundImage = `url('img/header_en.png')`;

    // Update language-specific collection backgrounds
    const langBgs = {
        '.f1-banner-bg, .f1': lang === 'en' ? 'img/polepozisyonu-en.png' : 'img/polepozisyonu-tr.png',
        '.tanrilar-banner-bg, .tanrilar': lang === 'en' ? 'img/tanrilar-en.png' : 'img/tanrilar-tr.png',
        '.haliaraba-banner-bg, .haliaraba': lang === 'en' ? 'img/kraliyetsurusu-en.png' : 'img/kraliyetsurusu-tr.png',
        '.animal-banner-bg, .animal': lang === 'en' ? 'img/ilkelçizgiler-en.png' : 'img/ilkelçizgiler-tr.png',
    };
    Object.entries(langBgs).forEach(([sel, img]) => {
        document.querySelectorAll(sel).forEach(el => {
            el.style.backgroundImage = `url('${img}')`;
        });
    });

    // Re-render dynamic content
    renderBestsellers();
    renderCart();

    // If on collection detail page, re-render entire page (banner + products)
    const colDetailPage = document.getElementById('page-collection');
    if (colDetailPage && colDetailPage.classList.contains('active') && window._currentCollectionKey) {
        showCollection(window._currentCollectionKey);
    }

    // If on collection detail page, re-render product count
    const countEl = document.getElementById('products-count');
    if (countEl && countEl.textContent) {
        const num = parseInt(countEl.textContent);
        if (!isNaN(num)) {
            countEl.textContent = t('col.productCount', { n: num });
        }
    }

    // Re-render product "SEPETE EKLE" buttons on collection page
    document.querySelectorAll('.btn-add-cart').forEach(btn => {
        btn.textContent = t('product.addToCart');
    });
}

/* ── DATA ─────────────────────────────────────────────── */
const COLLECTIONS = {
    f1: {
        name: { tr: 'POLE POZİSYONU', en: 'POLE POSITION' },
        sub: { tr: 'KOLEKSİYON 05 — SS 2026', en: 'COLLECTION 05 — SS 2026' },
        desc: { tr: 'Hız tutkusu kumaşla buluşuyor. Gece yarışları, pit stop anları ve asfaltın ateşi — Formula 1 ruhu sokağa taşınıyor.', en: 'The passion for speed meets fabric. Night races, pit stop moments and the fire of asphalt — the spirit of Formula 1 hits the streets.' },
        bannerBg: 'f1',
        products: [
            { id: 'f1a', name: { tr: 'GECE YARIŞI KAPÜŞONLU',     en: 'NIGHT RACE HOODIE' },     sub: { tr: 'Ağır French Terry', en: 'Heavy French Terry' }, price: { tr: 749.99, en: 749.99 },  img: 'img/collections/f1/6-back.jpg', imgs: ['img/collections/f1/6-back.jpg','img/collections/f1/6-front.jpg'], piece: 'F1', type: 'hoodie' },
            { id: 'f1b', name: { tr: 'PİT STOP KAPÜŞONLU',        en: 'PIT STOP HOODIE' },       sub: { tr: 'Ağır French Terry', en: 'Heavy French Terry' }, price: { tr: 749.99, en: 749.99 },  img: 'img/collections/f1/7-back.jpg', imgs: ['img/collections/f1/7-back.jpg','img/collections/f1/7-front.jpg'], piece: 'F1', type: 'hoodie' },
            { id: 'f1c', name: { tr: 'DÜELLO KAPÜŞONLU',           en: 'DUEL HOODIE' },           sub: { tr: 'Ağır French Terry', en: 'Heavy French Terry' }, price: { tr: 749.99, en: 749.99 },  img: 'img/collections/f1/8-back.jpg', imgs: ['img/collections/f1/8-back.jpg','img/collections/f1/8-front.jpg'], piece: 'F1', type: 'hoodie' },
            { id: 'f1d', name: { tr: 'YAĞMUR YARIŞI KAPÜŞONLU',   en: 'RAIN RACE HOODIE' },      sub: { tr: 'Ağır French Terry', en: 'Heavy French Terry' }, price: { tr: 749.99, en: 749.99 },  img: 'img/collections/f1/9-back.jpg', imgs: ['img/collections/f1/9-back.jpg','img/collections/f1/9-front.jpg'], piece: 'F1', type: 'hoodie' },
            { id: 'f1e', name: { tr: 'KUM FIRTINASI KAPÜŞONLU',   en: 'SANDSTORM HOODIE' },      sub: { tr: 'Ağır French Terry', en: 'Heavy French Terry' }, price: { tr: 749.99, en: 749.99 },  img: 'img/collections/f1/10-back.jpg', imgs: ['img/collections/f1/10-back.jpg','img/collections/f1/10-front.jpg'], piece: 'F1', type: 'hoodie' },
        ]
    },
    tanrilar: {
        name: { tr: 'TANRILAR', en: 'GODS' },
        sub: { tr: 'KOLEKSİYON 06 — SS 2026', en: 'COLLECTION 06 — SS 2026' },
        desc: { tr: 'Antik tanrıların gücü modern kumaşlarla buluşuyor. Mermer heykellerin zarafeti, mitolojinin karanlık estetiği — sokağa taşınan ilahi güç.', en: 'The power of ancient gods meets modern fabric. The elegance of marble sculptures, the dark aesthetic of mythology — divine power brought to the streets.' },
        bannerBg: 'tanrilar',
        products: [
            { id: 't1', name: { tr: 'ALTIN MELEK KAPÜŞONLU',      en: 'GOLDEN ANGEL HOODIE' },      sub: { tr: 'Ağır French Terry', en: 'Heavy French Terry' }, price: { tr: 749.99, en: 749.99 },  img: 'img/collections/tanrilar/1-back.jpg', imgs: ['img/collections/tanrilar/1-back.jpg','img/collections/tanrilar/1-front.jpg'], piece: 'GODS', type: 'hoodie', colors: { siyah: { img: 'img/collections/tanrilar/1-back.jpg', imgs: ['img/collections/tanrilar/1-back.jpg','img/collections/tanrilar/1-front.jpg'] }, beyaz: { img: 'img/collections/tanrilar/1-back-white.jpg', imgs: ['img/collections/tanrilar/1-back-white.jpg','img/collections/tanrilar/1-front-white.jpg'] } } },
            { id: 't2', name: { tr: 'EROS KAPÜŞONLU',              en: 'EROS HOODIE' },              sub: { tr: 'Ağır French Terry', en: 'Heavy French Terry' }, price: { tr: 749.99, en: 749.99 },  img: 'img/collections/tanrilar/2-back.jpg', imgs: ['img/collections/tanrilar/2-back.jpg','img/collections/tanrilar/2-front.jpg'], piece: 'GODS', type: 'hoodie', colors: { siyah: { img: 'img/collections/tanrilar/2-back.jpg', imgs: ['img/collections/tanrilar/2-back.jpg','img/collections/tanrilar/2-front.jpg'] }, beyaz: { img: 'img/collections/tanrilar/2-back-white.jpg', imgs: ['img/collections/tanrilar/2-back-white.jpg','img/collections/tanrilar/2-front-white.jpg'] } } },
            { id: 't3', name: { tr: 'ZEUS KAPÜŞONLU',              en: 'ZEUS HOODIE' },              sub: { tr: 'Ağır French Terry', en: 'Heavy French Terry' }, price: { tr: 749.99, en: 749.99 },  img: 'img/collections/tanrilar/3-back.jpg', imgs: ['img/collections/tanrilar/3-back.jpg','img/collections/tanrilar/3-front.jpg'], piece: 'GODS', type: 'hoodie', colors: { siyah: { img: 'img/collections/tanrilar/3-back.jpg', imgs: ['img/collections/tanrilar/3-back.jpg','img/collections/tanrilar/3-front.jpg'] }, beyaz: { img: 'img/collections/tanrilar/3-back-white.jpg', imgs: ['img/collections/tanrilar/3-back-white.jpg','img/collections/tanrilar/3-front-white.jpg'] } } },
            { id: 't4', name: { tr: 'ATHENA KAPÜŞONLU',            en: 'ATHENA HOODIE' },            sub: { tr: 'Ağır French Terry', en: 'Heavy French Terry' }, price: { tr: 749.99, en: 749.99 },  img: 'img/collections/tanrilar/4-back.jpg', imgs: ['img/collections/tanrilar/4-back.jpg','img/collections/tanrilar/4-front.jpg'], piece: 'GODS', type: 'hoodie', colors: { siyah: { img: 'img/collections/tanrilar/4-back.jpg', imgs: ['img/collections/tanrilar/4-back.jpg','img/collections/tanrilar/4-front.jpg'] }, beyaz: { img: 'img/collections/tanrilar/4-back-white.jpg', imgs: ['img/collections/tanrilar/4-back-white.jpg','img/collections/tanrilar/4-front-white.jpg'] } } },
            { id: 't5', name: { tr: 'ZEUS RÖNESANS KAPÜŞONLU',     en: 'ZEUS RENAISSANCE HOODIE' },  sub: { tr: 'Ağır French Terry', en: 'Heavy French Terry' }, price: { tr: 749.99, en: 749.99 },  img: 'img/collections/tanrilar/5-back.jpg', imgs: ['img/collections/tanrilar/5-back.jpg','img/collections/tanrilar/5-front.jpg'], piece: 'GODS', type: 'hoodie', colors: { siyah: { img: 'img/collections/tanrilar/5-back.jpg', imgs: ['img/collections/tanrilar/5-back.jpg','img/collections/tanrilar/5-front.jpg'] }, beyaz: { img: 'img/collections/tanrilar/5-back-white.jpg', imgs: ['img/collections/tanrilar/5-back-white.jpg','img/collections/tanrilar/5-front-white.jpg'] } } },
            { id: 't6', name: { tr: 'HERA RÖNESANS KAPÜŞONLU',     en: 'HERA RENAISSANCE HOODIE' },  sub: { tr: 'Ağır French Terry', en: 'Heavy French Terry' }, price: { tr: 749.99, en: 749.99 },  img: 'img/collections/tanrilar/6-back.jpg', imgs: ['img/collections/tanrilar/6-back.jpg','img/collections/tanrilar/6-front.jpg'], piece: 'GODS', type: 'hoodie', colors: { siyah: { img: 'img/collections/tanrilar/6-back.jpg', imgs: ['img/collections/tanrilar/6-back.jpg','img/collections/tanrilar/6-front.jpg'] }, beyaz: { img: 'img/collections/tanrilar/6-back-white.jpg', imgs: ['img/collections/tanrilar/6-back-white.jpg','img/collections/tanrilar/6-front-white.jpg'] } } },
        ]
    },
    haliaraba: {
        name: { tr: 'KRALİYET SÜRÜŞÜ', en: 'DRIVE ROYALE' },
        sub: { tr: 'KOLEKSİYON 07 — SS 2026', en: 'COLLECTION 07 — SS 2026' },
        desc: { tr: 'Doğu\'nun dokuması, batının hızı. Halı motiflerinin zarafeti yarış ruhuyla buluşuyor.', en: 'Eastern weaving meets western speed. The elegance of carpet motifs merges with racing spirit.' },
        bannerBg: 'haliaraba',
        products: [
            { id: 'ha1', name: { tr: 'HALI ARABA I KAPÜŞONLU',   en: 'CARPET CAR I HOODIE' },   sub: { tr: 'Ağır French Terry', en: 'Heavy French Terry' }, price: { tr: 749.99, en: 749.99 }, img: 'img/collections/haliaraba/1-back.jpg', imgs: ['img/collections/haliaraba/1-back.jpg','img/collections/haliaraba/1-front.jpg'], piece: 'HALIARABA', type: 'hoodie', colors: { siyah: { img: 'img/collections/haliaraba/1-back.jpg', imgs: ['img/collections/haliaraba/1-back.jpg','img/collections/haliaraba/1-front.jpg'] }, beyaz: { img: 'img/collections/haliaraba/1-back-white.jpg', imgs: ['img/collections/haliaraba/1-back-white.jpg','img/collections/haliaraba/1-front-white.jpg'] } } },
            { id: 'ha2', name: { tr: 'HALI ARABA II KAPÜŞONLU',  en: 'CARPET CAR II HOODIE' },  sub: { tr: 'Ağır French Terry', en: 'Heavy French Terry' }, price: { tr: 749.99, en: 749.99 }, img: 'img/collections/haliaraba/2-back.jpg', imgs: ['img/collections/haliaraba/2-back.jpg','img/collections/haliaraba/2-front.jpg'], piece: 'HALIARABA', type: 'hoodie', colors: { siyah: { img: 'img/collections/haliaraba/2-back.jpg', imgs: ['img/collections/haliaraba/2-back.jpg','img/collections/haliaraba/2-front.jpg'] }, beyaz: { img: 'img/collections/haliaraba/2-back-white.jpg', imgs: ['img/collections/haliaraba/2-back-white.jpg','img/collections/haliaraba/2-front-white.jpg'] } } },
            { id: 'ha3', name: { tr: 'HALI ARABA III KAPÜŞONLU', en: 'CARPET CAR III HOODIE' }, sub: { tr: 'Ağır French Terry', en: 'Heavy French Terry' }, price: { tr: 749.99, en: 749.99 }, img: 'img/collections/haliaraba/3-back.jpg', imgs: ['img/collections/haliaraba/3-back.jpg','img/collections/haliaraba/3-front.jpg'], piece: 'HALIARABA', type: 'hoodie', colors: { siyah: { img: 'img/collections/haliaraba/3-back.jpg', imgs: ['img/collections/haliaraba/3-back.jpg','img/collections/haliaraba/3-front.jpg'] }, beyaz: { img: 'img/collections/haliaraba/3-back-white.jpg', imgs: ['img/collections/haliaraba/3-back-white.jpg','img/collections/haliaraba/3-front-white.jpg'] } } },
            { id: 'ha4', name: { tr: 'HALI ARABA IV KAPÜŞONLU',  en: 'CARPET CAR IV HOODIE' },  sub: { tr: 'Ağır French Terry', en: 'Heavy French Terry' }, price: { tr: 749.99, en: 749.99 }, img: 'img/collections/haliaraba/4-back.jpg', imgs: ['img/collections/haliaraba/4-back.jpg','img/collections/haliaraba/4-front.jpg'], piece: 'HALIARABA', type: 'hoodie', colors: { siyah: { img: 'img/collections/haliaraba/4-back.jpg', imgs: ['img/collections/haliaraba/4-back.jpg','img/collections/haliaraba/4-front.jpg'] }, beyaz: { img: 'img/collections/haliaraba/4-back-white.jpg', imgs: ['img/collections/haliaraba/4-back-white.jpg','img/collections/haliaraba/4-front-white.jpg'] } } },
        ]
    },
    animal: {
        name: { tr: 'İLKEL ÇİZGİLER', en: 'PRIMAL LINES' },
        sub: { tr: 'KOLEKSİYON 08 — SS 2026', en: 'COLLECTION 08 — SS 2026' },
        desc: { tr: 'Doğanın gücü minimalist çizgilerle buluşuyor. Hayvan silüetlerinin zarif estetiği.', en: 'The power of nature meets minimalist lines. The elegant aesthetic of animal silhouettes.' },
        bannerBg: 'animal',
        products: [
            { id: 'an1', name: { tr: 'ANIMAL I KAPÜŞONLU',   en: 'ANIMAL I HOODIE' },   sub: { tr: 'Ağır French Terry', en: 'Heavy French Terry' }, price: { tr: 749.99, en: 749.99 }, img: 'img/collections/animalminimalist/1-back.jpg', imgs: ['img/collections/animalminimalist/1-back.jpg','img/collections/animalminimalist/1-front.jpg'], piece: 'ANIMAL', type: 'hoodie', colors: { siyah: { img: 'img/collections/animalminimalist/1-back.jpg', imgs: ['img/collections/animalminimalist/1-back.jpg','img/collections/animalminimalist/1-front.jpg'] }, beyaz: { img: 'img/collections/animalminimalist/1-back-white.jpg', imgs: ['img/collections/animalminimalist/1-back-white.jpg','img/collections/animalminimalist/1-front-white.jpg'] } } },
            { id: 'an2', name: { tr: 'ANIMAL II KAPÜŞONLU',  en: 'ANIMAL II HOODIE' },  sub: { tr: 'Ağır French Terry', en: 'Heavy French Terry' }, price: { tr: 749.99, en: 749.99 }, img: 'img/collections/animalminimalist/2-back.jpg', imgs: ['img/collections/animalminimalist/2-back.jpg','img/collections/animalminimalist/2-front.jpg'], piece: 'ANIMAL', type: 'hoodie', colors: { siyah: { img: 'img/collections/animalminimalist/2-back.jpg', imgs: ['img/collections/animalminimalist/2-back.jpg','img/collections/animalminimalist/2-front.jpg'] }, beyaz: { img: 'img/collections/animalminimalist/2-back-white.jpg', imgs: ['img/collections/animalminimalist/2-back-white.jpg','img/collections/animalminimalist/2-front-white.jpg'] } } },
            { id: 'an3', name: { tr: 'ANIMAL III KAPÜŞONLU', en: 'ANIMAL III HOODIE' }, sub: { tr: 'Ağır French Terry', en: 'Heavy French Terry' }, price: { tr: 749.99, en: 749.99 }, img: 'img/collections/animalminimalist/3-back.jpg', imgs: ['img/collections/animalminimalist/3-back.jpg','img/collections/animalminimalist/3-front.jpg'], piece: 'ANIMAL', type: 'hoodie', colors: { siyah: { img: 'img/collections/animalminimalist/3-back.jpg', imgs: ['img/collections/animalminimalist/3-back.jpg','img/collections/animalminimalist/3-front.jpg'] }, beyaz: { img: 'img/collections/animalminimalist/3-back-white.jpg', imgs: ['img/collections/animalminimalist/3-back-white.jpg','img/collections/animalminimalist/3-front-white.jpg'] } } },
            { id: 'an4', name: { tr: 'ANIMAL IV KAPÜŞONLU',  en: 'ANIMAL IV HOODIE' },  sub: { tr: 'Ağır French Terry', en: 'Heavy French Terry' }, price: { tr: 749.99, en: 749.99 }, img: 'img/collections/animalminimalist/4-back.jpg', imgs: ['img/collections/animalminimalist/4-back.jpg','img/collections/animalminimalist/4-front.jpg'], piece: 'ANIMAL', type: 'hoodie', colors: { siyah: { img: 'img/collections/animalminimalist/4-back.jpg', imgs: ['img/collections/animalminimalist/4-back.jpg','img/collections/animalminimalist/4-front.jpg'] }, beyaz: { img: 'img/collections/animalminimalist/4-back-white.jpg', imgs: ['img/collections/animalminimalist/4-back-white.jpg','img/collections/animalminimalist/4-front-white.jpg'] } } },
            { id: 'an5', name: { tr: 'ANIMAL V KAPÜŞONLU',   en: 'ANIMAL V HOODIE' },   sub: { tr: 'Ağır French Terry', en: 'Heavy French Terry' }, price: { tr: 749.99, en: 749.99 }, img: 'img/collections/animalminimalist/5-back.jpg', imgs: ['img/collections/animalminimalist/5-back.jpg','img/collections/animalminimalist/5-front.jpg'], piece: 'ANIMAL', type: 'hoodie', colors: { siyah: { img: 'img/collections/animalminimalist/5-back.jpg', imgs: ['img/collections/animalminimalist/5-back.jpg','img/collections/animalminimalist/5-front.jpg'] }, beyaz: { img: 'img/collections/animalminimalist/5-back-white.jpg', imgs: ['img/collections/animalminimalist/5-back-white.jpg','img/collections/animalminimalist/5-front-white.jpg'] } } },
            { id: 'an6', name: { tr: 'ANIMAL VI KAPÜŞONLU',  en: 'ANIMAL VI HOODIE' },  sub: { tr: 'Ağır French Terry', en: 'Heavy French Terry' }, price: { tr: 749.99, en: 749.99 }, img: 'img/collections/animalminimalist/6-back.jpg', imgs: ['img/collections/animalminimalist/6-back.jpg','img/collections/animalminimalist/6-front.jpg'], piece: 'ANIMAL', type: 'hoodie', colors: { siyah: { img: 'img/collections/animalminimalist/6-back.jpg', imgs: ['img/collections/animalminimalist/6-back.jpg','img/collections/animalminimalist/6-front.jpg'] }, beyaz: { img: 'img/collections/animalminimalist/6-back-white.jpg', imgs: ['img/collections/animalminimalist/6-back-white.jpg','img/collections/animalminimalist/6-front-white.jpg'] } } },
        ]
    },
    animalheadphone: {
        name: 'ANIMAL HEADPHONE',
        sub: { tr: 'KOLEKSİYON 09 — SS 2026', en: 'COLLECTION 09 — SS 2026' },
        desc: { tr: 'Müziğin ritmi hayvan dünyasıyla buluşuyor. Kulaklıklı hayvan silüetlerinin eşsiz estetiği.', en: 'The rhythm of music meets the animal world. The unique aesthetic of headphone-wearing animal silhouettes.' },
        bannerBg: 'animalheadphone',
        products: [
            { id: 'ah1', name: { tr: 'ANIMAL HP I KAPÜŞONLU',    en: 'ANIMAL HP I HOODIE' },    sub: { tr: 'Ağır French Terry', en: 'Heavy French Terry' }, price: { tr: 749.99, en: 749.99 }, img: 'img/collections/animalheadphone-jpg/1-black-back.jpg', imgs: ['img/collections/animalheadphone-jpg/1-black-back.jpg','img/collections/animalheadphone-jpg/1-black-front.jpg'], piece: 'ANIMALHEADPHONE', type: 'hoodie', colors: { siyah: { img: 'img/collections/animalheadphone-jpg/1-black-back.jpg', imgs: ['img/collections/animalheadphone-jpg/1-black-back.jpg','img/collections/animalheadphone-jpg/1-black-front.jpg'] }, beyaz: { img: 'img/collections/animalheadphone-jpg/1-white-back.jpg', imgs: ['img/collections/animalheadphone-jpg/1-white-back.jpg','img/collections/animalheadphone-jpg/1-white-front.jpg'] } } },
            { id: 'ah2', name: { tr: 'ANIMAL HP II KAPÜŞONLU',   en: 'ANIMAL HP II HOODIE' },   sub: { tr: 'Ağır French Terry', en: 'Heavy French Terry' }, price: { tr: 749.99, en: 749.99 }, img: 'img/collections/animalheadphone-jpg/2-black-back.jpg', imgs: ['img/collections/animalheadphone-jpg/2-black-back.jpg','img/collections/animalheadphone-jpg/2-black-front.jpg'], piece: 'ANIMALHEADPHONE', type: 'hoodie', colors: { siyah: { img: 'img/collections/animalheadphone-jpg/2-black-back.jpg', imgs: ['img/collections/animalheadphone-jpg/2-black-back.jpg','img/collections/animalheadphone-jpg/2-black-front.jpg'] }, beyaz: { img: 'img/collections/animalheadphone-jpg/2-white-back.jpg', imgs: ['img/collections/animalheadphone-jpg/2-white-back.jpg','img/collections/animalheadphone-jpg/2-white-front.jpg'] } } },
            { id: 'ah3', name: { tr: 'ANIMAL HP III KAPÜŞONLU',  en: 'ANIMAL HP III HOODIE' },  sub: { tr: 'Ağır French Terry', en: 'Heavy French Terry' }, price: { tr: 749.99, en: 749.99 }, img: 'img/collections/animalheadphone-jpg/3-black-back.jpg', imgs: ['img/collections/animalheadphone-jpg/3-black-back.jpg','img/collections/animalheadphone-jpg/3-black-front.jpg'], piece: 'ANIMALHEADPHONE', type: 'hoodie', colors: { siyah: { img: 'img/collections/animalheadphone-jpg/3-black-back.jpg', imgs: ['img/collections/animalheadphone-jpg/3-black-back.jpg','img/collections/animalheadphone-jpg/3-black-front.jpg'] }, beyaz: { img: 'img/collections/animalheadphone-jpg/3-white-back.jpg', imgs: ['img/collections/animalheadphone-jpg/3-white-back.jpg','img/collections/animalheadphone-jpg/3-white-front.jpg'] } } },
            { id: 'ah4', name: { tr: 'ANIMAL HP IV KAPÜŞONLU',   en: 'ANIMAL HP IV HOODIE' },   sub: { tr: 'Ağır French Terry', en: 'Heavy French Terry' }, price: { tr: 749.99, en: 749.99 }, img: 'img/collections/animalheadphone-jpg/4-black-back.jpg', imgs: ['img/collections/animalheadphone-jpg/4-black-back.jpg','img/collections/animalheadphone-jpg/4-black-front.jpg'], piece: 'ANIMALHEADPHONE', type: 'hoodie', colors: { siyah: { img: 'img/collections/animalheadphone-jpg/4-black-back.jpg', imgs: ['img/collections/animalheadphone-jpg/4-black-back.jpg','img/collections/animalheadphone-jpg/4-black-front.jpg'] }, beyaz: { img: 'img/collections/animalheadphone-jpg/4-white-back.jpg', imgs: ['img/collections/animalheadphone-jpg/4-white-back.jpg','img/collections/animalheadphone-jpg/4-white-front.jpg'] } } },
            { id: 'ah5', name: { tr: 'ANIMAL HP V KAPÜŞONLU',    en: 'ANIMAL HP V HOODIE' },    sub: { tr: 'Ağır French Terry', en: 'Heavy French Terry' }, price: { tr: 749.99, en: 749.99 }, img: 'img/collections/animalheadphone-jpg/5-black-back.jpg', imgs: ['img/collections/animalheadphone-jpg/5-black-back.jpg','img/collections/animalheadphone-jpg/5-black-front.jpg'], piece: 'ANIMALHEADPHONE', type: 'hoodie', colors: { siyah: { img: 'img/collections/animalheadphone-jpg/5-black-back.jpg', imgs: ['img/collections/animalheadphone-jpg/5-black-back.jpg','img/collections/animalheadphone-jpg/5-black-front.jpg'] }, beyaz: { img: 'img/collections/animalheadphone-jpg/5-white-back.jpg', imgs: ['img/collections/animalheadphone-jpg/5-white-back.jpg','img/collections/animalheadphone-jpg/5-white-front.jpg'] } } },
            { id: 'ah6', name: { tr: 'ANIMAL HP VI KAPÜŞONLU',   en: 'ANIMAL HP VI HOODIE' },   sub: { tr: 'Ağır French Terry', en: 'Heavy French Terry' }, price: { tr: 749.99, en: 749.99 }, img: 'img/collections/animalheadphone-jpg/6-black-back.jpg', imgs: ['img/collections/animalheadphone-jpg/6-black-back.jpg','img/collections/animalheadphone-jpg/6-black-front.jpg'], piece: 'ANIMALHEADPHONE', type: 'hoodie', colors: { siyah: { img: 'img/collections/animalheadphone-jpg/6-black-back.jpg', imgs: ['img/collections/animalheadphone-jpg/6-black-back.jpg','img/collections/animalheadphone-jpg/6-black-front.jpg'] }, beyaz: { img: 'img/collections/animalheadphone-jpg/6-white-back.jpg', imgs: ['img/collections/animalheadphone-jpg/6-white-back.jpg','img/collections/animalheadphone-jpg/6-white-front.jpg'] } } },
            { id: 'ah7', name: { tr: 'ANIMAL HP VII KAPÜŞONLU',  en: 'ANIMAL HP VII HOODIE' },  sub: { tr: 'Ağır French Terry', en: 'Heavy French Terry' }, price: { tr: 749.99, en: 749.99 }, img: 'img/collections/animalheadphone-jpg/7-black-back.jpg', imgs: ['img/collections/animalheadphone-jpg/7-black-back.jpg','img/collections/animalheadphone-jpg/7-black-front.jpg'], piece: 'ANIMALHEADPHONE', type: 'hoodie', colors: { siyah: { img: 'img/collections/animalheadphone-jpg/7-black-back.jpg', imgs: ['img/collections/animalheadphone-jpg/7-black-back.jpg','img/collections/animalheadphone-jpg/7-black-front.jpg'] }, beyaz: { img: 'img/collections/animalheadphone-jpg/7-white-back.jpg', imgs: ['img/collections/animalheadphone-jpg/7-white-back.jpg','img/collections/animalheadphone-jpg/7-white-front.jpg'] } } },
        ]
    },
    skateboard: {
        name: 'SKATE BOARD',
        sub: { tr: 'KOLEKSİYON 10 — SS 2026', en: 'COLLECTION 10 — SS 2026' },
        desc: { tr: 'Sokak kültürünün özgür ruhu kaykay estetiğiyle buluşuyor. Asfaltta özgürlük.', en: 'The free spirit of street culture meets skateboard aesthetics. Freedom on asphalt.' },
        bannerBg: 'skateboard',
        products: [
            { id: 'sb1', name: { tr: 'SKATE BOARD I KAPÜŞONLU',   en: 'SKATE BOARD I HOODIE' },   sub: { tr: 'Ağır French Terry', en: 'Heavy French Terry' }, price: { tr: 749.99, en: 749.99 }, img: 'img/collections/skateboard-jpg/1-black-back.jpg', imgs: ['img/collections/skateboard-jpg/1-black-back.jpg','img/collections/skateboard-jpg/1-black-front.jpg'], piece: 'SKATEBOARD', type: 'hoodie', colors: { siyah: { img: 'img/collections/skateboard-jpg/1-black-back.jpg', imgs: ['img/collections/skateboard-jpg/1-black-back.jpg','img/collections/skateboard-jpg/1-black-front.jpg'] }, beyaz: { img: 'img/collections/skateboard-jpg/1-white-back.jpg', imgs: ['img/collections/skateboard-jpg/1-white-back.jpg','img/collections/skateboard-jpg/1-white-front.jpg'] } } },
            { id: 'sb2', name: { tr: 'SKATE BOARD II KAPÜŞONLU',  en: 'SKATE BOARD II HOODIE' },  sub: { tr: 'Ağır French Terry', en: 'Heavy French Terry' }, price: { tr: 749.99, en: 749.99 }, img: 'img/collections/skateboard-jpg/2-black-back.jpg', imgs: ['img/collections/skateboard-jpg/2-black-back.jpg','img/collections/skateboard-jpg/2-black-front.jpg'], piece: 'SKATEBOARD', type: 'hoodie', colors: { siyah: { img: 'img/collections/skateboard-jpg/2-black-back.jpg', imgs: ['img/collections/skateboard-jpg/2-black-back.jpg','img/collections/skateboard-jpg/2-black-front.jpg'] }, beyaz: { img: 'img/collections/skateboard-jpg/2-white-back.jpg', imgs: ['img/collections/skateboard-jpg/2-white-back.jpg','img/collections/skateboard-jpg/2-white-front.jpg'] } } },
            { id: 'sb3', name: { tr: 'SKATE BOARD III KAPÜŞONLU', en: 'SKATE BOARD III HOODIE' }, sub: { tr: 'Ağır French Terry', en: 'Heavy French Terry' }, price: { tr: 749.99, en: 749.99 }, img: 'img/collections/skateboard-jpg/3-black-back.jpg', imgs: ['img/collections/skateboard-jpg/3-black-back.jpg','img/collections/skateboard-jpg/3-black-front.jpg'], piece: 'SKATEBOARD', type: 'hoodie', colors: { siyah: { img: 'img/collections/skateboard-jpg/3-black-back.jpg', imgs: ['img/collections/skateboard-jpg/3-black-back.jpg','img/collections/skateboard-jpg/3-black-front.jpg'] }, beyaz: { img: 'img/collections/skateboard-jpg/3-white-back.jpg', imgs: ['img/collections/skateboard-jpg/3-white-back.jpg','img/collections/skateboard-jpg/3-white-front.jpg'] } } },
            { id: 'sb4', name: { tr: 'SKATE BOARD IV KAPÜŞONLU',  en: 'SKATE BOARD IV HOODIE' },  sub: { tr: 'Ağır French Terry', en: 'Heavy French Terry' }, price: { tr: 749.99, en: 749.99 }, img: 'img/collections/skateboard-jpg/4-black-back.jpg', imgs: ['img/collections/skateboard-jpg/4-black-back.jpg','img/collections/skateboard-jpg/4-black-front.jpg'], piece: 'SKATEBOARD', type: 'hoodie', colors: { siyah: { img: 'img/collections/skateboard-jpg/4-black-back.jpg', imgs: ['img/collections/skateboard-jpg/4-black-back.jpg','img/collections/skateboard-jpg/4-black-front.jpg'] }, beyaz: { img: 'img/collections/skateboard-jpg/4-white-back.jpg', imgs: ['img/collections/skateboard-jpg/4-white-back.jpg','img/collections/skateboard-jpg/4-white-front.jpg'] } } },
        ]
    }
};

/* ── STATE ────────────────────────────────────────────── */
let cart = [];
let pendingProduct = null;
let pendingCollection = null;
let selectedSize = null;
let selectedColor = null;

/* ── COLOR HELPERS ───────────────────────────────────── */
function getProductImg(product, color) {
    if (product.colors && color && product.colors[color]) return product.colors[color].img;
    return product.img;
}
function getProductImgs(product, color) {
    if (product.colors && color && product.colors[color]) return product.colors[color].imgs;
    return product.imgs;
}
function getDefaultColor(product) {
    if (product.colors) return Object.keys(product.colors)[0];
    return null;
}
function buildColorSelector(product, activeColor) {
    if (!product.colors) return '';
    const colorMap = { siyah: '#111', beyaz: '#f5f5f5' };
    return `<div class="color-selector">${Object.keys(product.colors).map(c =>
        `<button class="color-dot${c === activeColor ? ' active' : ''}" data-color="${c}" style="background:${colorMap[c] || '#888'}" title="${c.charAt(0).toUpperCase() + c.slice(1)}"></button>`
    ).join('')}</div>`;
}

/* ── DOM REFS ─────────────────────────────────────────── */
const toast       = document.getElementById('toast');
const toastMsg    = document.getElementById('toast-msg');
const navbar      = document.getElementById('navbar');
const pageHome    = document.getElementById('page-home');
const pageCol     = document.getElementById('page-collection');
const pageCollections = document.getElementById('page-collections');
const pageAbout    = document.getElementById('page-about');
const pageContact  = document.getElementById('page-contact');
const pageShipping  = document.getElementById('page-shipping');
const pagePrivacy   = document.getElementById('page-privacy');
const pageTerms     = document.getElementById('page-terms');
const pageDistance   = document.getElementById('page-distance-sales');
const pageCookies   = document.getElementById('page-cookies');
const pageLogin     = document.getElementById('page-login');
const pageRegister  = document.getElementById('page-register');
const pageOrders    = document.getElementById('page-orders');
const pageBestsellers = document.getElementById('page-bestsellers');
const allPages      = document.querySelectorAll('.page');
const cartOverlay = document.getElementById('cart-overlay');
const cartSidebar = document.getElementById('cart-sidebar');
const cartBody    = document.getElementById('cart-body');
const cartTotal   = document.getElementById('cart-total');
const cartCount   = document.getElementById('cart-count');
const sizeModal   = document.getElementById('size-modal');
const modalSizes  = document.getElementById('modal-sizes');
const sizeError   = document.getElementById('size-error');
const navLinks    = document.querySelectorAll('.nav-center .nav-link');

/* ── NAVBAR SCROLL ────────────────────────────────────── */
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

/* ── PAGE NAVIGATION ──────────────────────────────────── */
function switchPage(targetPage) {
    allPages.forEach(p => p.classList.remove('active'));
    targetPage.classList.add('active');
}

function setActiveNav(id) {
    navLinks.forEach(l => l.classList.remove('active'));
    if (id) {
        const btn = document.getElementById(id);
        if (btn) btn.classList.add('active');
    }
}

function showHome() {
    switchPage(pageHome);
    setActiveNav('home-btn');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showAbout() {
    switchPage(pageAbout);
    setActiveNav('about-nav-btn');
    window.scrollTo({ top: 0, behavior: 'instant' });
}

function showCollections() {
    switchPage(pageCollections);
    setActiveNav('collections-nav-btn');
    window.scrollTo({ top: 0, behavior: 'instant' });
}

function showContact() {
    switchPage(pageContact);
    setActiveNav('contact-nav-btn');
    window.scrollTo({ top: 0, behavior: 'instant' });
}

function showShipping() {
    switchPage(pageShipping);
    setActiveNav(null);
    window.scrollTo({ top: 0, behavior: 'instant' });
}

function showPrivacy() {
    switchPage(pagePrivacy);
    setActiveNav(null);
    window.scrollTo({ top: 0, behavior: 'instant' });
}

function showTerms() {
    switchPage(pageTerms);
    setActiveNav(null);
    window.scrollTo({ top: 0, behavior: 'instant' });
}

function showDistanceSales() {
    switchPage(pageDistance);
    setActiveNav(null);
    window.scrollTo({ top: 0, behavior: 'instant' });
}

function showCookies() {
    switchPage(pageCookies);
    setActiveNav(null);
    window.scrollTo({ top: 0, behavior: 'instant' });
}

function showLogin() {
    switchPage(pageLogin);
    setActiveNav(null);
    window.scrollTo({ top: 0, behavior: 'instant' });
}

function showRegister() {
    switchPage(pageRegister);
    setActiveNav(null);
    window.scrollTo({ top: 0, behavior: 'instant' });
}

function showOrders() {
    switchPage(pageOrders);
    setActiveNav(null);
    window.scrollTo({ top: 0, behavior: 'instant' });
}

function showCollection(key) {
    window._currentCollectionKey = key;
    const data = COLLECTIONS[key];
    if (!data) return;

    // Set banner — use current language desc
    document.getElementById('col-banner-sub').textContent   = loc(data.sub);
    const colName = typeof data.name === 'string' ? data.name : loc(data.name);
    document.getElementById('col-banner-title').textContent  = colName;
    document.getElementById('col-banner-desc').textContent   = loc(data.desc);

    const decoEl = document.getElementById('col-banner-deco');
    if (decoEl) decoEl.textContent = colName;

    const bannerBg = document.getElementById('col-banner-bg');
    bannerBg.className = 'col-page-banner-bg ' + data.bannerBg;
    // Language-specific background images
    const colBgMap = {
        f1: currentLang === 'en' ? 'img/polepozisyonu-en.png' : 'img/polepozisyonu-tr.png',
        tanrilar: currentLang === 'en' ? 'img/tanrilar-en.png' : 'img/tanrilar-tr.png',
        haliaraba: currentLang === 'en' ? 'img/kraliyetsurusu-en.png' : 'img/kraliyetsurusu-tr.png',
        animal: currentLang === 'en' ? 'img/ilkelçizgiler-en.png' : 'img/ilkelçizgiler-tr.png',
    };
    if (colBgMap[key]) {
        bannerBg.style.backgroundImage = `url('${colBgMap[key]}')`;
    } else {
        bannerBg.style.backgroundImage = '';
    }

    // Products count
    document.getElementById('products-count').textContent = t('col.productCount', { n: data.products.length });

    // Render products
    const grid = document.getElementById('products-grid');
    grid.innerHTML = data.products.map(p => {
        const defColor = getDefaultColor(p);
        const currentImgs = getProductImgs(p, defColor);
        const currentImg = getProductImg(p, defColor);
        const thumbs = currentImgs && currentImgs.length > 1
            ? `<div class="product-card-thumbs">${currentImgs.map((src, i) =>
                `<div class="product-card-thumb${i === 0 ? ' active' : ''}" data-idx="${i}"><img src="${src}" alt=""></div>`
              ).join('')}</div>`
            : '';
        const colorSel = buildColorSelector(p, defColor);
        return `
        <div class="product-card" data-id="${p.id}" data-col="${key}" data-color="${defColor || ''}">
            <div class="product-img">
                ${currentImg
                    ? `<div class="product-img-bg product-img-real"><img src="${currentImg}" alt="${loc(p.name)}" class="product-real-img"></div>`
                    : `<div class="product-img-bg ${p.bg}" data-piece="${t('piece.' + p.piece)}" data-original-piece="${p.piece}"></div>`
                }
            </div>
            ${thumbs}
            ${colorSel}
            <div class="product-info">
                <p class="product-name">${loc(p.name)}</p>
                <p class="product-sub">${loc(p.sub)}</p>
                <p class="product-price">${formatPrice(p.price)}</p>
                <button class="btn-add-cart" data-id="${p.id}" data-col="${key}">${t('product.addToCart')}</button>
            </div>
        </div>
    `}).join('');

    // Attach add-to-cart listeners
    grid.querySelectorAll('.btn-add-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = btn.closest('.product-card');
            openSizeModal(btn.dataset.id, btn.dataset.col, card ? card.dataset.color || null : null);
        });
    });

    // Product card click → open detail modal
    grid.querySelectorAll('.product-card').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', (e) => {
            if (e.target.closest('.btn-add-cart') || e.target.closest('.product-card-thumb') || e.target.closest('.color-dot')) return;
            openProductDetail(card.dataset.id, card.dataset.col, card.dataset.color || null);
        });
    });

    // Thumbnail clicks on product cards
    setupCardThumbnails(grid, key);

    // Color dot clicks on product cards
    setupCardColorDots(grid, key);

    // Switch pages
    switchPage(pageCol);
    setActiveNav('collections-nav-btn');
    window.scrollTo({ top: 0, behavior: 'instant' });
}

/* ── BANNER / CARD CLICKS ─────────────────────────────── */
// Collection banners on home page
document.querySelectorAll('.banner-card[data-col]').forEach(card => {
    card.addEventListener('click', () => showCollection(card.dataset.col));
});

// Featured section
document.querySelectorAll('.featured-section[data-col]').forEach(el => {
    el.addEventListener('click', () => showCollection(el.dataset.col));
});

// Collection list page cards
document.querySelectorAll('.collection-list-card[data-col]').forEach(card => {
    card.addEventListener('click', () => showCollection(card.dataset.col));
});

// Footer collection links
document.querySelectorAll('.footer-link[data-col]').forEach(link => {
    link.addEventListener('click', () => showCollection(link.dataset.col));
});

/* ── NAV BUTTONS ──────────────────────────────────────── */
document.getElementById('logo-btn').addEventListener('click', showHome);
document.getElementById('home-btn').addEventListener('click', showHome);
document.getElementById('back-btn').addEventListener('click', showCollections);
document.getElementById('back-btn-2').addEventListener('click', showHome);

document.getElementById('collections-nav-btn').addEventListener('click', showCollections);

/* ── ABOUT & CONTACT NAV ─────────────────────────────── */
document.getElementById('about-nav-btn').addEventListener('click', showAbout);
document.getElementById('contact-nav-btn').addEventListener('click', showContact);

// Footer navigation links
document.querySelectorAll('.footer-nav-link[data-page]').forEach(link => {
    link.addEventListener('click', () => {
        const page = link.dataset.page;
        if (page === 'about') showAbout();
        else if (page === 'contact') showContact();
        else if (page === 'shipping') showShipping();
        else if (page === 'privacy') showPrivacy();
        else if (page === 'terms') showTerms();
        else if (page === 'distance-sales') showDistanceSales();
        else if (page === 'cookies') showCookies();
        else if (page === 'login') showLogin();
        else if (page === 'register') showRegister();
        else if (page === 'orders') showOrders();
        else if (page === 'collections') showCollections();
    });
});

// Contact form submit (prevent default, show toast)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast(t('contact.formSuccess'));
        contactForm.reset();
    });
}

// Login form
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast(t('login.success'));
        loginForm.reset();
    });
}

// Register form
const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast(t('register.success'));
        registerForm.reset();
    });
}

/* ── HERO CTA ─────────────────────────────────────────── */
document.getElementById('hero-cta').addEventListener('click', showCollections);

/* ── BESTSELLERS ──────────────────────────────────────── */
function renderBestsellers() {
    const picks = [
        { col: 'tanrilar', product: COLLECTIONS.tanrilar.products[0] },
        { col: 'tanrilar', product: COLLECTIONS.tanrilar.products[1] },
        { col: 'tanrilar', product: COLLECTIONS.tanrilar.products[2] },
        { col: 'tanrilar', product: COLLECTIONS.tanrilar.products[3] },
        { col: 'tanrilar', product: COLLECTIONS.tanrilar.products[4] },
    ];

    const grid = document.getElementById('bestsellers-grid');
    if (!grid) return;

    grid.innerHTML = picks.map(({ col, product: p }) => {
        const thumbs = p.imgs && p.imgs.length > 1
            ? `<div class="product-card-thumbs">${p.imgs.map((src, i) =>
                `<div class="product-card-thumb${i === 0 ? ' active' : ''}" data-idx="${i}"><img src="${src}" alt=""></div>`
              ).join('')}</div>`
            : '';
        return `
        <div class="product-card" data-id="${p.id}" data-col="${col}">
            <div class="product-img">
                ${p.img
                    ? `<div class="product-img-bg product-img-real"><img src="${p.img}" alt="${loc(p.name)}" class="product-real-img"></div>`
                    : `<div class="product-img-bg ${p.bg}" data-piece="${t('piece.' + p.piece)}" data-original-piece="${p.piece}"></div>`
                }
            </div>
            ${thumbs}
            <div class="product-info">
                <p class="product-name">${loc(p.name)}</p>
                <p class="product-sub">${loc(p.sub)}</p>
                <p class="product-price">${formatPrice(p.price)}</p>
                <button class="btn-add-cart" data-id="${p.id}" data-col="${col}">${t('product.addToCart')}</button>
            </div>
        </div>
    `}).join('');

    // Bestseller card click → go to collection
    grid.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.btn-add-cart') || e.target.closest('.product-card-thumb')) return;
            const colKey = card.dataset.col;
            showCollection(colKey);
        });
    });

    // Thumbnail clicks on bestseller cards
    setupCardThumbnails(grid);

    // Add to cart buttons
    grid.querySelectorAll('.btn-add-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            openSizeModal(btn.dataset.id, btn.dataset.col);
        });
    });

    // Drag to scroll
    let isDown = false, startX, scrollLeft;
    grid.addEventListener('mousedown', (e) => {
        if (e.target.closest('.btn-add-cart')) return;
        isDown = true;
        grid.classList.add('dragging');
        startX = e.pageX - grid.offsetLeft;
        scrollLeft = grid.scrollLeft;
    });
    grid.addEventListener('mouseleave', () => { isDown = false; grid.classList.remove('dragging'); });
    grid.addEventListener('mouseup', () => { isDown = false; grid.classList.remove('dragging'); });
    grid.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - grid.offsetLeft;
        const walk = (x - startX) * 2;
        grid.scrollLeft = scrollLeft - walk;
    });

    // Bestsellers scroll arrows
    const bsLeft = document.getElementById('bs-arrow-left');
    const bsRight = document.getElementById('bs-arrow-right');
    if (bsLeft && bsRight) {
        const scrollAmount = 324; // card width + gap
        function updateBsArrows() {
            bsLeft.classList.toggle('hidden', grid.scrollLeft <= 10);
            bsRight.classList.toggle('hidden', grid.scrollLeft >= grid.scrollWidth - grid.clientWidth - 10);
        }
        bsLeft.addEventListener('click', () => {
            grid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
        bsRight.addEventListener('click', () => {
            grid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
        grid.addEventListener('scroll', updateBsArrows);
        // Initial state
        setTimeout(updateBsArrows, 100);
    }
}

/* ── BESTSELLERS PAGE ────────────────────────────────── */
function showBestsellers() {
    const allProducts = [];
    Object.keys(COLLECTIONS).forEach(colKey => {
        COLLECTIONS[colKey].products.forEach(p => {
            allProducts.push({ col: colKey, product: p });
        });
    });

    const grid = document.getElementById('bestsellers-all-grid');
    if (!grid) return;

    grid.innerHTML = allProducts.map(({ col, product: p }) => {
        const defColor = getDefaultColor(p);
        const currentImgs = getProductImgs(p, defColor);
        const currentImg = getProductImg(p, defColor);
        const thumbs = currentImgs && currentImgs.length > 1
            ? `<div class="product-card-thumbs">${currentImgs.map((src, i) =>
                `<div class="product-card-thumb${i === 0 ? ' active' : ''}" data-idx="${i}"><img src="${src}" alt=""></div>`
              ).join('')}</div>`
            : '';
        const colorSel = buildColorSelector(p, defColor);
        return `
        <div class="product-card" data-id="${p.id}" data-col="${col}" data-color="${defColor || ''}">
            <div class="product-img">
                ${currentImg
                    ? `<div class="product-img-bg product-img-real"><img src="${currentImg}" alt="${loc(p.name)}" class="product-real-img"></div>`
                    : `<div class="product-img-bg ${p.bg}" data-piece="${t('piece.' + p.piece)}" data-original-piece="${p.piece}"></div>`
                }
            </div>
            ${thumbs}
            ${colorSel}
            <div class="product-info">
                <p class="product-name">${loc(p.name)}</p>
                <p class="product-sub">${loc(p.sub)}</p>
                <p class="product-price">${formatPrice(p.price)}</p>
                <button class="btn-add-cart" data-id="${p.id}" data-col="${col}">${t('product.addToCart')}</button>
            </div>
        </div>
    `}).join('');

    // Product card click → open detail modal
    grid.querySelectorAll('.product-card').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', (e) => {
            if (e.target.closest('.btn-add-cart') || e.target.closest('.product-card-thumb') || e.target.closest('.color-dot')) return;
            openProductDetail(card.dataset.id, card.dataset.col, card.dataset.color || null);
        });
    });

    // Thumbnail clicks
    setupCardThumbnails(grid);

    // Color dot clicks
    setupCardColorDots(grid);

    // Add to cart buttons
    grid.querySelectorAll('.btn-add-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = btn.closest('.product-card');
            openSizeModal(btn.dataset.id, btn.dataset.col, card ? card.dataset.color || null : null);
        });
    });

    switchPage(pageBestsellers);
    setActiveNav('shop-nav-btn');
    window.scrollTo({ top: 0, behavior: 'instant' });
}

// See All button
const seeAllBtn = document.getElementById('see-all-btn');
if (seeAllBtn) {
    seeAllBtn.addEventListener('click', () => {
        showBestsellers();
    });
}

/* ── CATEGORY PAGE ───────────────────────────────────── */
const pageCategory = document.getElementById('page-category');

const CATEGORY_NAMES = {
    tee: { tr: 'TİŞÖRT', en: 'T-SHIRT' },
    hoodie: { tr: 'KAPÜŞONLU', en: 'HOODIE' },
    jacket: { tr: 'CEKET', en: 'JACKET' },
    sweatpants: { tr: 'EŞOFMAN ALTI', en: 'SWEATPANTS' },
    shorts: { tr: 'ŞORT', en: 'SHORTS' }
};

function showCategoryPage(type) {
    const filtered = [];
    Object.keys(COLLECTIONS).forEach(colKey => {
        COLLECTIONS[colKey].products.forEach(p => {
            if (p.type === type) filtered.push({ col: colKey, product: p });
        });
    });

    const catName = CATEGORY_NAMES[type] ? loc(CATEGORY_NAMES[type]) : type.toUpperCase();
    document.getElementById('category-title').textContent = catName;
    document.getElementById('category-back-text').textContent = t('category.back');

    const grid = document.getElementById('category-grid');
    const emptyEl = document.getElementById('category-empty');

    if (filtered.length === 0) {
        grid.style.display = 'none';
        emptyEl.style.display = '';
        document.getElementById('category-empty-msg').textContent = t('category.comingSoon');
    } else {
        grid.style.display = '';
        emptyEl.style.display = 'none';

        grid.innerHTML = filtered.map(({ col, product: p }) => {
            const defColor = getDefaultColor(p);
            const currentImgs = getProductImgs(p, defColor);
            const currentImg = getProductImg(p, defColor);
            const thumbs = currentImgs && currentImgs.length > 1
                ? `<div class="product-card-thumbs">${currentImgs.map((src, i) =>
                    `<div class="product-card-thumb${i === 0 ? ' active' : ''}" data-idx="${i}"><img src="${src}" alt=""></div>`
                  ).join('')}</div>`
                : '';
            const colorSel = buildColorSelector(p, defColor);
            return `
            <div class="product-card" data-id="${p.id}" data-col="${col}" data-color="${defColor || ''}">
                <div class="product-img">
                    ${currentImg
                        ? `<div class="product-img-bg product-img-real"><img src="${currentImg}" alt="${loc(p.name)}" class="product-real-img"></div>`
                        : `<div class="product-img-bg ${p.bg}" data-piece="${t('piece.' + p.piece)}" data-original-piece="${p.piece}"></div>`
                    }
                </div>
                ${thumbs}
                ${colorSel}
                <div class="product-info">
                    <p class="product-name">${loc(p.name)}</p>
                    <p class="product-sub">${loc(p.sub)}</p>
                    <p class="product-price">${formatPrice(p.price)}</p>
                    <button class="btn-add-cart" data-id="${p.id}" data-col="${col}">${t('product.addToCart')}</button>
                </div>
            </div>
        `}).join('');

        grid.querySelectorAll('.product-card').forEach(card => {
            card.style.cursor = 'pointer';
            card.addEventListener('click', (e) => {
                if (e.target.closest('.btn-add-cart') || e.target.closest('.product-card-thumb') || e.target.closest('.color-dot')) return;
                openProductDetail(card.dataset.id, card.dataset.col, card.dataset.color || null);
            });
        });

        setupCardThumbnails(grid);
        setupCardColorDots(grid);

        grid.querySelectorAll('.btn-add-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const card = btn.closest('.product-card');
                openSizeModal(btn.dataset.id, btn.dataset.col, card ? card.dataset.color || null : null);
            });
        });
    }

    switchPage(pageCategory);
    setActiveNav(null);
    window.scrollTo({ top: 0, behavior: 'instant' });
}

// Category circle click handlers
document.querySelectorAll('.cat-item[data-type]').forEach(item => {
    item.addEventListener('click', () => showCategoryPage(item.dataset.type));
});

// Category back button
document.getElementById('category-back-btn').addEventListener('click', showHome);

/* ── PRODUCT DETAIL MODAL ─────────────────────────────── */
const productDetailModal = document.getElementById('product-detail-modal');

/* ── Card Thumbnail Helper ─────────────────────────── */
function setupCardThumbnails(container, colKey) {
    container.querySelectorAll('.product-card').forEach(card => {
        const thumbs = card.querySelectorAll('.product-card-thumb');
        if (thumbs.length < 2) return;
        const mainImg = card.querySelector('.product-real-img');
        if (!mainImg) return;

        // Find product data to get imgs array
        const pid = card.dataset.id;
        const cKey = card.dataset.col || colKey;
        const colData = COLLECTIONS[cKey];
        if (!colData) return;
        const product = colData.products.find(p => p.id === pid);
        if (!product || !product.imgs) return;

        thumbs.forEach(thumb => {
            thumb.addEventListener('click', (e) => {
                e.stopPropagation();
                const idx = parseInt(thumb.dataset.idx);
                mainImg.src = product.imgs[idx];
                thumbs.forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            });
        });
    });
}

function setupCardColorDots(container, colKey) {
    container.querySelectorAll('.product-card').forEach(card => {
        const dots = card.querySelectorAll('.color-dot');
        if (dots.length < 2) return;
        const pid = card.dataset.id;
        const cKey = card.dataset.col || colKey;
        const colData = COLLECTIONS[cKey];
        if (!colData) return;
        const product = colData.products.find(p => p.id === pid);
        if (!product || !product.colors) return;

        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                const color = dot.dataset.color;
                card.dataset.color = color;
                dots.forEach(d => d.classList.remove('active'));
                dot.classList.add('active');

                // Update main image
                const mainImg = card.querySelector('.product-real-img');
                if (mainImg) mainImg.src = getProductImg(product, color);

                // Update thumbnails
                const newImgs = getProductImgs(product, color);
                const thumbsContainer = card.querySelector('.product-card-thumbs');
                if (thumbsContainer && newImgs && newImgs.length > 1) {
                    thumbsContainer.innerHTML = newImgs.map((src, i) =>
                        `<div class="product-card-thumb${i === 0 ? ' active' : ''}" data-idx="${i}"><img src="${src}" alt=""></div>`
                    ).join('');
                    // Re-bind thumbnail clicks
                    thumbsContainer.querySelectorAll('.product-card-thumb').forEach(thumb => {
                        thumb.addEventListener('click', (ev) => {
                            ev.stopPropagation();
                            const idx = parseInt(thumb.dataset.idx);
                            if (mainImg) mainImg.src = newImgs[idx];
                            thumbsContainer.querySelectorAll('.product-card-thumb').forEach(t => t.classList.remove('active'));
                            thumb.classList.add('active');
                        });
                    });
                }
            });
        });
    });
}

function openProductDetail(productId, colKey, activeColor) {
    const data = COLLECTIONS[colKey];
    if (!data) return;
    const product = data.products.find(p => p.id === productId);
    if (!product) return;

    const colName = typeof data.name === 'string' ? data.name : loc(data.name);
    const gallery = document.getElementById('product-detail-gallery');
    const info = document.getElementById('product-detail-info');

    // Determine active color
    let currentColor = activeColor || getDefaultColor(product);

    function renderDetailGallery(color) {
        const images = getProductImgs(product, color) || (getProductImg(product, color) ? [getProductImg(product, color)] : []);
        if (images.length > 0) {
            const arrowsHTML = images.length > 1 ? `
                <div class="detail-gallery-arrows">
                    <button class="detail-gallery-arrow hidden" id="detail-arrow-left">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg>
                    </button>
                    <button class="detail-gallery-arrow" id="detail-arrow-right">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>
                    </button>
                </div>
                <div class="detail-gallery-thumbs">
                    ${images.map((src, i) => `<div class="detail-gallery-thumb${i === 0 ? ' active' : ''}" data-idx="${i}"><img src="${src}" alt=""></div>`).join('')}
                </div>
            ` : '';

            gallery.innerHTML = `
                <div class="detail-gallery-scroll">${images.map(src =>
                    `<div class="detail-gallery-slide"><div class="detail-zoom-wrap"><img src="${src}" alt="${loc(product.name)}" class="detail-zoom-img"></div></div>`
                ).join('')}</div>
                ${arrowsHTML}
            `;

            // Hover zoom on each slide (only when mouse is 75px inside from edges)
            gallery.querySelectorAll('.detail-zoom-wrap').forEach(wrap => {
                const img = wrap.querySelector('.detail-zoom-img');
                const INSET = window.innerWidth <= 768 ? 75 : 150;
                wrap.addEventListener('mousemove', (e) => {
                    const rect = wrap.getBoundingClientRect();
                    const mx = e.clientX - rect.left;
                    const my = e.clientY - rect.top;
                    const inside = mx >= INSET && mx <= rect.width - INSET && my >= INSET && my <= rect.height - INSET;
                    if (inside) {
                        if (!img.classList.contains('zooming')) img.classList.add('zooming');
                        const x = ((mx) / rect.width) * 100;
                        const y = ((my) / rect.height) * 100;
                        img.style.transformOrigin = x + '% ' + y + '%';
                    } else {
                        if (img.classList.contains('zooming')) { img.classList.remove('zooming'); img.style.transformOrigin = 'center center'; }
                    }
                });
                wrap.addEventListener('mouseleave', () => { img.classList.remove('zooming'); img.style.transformOrigin = 'center center'; });
            });

            if (images.length > 1) {
                const scroll = gallery.querySelector('.detail-gallery-scroll');
                const arrowL = gallery.querySelector('#detail-arrow-left');
                const arrowR = gallery.querySelector('#detail-arrow-right');
                const dthumbs = gallery.querySelectorAll('.detail-gallery-thumb');
                let currentSlide = 0;

                function goToSlide(idx) {
                    currentSlide = idx;
                    const slideWidth = scroll.clientWidth;
                    scroll.scrollTo({ left: slideWidth * idx, behavior: 'smooth' });
                    arrowL.classList.toggle('hidden', idx === 0);
                    arrowR.classList.toggle('hidden', idx === images.length - 1);
                    dthumbs.forEach((t, i) => t.classList.toggle('active', i === idx));
                }

                arrowL.addEventListener('click', () => { if (currentSlide > 0) goToSlide(currentSlide - 1); });
                arrowR.addEventListener('click', () => { if (currentSlide < images.length - 1) goToSlide(currentSlide + 1); });
                dthumbs.forEach(thumb => {
                    thumb.addEventListener('click', () => goToSlide(parseInt(thumb.dataset.idx)));
                });

                scroll.addEventListener('scroll', () => {
                    const slideWidth = scroll.clientWidth;
                    if (slideWidth === 0) return;
                    const idx = Math.round(scroll.scrollLeft / slideWidth);
                    if (idx !== currentSlide) {
                        currentSlide = idx;
                        arrowL.classList.toggle('hidden', idx === 0);
                        arrowR.classList.toggle('hidden', idx === images.length - 1);
                        dthumbs.forEach((t, i) => t.classList.toggle('active', i === idx));
                    }
                });
            }
        } else {
            gallery.innerHTML = `<div class="detail-img-bg ${product.bg}" style="background:var(--off-white);width:100%;height:100%;"></div>`;
        }
    }

    renderDetailGallery(currentColor);

    // Info with color selector
    const colorSelectorHTML = product.colors ? buildColorSelector(product, currentColor) : '';
    info.innerHTML = `
        <span class="detail-col-label">${colName}</span>
        <h2 class="detail-product-name">${loc(product.name)}</h2>
        <p class="detail-product-sub">${loc(product.sub)}</p>
        <p class="detail-product-price">${formatPrice(product.price)}</p>
        ${colorSelectorHTML ? `<div class="detail-color-section"><span class="detail-color-label">${t('detail.color')}</span>${colorSelectorHTML}</div>` : ''}
        <button class="btn-primary full detail-add-btn" data-id="${product.id}" data-col="${colKey}">${t('product.addToCart')}</button>
    `;

    // Color dot clicks in detail modal
    info.querySelectorAll('.color-dot').forEach(dot => {
        dot.addEventListener('click', () => {
            currentColor = dot.dataset.color;
            info.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
            renderDetailGallery(currentColor);
        });
    });

    info.querySelector('.detail-add-btn').addEventListener('click', () => {
        closeProductDetail();
        openSizeModal(product.id, colKey, currentColor);
    });

    productDetailModal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeProductDetail() {
    productDetailModal.classList.remove('open');
    document.body.style.overflow = '';
}

document.getElementById('product-detail-close').addEventListener('click', closeProductDetail);
productDetailModal.addEventListener('click', (e) => { if (e.target === productDetailModal) closeProductDetail(); });

/* ── FILTER TOGGLES ───────────────────────────────────── */
document.querySelectorAll('.filter-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
        const options = toggle.nextElementSibling;
        const isOpen = options.classList.contains('open');

        options.classList.toggle('open');
        toggle.classList.toggle('active', !isOpen);
    });
});

/* ── MOBILE HAMBURGER ─────────────────────────────────── */
const hamburger = document.getElementById('hamburger-btn');
const navCenter = document.querySelector('.nav-center');

if (hamburger && navCenter) {
    hamburger.addEventListener('click', () => {
        navCenter.classList.toggle('mobile-open');
        hamburger.classList.toggle('active');
    });
}

/* ── CART ─────────────────────────────────────────────── */
document.getElementById('cart-btn').addEventListener('click', () => toggleCart(true));
document.getElementById('cart-close').addEventListener('click', () => toggleCart(false));
cartOverlay.addEventListener('click', () => toggleCart(false));

function toggleCart(open) {
    cartSidebar.classList.toggle('open', open);
    cartOverlay.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
}

/* ── CHECKOUT MODAL ──────────────────────────────────── */
const checkoutModal = document.getElementById('checkout-modal');
const checkoutBtn   = document.getElementById('checkout-btn');

if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) return;
        // Close cart sidebar, open checkout modal
        toggleCart(false);
        checkoutModal.classList.add('open');
        document.body.style.overflow = 'hidden';
    });
}

document.getElementById('checkout-modal-close').addEventListener('click', closeCheckoutModal);
checkoutModal.addEventListener('click', (e) => { if (e.target === checkoutModal) closeCheckoutModal(); });

function closeCheckoutModal() {
    checkoutModal.classList.remove('open');
    document.body.style.overflow = '';
}

// Login button in checkout modal
document.getElementById('checkout-login-btn').addEventListener('click', () => {
    closeCheckoutModal();
    showLogin();
});

// Register button in checkout modal
document.getElementById('checkout-register-btn').addEventListener('click', () => {
    closeCheckoutModal();
    showRegister();
});

// Guest checkout
document.getElementById('checkout-guest-btn').addEventListener('click', () => {
    closeCheckoutModal();
    showToast(t('checkout.guestSuccess'));
    cart = [];
    renderCart();
});

/* ── SEARCH OVERLAY ────────────────────────────────────── */
const searchOverlay = document.getElementById('search-overlay');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

document.getElementById('search-btn').addEventListener('click', () => {
    searchOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => searchInput.focus(), 100);
});

document.getElementById('search-close-btn').addEventListener('click', closeSearch);

searchOverlay.addEventListener('click', (e) => {
    if (e.target === searchOverlay) closeSearch();
});

function closeSearch() {
    searchOverlay.classList.remove('open');
    document.body.style.overflow = '';
    searchInput.value = '';
    searchResults.innerHTML = '';
}

// Build flat product list for search
function getAllProducts() {
    const list = [];
    Object.entries(COLLECTIONS).forEach(([colKey, col]) => {
        col.products.forEach(p => {
            list.push({ product: p, colKey, colName: loc(col.name) });
        });
    });
    return list;
}

searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();
    if (!q) { searchResults.innerHTML = ''; return; }

    const all = getAllProducts();
    const matches = all.filter(({ product }) => {
        const name = loc(product.name).toLowerCase();
        return name.includes(q);
    });

    if (matches.length === 0) {
        searchResults.innerHTML = `<div class="search-no-results">${t('search.noResults')}</div>`;
        return;
    }

    searchResults.innerHTML = matches.map(({ product, colKey, colName }) => {
        const imgSrc = getProductImg(product, getDefaultColor(product));
        const price = formatPrice(product.price);
        return `<div class="search-result-item" data-col="${colKey}" data-pid="${product.id}">
            <img src="${imgSrc}" alt="${loc(product.name)}" class="search-result-img">
            <div class="search-result-info">
                <div class="search-result-name">${loc(product.name)}</div>
                <div class="search-result-collection">${colName}</div>
            </div>
            <div class="search-result-price">${price}</div>
        </div>`;
    }).join('');

    // Click on result → open product detail
    searchResults.querySelectorAll('.search-result-item').forEach(item => {
        item.addEventListener('click', () => {
            const colKey = item.dataset.col;
            const pid = parseInt(item.dataset.pid);
            closeSearch();
            showCollection(colKey);
            setTimeout(() => {
                const col = COLLECTIONS[colKey];
                const product = col.products.find(p => p.id === pid);
                if (product) openProductDetail(pid, colKey, getDefaultColor(product));
            }, 100);
        });
    });
});

/* ── ACCOUNT BUTTON (nav) ─────────────────────────────── */
document.getElementById('account-btn').addEventListener('click', () => {
    showLogin();
});

function addToCart(product, colKey, size, color) {
    const colNameVal = COLLECTIONS[colKey].name;
    const colName = typeof colNameVal === 'string' ? colNameVal : loc(colNameVal);
    const existing = cart.find(i => i.id === product.id && i.size === size && (i.color || null) === (color || null));
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...product, size, color: color || null, qty: 1, colName });
    }
    renderCart();
    showToast(t('cart.addedToast', { name: loc(product.name), size: size }));
}

function removeFromCart(id, size, color) {
    cart = cart.filter(i => !(i.id === id && i.size === size && (i.color || null) === (color || null)));
    renderCart();
}

function renderCart() {
    const total = cart.reduce((s, i) => s + getPrice(i.price) * i.qty, 0);
    const count = cart.reduce((s, i) => s + i.qty, 0);

    cartTotal.textContent = formatTotal(total);
    cartCount.textContent = count;

    if (cart.length === 0) {
        cartBody.innerHTML = `
            <div class="cart-empty-state">
                <p>${t('cart.empty')}</p>
                <span>${t('cart.emptyHint')}</span>
            </div>`;
        return;
    }

    cartBody.innerHTML = cart.map(item => {
        const colorLabel = item.color ? (item.color === 'beyaz' ? 'Beyaz' : 'Siyah') : '';
        return `
        <div class="cart-item">
            <div class="cart-item-img ${item.bg}"></div>
            <div class="cart-item-details">
                <p class="cart-item-col">${item.colName}</p>
                <p class="cart-item-name">${loc(item.name)}</p>
                <p class="cart-item-meta">${loc(item.sub)} · ${item.size}${colorLabel ? ' · ' + colorLabel : ''}${item.qty > 1 ? ' · ×' + item.qty : ''}</p>
                <p class="cart-item-price">${formatTotal(getPrice(item.price) * item.qty)}</p>
            </div>
            <button class="cart-item-remove" data-id="${item.id}" data-size="${item.size}" data-color="${item.color || ''}">✕</button>
        </div>
    `}).join('');

    cartBody.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', () => removeFromCart(btn.dataset.id, btn.dataset.size, btn.dataset.color || null));
    });
}

/* ── SIZE MODAL ──────────────────────────────────────── */
document.getElementById('modal-close').addEventListener('click', closeSizeModal);
sizeModal.addEventListener('click', (e) => { if (e.target === sizeModal) closeSizeModal(); });

function openSizeModal(productId, colKey, preColor) {
    const product = COLLECTIONS[colKey].products.find(p => p.id === productId);
    if (!product) return;

    pendingProduct    = product;
    pendingCollection = colKey;
    selectedSize      = null;
    selectedColor     = preColor || getDefaultColor(product);

    const colNameVal = COLLECTIONS[colKey].name;
    document.getElementById('modal-col-label').textContent     = typeof colNameVal === 'string' ? colNameVal : loc(colNameVal);
    document.getElementById('modal-product-name').textContent  = loc(product.name);
    document.getElementById('modal-product-sub').textContent   = loc(product.sub);
    document.getElementById('modal-product-price').textContent = formatPrice(product.price);

    // Color selector in modal
    const modalColorContainer = document.getElementById('modal-color-section');
    if (modalColorContainer) {
        if (product.colors) {
            modalColorContainer.style.display = '';
            const colorSelHTML = buildColorSelector(product, selectedColor);
            document.getElementById('modal-color-dots').innerHTML = colorSelHTML;
            // Bind color dot clicks
            document.getElementById('modal-color-dots').querySelectorAll('.color-dot').forEach(dot => {
                dot.addEventListener('click', () => {
                    selectedColor = dot.dataset.color;
                    document.getElementById('modal-color-dots').querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
                    dot.classList.add('active');
                });
            });
        } else {
            modalColorContainer.style.display = 'none';
        }
    }

    document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('selected'));
    sizeError.classList.remove('visible');

    sizeModal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeSizeModal() {
    sizeModal.classList.remove('open');
    document.body.style.overflow = '';
    pendingProduct    = null;
    pendingCollection = null;
    selectedSize      = null;
}

document.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedSize = btn.dataset.size;
        sizeError.classList.remove('visible');
    });
});

document.getElementById('modal-add-btn').addEventListener('click', () => {
    if (!selectedSize) {
        sizeError.classList.add('visible');
        modalSizes.classList.remove('shake');
        void modalSizes.offsetWidth;
        modalSizes.classList.add('shake');
        return;
    }
    addToCart(pendingProduct, pendingCollection, selectedSize, selectedColor);
    closeSizeModal();
    toggleCart(true);
});

/* ── TOAST ────────────────────────────────────────────── */
let toastTimeout;
function showToast(message) {
    toastMsg.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove('show'), 2800);
}

/* ── KEYBOARD ─────────────────────────────────────────── */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (sizeModal.classList.contains('open')) closeSizeModal();
        else if (cartSidebar.classList.contains('open')) toggleCart(false);
    }
});

/* ── SCROLL ANIMATIONS (Intersection Observer) ────────── */
const animObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.anim-section').forEach(el => animObserver.observe(el));

/* ── LANGUAGE TOGGLE ─────────────────────────────────── */
const langToggle = document.getElementById('lang-toggle');
if (langToggle) {
    langToggle.addEventListener('click', () => {
        const newLang = currentLang === 'tr' ? 'en' : 'tr';
        setLanguage(newLang);
    });
}

/* ── INTRO SPLASH SCREEN (VIDEO) ─────────────────────────── */
(function initIntro() {
    const intro = document.getElementById('intro-screen');
    const startBtn = document.getElementById('intro-start-btn');
    const startPhase = document.getElementById('intro-start-phase');
    const video = document.getElementById('intro-video');
    if (!intro || !startBtn || !video) return;

    document.body.classList.add('intro-active');

    // Detect country via IP (same as currency detection) for intro language
    const btnText = document.getElementById('intro-btn-text');
    const tagText = document.getElementById('intro-tagline-text');
    function setIntroLang(isTR) {
        if (btnText) btnText.textContent = isTR ? 'BAŞLA' : 'START';
        if (tagText) tagText.textContent = isTR ? 'SS 2026 — YENİ SEZON' : 'SS 2026 — NEW SEASON';
    }
    // Check if geo already detected by currency module
    const cached = localStorage.getItem('incresis-country');
    if (cached) {
        setIntroLang(cached === 'TR');
    } else {
        // Quick geo check
        (async () => {
            try {
                const res = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(2000) });
                const data = await res.json();
                const country = data.country_code || 'TR';
                localStorage.setItem('incresis-country', country);
                setIntroLang(country === 'TR');
            } catch {
                setIntroLang(true); // fallback TR
            }
        })();
    }

    startBtn.addEventListener('click', () => {
        // 1) Fade out start screen
        startPhase.classList.add('fade-out');

        // 2) Start video after start screen fades
        setTimeout(() => {
            video.classList.add('playing');
            video.play().catch(() => {});
        }, 400);

        // 3) When video ends, smooth fade out intro to reveal site behind
        video.addEventListener('ended', () => {
            // Pause on last frame so it stays visible during fade
            video.pause();
            const duration = 2000; // 2s smooth fade
            const start = performance.now();
            function fadeOut(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                // Ease-in-out curve for smoother feel
                const eased = progress < 0.5
                    ? 2 * progress * progress
                    : 1 - Math.pow(-2 * progress + 2, 2) / 2;
                intro.style.opacity = String(1 - eased);
                if (progress < 1) {
                    requestAnimationFrame(fadeOut);
                } else {
                    intro.remove();
                    document.body.classList.remove('intro-active');
                }
            }
            requestAnimationFrame(fadeOut);
        });
    });
})();

/* ── INIT ─────────────────────────────────────────────── */
// Always apply language on load (to update data-piece etc.)
setLanguage(currentLang);

renderBestsellers();
renderCart();
