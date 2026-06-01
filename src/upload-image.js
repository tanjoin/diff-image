import { displayDiff } from './diff';

const LONG_PRESS_DURATION_MS = 500;
const LONG_PRESS_CLICK_SUPPRESSION_MS = 750;
const PASTE_HINT_RESET_DELAY_MS = 3000;
const IMAGE_LABELS = {
  'image-a': 'Image A',
  'image-b': 'Image B',
};

export const UPLOAD_IMAGE_HTML = `
  <div id="upload-container">
    <button id="upload-button-1">Upload Image 1</button>
    <input type="file" id="upload-input" accept="image/*" style="display: none;">
    <button id="upload-button-2">Upload Image 2</button>
    <input type="file" id="upload-input-2" accept="image/*" style="display: none;">
    <p id="paste-hint">画像エリアを長押しすると、その枠にクリップボード画像を貼り付けます。</p>
  </div>
`;

export function setupUploadButtons() {
  const uploadButton1 = document.getElementById('upload-button-1');
  const uploadInput1 = document.getElementById('upload-input');
  const uploadButton2 = document.getElementById('upload-button-2');
  const uploadInput2 = document.getElementById('upload-input-2');
  const singleImageDiffCheckbox = document.getElementById('single-image-diff');
  const pasteHint = document.getElementById('paste-hint');
  const defaultPasteHint = pasteHint?.textContent ?? '';
  let pasteHintResetTimerId = null;

  const updatePasteHint = (message = defaultPasteHint, isError = false) => {
    if (!pasteHint) {
      return;
    }

    pasteHint.textContent = message;
    pasteHint.dataset.state = isError ? 'error' : 'default';

    if (pasteHintResetTimerId !== null) {
      window.clearTimeout(pasteHintResetTimerId);
    }

    if (message !== defaultPasteHint) {
      pasteHintResetTimerId = window.setTimeout(() => {
        pasteHint.textContent = defaultPasteHint;
        pasteHint.dataset.state = 'default';
        pasteHintResetTimerId = null;
      }, PASTE_HINT_RESET_DELAY_MS);
    }
  };

  const syncSingleImageDiffUI = () => {
    const isSingleImageDiff = singleImageDiffCheckbox.checked;
    const imageBWrapper = document.querySelector('[data-target="image-b"]');

    uploadButton2.style.display = isSingleImageDiff ? 'none' : 'inline-block';
    imageBWrapper.style.display = isSingleImageDiff ? 'none' : 'flex';
  };

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

  singleImageDiffCheckbox.addEventListener('change', syncSingleImageDiffUI);
  syncSingleImageDiffUI();

  // ドラッグアンドドロップとクリックのセットアップ
  setupImageWrapper('image-a', uploadInput1, {
    pasteFromClipboard: () => {
      return pasteImageFromClipboard('image-a', updatePasteHint);
    },
  });
  setupImageWrapper('image-b', uploadInput2, {
    pasteFromClipboard: () => {
      return pasteImageFromClipboard('image-b', updatePasteHint);
    },
  });

  // ペーストのセットアップ
  setupPaste(singleImageDiffCheckbox, updatePasteHint);
}

function setupImageWrapper(imageElementId, inputElement, options) {
  const wrapper = document.querySelector(`[data-target="${imageElementId}"]`);
  let longPressTimerId = null;
  let suppressClickUntil = 0;

  wrapper.setAttribute('tabindex', '0');
  wrapper.setAttribute('role', 'button');

  const clearLongPressTimer = () => {
    if (longPressTimerId !== null) {
      window.clearTimeout(longPressTimerId);
      longPressTimerId = null;
    }
  };

  const startLongPress = (event) => {
    if (event.pointerType === 'mouse') {
      return;
    }

    suppressClickUntil = 0;
    clearLongPressTimer();

    longPressTimerId = window.setTimeout(async () => {
      longPressTimerId = null;
      suppressClickUntil = Date.now() + LONG_PRESS_CLICK_SUPPRESSION_MS;
      wrapper.classList.add('clipboard-loading');

      try {
        await options.pasteFromClipboard();
      } finally {
        wrapper.classList.remove('clipboard-loading');
      }
    }, LONG_PRESS_DURATION_MS);
  };
  
  // クリックでファイル選択
  wrapper.addEventListener('click', (event) => {
    if (Date.now() < suppressClickUntil) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    inputElement.click();
  });

  wrapper.addEventListener('pointerdown', startLongPress);
  wrapper.addEventListener('pointermove', clearLongPressTimer);
  wrapper.addEventListener('pointerup', clearLongPressTimer);
  wrapper.addEventListener('pointercancel', clearLongPressTimer);
  wrapper.addEventListener('pointerleave', clearLongPressTimer);
  wrapper.addEventListener('contextmenu', (event) => {
    if (Date.now() < suppressClickUntil) {
      event.preventDefault();
    }
  });
  wrapper.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      inputElement.click();
    }
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

function setupPaste(singleImageDiffCheckbox, updatePasteHint) {
  let hoveredTarget = null;

  document.querySelector('[data-target="image-a"]').addEventListener('mouseenter', () => {
    hoveredTarget = 'image-a';
  });

  document.querySelector('[data-target="image-a"]').addEventListener('mouseleave', () => {
    if (hoveredTarget === 'image-a') {
      hoveredTarget = null;
    }
  });

  document.querySelector('[data-target="image-b"]').addEventListener('mouseenter', () => {
    hoveredTarget = 'image-b';
  });

  document.querySelector('[data-target="image-b"]').addEventListener('mouseleave', () => {
    if (hoveredTarget === 'image-b') {
      hoveredTarget = null;
    }
  });

  // グローバルなペーストイベント
  document.addEventListener('paste', (e) => {
    const file = getClipboardImage(e.clipboardData?.items);

    if (!file) {
      return;
    }

    const target = singleImageDiffCheckbox.checked ? 'image-a' : hoveredTarget || 'image-a';
    loadImageFile(file, target);
    updatePasteHint(`${IMAGE_LABELS[target]} に貼り付けました。`);
    e.preventDefault();
  });
}

function getClipboardImage(items) {
  if (!items) {
    return null;
  }

  for (let index = 0; index < items.length; index += 1) {
    const item = items[index];

    if (item.type.startsWith('image/')) {
      return item.getAsFile();
    }
  }

  return null;
}

async function pasteImageFromClipboard(imageElementId, updatePasteHint) {
  if (!navigator.clipboard || typeof navigator.clipboard.read !== 'function') {
    updatePasteHint('このブラウザでは長押し貼り付けに未対応です。', true);
    return false;
  }

  try {
    const clipboardItems = await navigator.clipboard.read();

    for (const clipboardItem of clipboardItems) {
      const imageType = clipboardItem.types.find((type) => type.startsWith('image/'));

      if (!imageType) {
        continue;
      }

      const imageBlob = await clipboardItem.getType(imageType);
      loadImageFile(imageBlob, imageElementId);
      updatePasteHint(`${IMAGE_LABELS[imageElementId]} に貼り付けました。`);
      return true;
    }

    updatePasteHint('クリップボードに画像がありませんでした。', true);
  } catch (error) {
    console.error('Failed to read clipboard image:', error);

    if (error?.name === 'NotAllowedError') {
      updatePasteHint('クリップボードの読み取りが許可されませんでした。', true);
    } else {
      updatePasteHint('クリップボードの読み取りに失敗しました。', true);
    }
  }

  return false;
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
