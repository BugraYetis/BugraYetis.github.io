/* ============================================================
   FIT WEEKEND 2026 — İÇERİK & AYARLAR
   ------------------------------------------------------------
   Bu dosyadaki her şeyi serbestçe düzenleyebilirsiniz.
   Kod bilgisi gerekmez — sadece tırnak içindeki metinleri değiştirin.
   ============================================================ */

/* ---------- ETKİNLİK ---------- */
const EVENT = {
  name: "Fit Weekend 2026",
  tagline: "Şehre Fit Bir Dönüş",
  venue: "Kanyon Alışveriş Merkezi",
  address: "Büyükdere Cad. No:185, Levent, 34394 Şişli/İstanbul",
  city: "İstanbul",
  url: "https://fitweekend.com.tr",
  organizer: "Diyetisyen Dünyası",
  host: "Kanyon",
  // Tarihler: Yıl, Ay(0=Ocak), Gün, Saat, Dakika  → 18 Eylül 2026, 11:00
  days: [
    { key:"cu", label:"Cuma",     date:"18", month:"Eylül", y:2026, m:8, d:18, open:"11:00", close:"21:00" },
    { key:"ct", label:"Cumartesi",date:"19", month:"Eylül", y:2026, m:8, d:19, open:"09:00", close:"22:00" },
    { key:"pz", label:"Pazar",    date:"20", month:"Eylül", y:2026, m:8, d:20, open:"09:00", close:"20:00" }
  ],
  description:
    "Türkiye'nin en büyük sağlıklı yaşam festivali. 18-19-20 Eylül 2026 tarihlerinde Kanyon'da; " +
    "sağlıklı beslenme, spor, wellness, longevity, uzman konuşmaları, workshoplar, markalar, " +
    "deneyimler ve yarışmalar tek bir festivalde buluşuyor. Katılım ücretsizdir."
};

/* ---------- KAYIT / KATILIMCI VERİ KATMANI ----------
   Varsayılan: "local"  → tarayıcı hafızası (demo modu, sunucu gerekmez)
   Gerçek yayına geçerken MODE'u değiştirip ENDPOINT'i doldurun.

   MODE seçenekleri:
     "local"    : tarayıcıda saklar. Demo/ön izleme için.
     "api"      : kendi sunucunuz.  POST {ENDPOINT}  /  GET {ENDPOINT}
     "supabase" : Supabase REST.    URL + ANON_KEY + TABLE doldurun.
     "sheets"   : Google Apps Script Web App URL'i (doPost/doGet).

   Beklenen kayıt objesi:
     { name, city, interest, days:[...], ts }
   GET yanıtı: aynı objelerden oluşan bir dizi (array).
------------------------------------------------------------- */
const DATA_CONFIG = {
  MODE: "local",

  // MODE:"api" veya "sheets" için
  ENDPOINT: "",

  // MODE:"supabase" için
  SUPABASE_URL: "",
  SUPABASE_ANON_KEY: "",
  SUPABASE_TABLE: "kayitlar",

  // Katılımcı duvarında gösterilecek maksimum kişi
  WALL_LIMIT: 120,

  // Sayaca eklenecek taban (gerçek ön kayıt sayınız)
  BASE_COUNT: 2847
};

/* ---------- İLGİ ALANLARI ---------- */
const INTERESTS = [
  { k:"beslenme",  t:"Sağlıklı Beslenme", c:"#2F9E56" },
  { k:"spor",      t:"Spor & Antrenman",  c:"#D62E63" },
  { k:"wellness",  t:"Wellness",          c:"#2BAE9E" },
  { k:"longevity", t:"Longevity",         c:"#F8971D" },
  { k:"workshop",  t:"Workshoplar",       c:"#B7DE3B" },
  { k:"topluluk",  t:"Topluluk",          c:"#FF6B4A" }
];

