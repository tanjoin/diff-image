(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))e(a);new MutationObserver(a=>{for(const l of a)if(l.type==="childList")for(const s of l.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&e(s)}).observe(document,{childList:!0,subtree:!0});function i(a){const l={};return a.integrity&&(l.integrity=a.integrity),a.referrerPolicy&&(l.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?l.credentials="include":a.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function e(a){if(a.ep)return;a.ep=!0;const l=i(a);fetch(a.href,l)}})();const M=` 
  <div id="splash-screen">
    <h1>diff-image</h1>
  </div>
`;function E(){const d=document.getElementById("splash-screen");d.style.display="flex",setTimeout(()=>{d.classList.add("hidden")},2e3)}function W(d,n,i=!1){const e=document.createElement("canvas"),a=e.getContext("2d"),l=i&&d.naturalWidth!==n.naturalWidth,s=Math.max(d.naturalWidth,n.naturalWidth),f=Math.max(d.naturalHeight,n.naturalHeight);e.width=s,e.height=f;const u=t=>{if(l){const h=Math.floor((s-t.naturalWidth)/2);a.fillStyle="#ffffff",a.fillRect(0,0,s,f),a.drawImage(t,h,0,t.naturalWidth,t.naturalHeight);return}a.drawImage(t,0,0,t.naturalWidth,t.naturalHeight)};u(d);const r=a.getImageData(0,0,s,f);e.width=s,e.height=f,u(n);const c=a.getImageData(0,0,s,f),o=a.createImageData(s,f);for(let t=0;t<r.data.length;t+=4){const h=Math.abs(r.data[t]-c.data[t]),g=Math.abs(r.data[t+1]-c.data[t+1]),m=Math.abs(r.data[t+2]-c.data[t+2]),p=Math.abs(r.data[t+3]-c.data[t+3]);h+g+m+p>60?(o.data[t]=255,o.data[t+1]=255,o.data[t+2]=255,o.data[t+3]=255):(o.data[t]=0,o.data[t+1]=0,o.data[t+2]=0,o.data[t+3]=255)}return a.putImageData(o,0,0),e}function L(d,n,i=!1){const e=document.createElement("canvas"),a=e.getContext("2d"),l=i&&d.naturalWidth!==n.naturalWidth,s=Math.max(d.naturalWidth,n.naturalWidth),f=Math.max(d.naturalHeight,n.naturalHeight);e.width=s,e.height=f;const u=t=>{if(l){const h=Math.floor((s-t.naturalWidth)/2);a.fillStyle="#ffffff",a.fillRect(0,0,s,f),a.drawImage(t,h,0,t.naturalWidth,t.naturalHeight);return}a.drawImage(t,0,0,t.naturalWidth,t.naturalHeight)};u(d);const r=a.getImageData(0,0,s,f);e.width=s,e.height=f,u(n);const c=a.getImageData(0,0,s,f),o=a.createImageData(s,f);for(let t=0;t<r.data.length;t+=4){const h=Math.abs(r.data[t]-c.data[t]),g=Math.abs(r.data[t+1]-c.data[t+1]),m=Math.abs(r.data[t+2]-c.data[t+2]),p=Math.abs(r.data[t+3]-c.data[t+3]);h+g+m+p>60?(o.data[t]=r.data[t],o.data[t+1]=r.data[t+1],o.data[t+2]=r.data[t+2],o.data[t+3]=r.data[t+3]):(o.data[t]=0,o.data[t+1]=0,o.data[t+2]=0,o.data[t+3]=0)}return a.putImageData(o,0,0),e}function k(d,n,i=!1){const e=document.createElement("canvas"),a=e.getContext("2d"),l=i&&d.naturalWidth!==n.naturalWidth,s=Math.max(d.naturalWidth,n.naturalWidth),f=Math.max(d.naturalHeight,n.naturalHeight);e.width=s,e.height=f;const u=t=>{if(l){const h=Math.floor((s-t.naturalWidth)/2);a.fillStyle="#ffffff",a.fillRect(0,0,s,f),a.drawImage(t,h,0,t.naturalWidth,t.naturalHeight);return}a.drawImage(t,0,0,t.naturalWidth,t.naturalHeight)};u(d);const r=a.getImageData(0,0,s,f);e.width=s,e.height=f,u(n);const c=a.getImageData(0,0,s,f),o=a.createImageData(s,f);for(let t=0;t<r.data.length;t+=4){const h=Math.abs(r.data[t]-c.data[t]),g=Math.abs(r.data[t+1]-c.data[t+1]),m=Math.abs(r.data[t+2]-c.data[t+2]),p=Math.abs(r.data[t+3]-c.data[t+3]);h+g+m+p>60?(o.data[t]=c.data[t],o.data[t+1]=c.data[t+1],o.data[t+2]=c.data[t+2],o.data[t+3]=c.data[t+3]):(o.data[t]=0,o.data[t+1]=0,o.data[t+2]=0,o.data[t+3]=0)}return a.putImageData(o,0,0),e}function w(){const d=document.getElementById("image-a"),n=document.getElementById("image-b"),i=document.getElementById("diff-canvas"),e=document.getElementById("diff-mask-a"),a=document.getElementById("diff-mask-b"),l=document.getElementById("enable-width-adjustment").checked;if(d.src&&n.src){const s=W(d,n,l);i.width=s.width,i.height=s.height,i.getContext("2d").drawImage(s,0,0);const u=L(d,n,l);e.width=u.width,e.height=u.height,e.getContext("2d").drawImage(u,0,0);const c=k(d,n,l);a.width=c.width,a.height=c.height,a.getContext("2d").drawImage(c,0,0)}}const B=`
  <div id="upload-container">
    <button id="upload-button-1">Upload Image 1</button>
    <input type="file" id="upload-input" accept="image/*" style="display: none;">
    <button id="upload-button-2">Upload Image 2</button>
    <input type="file" id="upload-input-2" accept="image/*" style="display: none;">
  </div>
`;function x(){const d=document.getElementById("upload-button-1"),n=document.getElementById("upload-input"),i=document.getElementById("upload-button-2"),e=document.getElementById("upload-input-2");d.addEventListener("click",()=>{n.click()}),i.addEventListener("click",()=>{e.click()}),n.addEventListener("change",a=>{I(a,"image-a")}),e.addEventListener("change",a=>{I(a,"image-b")}),b("image-a",n),b("image-b",e),A()}function b(d,n){const i=document.querySelector(`[data-target="${d}"]`);i.addEventListener("click",()=>{n.click()}),i.addEventListener("dragover",e=>{e.preventDefault(),i.classList.add("dragover")}),i.addEventListener("dragleave",e=>{e.preventDefault(),i.classList.remove("dragover")}),i.addEventListener("drop",e=>{e.preventDefault(),i.classList.remove("dragover");const a=e.dataTransfer.files[0];a&&a.type.startsWith("image/")&&v(a,d)})}function A(){let d=null;document.querySelector('[data-target="image-a"]').addEventListener("mouseenter",()=>{d="image-a"}),document.querySelector('[data-target="image-a"]').addEventListener("mouseleave",()=>{d==="image-a"&&(d=null)}),document.querySelector('[data-target="image-b"]').addEventListener("mouseenter",()=>{d="image-b"}),document.querySelector('[data-target="image-b"]').addEventListener("mouseleave",()=>{d==="image-b"&&(d=null)}),document.addEventListener("paste",n=>{const i=n.clipboardData.items;for(let e=0;e<i.length;e++)if(i[e].type.startsWith("image/")){const a=i[e].getAsFile();v(a,d||"image-a"),n.preventDefault();break}})}function v(d,n){const i=new FileReader;i.onload=function(e){const a=document.getElementById(n);a.onload=function(){this.style.display="block",w()},a.src=e.target.result},i.readAsDataURL(d)}function I(d,n){const i=d.target.files[0];i&&v(i,n)}document.querySelector("#app").innerHTML=`
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
`;E();x();document.getElementById("enable-width-adjustment").addEventListener("change",()=>{w()});
