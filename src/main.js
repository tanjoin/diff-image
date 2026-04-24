import './style.css'
import './image-wrapper.css'
import { SPLASH_SCREEN_HTML, showSplashScreen } from './splash';
import { UPLOAD_IMAGE_HTML, setupUploadButtons } from './upload-image';
import { displayDiff } from './diff';

document.querySelector('#app').innerHTML = `
  ${SPLASH_SCREEN_HTML}
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
  <span id="footer">
    <p>
      <a href="https://github.com/tanjoin/diff-image" class="github-link" target="_blank">GitHub</a>
    </p>
  </span>
`;

showSplashScreen();
setupUploadButtons();

document.getElementById('enable-width-adjustment').addEventListener('change', () => {
  displayDiff();
});

document.getElementById('single-image-diff').addEventListener('change', () => {
  displayDiff();
});

document.querySelectorAll('input[name="single-image-diff-option"]').forEach((element) => {
  element.addEventListener('change', () => {
    displayDiff();
  });
});