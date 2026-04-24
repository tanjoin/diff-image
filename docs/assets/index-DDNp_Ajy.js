(function(){const d=document.createElement("link").relList;if(d&&d.supports&&d.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function i(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(e){if(e.ep)return;e.ep=!0;const s=i(e);fetch(e.href,s)}})();const S=` 
  <div id="splash-screen">
    <h1>diff-image</h1>
  </div>
`;function H(){const a=document.getElementById("splash-screen");a.style.display="flex",setTimeout(()=>{a.classList.add("hidden")},2e3)}let B=null;function I(a){return a.naturalWidth??a.width}function b(a){return a.naturalHeight??a.height}function j(a,d){const i=a.naturalWidth,n=a.naturalHeight;if(d==="vertical"){const h=Math.floor(n/2);if(h<=0)return null;const v=document.createElement("canvas");v.width=i,v.height=h,v.getContext("2d").drawImage(a,0,0,i,h,0,0,i,h);const u=document.createElement("canvas");return u.width=i,u.height=h,u.getContext("2d").drawImage(a,0,n-h,i,h,0,0,i,h),[v,u]}const e=Math.floor(i/2);if(e<=0)return null;const s=document.createElement("canvas");s.width=e,s.height=n,s.getContext("2d").drawImage(a,0,0,e,n,0,0,e,n);const l=document.createElement("canvas");return l.width=e,l.height=n,l.getContext("2d").drawImage(a,i-e,0,e,n,0,0,e,n),[s,l]}function W(){B!==null&&(window.clearInterval(B),B=null)}function k(){W();const a=document.getElementById("diff-animation-container"),d=document.getElementById("diff-animation-image");a.style.display="none",d.removeAttribute("src")}function R(a,d,i=!1){const n=I(a),e=I(d),s=b(a),l=b(d),h=i&&n!==e,v=Math.max(n,e),u=Math.max(s,l),c=t=>{const m=document.createElement("canvas"),p=m.getContext("2d"),y=I(t),w=b(t);if(m.width=v,m.height=u,h){const M=Math.floor((v-y)/2);return p.fillStyle="#ffffff",p.fillRect(0,0,v,u),p.drawImage(t,M,0,y,w),m}return p.drawImage(t,0,0,y,w),m},f=c(a).toDataURL("image/png"),D=c(d).toDataURL("image/png"),r=document.getElementById("diff-animation-container"),g=document.getElementById("diff-animation-image");W(),r.style.display="block",g.src=f;let o=!1;B=window.setInterval(()=>{g.src=o?f:D,o=!o},500)}function O(a,d,i=!1){const n=document.createElement("canvas"),e=n.getContext("2d"),s=I(a),l=I(d),h=b(a),v=b(d),u=i&&s!==l,c=Math.max(s,l),f=Math.max(h,v);n.width=c,n.height=f;const D=t=>{const m=I(t),p=b(t);if(u){const y=Math.floor((c-m)/2);e.fillStyle="#ffffff",e.fillRect(0,0,c,f),e.drawImage(t,y,0,m,p);return}e.drawImage(t,0,0,m,p)};D(a);const r=e.getImageData(0,0,c,f);n.width=c,n.height=f,D(d);const g=e.getImageData(0,0,c,f),o=e.createImageData(c,f);for(let t=0;t<r.data.length;t+=4){const m=Math.abs(r.data[t]-g.data[t]),p=Math.abs(r.data[t+1]-g.data[t+1]),y=Math.abs(r.data[t+2]-g.data[t+2]),w=Math.abs(r.data[t+3]-g.data[t+3]);m+p+y+w>60?(o.data[t]=255,o.data[t+1]=255,o.data[t+2]=255,o.data[t+3]=255):(o.data[t]=0,o.data[t+1]=0,o.data[t+2]=0,o.data[t+3]=255)}return e.putImageData(o,0,0),n}function U(a,d,i=!1){const n=document.createElement("canvas"),e=n.getContext("2d"),s=I(a),l=I(d),h=b(a),v=b(d),u=i&&s!==l,c=Math.max(s,l),f=Math.max(h,v);n.width=c,n.height=f;const D=t=>{const m=I(t),p=b(t);if(u){const y=Math.floor((c-m)/2);e.fillStyle="#ffffff",e.fillRect(0,0,c,f),e.drawImage(t,y,0,m,p);return}e.drawImage(t,0,0,m,p)};D(a);const r=e.getImageData(0,0,c,f);n.width=c,n.height=f,D(d);const g=e.getImageData(0,0,c,f),o=e.createImageData(c,f);for(let t=0;t<r.data.length;t+=4){const m=Math.abs(r.data[t]-g.data[t]),p=Math.abs(r.data[t+1]-g.data[t+1]),y=Math.abs(r.data[t+2]-g.data[t+2]),w=Math.abs(r.data[t+3]-g.data[t+3]);m+p+y+w>60?(o.data[t]=r.data[t],o.data[t+1]=r.data[t+1],o.data[t+2]=r.data[t+2],o.data[t+3]=r.data[t+3]):(o.data[t]=0,o.data[t+1]=0,o.data[t+2]=0,o.data[t+3]=0)}return e.putImageData(o,0,0),n}function q(a,d,i=!1){const n=document.createElement("canvas"),e=n.getContext("2d"),s=I(a),l=I(d),h=b(a),v=b(d),u=i&&s!==l,c=Math.max(s,l),f=Math.max(h,v);n.width=c,n.height=f;const D=t=>{const m=I(t),p=b(t);if(u){const y=Math.floor((c-m)/2);e.fillStyle="#ffffff",e.fillRect(0,0,c,f),e.drawImage(t,y,0,m,p);return}e.drawImage(t,0,0,m,p)};D(a);const r=e.getImageData(0,0,c,f);n.width=c,n.height=f,D(d);const g=e.getImageData(0,0,c,f),o=e.createImageData(c,f);for(let t=0;t<r.data.length;t+=4){const m=Math.abs(r.data[t]-g.data[t]),p=Math.abs(r.data[t+1]-g.data[t+1]),y=Math.abs(r.data[t+2]-g.data[t+2]),w=Math.abs(r.data[t+3]-g.data[t+3]);m+p+y+w>60?(o.data[t]=g.data[t],o.data[t+1]=g.data[t+1],o.data[t+2]=g.data[t+2],o.data[t+3]=g.data[t+3]):(o.data[t]=0,o.data[t+1]=0,o.data[t+2]=0,o.data[t+3]=0)}return e.putImageData(o,0,0),n}function E(){const a=document.getElementById("image-a"),d=document.getElementById("image-b"),i=document.getElementById("diff-canvas"),n=document.getElementById("diff-mask-a"),e=document.getElementById("diff-mask-b"),s=document.getElementById("enable-width-adjustment").checked,l=document.getElementById("single-image-diff").checked,h=document.querySelector('input[name="single-image-diff-option"]:checked').value,v=document.getElementById("show-diff-animation").checked;let u=null,c=null;if(l){if(!a.src){k();return}const m=j(a,h);if(!m){k();return}[u,c]=m}else{if(!a.src||!d.src){k();return}u=a,c=d}const f=O(u,c,s);i.width=f.width,i.height=f.height,i.getContext("2d").drawImage(f,0,0);const r=U(u,c,s);n.width=r.width,n.height=r.height,n.getContext("2d").drawImage(r,0,0);const o=q(u,c,s);e.width=o.width,e.height=o.height,e.getContext("2d").drawImage(o,0,0),v?R(u,c,s):k()}const F=`
  <div id="upload-container">
    <button id="upload-button-1">Upload Image 1</button>
    <input type="file" id="upload-input" accept="image/*" style="display: none;">
    <button id="upload-button-2">Upload Image 2</button>
    <input type="file" id="upload-input-2" accept="image/*" style="display: none;">
  </div>
`;function P(){const a=document.getElementById("upload-button-1"),d=document.getElementById("upload-input"),i=document.getElementById("upload-button-2"),n=document.getElementById("upload-input-2"),e=document.getElementById("single-image-diff"),s=()=>{const l=e.checked,h=document.querySelector('[data-target="image-b"]');i.style.display=l?"none":"inline-block",h.style.display=l?"none":"flex"};a.addEventListener("click",()=>{d.click()}),i.addEventListener("click",()=>{n.click()}),d.addEventListener("change",l=>{C(l,"image-a")}),n.addEventListener("change",l=>{C(l,"image-b")}),e.addEventListener("change",s),s(),A("image-a",d),A("image-b",n),T()}function A(a,d){const i=document.querySelector(`[data-target="${a}"]`);i.addEventListener("click",()=>{d.click()}),i.addEventListener("dragover",n=>{n.preventDefault(),i.classList.add("dragover")}),i.addEventListener("dragleave",n=>{n.preventDefault(),i.classList.remove("dragover")}),i.addEventListener("drop",n=>{n.preventDefault(),i.classList.remove("dragover");const e=n.dataTransfer.files[0];e&&e.type.startsWith("image/")&&x(e,a)})}function T(){let a=null;document.querySelector('[data-target="image-a"]').addEventListener("mouseenter",()=>{a="image-a"}),document.querySelector('[data-target="image-a"]').addEventListener("mouseleave",()=>{a==="image-a"&&(a=null)}),document.querySelector('[data-target="image-b"]').addEventListener("mouseenter",()=>{a="image-b"}),document.querySelector('[data-target="image-b"]').addEventListener("mouseleave",()=>{a==="image-b"&&(a=null)}),document.addEventListener("paste",d=>{const i=d.clipboardData.items;for(let n=0;n<i.length;n++)if(i[n].type.startsWith("image/")){const e=i[n].getAsFile();x(e,a||"image-a"),d.preventDefault();break}})}function x(a,d){const i=new FileReader;i.onload=function(n){const e=document.getElementById(d);e.onload=function(){this.style.display="block",E()},e.src=n.target.result},i.readAsDataURL(a)}function C(a,d){const i=a.target.files[0];i&&x(i,d)}document.querySelector("#app").innerHTML=`
  ${S}
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
    <br>
    <input type="checkbox" id="show-diff-animation" name="show-diff-animation">
    <label for="show-diff-animation">Diffアニメーションを表示</label>
  </div>
  <div id="upload-container">
    ${F}
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
    <div id="diff-animation-container" style="display: none;">
      <h2>Diff Animation</h2>
      <img id="diff-animation-image" alt="Diff animation preview">
    </div>
  </div>
  <span id="footer">
    <p>
      <a href="https://github.com/tanjoin/diff-image" class="github-link" target="_blank">GitHub</a>
    </p>
  </span>
`;H();P();document.getElementById("enable-width-adjustment").addEventListener("change",()=>{E()});document.getElementById("single-image-diff").addEventListener("change",()=>{E()});document.querySelectorAll('input[name="single-image-diff-option"]').forEach(a=>{a.addEventListener("change",()=>{E()})});document.getElementById("show-diff-animation").addEventListener("change",()=>{E()});
