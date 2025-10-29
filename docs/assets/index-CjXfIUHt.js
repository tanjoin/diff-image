(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))e(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&e(r)}).observe(document,{childList:!0,subtree:!0});function n(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function e(a){if(a.ep)return;a.ep=!0;const s=n(a);fetch(a.href,s)}})();const y=` 
  <div id="splash-screen">
    <h1>diff-image</h1>
  </div>
`;function I(){const d=document.getElementById("splash-screen");d.style.display="flex",setTimeout(()=>{d.classList.add("hidden")},2e3)}function b(d,i){const n=document.createElement("canvas"),e=n.getContext("2d"),a=Math.max(d.naturalWidth,i.naturalWidth),s=Math.max(d.naturalHeight,i.naturalHeight);n.width=a,n.height=s,e.drawImage(d,0,0,d.naturalWidth,d.naturalHeight);const r=e.getImageData(0,0,a,s);n.width=a,e.drawImage(i,0,0,i.naturalWidth,i.naturalHeight);const c=e.getImageData(0,0,a,s),o=e.createImageData(a,s);for(let t=0;t<r.data.length;t+=4){const l=Math.abs(r.data[t]-c.data[t]),f=Math.abs(r.data[t+1]-c.data[t+1]),u=Math.abs(r.data[t+2]-c.data[t+2]),h=Math.abs(r.data[t+3]-c.data[t+3]);l+f+u+h>60?(o.data[t]=255,o.data[t+1]=255,o.data[t+2]=255,o.data[t+3]=255):(o.data[t]=0,o.data[t+1]=0,o.data[t+2]=0,o.data[t+3]=255)}return e.putImageData(o,0,0),n}function M(d,i){const n=document.createElement("canvas"),e=n.getContext("2d"),a=Math.max(d.naturalWidth,i.naturalWidth),s=Math.max(d.naturalHeight,i.naturalHeight);n.width=a,n.height=s,e.drawImage(d,0,0,d.naturalWidth,d.naturalHeight);const r=e.getImageData(0,0,a,s);n.width=a,e.drawImage(i,0,0,i.naturalWidth,i.naturalHeight);const c=e.getImageData(0,0,a,s),o=e.createImageData(a,s);for(let t=0;t<r.data.length;t+=4){const l=Math.abs(r.data[t]-c.data[t]),f=Math.abs(r.data[t+1]-c.data[t+1]),u=Math.abs(r.data[t+2]-c.data[t+2]),h=Math.abs(r.data[t+3]-c.data[t+3]);l+f+u+h>60?(o.data[t]=r.data[t],o.data[t+1]=r.data[t+1],o.data[t+2]=r.data[t+2],o.data[t+3]=r.data[t+3]):(o.data[t]=0,o.data[t+1]=0,o.data[t+2]=0,o.data[t+3]=0)}return e.putImageData(o,0,0),n}function E(d,i){const n=document.createElement("canvas"),e=n.getContext("2d"),a=Math.max(d.naturalWidth,i.naturalWidth),s=Math.max(d.naturalHeight,i.naturalHeight);n.width=a,n.height=s,e.drawImage(d,0,0,d.naturalWidth,d.naturalHeight);const r=e.getImageData(0,0,a,s);n.width=a,e.drawImage(i,0,0,i.naturalWidth,i.naturalHeight);const c=e.getImageData(0,0,a,s),o=e.createImageData(a,s);for(let t=0;t<r.data.length;t+=4){const l=Math.abs(r.data[t]-c.data[t]),f=Math.abs(r.data[t+1]-c.data[t+1]),u=Math.abs(r.data[t+2]-c.data[t+2]),h=Math.abs(r.data[t+3]-c.data[t+3]);l+f+u+h>60?(o.data[t]=c.data[t],o.data[t+1]=c.data[t+1],o.data[t+2]=c.data[t+2],o.data[t+3]=c.data[t+3]):(o.data[t]=0,o.data[t+1]=0,o.data[t+2]=0,o.data[t+3]=0)}return e.putImageData(o,0,0),n}function w(){const d=document.getElementById("image-a"),i=document.getElementById("image-b"),n=document.getElementById("diff-canvas"),e=document.getElementById("diff-mask-a"),a=document.getElementById("diff-mask-b");if(d.src&&i.src){const s=b(d,i);n.width=s.width,n.height=s.height,n.getContext("2d").drawImage(s,0,0);const c=M(d,i);e.width=c.width,e.height=c.height,e.getContext("2d").drawImage(c,0,0);const t=E(d,i);a.width=t.width,a.height=t.height,a.getContext("2d").drawImage(t,0,0)}}const L=`
  <div id="upload-container">
    <button id="upload-button-1">Upload Image 1</button>
    <input type="file" id="upload-input" accept="image/*" style="display: none;">
    <button id="upload-button-2">Upload Image 2</button>
    <input type="file" id="upload-input-2" accept="image/*" style="display: none;">
  </div>
`;function k(){const d=document.getElementById("upload-button-1"),i=document.getElementById("upload-input"),n=document.getElementById("upload-button-2"),e=document.getElementById("upload-input-2");d.addEventListener("click",()=>{i.click()}),n.addEventListener("click",()=>{e.click()}),i.addEventListener("change",a=>{D(a,"image-a")}),e.addEventListener("change",a=>{D(a,"image-b")}),v("image-a",i),v("image-b",e),B()}function v(d,i){const n=document.querySelector(`[data-target="${d}"]`);n.addEventListener("click",()=>{i.click()}),n.addEventListener("dragover",e=>{e.preventDefault(),n.classList.add("dragover")}),n.addEventListener("dragleave",e=>{e.preventDefault(),n.classList.remove("dragover")}),n.addEventListener("drop",e=>{e.preventDefault(),n.classList.remove("dragover");const a=e.dataTransfer.files[0];a&&a.type.startsWith("image/")&&g(a,d)})}function B(){let d=null;document.querySelector('[data-target="image-a"]').addEventListener("mouseenter",()=>{d="image-a"}),document.querySelector('[data-target="image-a"]').addEventListener("mouseleave",()=>{d==="image-a"&&(d=null)}),document.querySelector('[data-target="image-b"]').addEventListener("mouseenter",()=>{d="image-b"}),document.querySelector('[data-target="image-b"]').addEventListener("mouseleave",()=>{d==="image-b"&&(d=null)}),document.addEventListener("paste",i=>{const n=i.clipboardData.items;for(let e=0;e<n.length;e++)if(n[e].type.startsWith("image/")){const a=n[e].getAsFile();g(a,d||"image-a"),i.preventDefault();break}})}function g(d,i){const n=new FileReader;n.onload=function(e){const a=document.getElementById(i);a.onload=function(){this.style.display="block",w()},a.src=e.target.result},n.readAsDataURL(d)}function D(d,i){const n=d.target.files[0];n&&g(n,i)}document.querySelector("#app").innerHTML=`
  ${y}
  <div id="header">
    <h1>diff-image</h1>
  </div>
  <div id="upload-container">
    ${L}
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
`;I();k();