/* ---------- DENEYİM BÖLÜMLERİ ---------- */
const SECTIONS = [
  {
    id:"stantlar", n:"01", kicker:"Keşfet", title:"Fit <em>Stantlar</em>",
    amb:"#F2FAEC", acc:"#2F9E56",
    lead:"Yeni nesil sağlıklı yaşam markalarını keşfedin. Ürünleri deneyin, tadımlar yapın, yeni lezzetlerle tanışın ve sadece festivale özel fırsatları yakalayın.",
    items:["Fit İkramlar","Tadım Etkinlikleri","Ürün Tanıtımları","Festival İndirimleri","Fit Hediyeler","50+ Marka"],
    media:{ type:"video", src:"assets/video/clip2.mp4", poster:"assets/video/clip2.webp" },
    tag:"Canlı Tadım"
  },
  {
    id:"bulusmalar", n:"02", kicker:"Öğren", title:"Fit <em>Buluşmalar</em>",
    amb:"#FFF4EC", acc:"#F8971D",
    lead:"Alanında uzman diyetisyenler, doktorlar, sağlıklı yaşam profesyonelleri ve ilham veren içerik üreticileriyle tanışın. Yeni bilgiler öğrenin, sorularınızı sorun, ilham alın.",
    items:["Uzman Konuşmaları","Influencer Paylaşımları","İmza Köşesi","Soru & Cevap","Panel Oturumları","40+ Konuşmacı"],
    media:{ type:"image", src:"assets/img/talks.webp" },
    tag:"Sahne Programı"
  },
  {
    id:"antrenmanlar", n:"03", kicker:"Hareket Et", title:"Fit <em>Antrenmanlar</em>",
    amb:"#FDEFF4", acc:"#D62E63",
    lead:"Günün farklı saatlerinde, her seviyeye uygun seanslar. İster spora yeni başlıyor olun, ister deneyimli — size göre bir antrenman mutlaka var.",
    items:["Yoga","Pilates","Yogalates","Quick HIIT","Total Body Workout","Stretching","Mindfulness","Sound Healing"],
    media:{ type:"video", src:"assets/video/antrenman.mp4", poster:"assets/video/antrenman.webp" },
    tag:"Her Seviyeye Uygun"
  },
  {
    id:"analizler", n:"04", kicker:"Tanı", title:"Fit <em>Analizler</em>",
    amb:"#EEF7FB", acc:"#2BAE9E",
    lead:"Kendinizi daha yakından tanıyın. Uzman eşliğinde ücretsiz ölçümler yaptırın, sonuçlarınızı anında yorumlatın.",
    items:["Vücut Analizi","Yağ Analizi","Kas Oranı","Postür & Duruş","Cilt Analizi","Saç Analizi","Astro Fit"],
    media:{ type:"video", src:"assets/video/clip4.mp4", poster:"assets/video/clip4.webp" },
    tag:"Ücretsiz Ölçüm"
  },
  {
    id:"topics", n:"05", kicker:"Derinleş", title:"Fit <em>Topics</em>",
    amb:"#F6F2FB", acc:"#621B4B",
    lead:"Yeni nesil sağlık yaklaşımları, güncel bilim ve uygulanabilir tavsiyeler. Sağlıklı yaşamı bir trend değil, bir düzen haline getirin.",
    items:["Longevity Tavsiyeleri","Sürdürülebilir Beslenme","Fonksiyonel Gıdalar","Kilo Yönetimi","Zayıflama Taktikleri","Yaşam Kalitesi"],
    media:{ type:"image", src:"assets/img/h1.webp" },
    tag:"Bilim Temelli"
  },
  {
    id:"experience", n:"06", kicker:"Yaşa", title:"Fit <em>Experience</em>",
    amb:"#FFF7E9", acc:"#FF6B4A",
    lead:"Festivalin en güzel anları programın dışında yaşanıyor. Sabahın ilk ışığında koşun, yoga sonrası brunch yapın, yeni insanlarla tanışın.",
    items:["Morning Club","Brunch & Yoga","Mall Run","Sağlıklı Yaşam Buluşmaları","Topluluk Deneyimi","Festival Atmosferi"],
    media:{ type:"image", src:"assets/img/g2.webp" },
    tag:"Golden Hour"
  },
  {
    id:"challenge", n:"07", kicker:"Yarış", title:"Fit <em>Challenge</em>",
    amb:"#FDF0EB", acc:"#E8365F",
    lead:"Kendinize meydan okuyun. Günün her saatinde başlayan yarışmalarda sınırlarınızı zorlayın, günlük ödülleri kapın.",
    items:["Hang Challenge","Plank Challenge","Sürpriz Yarışmalar","Günlük Ödüller","Hediyeler","Liderlik Tablosu"],
    media:{ type:"image", src:"assets/img/antrenman.webp" },
    tag:"Günlük Ödüller"
  },
  {
    id:"workshops", n:"08", kicker:"Üret", title:"Fit <em>Workshops</em>",
    amb:"#F3FAF0", acc:"#B7DE3B",
    lead:"Küçük gruplar, gerçek pratik. Uzman eşliğinde kendiniz yapın, tarifleri evinize götürün.",
    items:["Sağlıklı Tarif Atölyesi","Smoothie Workshop","Yoga Atölyesi","Pilates Atölyesi","Beslenme Atölyesi","30+ Workshop"],
    media:{ type:"image", src:"assets/img/tasting.webp" },
    tag:"Kontenjan Sınırlı"
  },
  {
    id:"sounds", n:"09", kicker:"Hisset", title:"Fit <em>Sounds</em>",
    amb:"#FFF1E4", acc:"#F8971D",
    lead:"Gün batarken festival ritmini değiştiriyor. DJ performansları, canlı akustik setler ve Kanyon avlusunda unutulmaz bir atmosfer.",
    items:["DJ Performansları","Canlı Müzik","Akustik Setler","Sunset Session","Festival Atmosferi"],
    media:{ type:"video", src:"assets/video/clip1.mp4", poster:"assets/video/clip1.webp" },
    tag:"Sunset Session"
  },
  {
    id:"gifts", n:"10", kicker:"Kazan", title:"Fit <em>Gifts</em>",
    amb:"#FDF0F5", acc:"#D62E63",
    lead:"Festivalden eli boş dönmek yok. Ziyaretçi hediyeleri, yarışma ödülleri, sürpriz paketler ve çekilişler üç gün boyunca devam ediyor.",
    items:["Festival Hediyeleri","Yarışma Ödülleri","Sürpriz Paketler","Influencer Paketi","Marka Deneyimleri","Çekilişler"],
    media:{ type:"image", src:"assets/img/stand.webp" },
    tag:"Her Gün Çekiliş"
  }
];

