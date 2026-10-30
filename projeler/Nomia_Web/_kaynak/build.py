# Nomia · "Sana kavruldu" sitesi · derleme
import os, json, shutil, glob
from PIL import Image
ROOT=os.path.dirname(os.path.abspath(__file__)); OUT=os.path.join(ROOT,"site"); IMG=os.path.join(OUT,"assets","img")
TI="/Users/MINDARTEMOTION/Documents/WORKS/Nomia/True_images"
shutil.rmtree(OUT,ignore_errors=True); [os.makedirs(os.path.join(IMG,d),exist_ok=True) for d in ("beans","farm","life")]
def conv(src,dst,w,q=80):
    im=Image.open(src).convert("RGB"); im.thumbnail((w,w)); im.save(dst,"WEBP",quality=q)

# ---------------- Kahveler (14 menşe + 2 harman). Tadım notları: bölge tipik profili; doğrulanmış parti notları gelince değişir. ----------------
COFFEES=[
 dict(id="cerrado",   ad="Brezilya · Cerrado",            ulke="Brezilya",  bolge="Güney Amerika", pfx="BRAZIL_CERRADO",                  notlar=["Kakao","Fındık","Esmer şeker"],            govde=3, asidite=1, tat="dengeli",  yontem=["espresso","moka","makine"],   sut="ikisi",  aciklama="Yuvarlak, düşük asiditeli ve tanıdık. Sütle en çok eşleşen profil."),
 dict(id="mogiana",   ad="Brezilya · Mogiana",            ulke="Brezilya",  bolge="Güney Amerika", pfx="BRAZIL_MOGIANA",                  notlar=["Sütlü çikolata","Fındık","Karamel"],       govde=2, asidite=1, tat="dengeli",  yontem=["espresso","makine","frenchpress"], sut="ikisi", aciklama="Tatlı ve yumuşak. Sabah rutini için sorunsuz bir başlangıç."),
 dict(id="medellin",  ad="Kolombiya · Medellín",          ulke="Kolombiya", bolge="Güney Amerika", pfx="COLOMBIA_MEDELLIN",               notlar=["Karamel","Kırmızı elma","Sütlü çikolata"], govde=2, asidite=2, tat="dengeli",  yontem=["makine","v60","espresso"],    sut="ikisi",  aciklama="Dengeli, temiz, her yöntemde çalışan bir Kolombiya."),
 dict(id="aipe",      ad="Kolombiya · Huila–Aipe",        ulke="Kolombiya", bolge="Güney Amerika", pfx="COLOMBIA_HUILA-AIPE",             notlar=["Kırmızı meyve","Karamel","Portakal"],      govde=2, asidite=2, tat="meyvemsi", yontem=["v60","makine"],               sut="sade",   aciklama="Meyvemsi başlar, karamelle biter. Sade içimde açılır."),
 dict(id="algeciras", ad="Kolombiya · Huila–Algeciras",   ulke="Kolombiya", bolge="Güney Amerika", pfx="COLOMBIA_HUILA-ALGECIRAS",        notlar=["Şeftali","Esmer şeker","Kakao"],           govde=2, asidite=2, tat="dengeli",  yontem=["v60","makine","espresso"],    sut="ikisi",  aciklama="Sert çekirdekli meyve tatlılığı, kakaolu bitiş."),
 dict(id="letty",     ad="Kolombiya · El Paraíso–Letty",  ulke="Kolombiya", bolge="Güney Amerika", pfx="COLOMBIA_FINCA-EL-PARAISO-LETTY", notlar=["Yasemin","Tropikal meyve","Bal"],          govde=1, asidite=3, tat="meyvemsi", yontem=["v60"],                        sut="sade",   aciklama="Geisha karakteri: çiçeksi, parlak, ince. Özel seçki.", ozel=True),
 dict(id="chirripo",  ad="Kosta Rika · Chirripó",         ulke="Kosta Rika",bolge="Orta Amerika",  pfx="COSTA-RICA_CHIRRIPO-MOUNTAIN",    notlar=["Bal","Kırmızı elma","Tarçın"],             govde=2, asidite=2, tat="dengeli",  yontem=["makine","v60"],               sut="ikisi",  aciklama="Ballı, temiz, hafif baharatlı. Filtre için rahat bir seçim."),
 dict(id="huehue",    ad="Guatemala · Huehuetenango",     ulke="Guatemala", bolge="Orta Amerika",  pfx="GUATEMALA_HUEHUETENANGO",         notlar=["Bitter çikolata","Kırmızı meyve","Tarçın"], govde=3, asidite=2, tat="govdeli",  yontem=["espresso","frenchpress","moka"], sut="ikisi", aciklama="Yoğun ve çikolatalı; meyve alttan gelir. Espresso ve French press."),
 dict(id="honduras",  ad="Honduras · Inholer",            ulke="Honduras",  bolge="Orta Amerika",  pfx="HONDURAS_INHOLER-RAIN-FOREST",    notlar=["Karamel","Kuru üzüm","Kakao"],             govde=2, asidite=1, tat="dengeli",  yontem=["makine","frenchpress"],       sut="ikisi",  aciklama="Tatlı, kuru meyveli, gövdesi orta. Makine ve French press."),
 dict(id="volcan",    ad="Panama · Volcán",               ulke="Panama",    bolge="Orta Amerika",  pfx="PANAMA_VOLCAN",                   notlar=["Portakal çiçeği","Turunçgil","Bal"],       govde=1, asidite=3, tat="meyvemsi", yontem=["v60"],                        sut="sade",   aciklama="Çiçeksi ve turunçgilli, hafif gövde. Özel seçki.", ozel=True),
 dict(id="yirga",     ad="Etiyopya · Yirgacheffe",        ulke="Etiyopya",  bolge="Afrika",        pfx="ETHIOPIA_YIRGACHEFFE",            notlar=["Bergamot","Yasemin","Limon"],              govde=1, asidite=3, tat="meyvemsi", yontem=["v60","makine"],               sut="sade",   aciklama="Çay gibi hafif, çiçeksi, parlak. Sade içenler için."),
 dict(id="hambela",   ad="Etiyopya · Guji–Hambela",       ulke="Etiyopya",  bolge="Afrika",        pfx="ETHIOPIA_GUJI-HAMBELA",           notlar=["Çilek","Yaban mersini","Bal"],             govde=2, asidite=3, tat="meyvemsi", yontem=["v60","makine"],               sut="sade",   aciklama="Meyveli ve tatlı; soğudukça meyve öne çıkar."),
 dict(id="oromia",    ad="Etiyopya · Oromia",             ulke="Etiyopya",  bolge="Afrika",        pfx="ETHIOPIA_OROMIA",                 notlar=["Kırmızı meyve","Siyah çay","Kakao"],       govde=2, asidite=2, tat="meyvemsi", yontem=["makine","frenchpress","v60"], sut="ikisi",  aciklama="Meyve ile kakao arasında; sütle de dengesini korur."),
 dict(id="sumatra",   ad="Endonezya · Sumatra",           ulke="Endonezya", bolge="Asya",          pfx="INDONESIA_SUMATRA",               notlar=["Toprak","Sedir","Bitter çikolata","Tütün"], govde=3, asidite=1, tat="govdeli",  yontem=["frenchpress","cezve","espresso"], sut="ikisi", aciklama="Koyu gövde, düşük asidite, topraksı. Cezve ve French press."),
 dict(id="harman1",   ad="Harman · Mogiana–Huehuetenango",ulke="Brezilya · Guatemala", bolge="Harman", pfx="BRAZIL_MOGIANA",            notlar=["Sütlü çikolata","Fındık","Kırmızı meyve"], govde=3, asidite=1, tat="dengeli",  yontem=["espresso","moka","makine"],   sut="sutlu",  aciklama="Sütlü içecekler için kurulmuş harman: çikolata önde, meyve arkada.", harman=["mogiana","huehue"]),
 dict(id="harman2",   ad="Harman · Yirgacheffe–Medellín", ulke="Etiyopya · Kolombiya", bolge="Harman", pfx="ETHIOPIA_YIRGACHEFFE",       notlar=["Karamel","Turunçgil","Çiçeksi"],           govde=2, asidite=2, tat="meyvemsi", yontem=["v60","makine"],               sut="ikisi",  aciklama="Filtre harmanı: Medellín'in tatlılığı, Yirgacheffe'nin parlaklığı.", harman=["yirga","medellin"]),
]
YONTEM={"v60":"V60 / pour over","makine":"Filtre kahve makinesi","frenchpress":"French press","espresso":"Espresso makinesi","moka":"Moka pot","cezve":"Türk kahvesi"}
BOLGE_RENK={"Güney Amerika":"#4B2C22","Orta Amerika":"#D9432F","Afrika":"#24503B","Asya":"#3D6B87","Harman":"#1F2A44"}

