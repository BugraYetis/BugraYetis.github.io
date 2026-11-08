const http=require('http'),fs=require('fs'),path=require('path');
const root=__dirname;
const T={'.html':'text/html','.css':'text/css','.js':'application/javascript','.mp4':'video/mp4',
'.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.json':'application/json'};
http.createServer((req,res)=>{
  let p=decodeURIComponent(req.url.split('?')[0]); if(p==='/')p='/index.html';
  const f=path.join(root,p);
  if(!f.startsWith(root)){res.writeHead(403).end();return;}
  fs.stat(f,(e,st)=>{
    if(e||!st.isFile()){res.writeHead(404).end('404');return;}
    const type=T[path.extname(f).toLowerCase()]||'application/octet-stream';
    const range=req.headers.range;
    if(range&&/^bytes=/.test(range)){
      const [s,en]=range.replace('bytes=','').split('-');
      const start=parseInt(s,10)||0, end=en?parseInt(en,10):st.size-1;
      res.writeHead(206,{'Content-Type':type,'Content-Range':`bytes ${start}-${end}/${st.size}`,
        'Accept-Ranges':'bytes','Content-Length':end-start+1});
      fs.createReadStream(f,{start,end}).pipe(res);
    } else {
      res.writeHead(200,{'Content-Type':type,'Content-Length':st.size,'Accept-Ranges':'bytes','Cache-Control':'no-cache'});
      fs.createReadStream(f).pipe(res);
    }
  });
}).listen(8899,()=>console.log('BASE web on http://localhost:8899'));