/* ---------- KONUŞMACILAR (örnek içerik — kendi listenizle değiştirin) ----------
   n = ad, r = unvan, c = kart rengi, pin = köşe rozeti (boş bırakılabilir),
   b = biyografi, t = etiketler, s = seansları ("Gün Saat — Başlık" formatında)

   FOTOĞRAF EKLEMEK:  img:"assets/img/speakers/elif-kaya.webp"  satırını ekleyin.
   Eklemezseniz kart baş harflerden renkli avatar üretir. Karışık kullanılabilir.
--------------------------------------------------------------------------------- */
const SPEAKERS = [
  { n:"Dyt. Elif Kaya",      r:"Klinik Diyetisyen",             c:"#D62E63", pin:"Açılış",
    b:"15 yıllık klinik deneyimiyle sürdürülebilir kilo yönetimi ve metabolik sağlık üzerine çalışıyor. Binlerce danışanın beslenme düzenini yeniden kurdu.",
    t:["Kilo Yönetimi","Metabolik Sağlık","Sürdürülebilir Beslenme"], s:["Cuma 12:00 — Açılış Konuşması","Cumartesi 15:00 — Panel: Kilo Yönetimi"] },
  { n:"Dr. Mert Arslan",     r:"Longevity Uzmanı",              c:"#F8971D", pin:"Longevity",
    b:"Yaşlanma biyolojisi ve uzun ömür protokolleri üzerine araştırmalar yürütüyor. Hücresel sağlık ve biyolojik yaş konularında konuşuyor.",
    t:["Longevity","Biyolojik Yaş","Uyku"], s:["Cumartesi 13:00 — Longevity 101"] },
  { n:"Dyt. Selin Demir",    r:"Sporcu Beslenmesi",             c:"#2F9E56", pin:"",
    b:"Profesyonel sporcularla çalışıyor. Antrenman öncesi ve sonrası beslenme, performans takviyeleri ve toparlanma protokolleri üzerine uzman.",
    t:["Sporcu Beslenmesi","Performans","Toparlanma"], s:["Cuma 15:30 — Antrenman Beslenmesi"] },
  { n:"Ceren Yıldız",        r:"Yoga & Mindfulness Eğitmeni",   c:"#2BAE9E", pin:"Sahne",
    b:"On yıldır yoga ve nefes çalışmaları yürütüyor. Şehir hayatında sakinlik pratiği ve mindfulness üzerine atölyeler veriyor.",
    t:["Yoga","Nefes","Mindfulness"], s:["Cumartesi 09:00 — Brunch & Yoga","Pazar 10:00 — Sunrise Flow"] },
  { n:"Dyt. Ahmet Şahin",    r:"Fonksiyonel Beslenme",          c:"#621B4B", pin:"",
    b:"Fonksiyonel gıdalar ve bağırsak sağlığı üzerine çalışıyor. Mikrobiyota ve beslenme ilişkisini anlaşılır bir dille anlatıyor.",
    t:["Mikrobiyota","Fonksiyonel Gıda","Bağırsak Sağlığı"], s:["Cumartesi 17:00 — Mikrobiyota & Ruh Hali"] },
  { n:"Zeynep Aydın",        r:"Pilates Eğitmeni",              c:"#FF6B4A", pin:"",
    b:"Reformer ve mat pilates eğitmeni. Postür bozuklukları ve masa başı çalışanlar için hareket programları tasarlıyor.",
    t:["Pilates","Postür","Mobilite"], s:["Cuma 17:00 — Ofis Postürü Atölyesi"] },
  { n:"Dr. Kaan Öztürk",     r:"Spor Hekimi",                   c:"#E8365F", pin:"",
    b:"Sakatlanma önleme ve hareket analizi üzerine çalışıyor. Doğru başlangıç ve kademeli ilerleme prensiplerini anlatıyor.",
    t:["Spor Hekimliği","Sakatlanma Önleme","Hareket Analizi"], s:["Pazar 13:00 — Doğru Başlangıç"] },
  { n:"Merve Çelik",         r:"Sağlıklı Tarif İçerik Üreticisi",c:"#B7DE3B", pin:"Atölye",
    b:"Pratik ve besleyici tariflerini yüz binlerce kişiyle paylaşıyor. Festivalde canlı tarif atölyeleri düzenleyecek.",
    t:["Tarif","Meal Prep","Pratik Mutfak"], s:["Cumartesi 14:00 — Canlı Tarif Atölyesi","Pazar 12:00 — Smoothie Workshop"] },
  { n:"Dyt. Burak Yılmaz",   r:"Obezite & Metabolizma",         c:"#2F9E56", pin:"",
    b:"Obezite tedavisi ve davranış değişikliği üzerine çalışıyor. Kalıcı alışkanlık kurmanın psikolojisini anlatıyor.",
    t:["Obezite","Davranış Değişikliği","Alışkanlık"], s:["Cuma 14:00 — Alışkanlık Kurma Sanatı"] },
  { n:"İdil Korkmaz",        r:"Wellness Koçu",                 c:"#F8971D", pin:"",
    b:"Stres yönetimi ve uyku hijyeni üzerine bireysel koçluk yapıyor. Sound healing seanslarını yürütüyor.",
    t:["Stres Yönetimi","Uyku","Sound Healing"], s:["Cumartesi 20:00 — Sound Healing"] },
  { n:"Emre Doğan",          r:"Koşu Antrenörü",                c:"#D62E63", pin:"Mall Run",
    b:"Şehir içi koşu topluluklarını yönetiyor. Sıfırdan 5K programlarıyla binlerce kişiyi koşuyla tanıştırdı.",
    t:["Koşu","Dayanıklılık","5K Programı"], s:["Pazar 09:00 — Mall Run"] },
  { n:"Dyt. Naz Erdem",      r:"Çocuk & Aile Beslenmesi",       c:"#2BAE9E", pin:"",
    b:"Aile içinde sağlıklı beslenme kültürü kurmak üzerine çalışıyor. Seçici yiyicilik ve okul beslenmesi konularında uzman.",
    t:["Çocuk Beslenmesi","Aile","Okul Beslenmesi"], s:["Pazar 14:00 — Ailece Sağlıklı"] }
];

