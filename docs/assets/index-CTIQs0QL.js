(function(){const d=document.createElement("link").relList;if(d&&d.supports&&d.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))e(a);new MutationObserver(a=>{for(const l of a)if(l.type==="childList")for(const s of l.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&e(s)}).observe(document,{childList:!0,subtree:!0});function i(a){const l={};return a.integrity&&(l.integrity=a.integrity),a.referrerPolicy&&(l.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?l.credentials="include":a.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function e(a){if(a.ep)return;a.ep=!0;const l=i(a);fetch(a.href,l)}})();const M=` 
  <div id="splash-screen">
    <h1>diff-image</h1>
  </div>
`;function E(){const n=document.getElementById("splash-screen");n.style.display="flex",setTimeout(()=>{n.classList.add("hidden")},2e3)}function W(n,d,i=!1){const e=document.createElement("canvas"),a=e.getContext("2d"),l=i&&n.naturalWidth!==d.naturalWidth,s=Math.max(n.naturalWidth,d.naturalWidth),f=Math.max(n.naturalHeight,d.naturalHeight);e.width=s,e.height=f;const u=t=>{if(l){const h=Math.floor((s-t.naturalWidth)/2);a.fillStyle="#ffffff",a.fillRect(0,0,s,f),a.drawImage(t,h,0,t.naturalWidth,t.naturalHeight);return}a.drawImage(t,0,0,t.naturalWidth,t.naturalHeight)};u(n);const r=a.getImageData(0,0,s,f);e.width=s,e.height=f,u(d);const c=a.getImageData(0,0,s,f),o=a.createImageData(s,f);for(let t=0;t<r.data.length;t+=4){const h=Math.abs(r.data[t]-c.data[t]),g=Math.abs(r.data[t+1]-c.data[t+1]),m=Math.abs(r.data[t+2]-c.data[t+2]),p=Math.abs(r.data[t+3]-c.data[t+3]);h+g+m+p>60?(o.data[t]=255,o.data[t+1]=255,o.data[t+2]=255,o.data[t+3]=255):(o.data[t]=0,o.data[t+1]=0,o.data[t+2]=0,o.data[t+3]=255)}return a.putImageData(o,0,0),e}function L(n,d,i=!1){const e=document.createElement("canvas"),a=e.getContext("2d"),l=i&&n.naturalWidth!==d.naturalWidth,s=Math.max(n.naturalWidth,d.naturalWidth),f=Math.max(n.naturalHeight,d.naturalHeight);e.width=s,e.height=f;const u=t=>{if(l){const h=Math.floor((s-t.naturalWidth)/2);a.fillStyle="#ffffff",a.fillRect(0,0,s,f),a.drawImage(t,h,0,t.naturalWidth,t.naturalHeight);return}a.drawImage(t,0,0,t.naturalWidth,t.naturalHeight)};u(n);const r=a.getImageData(0,0,s,f);e.width=s,e.height=f,u(d);const c=a.getImageData(0,0,s,f),o=a.createImageData(s,f);for(let t=0;t<r.data.length;t+=4){const h=Math.abs(r.data[t]-c.data[t]),g=Math.abs(r.data[t+1]-c.data[t+1]),m=Math.abs(r.data[t+2]-c.data[t+2]),p=Math.abs(r.data[t+3]-c.data[t+3]);h+g+m+p>60?(o.data[t]=r.data[t],o.data[t+1]=r.data[t+1],o.data[t+2]=r.data[t+2],o.data[t+3]=r.data[t+3]):(o.data[t]=0,o.data[t+1]=0,o.data[t+2]=0,o.data[t+3]=0)}return a.putImageData(o,0,0),e}function k(n,d,i=!1){const e=document.createElement("canvas"),a=e.getContext("2d"),l=i&&n.naturalWidth!==d.naturalWidth,s=Math.max(n.naturalWidth,d.naturalWidth),f=Math.max(n.naturalHeight,d.naturalHeight);e.width=s,e.height=f;const u=t=>{if(l){const h=Math.floor((s-t.naturalWidth)/2);a.fillStyle="#ffffff",a.fillRect(0,0,s,f),a.drawImage(t,h,0,t.naturalWidth,t.naturalHeight);return}a.drawImage(t,0,0,t.naturalWidth,t.naturalHeight)};u(n);const r=a.getImageData(0,0,s,f);e.width=s,e.height=f,u(d);const c=a.getImageData(0,0,s,f),o=a.createImageData(s,f);for(let t=0;t<r.data.length;t+=4){const h=Math.abs(r.data[t]-c.data[t]),g=Math.abs(r.data[t+1]-c.data[t+1]),m=Math.abs(r.data[t+2]-c.data[t+2]),p=Math.abs(r.data[t+3]-c.data[t+3]);h+g+m+p>60?(o.data[t]=c.data[t],o.data[t+1]=c.data[t+1],o.data[t+2]=c.data[t+2],o.data[t+3]=c.data[t+3]):(o.data[t]=0,o.data[t+1]=0,o.data[t+2]=0,o.data[t+3]=0)}return a.putImageData(o,0,0),e}function w(){const n=document.getElementById("image-a"),d=document.getElementById("image-b"),i=document.getElementById("diff-canvas"),e=document.getElementById("diff-mask-a"),a=document.getElementById("diff-mask-b"),l=document.getElementById("enable-width-adjustment").checked;if(n.src&&d.src){const s=W(n,d,l);i.width=s.width,i.height=s.height,i.getContext("2d").drawImage(s,0,0);const u=L(n,d,l);e.width=u.width,e.height=u.height,e.getContext("2d").drawImage(u,0,0);const c=k(n,d,l);a.width=c.width,a.height=c.height,a.getContext("2d").drawImage(c,0,0)}}const B=`
  <div id="upload-container">
    <button id="upload-button-1">Upload Image 1</button>
    <input type="file" id="upload-input" accept="image/*" style="display: none;">
    <button id="upload-button-2">Upload Image 2</button>
    <input type="file" id="upload-input-2" accept="image/*" style="display: none;">
  </div>
`;function x(){const n=document.getElementById("upload-button-1"),d=document.getElementById("upload-input"),i=document.getElementById("upload-button-2"),e=document.getElementById("upload-input-2");n.addEventListener("click",()=>{d.click()}),i.addEventListener("click",()=>{e.click()}),d.addEventListener("change",a=>{I(a,"image-a")}),e.addEventListener("change",a=>{I(a,"image-b")}),D("image-a",d),D("image-b",e),A()}function D(n,d){const i=document.querySelector(`[data-target="${n}"]`);i.addEventListener("click",()=>{d.click()}),i.addEventListener("dragover",e=>{e.preventDefault(),i.classList.add("dragover")}),i.addEventListener("dragleave",e=>{e.preventDefault(),i.classList.remove("dragover")}),i.addEventListener("drop",e=>{e.preventDefault(),i.classList.remove("dragover");const a=e.dataTransfer.files[0];a&&a.type.startsWith("image/")&&v(a,n)})}function A(){let n=null;document.querySelector('[data-target="image-a"]').addEventListener("mouseenter",()=>{n="image-a"}),document.querySelector('[data-target="image-a"]').addEventListener("mouseleave",()=>{n==="image-a"&&(n=null)}),document.querySelector('[data-target="image-b"]').addEventListener("mouseenter",()=>{n="image-b"}),document.querySelector('[data-target="image-b"]').addEventListener("mouseleave",()=>{n==="image-b"&&(n=null)}),document.addEventListener("paste",d=>{const i=d.clipboardData.items;for(let e=0;e<i.length;e++)if(i[e].type.startsWith("image/")){const a=i[e].getAsFile();v(a,n||"image-a"),d.preventDefault();break}})}function v(n,d){const i=new FileReader;i.onload=function(e){const a=document.getElementById(d);a.onload=function(){this.style.display="block",w()},a.src=e.target.result},i.readAsDataURL(n)}function I(n,d){const i=n.target.files[0];i&&v(i,d)}document.querySelector("#app").innerHTML=`
  ${M}
  <div id="header">
    <h1>diff-image</h1>
  </div>
  <div>
    <input type="checkbox" id="enable-width-adjustment" name="enable-width-adjustment">
    <label for="enable-width-adjustment">白背景で幅合わせ</label>
  </div>
  <div id="upload-container">
    ${B}
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
`;E();x();document.getElementById("enable-width-adjustment").addEventListener("change",()=>{w()});