# ---------------- Tat çarkı: Nomia'ya özgü Türkçe taksonomi (özgün; başka bir çarkın kopyası değil) ----------------
WHEEL=[
 dict(ad="Meyve",     renk="#C0392B", alt=[
   dict(ad="Kırmızı meyve", renk="#D9534F", n=["Çilek","Ahududu","Kiraz","Kırmızı elma"]),
   dict(ad="Koyu meyve",    renk="#7B2D4A", n=["Yaban mersini","Böğürtlen","Erik","Siyah üzüm"]),
   dict(ad="Turunçgil",     renk="#E8A33D", n=["Limon","Portakal","Greyfurt","Bergamot","Mandalina"]),
   dict(ad="Tropikal",      renk="#E0B23A", n=["Ananas","Mango","Tropikal meyve","Çarkıfelek"]),
   dict(ad="Sert çekirdekli",renk="#E39A6B",n=["Şeftali","Kayısı","Nektarin"]),
   dict(ad="Kuru meyve",    renk="#A0522D", n=["Kuru üzüm","Hurma","İncir","Kuru erik"])]),
 dict(ad="Çiçeksi",   renk="#B77DBE", alt=[
   dict(ad="Çiçek", renk="#C9A0DC", n=["Yasemin","Gül","Portakal çiçeği","Papatya","Lavanta","Çiçeksi"])]),
 dict(ad="Tatlı",     renk="#D4A017", alt=[
   dict(ad="Şekerli", renk="#E2B84A", n=["Bal","Karamel","Esmer şeker","Pekmez","Akçaağaç"]),
   dict(ad="Vanilya", renk="#EBD9A5", n=["Vanilya","Krema"])]),
 dict(ad="Çikolata",  renk="#5C3A21", alt=[
   dict(ad="Kakao", renk="#7A4B2B", n=["Sütlü çikolata","Bitter çikolata","Kakao"])]),
 dict(ad="Kuruyemiş & Tahıl", kisa="Kuruyemiş", renk="#B08968", alt=[
   dict(ad="Kuruyemiş", renk="#C49A6C", n=["Fındık","Badem","Ceviz","Yer fıstığı"]),
   dict(ad="Tahıl",     renk="#D7B98C", n=["Ekmek kabuğu","Malt","Tahıl"])]),
 dict(ad="Baharat",   renk="#B5541C", alt=[
   dict(ad="Sıcak baharat", renk="#C96A2E", n=["Tarçın","Karanfil","Kakule","Anason"]),
   dict(ad="Keskin",        renk="#8C3B12", n=["Karabiber","Zencefil"])]),
 dict(ad="Bitkisel & Topraksı", kisa="Bitkisel", renk="#4E7A4F", alt=[
   dict(ad="Çay & ot", renk="#7FA36B", n=["Siyah çay","Yeşil çay","Taze ot","Bitkisel"]),
   dict(ad="Topraksı", renk="#6B5B3E", n=["Toprak","Tütün","Deri","Sedir","Odunsu"])]),
 dict(ad="Kavrulmuş", renk="#3B2A22", alt=[
   dict(ad="Kavrum", renk="#5A4033", n=["Dumanlı","Tost","Kavrulmuş tahıl","Kül"])]),
 dict(ad="Fermente",  renk="#7B2C5E", alt=[
   dict(ad="Şarabımsı", renk="#9A4D7F", n=["Kırmızı şarap","Rom","Şarabımsı","Aşırı olgun meyve"])]),
]
# Nota açıklamaları (tooltip)
NOTA_ACIKLAMA={"Bergamot":"Earl Grey çayındaki koku. Yıkanmış Etiyopya kahvelerinde sık.","Yasemin":"Hafif, çiçeksi; genelde açık kavrum ve yüksek rakım.","Kakao":"Şekersiz kakao tozu gibi; kavrum orta-koyuya gidince belirginleşir.","Fındık":"Kavrulmuş fındık; Brezilya ve sütlü içimle iyi.","Karamel":"Isıtılmış şeker; orta kavrumun imzası.","Toprak":"Nemli toprak, orman zemini; ıslak kabuk soyma işlemli Sumatra'da tipik.","Esmer şeker":"Karamelden daha koyu, pekmezimsi tatlılık.","Bal":"Sıvı bal tatlılığı ve yoğunluğu.","Çilek":"Taze çilek; doğal işlemli Etiyopya kahvelerinde.","Kırmızı elma":"Sulu, hafif ekşi tatlılık.","Portakal":"Tatlı turunçgil; Kolombiya'da sık.","Limon":"Parlak, keskin turunçgil asiditesi.","Tarçın":"Sıcak baharat; Orta Amerika kahvelerinde.","Sedir":"Odunsu, kuru; Sumatra'nın imzası.","Tütün":"Kuru yaprak, hafif tatlı; koyu gövdeli kahvelerde.","Siyah çay":"Demli çay tanenleri; ince gövdeli kahvelerde.","Kuru üzüm":"Yoğun, kuru meyve tatlılığı.","Şeftali":"Olgun sert çekirdekli meyve; yumuşak asidite.","Tropikal meyve":"Ananas, mango çağrışımı; Geisha ve doğal işlemde.","Portakal çiçeği":"Narin çiçek kokusu; Panama Geisha'da.","Turunçgil":"Genel turunçgil parlaklığı.","Çiçeksi":"Belirgin bir çiçek adı olmadan çiçek kokusu.","Sütlü çikolata":"Tatlı, yumuşak çikolata.","Bitter çikolata":"Yoğun, az tatlı çikolata; gövdeli kahvelerde.","Kırmızı meyve":"Çilek, kiraz, ahududu arası genel meyvemsilik.","Yaban mersini":"Koyu, tatlı meyve; doğal işlemli Guji'de."}