/* ---------- PROGRAM (örnek akış — kendi saatlerinizle değiştirin) ---------- */
const PROGRAM = {
  cu:[
    {h:"11:00",k:"Açılış",   t:"Kapılar Açılıyor",         w:"Fit Weekend",       p:"Kanyon avlusu festival alanına dönüşüyor. Stantlar, karşılama ikramları ve festival haritası.", c:"#F8971D", dur:60},
    {h:"12:00",k:"Konuşma",  t:"Açılış Konuşması",         w:"Dyt. Elif Kaya",    p:"Şehre fit bir dönüş: üç günün hikâyesi ve sağlıklı yaşamın yeni tanımı.", c:"#D62E63", dur:45},
    {h:"13:00",k:"Analiz",   t:"Fit Analizler Başlıyor",   w:"Uzman Ekip",        p:"Vücut, yağ, postür, cilt ve saç analizleri gün boyu ücretsiz.", c:"#2BAE9E", dur:480},
    {h:"14:00",k:"Konuşma",  t:"Alışkanlık Kurma Sanatı",  w:"Dyt. Burak Yılmaz", p:"Kalıcı değişimin arkasındaki davranış bilimi ve 21 gün miti.", c:"#2F9E56", dur:50},
    {h:"15:30",k:"Konuşma",  t:"Antrenman Beslenmesi",     w:"Dyt. Selin Demir",  p:"Öncesi, sırası, sonrası: performansı yükselten pratik beslenme planı.", c:"#2F9E56", dur:45},
    {h:"17:00",k:"Atölye",   t:"Ofis Postürü Atölyesi",    w:"Zeynep Aydın",      p:"Masa başında geçen günü onaran 20 dakikalık mobilite akışı.", c:"#FF6B4A", dur:60},
    {h:"18:30",k:"Challenge",t:"Hang Challenge — 1. Gün",  w:"Fit Challenge",     p:"Barfikste en uzun süre asılı kalan günün ödülünü kazanıyor.", c:"#E8365F", dur:90},
    {h:"20:00",k:"Müzik",    t:"Opening DJ Set",           w:"Fit Sounds",        p:"Festivalin ilk gecesi Kanyon avlusunda gün batımı seti ile açılıyor.", c:"#F8971D", dur:60}
  ],
  ct:[
    {h:"09:00",k:"Deneyim",  t:"Brunch & Yoga",            w:"Ceren Yıldız",      p:"Sabah akışıyla başlayan gün, sağlıklı brunch masasıyla devam ediyor.", c:"#2BAE9E", dur:90},
    {h:"11:00",k:"Antrenman",t:"Total Body Workout",       w:"Fit Antrenmanlar",  p:"Herkese uygun, ekipmansız 45 dakikalık tam vücut seansı.", c:"#D62E63", dur:45},
    {h:"12:00",k:"Atölye",   t:"Smoothie Workshop",        w:"Merve Çelik",       p:"Üç malzemeyle doyurucu smoothie: tarifi öğrenin, tadına bakın.", c:"#B7DE3B", dur:45},
    {h:"13:00",k:"Konuşma",  t:"Longevity 101",            w:"Dr. Mert Arslan",   p:"Biyolojik yaş nedir, nasıl ölçülür ve gerçekten nasıl yavaşlatılır?", c:"#F8971D", dur:50},
    {h:"14:00",k:"Atölye",   t:"Canlı Tarif Atölyesi",     w:"Merve Çelik",       p:"Hafta içi 20 dakikada hazırlanan üç pratik tarif, canlı canlı.", c:"#B7DE3B", dur:60},
    {h:"15:00",k:"Panel",    t:"Panel: Kilo Yönetimi",     w:"Dyt. Elif Kaya + 3",p:"Diyet kültürünün ötesinde sürdürülebilir kilo yönetimi tartışması.", c:"#D62E63", dur:60},
    {h:"16:00",k:"Antrenman",t:"Quick HIIT",               w:"Fit Antrenmanlar",  p:"20 dakikada nabzı yükselten yüksek yoğunluklu interval seansı.", c:"#E8365F", dur:25},
    {h:"17:00",k:"Konuşma",  t:"Mikrobiyota & Ruh Hali",   w:"Dyt. Ahmet Şahin",  p:"Bağırsak-beyin ekseni ve günlük beslenmenin ruh haline etkisi.", c:"#621B4B", dur:45},
    {h:"18:30",k:"Challenge",t:"Plank Challenge",          w:"Fit Challenge",     p:"Kim daha uzun dayanacak? Günün en çekişmeli yarışması.", c:"#E8365F", dur:60},
    {h:"20:00",k:"Wellness", t:"Sound Healing",            w:"İdil Korkmaz",      p:"Tibet çanakları eşliğinde 45 dakikalık grup gevşeme seansı.", c:"#2BAE9E", dur:45},
    {h:"21:00",k:"Müzik",    t:"Canlı Akustik Set",        w:"Fit Sounds",        p:"Günü kapatan akustik performans ve festival atmosferi.", c:"#F8971D", dur:60}
  ],
  pz:[
    {h:"09:00",k:"Deneyim",  t:"Mall Run",                 w:"Emre Doğan",        p:"Kanyon çevresinde 5K keyif koşusu. Her seviyeye uygun, madalya var.", c:"#D62E63", dur:75},
    {h:"10:00",k:"Antrenman",t:"Sunrise Flow",             w:"Ceren Yıldız",      p:"Günü açan yumuşak yoga akışı ve nefes çalışması.", c:"#2BAE9E", dur:50},
    {h:"11:00",k:"Deneyim",  t:"Morning Club Brunch",      w:"Fit Experience",    p:"Sağlıklı brunch masası, topluluk sohbeti ve yeni tanışmalar.", c:"#FF6B4A", dur:90},
    {h:"12:00",k:"Atölye",   t:"Smoothie Workshop",        w:"Merve Çelik",       p:"Sezonun meyveleriyle üç yeni tarif ve tadım.", c:"#B7DE3B", dur:45},
    {h:"13:00",k:"Konuşma",  t:"Doğru Başlangıç",          w:"Dr. Kaan Öztürk",   p:"Spora yeni başlayanlar için sakatlanmadan ilerleme rehberi.", c:"#E8365F", dur:45},
    {h:"14:00",k:"Konuşma",  t:"Ailece Sağlıklı",          w:"Dyt. Naz Erdem",    p:"Evde sağlıklı beslenme kültürü kurmanın pratik yolları.", c:"#2F9E56", dur:45},
    {h:"15:00",k:"Atölye",   t:"Pilates Atölyesi",         w:"Zeynep Aydın",      p:"Mat pilates temelleri: core, denge ve kontrollü hareket.", c:"#FF6B4A", dur:50},
    {h:"16:30",k:"Challenge",t:"Final Challenge",          w:"Fit Challenge",     p:"Üç günün şampiyonları belirleniyor. Büyük ödül sahibini buluyor.", c:"#E8365F", dur:60},
    {h:"18:00",k:"Kapanış",  t:"Kapanış & Büyük Çekiliş",  w:"Fit Weekend",       p:"Teşekkürler, ödül töreni ve festivalin büyük çekilişi.", c:"#F8971D", dur:60}
  ]
};

