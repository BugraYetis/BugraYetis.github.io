NOMIA · "Sana kavruldu" web sitesi · v4.1 · 29 Eylül 2026

index.html          Tek dosyalık site (hash yönlendirmeli sayfalar: #/kahveler, #/bana-kavur, #/tat-carki, #/abonelik, #/hediye, #/ekipman, #/demleme, #/isletmeler, #/egitim, #/blog, #/hakkimizda, #/sss, #/tadim-seti)
assets/img/life     Yaşam tarzı fotoğrafları (True_images/Lifestyle'dan seçildi, WebP)
assets/img/farm     Menşe başına tarla görseli (temsili)
assets/img/beans    Menşe başına çekirdek görseli + makro (temsili)
assets/img/shop     Ekipman, merch ve hediye kutusu mockup'ları (mockups klasöründen)
_kaynak/            build.py (veri: kahveler, planlar, hediyeler, paketler, ekipman, merch, tat çarkı, görsel eşlemesi) + template.html

v4.1 satış katmanı: ana sayfada abonelik planları (ilk kutu hediyeleri), hediye aboneliği 3/6/12 ay, ekipman+abonelik paketleri, ekipman ve merch sayfası, localStorage sepet (ödeme sağlayıcı bağlanacak).

Yayınlamak için klasörü olduğu gibi bir sunucuya koyun. Veriyi düzenlemek için _kaynak/build.py'yi değiştirip yeniden çalıştırın (python3 build.py; True_images ve mockups klasörleri gerekir).

Doldurulacaklar: [FİYAT] alanları (fiyat listesi), [EPOSTA], abonelik yönetim koşulları hukuki metin, merch baskılarının "Sana kavruldu." sistemine göre yeniden çizimi. Kitabın kuralları: doğrulanmamış puan/sertifika/hız vaadi yok; tadım notları "bölge tipik profili" olarak işaretli.