LIFE={ # rol → dosya
 "hero":"Lifestyle/250 GR - Toplu.png","hero2":"Lifestyle/250 GR - Kahverengi - 30 - 1080x1350.png",
 "bana_kavur":"Lifestyle/250 GR - Nomia - 19 - 1080x1350.png","sade":"Lifestyle/250 GR - Yeşil - 29 - 1080x1350.png","sutlu":"Lifestyle/250 GR - Kahverengi - 29 - 1080x1350.png","v60":"Lifestyle/250 GR - Mavi - 24 - 1080x1350.png",
 "tadim":"Lifestyle/250 GR - Kahverengi - 23 - 1080x1350.png","abonelik":"Lifestyle/250 GR - Kırmızı - 30 - 1080x1350.png","kavurma":"Lifestyle/250 GR - Mavi - 09.png","demleme":"Lifestyle/250 GR - Mavi - 29 - 1080x1350.png",
 "destek":"Lifestyle/250 GR - Kahverengi - 05.png","isletme":"Lifestyle/250 GR - Kahverengi - 13 - 1080x1350.png","egitim":"Lifestyle/250 GR - Mavi - 13 - 1080x1350.png","hakkimizda":"Lifestyle/250 GR - Kırmızı - 25 - 1080x1350.png",
 "blog1":"Lifestyle/250 GR - Kırmızı - 13 - 1080x1350.png","blog2":"Lifestyle/250 GR - Yeşil - 24 - 1080x1350.png","blog3":"Lifestyle/250 GR - Mavi - 02.png","blog4":"Lifestyle/250 GR - Kahverengi - 21 - 1080x1350.png",
 "gal1":"Lifestyle/250 GR - Kırmızı - 01.png","gal2":"Lifestyle/250 GR - Yeşil - 04.png","gal3":"Lifestyle/250 GR - Mavi - 18 - 1080x1350.png","gal4":"Lifestyle/250 GR - Kahverengi - 03.png","gal5":"Lifestyle/250 GR - Kırmızı - 27 - 1080x1350.png","gal6":"Lifestyle/250 GR - Yeşil - 12 - 1080x1350.png",
}
MOCK="/Users/MINDARTEMOTION/Documents/WORKS/Nomia/mockups"
SHOP={"v60":"18.png","degirmen":"grainer.png","frenchpress":"frenchpress.png","cezve":"cezve.png","terazi":"scale.png","moka":"mochapot.png","kupa":"14.png","termos":"15.png","canta":"bag.png","tisort":"17.png","sapka":"hat.png","kutu":"12.png","kutu4":"7.png","kutu-acik":"11.png","kutu-kart":"9.png","bar":"1.png","raf":"4.png","latte":"5.png","dokum":"8.png","dort":"2.png"}
os.makedirs(os.path.join(IMG,"shop"),exist_ok=True)
for k,f in SHOP.items(): conv(os.path.join(MOCK,f), os.path.join(IMG,"shop",k+".webp"), 1100, 80)