/* ---------- FESTİVAL HARİTASI ---------- */
const ZONES = [
  { id:"z1", t:"Ana Sahne",        c:"#D62E63", d:"Uzman konuşmaları, paneller ve kapanış töreni. Kanyon avlusunun merkezinde, 400 kişilik oturma alanı." },
  { id:"z2", t:"Fit Stantlar",     c:"#2F9E56", d:"50+ sağlıklı yaşam markası, tadım noktaları ve festivale özel indirimler. Avlu boyunca uzanıyor." },
  { id:"z3", t:"Antrenman Alanı",  c:"#F8971D", d:"Yoga, pilates, HIIT ve total body seansları. Mat ve ekipman festival tarafından sağlanıyor." },
  { id:"z4", t:"Analiz Merkezi",   c:"#2BAE9E", d:"Vücut, yağ, postür, cilt ve saç analizleri. Uzman eşliğinde ücretsiz ölçüm ve yorumlama." },
  { id:"z5", t:"Atölye Çadırı",    c:"#B7DE3B", d:"Tarif, smoothie ve beslenme atölyeleri. Kontenjan sınırlı, kayıt stant girişinde." },
  { id:"z6", t:"Challenge Arena",  c:"#E8365F", d:"Hang ve plank challenge alanı, canlı liderlik tablosu ve günlük ödül töreni." },
  { id:"z7", t:"Chill & Brunch",   c:"#FF6B4A", d:"Morning Club, Brunch & Yoga ve topluluk buluşmaları. Gölgeli dinlenme alanı." },
  { id:"z8", t:"Karşılama",        c:"#621B4B", d:"Festival girişi, bileklik dağıtımı, festival haritası ve hoş geldin hediyesi." }
];

