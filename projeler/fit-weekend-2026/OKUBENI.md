# Fit Weekend 2026 — Web Sitesi

**Şehre Fit Bir Dönüş** · 18–19–20 Eylül 2026 · Kanyon
Diyetisyen Dünyası × Kanyon

Bağımlılığı olmayan, tek sayfalık statik site. Kurulum gerektirmez.

---

## 1. Nasıl açılır?

`index.html` dosyasına çift tıklayın — tarayıcıda açılır.

Yerel sunucu ile denemek isterseniz (bazı tarayıcılar video için ister):

```bash
cd fit-weekend-2026
python3 -m http.server 8000
# tarayıcıda: http://localhost:8000
```

---

## 2. Yayına alma

Klasörün tamamını herhangi bir statik hosting'e yükleyin:

| Servis | Nasıl |
|---|---|
| **Netlify** | Klasörü netlify.com/drop sayfasına sürükleyin |
| **Vercel** | `vercel` komutu ya da GitHub bağlantısı |
| **Cloudflare Pages** | Klasörü yükleyin |
| **Kendi sunucunuz** | FTP ile `public_html` altına kopyalayın |

Alan adı bağladıktan sonra `assets/js/data.js` içindeki `EVENT.url` alanını
gerçek adresle güncelleyin (paylaşım ve takvim bağlantılarında kullanılıyor).

---

## 3. İçeriği düzenleme

**Tek bir dosya:** `assets/js/data.js`
Kod bilgisi gerekmez — tırnak içindeki metinleri değiştirmeniz yeterli.

| Bölüm | Ne içerir |
|---|---|
| `EVENT` | Tarihler, mekân, adres, açıklama, site adresi |
| `SECTIONS` | 10 deneyim bölümü (başlık, metin, madde listesi, görsel/video, renk) |
| `SPEAKERS` | Konuşmacı kartları — isim, unvan, biyografi, etiketler, seanslar |
| `PROGRAM` | Üç günün saat saat akışı (`cu` Cuma, `ct` Cumartesi, `pz` Pazar) |
| `ZONES` | Festival haritasındaki alanlar |
| `SPONSORS` | Sponsor kartları |
| `POSTS` | Topluluk duvarı gönderileri |
| `STATS` | Rakamlar bölümü |
| `INTERESTS` | Kayıt formundaki ilgi alanı seçenekleri |
| `FAQ` | Sıkça sorulan sorular ve cevapları |

> ⚠️ Konuşmacılar, program saatleri ve sponsorlar **örnek içeriktir**.
> Gerçek listelerinizle değiştirin.

### Konuşmacı fotoğrafı eklemek

1. Fotoğrafı `assets/img/speakers/` klasörüne koyun (örn. `elif-kaya.webp`).
2. `data.js` içinde ilgili konuşmacıya tek satır ekleyin:

```js
{ n:"Dyt. Elif Kaya", r:"Klinik Diyetisyen", c:"#D62E63",
  img:"assets/img/speakers/elif-kaya.webp",
  b:"...", t:[...], s:[...] }
```

Fotoğraf yoksa kart baş harflerden renkli avatar üretmeye devam eder —
ikisini karışık kullanabilirsiniz. Dosya bulunamazsa da kart bozulmaz,
sessizce avatara döner. Önerilen boyut: 800×1000 px, 200 KB altı.

### Sponsor logosu eklemek

1. Logoyu `assets/logo/sponsors/` klasörüne koyun (tercihen `.svg`).
2. `SPONSORS` listesindeki markaya `logo:` satırını ekleyin:

```js
{ n:"Marka Adı", t:"Ana Sponsor", logo:"assets/logo/sponsors/marka.svg" }
```

Logolar kartta gri görünür, üzerine gelince renklenir.

---

## 4. Kayıt & "Kimler geliyor" duvarı

Site şu an **demo modunda** çalışıyor: kayıtlar ziyaretçinin kendi tarayıcısında
saklanıyor, sunucu gerekmiyor. Sayfayı herkese açtığınızda kayıtları tek bir
yerde toplamak için `assets/js/data.js` içindeki `DATA_CONFIG` bloğunu düzenleyin.

```js
const DATA_CONFIG = {
  MODE: "local",   // "local" | "api" | "supabase" | "sheets"
  ENDPOINT: "",
  SUPABASE_URL: "",
  SUPABASE_ANON_KEY: "",
  SUPABASE_TABLE: "kayitlar",
  WALL_LIMIT: 120,
  BASE_COUNT: 2847   // sayaca eklenen taban — gerçek ön kayıt sayınız
};
```

### Seçenek A — Supabase (en hızlısı, ücretsiz başlangıç)