# Satış verisi. Fiyatlar [FİYAT]: fiyat listesi kesinleşince doldurulur (kitap kuralı: kesinleşmemiş rakam yok).
PLANS=[
 dict(id="baslangic",ad="Başlangıç",miktar="250 g / ay",siklik="4 haftada bir",fincan="≈ 16 fincan",hediye="Nomia seramik kupa",kim="Günde bir fincan içen, tek kişi.",sonraki="10. paket ücretsiz"),
 dict(id="sabit",ad="Sabit",miktar="2 × 250 g ya da 500 g / ay",siklik="2 ya da 4 haftada bir",fincan="≈ 33 fincan",hediye="V60 başlangıç seti",kim="İki kişilik ev ya da günde iki fincan.",sonraki="10. paket ücretsiz",one=True),
 dict(id="tutkulu",ad="Tutkulu",miktar="4 × 250 g ya da 1 kg / ay",siklik="2 haftada bir",fincan="≈ 66 fincan",hediye="El değirmeni",kim="Her gün birkaç kez demleyen, farklı kahve deneyen.",sonraki="6. ayda gooseneck kettle · 10. paket ücretsiz"),
 dict(id="ofis",ad="Ofis",miktar="1 kg ve üzeri",siklik="Haftada ya da 2 haftada bir",fincan="Ekibe göre",hediye="Yarım günlük barista eğitimi",kim="Ofis ve küçük işletmeler.",sonraki="Ayda bir kalibrasyon ziyareti",b2b=True),
]
GIFTS=[
 dict(id="h3",ad="3 ay",icerik="3 × 250 g",hediye="Nomia kupa",ek="Hediye kutusu ve el yazısı kart",img="kutu"),
 dict(id="h6",ad="6 ay",icerik="6 × 250 g",hediye="Nomia kupa + V60 seti",ek="Özel seçki bir kez dahil",img="kutu4",one=True),
 dict(id="h12",ad="12 ay",icerik="12 × 250 g",hediye="El değirmeni + kupa",ek="Özel seçki dört kez dahil",img="kutu-kart"),
]
BUNDLES=[
 dict(id="filtre",ad="Filtre paketi",icerik="Sabit plan + gooseneck kettle + cam server",not_="V60 seti zaten planın hediyesi.",img="v60"),
 dict(id="espresso",ad="Espresso paketi",icerik="Tutkulu plan + hassas terazi",not_="El değirmeni zaten planın hediyesi.",img="terazi"),
 dict(id="cezvep",ad="Cezve paketi",icerik="Başlangıç plan (cezve öğütümü) + bakır cezve + iki fincan",not_="Sumatra ya da Cerrado ile önerilir.",img="cezve"),
]
EQUIP=[
 dict(id="e-v60",ad="V60 başlangıç seti",a="Dripper 02, 40 kâğıt filtre, ölçü kaşığı. 1–4 fincan.",etiket="Sabit planda hediye",img="v60"),
 dict(id="e-degirmen",ad="El değirmeni",a="Çelik konik bıçak, 30 g hazne, kademeli ayar.",etiket="Tutkulu planda hediye",img="degirmen"),
 dict(id="e-fp",ad="French press",a="Cam hazne, çelik filtre. 350 ml ya da 1 L.",etiket="2 boy",img="frenchpress"),
 dict(id="e-cezve",ad="Bakır cezve",a="Kalaylı iç yüzey, ahşap sap. 2 kişilik.",etiket="Cezve paketi",img="cezve"),
 dict(id="e-terazi",ad="Hassas terazi",a="0,1 g hassasiyet, zamanlayıcı, 2 kg kapasite.",etiket="Espresso paketi",img="terazi"),
 dict(id="e-moka",ad="Moka pot",a="Alüminyum, ocak üstü, 3 fincan.",etiket="3 fincan",img="moka"),
]
MERCH=[
 dict(id="m-kupa",ad="Nomia kupa 300 ml",a="Seramik, mat sır. Bulaşık makinesine uygun.",etiket="Başlangıç planda hediye",img="kupa"),
 dict(id="m-termos",ad="Termos 500 ml",a="Çift cidarlı çelik, 8 saat sıcak tutar.",etiket="Yol için",img="termos"),
 dict(id="m-canta",ad="Kanvas çanta",a="Ham kanvas, tek renk baskı.",etiket="Doğal",img="canta"),
 dict(id="m-tisort",ad="Tişört",a="%100 pamuk. Göğüste küçük nomia, sırtta baskı.",etiket="S–XL",img="tisort"),
 dict(id="m-sapka",ad="Şapka",a="Pamuk, ayarlanabilir, nakışlı.",etiket="Tek beden",img="sapka"),
 dict(id="m-kutu",ad="Hediye kutusu",a="Kraft kutu, kart, kupa ve seçtiğin 250 g.",etiket="Tek sefer",img="kutu"),
]
for k,f in LIFE.items():
    src=os.path.join(TI,f)
    if not os.path.exists(src): src=src.replace("Yeşil - 29 - 1080x1350","Yeşil - 29 - 1080x1350")
    conv(src, os.path.join(IMG,"life",k+".webp"), 1400 if k.startswith("hero") else 1100, 80)