/* ---------- SPONSORLAR (örnek — kendi markalarınızla değiştirin) ----------
   LOGO EKLEMEK:  logo:"assets/logo/sponsors/marka.svg"  satırını ekleyin.
   Eklemezseniz kartta sadece marka adı yazar.
   Örnek:  {n:"Marka Adı", t:"Ana Sponsor", logo:"assets/logo/sponsors/marka.svg"}
--------------------------------------------------------------------------- */
const SPONSORS = [
  {n:"Marka Adı", t:"Ana Sponsor"}, {n:"Marka Adı", t:"Beslenme"},
  {n:"Marka Adı", t:"Spor"},        {n:"Marka Adı", t:"Wellness"},
  {n:"Marka Adı", t:"Teknoloji"},   {n:"Marka Adı", t:"İçecek"},
  {n:"Marka Adı", t:"Kozmetik"},    {n:"Marka Adı", t:"Medya"},
  {n:"Marka Adı", t:"Takviye"},     {n:"Marka Adı", t:"Giyim"}
];

/* ---------- TOPLULUK DUVARI ---------- */
const POSTS = [
  { u:"@zeynep.fit",    w:"3 sa önce", c:"#D62E63", x:"Geçen seneki Fit Weekend'de tanıştığım grupla hâlâ her pazar koşuyoruz. Bu sene de oradayız 🙌", g:["#ŞehreFitBirDönüş","#MallRun"], l:"1.2B", m:"84" },
  { u:"@sporcu.mert",   w:"5 sa önce", c:"#F8971D", x:"Vücut analizi + uzman yorumu tek bir yerde ve ücretsiz. Sadece bunun için gitmeye değer.", g:["#FitAnalizler"], l:"842", m:"31" },
  { u:"@mutfaktaburcu", w:"Dün",       c:"#B7DE3B", x:"Tarif atölyesinde öğrendiğim smoothie artık evde standart oldu. Üç malzeme, iki dakika.", g:["#FitWorkshops","#Smoothie"], l:"2.4B", m:"156" },
  { u:"@kanyonistanbul",w:"Dün",       c:"#621B4B", x:"18-19-20 Eylül'de Kanyon üç gün boyunca sağlıklı yaşamın buluşma noktası. Katılım ücretsiz.", g:["#Kanyon","#FitWeekend2026"], l:"5.1B", m:"402" },
  { u:"@dyt.elifkaya",  w:"2 gün önce",c:"#2F9E56", x:"Açılış konuşmasında sürdürülebilir kilo yönetimini konuşacağız. Sorularınızı şimdiden bekliyorum.", g:["#FitBuluşmalar"], l:"3.3B", m:"218" },
  { u:"@yogaileceren",  w:"2 gün önce",c:"#2BAE9E", x:"Cumartesi 09:00 Brunch & Yoga. Matınızı getirin, gerisini biz hallederiz 🧘", g:["#BrunchveYoga"], l:"1.9B", m:"97" }
];