1. supabase.com'da proje açın.
2. `kayitlar` adında tablo oluşturun. Kolonlar:
   `name` (text), `city` (text), `interest` (text), `days` (jsonb), `ts` (int8)
3. Tablo için "anon insert" ve "anon select" politikalarını açın.
4. `MODE: "supabase"` yapın, `SUPABASE_URL` ve `SUPABASE_ANON_KEY` alanlarını doldurun.

### Seçenek B — Google Sheets

1. Bir Google E-Tablo açın, Uzantılar → Apps Script.
2. `doPost` ile gelen JSON'u satır olarak ekleyen, `doGet` ile tüm satırları
   JSON dizi olarak döndüren bir script yazıp "Web uygulaması" olarak yayınlayın.
3. `MODE: "sheets"` yapın, `ENDPOINT` alanına web uygulaması URL'ini yazın.

### Seçenek C — Kendi API'niz

`MODE: "api"` yapın ve `ENDPOINT` alanına adresi yazın.
Site `POST` ile `{name, city, interest, days, ts}` gönderir,
`GET` ile aynı yapıda bir dizi bekler.

> Uzak servise ulaşılamazsa site otomatik olarak yerel moda düşer — sayfa asla bozulmaz.

---

## 5. Takvime ekleme & kişisel program

**Tüm festival için** üç yol da hazır:

- **`.ics` dosyası** — Apple Takvim, Outlook masaüstü ve çoğu uygulama
- **Google Takvim** — doğrudan bağlantı
- **Outlook Web** — doğrudan bağlantı

**Tek seans için:** program kartlarındaki "Takvime Ekle" düğmesi.

**Kişisel program:** ziyaretçi kartlardaki ⭐ simgesine dokunarak üç günden
istediği seansları işaretliyor; ekranın altında beliren çubuktan hepsini
**tek bir takvim dosyası** olarak indirebiliyor. Seçimler tarayıcıda saklanıyor,
sayfa yenilense de kaybolmuyor. Her seansa 30 dakika öncesi hatırlatıcı ekleniyor.

Saatler Europe/Istanbul (UTC+3) olarak hesaplanıyor.

---

## 5b. Paylaşım

SSS bölümünün altında WhatsApp, X, LinkedIn ve "linki kopyala" düğmeleri var.
Mobil cihazlarda cihazın kendi paylaşım menüsü de açılıyor.
Paylaşım metni `app.js` içindeki `share()` fonksiyonunda tek satırda tanımlı.

---

## 6. Görseller ve videolar

- Videolar web için sıkıştırıldı (~1,2–2,3 MB). Orijinaller
  `Downloads/fit_weekend` klasörünüzde duruyor, dokunulmadı.
- Hero ve Fit Antrenmanlar bölümü `antreman_dogru.mp4` videosunu kullanıyor.
- Görseller WebP'ye çevrildi. Toplam site boyutu ~8 MB.
- Video ve görseller görünür alana girince yükleniyor; ekrandan çıkınca video duruyor.

Yeni görsel eklerken WebP tercih edin. `SECTIONS` içindeki `media` alanı hem
görsel hem video kabul ediyor:

```js
media:{ type:"image", src:"assets/img/dosya.webp" }
media:{ type:"video", src:"assets/video/dosya.mp4", poster:"assets/video/dosya.webp" }
```

---

## 7. Teknik notlar

- Tek dış bağımlılık: Google Fonts (Bricolage Grotesque + Plus Jakarta Sans).
  İnternetsiz ortamda sistem fontlarına düşer, tasarım bozulmaz.
- `prefers-reduced-motion` destekleniyor — hareket hassasiyeti olan
  ziyaretçilerde animasyonlar kapanır.
- Klavye ile tam gezinilebilir; modal, lightbox ve harita `Esc` ile kapanır.
- SEO: Open Graph etiketleri ve `schema.org/Festival` yapılandırılmış verisi eklendi.
- Mobilde ayrı düzen: dokunmatik sürükleme, yatay kaydırma, tam ekran menü.

---

## Dosya yapısı

```
fit-weekend-2026/
├── index.html
├── OKUBENI.md
└── assets/
    ├── css/style.css      → tüm tasarım, renkler, animasyonlar
    ├── js/data.js         → 📝 İÇERİK BURADA
    ├── js/app.js          → etkileşimler
    ├── img/               → görseller (WebP)
    │   └── speakers/      → 📸 konuşmacı fotoğraflarını buraya koyun
    ├── video/             → sıkıştırılmış videolar + poster kareler
    └── logo/              → Fit Weekend, Kanyon, Diyetisyen Dünyası
        └── sponsors/      → 🏷️ sponsor logolarını buraya koyun
```
