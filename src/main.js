import './style.css'
import './image-wrapper.css'
import { SPLASH_SCREEN_HTML, showSplashScreen } from './splash';
import { UPLOAD_IMAGE_HTML, setupUploadButtons } from './upload-image';

document.querySelector('#app').innerHTML = `
  ${SPLASH_SCREEN_HTML}
  <div id="header">
    <h1>diff-image</h1>
  </div>
  <div id="upload-container">
    ${UPLOAD_IMAGE_HTML}
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
`;

showSplashScreen();
setupUploadButtons();