/* ---------- İSTATİSTİKLER ---------- */
const STATS = [
  {v:3,     sfx:"",  l:"Gün",             i:"◷"},
  {v:50,    sfx:"+", l:"Marka",           i:"◆"},
  {v:40,    sfx:"+", l:"Uzman",           i:"✦"},
  {v:30,    sfx:"+", l:"Workshop",        i:"❋"},
  {v:10000, sfx:"+", l:"Ziyaretçi",       i:"◉"},
  {v:100,   sfx:"+", l:"Saat Deneyim",    i:"✳"}
];

/* ---------- SIKÇA SORULAN SORULAR ---------- */
const FAQ = [
  { q:"Katılım gerçekten ücretsiz mi?",
    a:"Evet. Festival alanına giriş, tüm konuşmalar, antrenman seansları ve analizler ücretsizdir. Bilet satın almanıza gerek yok. Siteden kaydolmanız yalnızca kontenjan planlaması ve duyurular içindir." },
  { q:"Kayıt olmadan gelebilir miyim?",
    a:"Gelebilirsiniz. Ancak workshop ve atölyelerde kontenjan sınırlı; önceden kaydolanlar öncelikli yerleştiriliyor. Kaydolduğunuzda program değişikliklerinden de haberdar oluyorsunuz." },
  { q:"Nereden ulaşırım, otopark var mı?",
    a:"Kanyon, Levent'te Büyükdere Caddesi üzerinde. M2 metro Levent istasyonuna yürüme mesafesinde. Kanyon'un kapalı otoparkı festival boyunca açık; hafta sonu yoğunluğu nedeniyle toplu taşımayı öneriyoruz." },
  { q:"Antrenmanlara katılmak için mat veya ekipman getirmeli miyim?",
    a:"Getirmenize gerek yok — mat ve ekipman alanda sağlanıyor. Rahat spor kıyafeti ve su matarası getirmeniz yeterli. Kişisel matınızla gelmek isterseniz de tabii ki mümkün." },
  { q:"Analizler için randevu gerekiyor mu?",
    a:"Hayır, analiz merkezinde sıraya girmeniz yeterli. Vücut ve yağ analizi için son öğününüzden 2-3 saat sonra gelmeniz daha doğru sonuç verir." },
  { q:"Çocuklarla gelebilir miyim?",
    a:"Elbette. Festival tüm yaşlara açık. Pazar günü aile beslenmesi oturumu ve çocuklara uygun etkinlikler var. 12 yaş altı için antrenman seanslarında ebeveyn eşliği gerekiyor." },
  { q:"Spora yeni başlıyorum, bana uygun mu?",
    a:"Kesinlikle. Seansların tamamı başlangıç seviyesi düşünülerek planlandı; eğitmenler her hareket için kolaylaştırılmış alternatif gösteriyor. \"Doğru Başlangıç\" oturumu da tam olarak bunun için var." },
  { q:"Stant açmak veya sponsor olmak istiyorum.",
    a:"info@fitweekend.com.tr adresine yazın. Stant alanları, sponsorluk paketleri ve marka iş birlikleri için detaylı sunumu paylaşalım." }
];

