// Demo verisi: gerçek kişi adı ve fotoğraf içermez (KVKK). Görseller "Görsel gelecek" yer tutucusu olarak gösterilir.
(function(){
  const names=['Örnek Katılımcı','Demo Kullanıcı','Misafir Bir','Misafir İki','Katılımcı Üç','Katılımcı Dört','Ziyaretçi Beş','Ziyaretçi Altı','Konuşmacı Yedi','Konuşmacı Sekiz','Test Yolcu','Deneme Yolcu'];
  const people=names.map(n=>({n,s:n.toLocaleLowerCase('tr').replace(/ı/g,'i').replace(/ş/g,'s').replace(/ğ/g,'g').replace(/ü/g,'u').replace(/ö/g,'o').replace(/ç/g,'c').replace(/\s+/g,'')}));
  const photos=[];
  for(let i=1;i<=36;i++){
    const p=[(i*5)%names.length];if(i%3===0)p.push((i*7+1)%names.length);
    photos.push({id:'demo'+String(i).padStart(3,'0'),w:1600,h:1200,k:i%6===0?'video':'foto',d:i<=18?'2026-10-16':'2026-10-17',p:[...new Set(p)]});
  }
  window.EP_DATA={people,photos};
})();
