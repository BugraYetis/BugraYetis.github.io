/* Demo verisi: gerçek fotoğraflar kaldırıldı, her kart "Görsel gelecek" yer tutucusu gösterir. */
window.GALLERY = {
 "sections": [
  {
   "key": "etkinlik",
   "title": "Eğitim İşbirliği Etkinliği",
   "photos": Array.from({ length: 24 }, (_, i) => ({
     "id": "FOTO-" + String(i + 1).padStart(2, "0"),
     "w": 6000,
     "h": 4000,
     "portrait": false
   }))
  }
 ],
 "total": 24
};