/* ---------- DEMO KATILIMCILAR (ilk açılışta duvarı doldurur) ---------- */
const SEED = [
  ["Elif Y.","İstanbul","beslenme",["cu","ct"]],   ["Mert A.","İstanbul","spor",["ct"]],
  ["Zeynep K.","Ankara","wellness",["ct","pz"]],   ["Can D.","İstanbul","longevity",["cu"]],
  ["Selin B.","İzmir","workshop",["ct"]],          ["Ahmet Ş.","İstanbul","beslenme",["cu","ct","pz"]],
  ["Naz E.","Bursa","topluluk",["pz"]],            ["Burak T.","İstanbul","spor",["cu","ct"]],
  ["Ceren M.","İstanbul","wellness",["ct"]],       ["Emre G.","Kocaeli","spor",["pz"]],
  ["İdil K.","İstanbul","longevity",["ct","pz"]],  ["Kaan Ö.","Ankara","spor",["cu"]],
  ["Merve Ç.","İstanbul","workshop",["ct","pz"]],  ["Deniz A.","İzmir","beslenme",["ct"]],
  ["Ayşe N.","İstanbul","topluluk",["cu","pz"]],   ["Onur S.","İstanbul","spor",["ct"]],
  ["Berk U.","Antalya","longevity",["ct"]],        ["Gizem P.","İstanbul","wellness",["cu","ct"]],
  ["Tolga R.","İstanbul","beslenme",["pz"]],       ["Sena L.","Bursa","workshop",["ct"]],
  ["Ece V.","İstanbul","topluluk",["cu","ct","pz"]],["Barış H.","Ankara","spor",["ct","pz"]],
  ["Melis O.","İstanbul","beslenme",["ct"]],       ["Arda C.","İstanbul","longevity",["cu"]],
  ["Pınar F.","İzmir","wellness",["pz"]],          ["Kerem J.","İstanbul","workshop",["cu","ct"]],
  ["Bade I.","İstanbul","topluluk",["ct"]],        ["Uğur Z.","Kocaeli","spor",["cu"]],
  ["Yasemin T.","İstanbul","beslenme",["ct","pz"]],["Furkan E.","Ankara","longevity",["ct"]],
  ["Nil A.","İstanbul","wellness",["cu","ct"]],    ["Serkan B.","İstanbul","spor",["pz"]],
  ["Duygu M.","Bursa","workshop",["ct"]],          ["Alp K.","İstanbul","topluluk",["cu","ct"]],
  ["Hazal D.","İzmir","beslenme",["ct"]],          ["Ozan Y.","İstanbul","spor",["ct","pz"]]
];
