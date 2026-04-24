(function(){const d=document.createElement("link").relList;if(d&&d.supports&&d.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function i(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(e){if(e.ep)return;e.ep=!0;const s=i(e);fetch(e.href,s)}})();const C=` 
  <div id="splash-screen">
    <h1>diff-image</h1>
  </div>
`;function W(){const n=document.getElementById("splash-screen");n.style.display="flex",setTimeout(()=>{n.classList.add("hidden")},2e3)}function I(n){return n.naturalWidth??n.width}function D(n){return n.naturalHeight??n.height}function S(n,d){const i=n.naturalWidth,a=n.naturalHeight;if(d==="vertical"){const h=Math.floor(a/2);if(h<=0)return null;const m=document.createElement("canvas");m.width=i,m.height=h,m.getContext("2d").drawImage(n,0,0,i,h,0,0,i,h);const p=document.createElement("canvas");return p.width=i,p.height=h,p.getContext("2d").drawImage(n,0,a-h,i,h,0,0,i,h),[m,p]}const e=Math.floor(i/2);if(e<=0)return null;const s=document.createElement("canvas");s.width=e,s.height=a,s.getContext("2d").drawImage(n,0,0,e,a,0,0,e,a);const l=document.createElement("canvas");return l.width=e,l.height=a,l.getContext("2d").drawImage(n,i-e,0,e,a,0,0,e,a),[s,l]}function A(n,d,i=!1){const a=document.createElement("canvas"),e=a.getContext("2d"),s=I(n),l=I(d),h=D(n),m=D(d),p=i&&s!==l,c=Math.max(s,l),g=Math.max(h,m);a.width=c,a.height=g;const y=t=>{const u=I(t),v=D(t);if(p){const b=Math.floor((c-u)/2);e.fillStyle="#ffffff",e.fillRect(0,0,c,g),e.drawImage(t,b,0,u,v);return}e.drawImage(t,0,0,u,v)};y(n);const r=e.getImageData(0,0,c,g);a.width=c,a.height=g,y(d);const f=e.getImageData(0,0,c,g),o=e.createImageData(c,g);for(let t=0;t<r.data.length;t+=4){const u=Math.abs(r.data[t]-f.data[t]),v=Math.abs(r.data[t+1]-f.data[t+1]),b=Math.abs(r.data[t+2]-f.data[t+2]),w=Math.abs(r.data[t+3]-f.data[t+3]);u+v+b+w>60?(o.data[t]=255,o.data[t+1]=255,o.data[t+2]=255,o.data[t+3]=255):(o.data[t]=0,o.data[t+1]=0,o.data[t+2]=0,o.data[t+3]=255)}return e.putImageData(o,0,0),a}function H(n,d,i=!1){const a=document.createElement("canvas"),e=a.getContext("2d"),s=I(n),l=I(d),h=D(n),m=D(d),p=i&&s!==l,c=Math.max(s,l),g=Math.max(h,m);a.width=c,a.height=g;const y=t=>{const u=I(t),v=D(t);if(p){const b=Math.floor((c-u)/2);e.fillStyle="#ffffff",e.fillRect(0,0,c,g),e.drawImage(t,b,0,u,v);return}e.drawImage(t,0,0,u,v)};y(n);const r=e.getImageData(0,0,c,g);a.width=c,a.height=g,y(d);const f=e.getImageData(0,0,c,g),o=e.createImageData(c,g);for(let t=0;t<r.data.length;t+=4){const u=Math.abs(r.data[t]-f.data[t]),v=Math.abs(r.data[t+1]-f.data[t+1]),b=Math.abs(r.data[t+2]-f.data[t+2]),w=Math.abs(r.data[t+3]-f.data[t+3]);u+v+b+w>60?(o.data[t]=r.data[t],o.data[t+1]=r.data[t+1],o.data[t+2]=r.data[t+2],o.data[t+3]=r.data[t+3]):(o.data[t]=0,o.data[t+1]=0,o.data[t+2]=0,o.data[t+3]=0)}return e.putImageData(o,0,0),a}function j(n,d,i=!1){const a=document.createElement("canvas"),e=a.getContext("2d"),s=I(n),l=I(d),h=D(n),m=D(d),p=i&&s!==l,c=Math.max(s,l),g=Math.max(h,m);a.width=c,a.height=g;const y=t=>{const u=I(t),v=D(t);if(p){const b=Math.floor((c-u)/2);e.fillStyle="#ffffff",e.fillRect(0,0,c,g),e.drawImage(t,b,0,u,v);return}e.drawImage(t,0,0,u,v)};y(n);const r=e.getImageData(0,0,c,g);a.width=c,a.height=g,y(d);const f=e.getImageData(0,0,c,g),o=e.createImageData(c,g);for(let t=0;t<r.data.length;t+=4){const u=Math.abs(r.data[t]-f.data[t]),v=Math.abs(r.data[t+1]-f.data[t+1]),b=Math.abs(r.data[t+2]-f.data[t+2]),w=Math.abs(r.data[t+3]-f.data[t+3]);u+v+b+w>60?(o.data[t]=f.data[t],o.data[t+1]=f.data[t+1],o.data[t+2]=f.data[t+2],o.data[t+3]=f.data[t+3]):(o.data[t]=0,o.data[t+1]=0,o.data[t+2]=0,o.data[t+3]=0)}return e.putImageData(o,0,0),a}function E(){const n=document.getElementById("image-a"),d=document.getElementById("image-b"),i=document.getElementById("diff-canvas"),a=document.getElementById("diff-mask-a"),e=document.getElementById("diff-mask-b"),s=document.getElementById("enable-width-adjustment").checked,l=document.getElementById("single-image-diff").checked,h=document.querySelector('input[name="single-image-diff-option"]:checked').value;let m=null,p=null;if(l){if(!n.src)return;const t=S(n,h);if(!t)return;[m,p]=t}else{if(!n.src||!d.src)return;m=n,p=d}const c=A(m,p,s);i.width=c.width,i.height=c.height,i.getContext("2d").drawImage(c,0,0);const y=H(m,p,s);a.width=y.width,a.height=y.height,a.getContext("2d").drawImage(y,0,0);const f=j(m,p,s);e.width=f.width,e.height=f.height,e.getContext("2d").drawImage(f,0,0)}const O=`
  <div id="upload-container">
    <button id="upload-button-1">Upload Image 1</button>
    <input type="file" id="upload-input" accept="image/*" style="display: none;">
    <button id="upload-button-2">Upload Image 2</button>
    <input type="file" id="upload-input-2" accept="image/*" style="display: none;">
  </div>
`;function q(){const n=document.getElementById("upload-button-1"),d=document.getElementById("upload-input"),i=document.getElementById("upload-button-2"),a=document.getElementById("upload-input-2"),e=document.getElementById("single-image-diff"),s=()=>{const l=e.checked,h=document.querySelector('[data-target="image-b"]');i.style.display=l?"none":"inline-block",h.style.display=l?"none":"flex"};n.addEventListener("click",()=>{d.click()}),i.addEventListener("click",()=>{a.click()}),d.addEventListener("change",l=>{B(l,"image-a")}),a.addEventListener("change",l=>{B(l,"image-b")}),e.addEventListener("change",s),s(),x("image-a",d),x("image-b",a),R()}function x(n,d){const i=document.querySelector(`[data-target="${n}"]`);i.addEventListener("click",()=>{d.click()}),i.addEventListener("dragover",a=>{a.preventDefault(),i.classList.add("dragover")}),i.addEventListener("dragleave",a=>{a.preventDefault(),i.classList.remove("dragover")}),i.addEventListener("drop",a=>{a.preventDefault(),i.classList.remove("dragover");const e=a.dataTransfer.files[0];e&&e.type.startsWith("image/")&&M(e,n)})}function R(){let n=null;document.querySelector('[data-target="image-a"]').addEventListener("mouseenter",()=>{n="image-a"}),document.querySelector('[data-target="image-a"]').addEventListener("mouseleave",()=>{n==="image-a"&&(n=null)}),document.querySelector('[data-target="image-b"]').addEventListener("mouseenter",()=>{n="image-b"}),document.querySelector('[data-target="image-b"]').addEventListener("mouseleave",()=>{n==="image-b"&&(n=null)}),document.addEventListener("paste",d=>{const i=d.clipboardData.items;for(let a=0;a<i.length;a++)if(i[a].type.startsWith("image/")){const e=i[a].getAsFile();M(e,n||"image-a"),d.preventDefault();break}})}function M(n,d){const i=new FileReader;i.onload=function(a){const e=document.getElementById(d);e.onload=function(){this.style.display="block",E()},e.src=a.target.result},i.readAsDataURL(n)}function B(n,d){const i=n.target.files[0];i&&M(i,d)}document.querySelector("#app").innerHTML=`
  ${C}
  <div id="header">
    <h1>diff-image</h1>
  </div>
  <div>
    <input type="checkbox" id="enable-width-adjustment" name="enable-width-adjustment">
    <label for="enable-width-adjustment">白背景で幅合わせ</label>
    <br>
    <input type="checkbox" id="single-image-diff" name="single-image-diff">
    <label for="single-image-diff">1つの画像で比較</label>
    <input type="radio" id="single-image-diff-h" name="single-image-diff-option" value="horizontal" checked>
    <label for="single-image-diff-h">横並び</label>
    <input type="radio" id="single-image-diff-v" name="single-image-diff-option" value="vertical">
    <label for="single-image-diff-v">縦並び</label>
  </div>
  <div id="upload-container">
    ${O}
  </div>
  <div id="image-container">
    <div class="image-wrapper" data-target="image-a">
      <img id="image-a" class="image" src="" alt="Image A" onload="this.style.display='block';" onerror="this.style.display='none';">
      <div class="image-overlay">Click or Drop Image A</div>
    </div>
    <div class="image-wrapper" data-target="image-b">
      <img id="image-b" class="image" src="" alt="Image B" onload="this.style.display='block';" onerror="this.style.display='none';">
      <div class="image-overlay">Click or Drop Image B</div>
    </div>
  </div>
  <div id="diff-result-container">
    <h2>Diff Result</h2>
    <canvas id="diff-canvas"></canvas>
    <h2>Diff Mask A (only differences)</h2>
    <canvas id="diff-mask-a"></canvas>
    <h2>Diff Mask B (only differences)</h2>
    <canvas id="diff-mask-b"></canvas>
  </div>
  <span id="footer">
    <p>
      <a href="https://github.com/tanjoin/diff-image" class="github-link" target="_blank">GitHub</a>
    </p>
  </span>
`;W();q();document.getElementById("enable-width-adjustment").addEventListener("change",()=>{E()});document.getElementById("single-image-diff").addEventListener("change",()=>{E()});document.querySelectorAll('input[name="single-image-diff-option"]').forEach(n=>{n.addEventListener("change",()=>{E()})});
