import { displayDiff } from './diff';

export const UPLOAD_IMAGE_HTML = `
  <div id="upload-container">
    <button id="upload-button-1">Upload Image 1</button>
    <input type="file" id="upload-input" accept="image/*" style="display: none;">
    <button id="upload-button-2">Upload Image 2</button>
    <input type="file" id="upload-input-2" accept="image/*" style="display: none;">
  </div>
`;

export function setupUploadButtons() {
  const uploadButton1 = document.getElementById('upload-button-1');
  const uploadInput1 = document.getElementById('upload-input');
  const uploadButton2 = document.getElementById('upload-button-2');
  const uploadInput2 = document.getElementById('upload-input-2');

  uploadButton1.addEventListener('click', () => {
    uploadInput1.click();
  });

  uploadButton2.addEventListener('click', () => {
    uploadInput2.click();
  });

  uploadInput1.addEventListener('change', (event) => {
    handleImageUpload(event, 'image-a');
  });

  uploadInput2.addEventListener('change', (event) => {
    handleImageUpload(event, 'image-b');
  });

  // ドラッグアンドドロップとクリックのセットアップ
  setupImageWrapper('image-a', uploadInput1);
  setupImageWrapper('image-b', uploadInput2);

  // ペーストのセットアップ
  setupPaste();
}

function setupImageWrapper(imageElementId, inputElement) {
  const wrapper = document.querySelector(`[data-target="${imageElementId}"]`);
  
  // クリックでファイル選択
  wrapper.addEventListener('click', () => {
    inputElement.click();
  });

  // ドラッグアンドドロップ
  wrapper.addEventListener('dragover', (e) => {
    e.preventDefault();
    wrapper.classList.add('dragover');
  });

  wrapper.addEventListener('dragleave', (e) => {
    e.preventDefault();
    wrapper.classList.remove('dragover');
  });

  wrapper.addEventListener('drop', (e) => {
    e.preventDefault();
    wrapper.classList.remove('dragover');
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      loadImageFile(file, imageElementId);
    }
  });
}

function setupPaste() {
  let hoveredTarget = null;

  // ラッパーのホバーでターゲットを記録
  document.querySelector('[data-target="image-a"]').addEventListener('mouseenter', () => {
    hoveredTarget = 'image-a';
  });
  
  document.querySelector('[data-target="image-a"]').addEventListener('mouseleave', () => {
    if (hoveredTarget === 'image-a') hoveredTarget = null;
  });
  
  document.querySelector('[data-target="image-b"]').addEventListener('mouseenter', () => {
    hoveredTarget = 'image-b';
  });
  
  document.querySelector('[data-target="image-b"]').addEventListener('mouseleave', () => {
    if (hoveredTarget === 'image-b') hoveredTarget = null;
  });

  // グローバルなペーストイベント
  document.addEventListener('paste', (e) => {
    const items = e.clipboardData.items;
    
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith('image/')) {
        const file = items[i].getAsFile();
        // ホバー中のターゲット、なければデフォルトでimage-a
        const target = hoveredTarget || 'image-a';
        loadImageFile(file, target);
        e.preventDefault();
        break;
      }
    }
  });
}

function loadImageFile(file, imageElementId) {
  const reader = new FileReader();
  reader.onload = function(e) {
    const imgElement = document.getElementById(imageElementId);
    imgElement.onload = function() {
      // 画像を表示
      this.style.display = 'block';
      // 画像の読み込みが完了したらdiffを実行
      displayDiff();
    };
    imgElement.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

export function handleImageUpload(event, imageElementId) {
  const file = event.target.files[0];
  if (file) {
    loadImageFile(file, imageElementId);
  }
}