for c in COFFEES:
    conv(os.path.join(TI,"Çekirdek Görselleri",c["pfx"]+"_MEDIUM-ROAST_02.jpg"), os.path.join(IMG,"beans",c["id"]+".webp"), 900, 78)
    conv(os.path.join(TI,"Çekirdek Görselleri",c["pfx"]+"_MEDIUM-ROAST_04.jpg"), os.path.join(IMG,"beans",c["id"]+"-macro.webp"), 900, 78)
    conv(os.path.join(TI,"Tarla Görselleri",c["pfx"]+"_01.jpg"), os.path.join(IMG,"farm",c["id"]+".webp"), 1100, 78)

t=open(os.path.join(ROOT,"template.html"),encoding="utf-8").read()
data=dict(plans=PLANS,gifts=GIFTS,bundles=BUNDLES,equip=EQUIP,merch=MERCH,coffees=COFFEES,yontem=YONTEM,bolgeRenk=BOLGE_RENK,wheel=WHEEL,nota=NOTA_ACIKLAMA)
t=t.replace("/*__DATA__*/","window.NOMIA="+json.dumps(data,ensure_ascii=False)+";")
open(os.path.join(OUT,"index.html"),"w",encoding="utf-8").write('<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'+t.replace("</style>","</style></head><body>",1)+"</body></html>")
open(os.path.join(ROOT,"artifact.html"),"w",encoding="utf-8").write(t)   # artifact için (doctype sarmalı yayın sırasında eklenir)
n=sum(len(files) for _,_,files in os.walk(IMG)); print("images:",n,"| index KB:",os.path.getsize(os.path.join(OUT,"index.html"))//1024)
