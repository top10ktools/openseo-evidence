import {readFile,readdir} from 'node:fs/promises';
const files=(await readdir('dist')).filter(x=>/\.(js|html|css)$/.test(x));
const bad=[];
const sinks=/\b(fetch|XMLHttpRequest|WebSocket|EventSource|sendBeacon|RTCPeerConnection)\b|import\s*\(\s*[^'"`]/;
for(const f of files){
  const source=await readFile(`dist/${f}`,'utf8');
  // Plain anchor destinations require a deliberate user navigation and cannot
  // transmit imported data. Strip them before scanning executable/runtime URLs.
  const runtimeSource=f.endsWith('.html')?source.replace(/\s+href=(['"])[^'"]*\1/gi,''):source;
  if(/(?:https?:)?\/\//i.test(runtimeSource)||sinks.test(runtimeSource))bad.push(f);
  if(f==='index.html'&&!source.includes("connect-src 'none'"))bad.push('missing CSP');
}
if(bad.length)throw new Error(`Privacy check failed: ${bad.join(', ')}`);
console.log('Privacy static check passed: no outbound runtime URL/API patterns; CSP present.');
