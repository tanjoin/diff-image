function getSourceWidth(source) {
  return source.naturalWidth ?? source.width;
}

function getSourceHeight(source) {
  return source.naturalHeight ?? source.height;
}

function createSplitCanvasesFromSingleImage(image, orientation) {
  const width = image.naturalWidth;
  const height = image.naturalHeight;

  if (orientation === 'vertical') {
    const partHeight = Math.floor(height / 2);
    if (partHeight <= 0) return null;

    const topCanvas = document.createElement('canvas');
    topCanvas.width = width;
    topCanvas.height = partHeight;
    topCanvas.getContext('2d').drawImage(image, 0, 0, width, partHeight, 0, 0, width, partHeight);

    const bottomCanvas = document.createElement('canvas');
    bottomCanvas.width = width;
    bottomCanvas.height = partHeight;
    bottomCanvas.getContext('2d').drawImage(image, 0, height - partHeight, width, partHeight, 0, 0, width, partHeight);

    return [topCanvas, bottomCanvas];
  }

  const partWidth = Math.floor(width / 2);
  if (partWidth <= 0) return null;

  const leftCanvas = document.createElement('canvas');
  leftCanvas.width = partWidth;
  leftCanvas.height = height;
  leftCanvas.getContext('2d').drawImage(image, 0, 0, partWidth, height, 0, 0, partWidth, height);

  const rightCanvas = document.createElement('canvas');
  rightCanvas.width = partWidth;
  rightCanvas.height = height;
  rightCanvas.getContext('2d').drawImage(image, width - partWidth, 0, partWidth, height, 0, 0, partWidth, height);

  return [leftCanvas, rightCanvas];
}

export function diffImages(image1, image2, enableWidthAdjustment = false) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const image1Width = getSourceWidth(image1);
  const image2Width = getSourceWidth(image2);
  const image1Height = getSourceHeight(image1);
  const image2Height = getSourceHeight(image2);

  // CSSの影響を受けない元画像のピクセルサイズを使用
  // 幅調整が有効で幅が異なる場合は、広い方の幅に白背景で中央寄せする
  const shouldAdjustWidth = enableWidthAdjustment && image1Width !== image2Width;
  const width = Math.max(image1Width, image2Width);
  const height = Math.max(image1Height, image2Height);
  canvas.width = width;
  canvas.height = height;

  const drawImageWithOptionalWidthAdjustment = (image) => {
    const sourceWidth = getSourceWidth(image);
    const sourceHeight = getSourceHeight(image);

    if (shouldAdjustWidth) {
      const offsetX = Math.floor((width - sourceWidth) / 2);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(image, offsetX, 0, sourceWidth, sourceHeight);
      return;
    }

    ctx.drawImage(image, 0, 0, sourceWidth, sourceHeight);
  };
  
  // 元画像1を描画
  drawImageWithOptionalWidthAdjustment(image1);
  const imgData1 = ctx.getImageData(0, 0, width, height);
  
  // canvasをリセット（widthを再設定すると自動でクリアされる）
  canvas.width = width;
  canvas.height = height;
  
  // 元画像2を描画
  drawImageWithOptionalWidthAdjustment(image2);
  const imgData2 = ctx.getImageData(0, 0, width, height);
  
  // 差分画像の作成（ベースは画像1）
  const diffData = ctx.createImageData(width, height);
  
  for (let i = 0; i < imgData1.data.length; i += 4) {
    const rDiff = Math.abs(imgData1.data[i] - imgData2.data[i]);
    const gDiff = Math.abs(imgData1.data[i + 1] - imgData2.data[i + 1]);
    const bDiff = Math.abs(imgData1.data[i + 2] - imgData2.data[i + 2]);
    const aDiff = Math.abs(imgData1.data[i + 3] - imgData2.data[i + 3]);
    
    // RGBAの差分の合計
    const totalDiff = rDiff + gDiff + bDiff + aDiff;
    
    // しきい値以上の差分がある部分は白、ない部分は黒
    const threshold = 60;
    if (totalDiff > threshold) {
      // 差分がある部分は白色
      diffData.data[i] = 255;
      diffData.data[i + 1] = 255;
      diffData.data[i + 2] = 255;
      diffData.data[i + 3] = 255;
    } else {
      // 差分がない部分は黒色
      diffData.data[i] = 0;
      diffData.data[i + 1] = 0;
      diffData.data[i + 2] = 0;
      diffData.data[i + 3] = 255;
    }
  }
  
  ctx.putImageData(diffData, 0, 0);
  
  return canvas;
}

export function createDiffMaskA(image1, image2, enableWidthAdjustment = false) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const image1Width = getSourceWidth(image1);
  const image2Width = getSourceWidth(image2);
  const image1Height = getSourceHeight(image1);
  const image2Height = getSourceHeight(image2);
  
  const shouldAdjustWidth = enableWidthAdjustment && image1Width !== image2Width;
  const width = Math.max(image1Width, image2Width);
  const height = Math.max(image1Height, image2Height);
  canvas.width = width;
  canvas.height = height;

  const drawImageWithOptionalWidthAdjustment = (image) => {
    const sourceWidth = getSourceWidth(image);
    const sourceHeight = getSourceHeight(image);

    if (shouldAdjustWidth) {
      const offsetX = Math.floor((width - sourceWidth) / 2);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(image, offsetX, 0, sourceWidth, sourceHeight);
      return;
    }

    ctx.drawImage(image, 0, 0, sourceWidth, sourceHeight);
  };
  
  // 元画像1を描画
  drawImageWithOptionalWidthAdjustment(image1);
  const imgData1 = ctx.getImageData(0, 0, width, height);
  
  // canvasをリセット
  canvas.width = width;
  canvas.height = height;
  
  // 元画像2を描画
  drawImageWithOptionalWidthAdjustment(image2);
  const imgData2 = ctx.getImageData(0, 0, width, height);
  
  // 差分があった部分だけ画像Aを表示
  const resultData = ctx.createImageData(width, height);
  
  for (let i = 0; i < imgData1.data.length; i += 4) {
    const rDiff = Math.abs(imgData1.data[i] - imgData2.data[i]);
    const gDiff = Math.abs(imgData1.data[i + 1] - imgData2.data[i + 1]);
    const bDiff = Math.abs(imgData1.data[i + 2] - imgData2.data[i + 2]);
    const aDiff = Math.abs(imgData1.data[i + 3] - imgData2.data[i + 3]);
    
    const totalDiff = rDiff + gDiff + bDiff + aDiff;
    const threshold = 60;
    
    if (totalDiff > threshold) {
      // 差分がある部分は画像Aのピクセルを表示
      resultData.data[i] = imgData1.data[i];
      resultData.data[i + 1] = imgData1.data[i + 1];
      resultData.data[i + 2] = imgData1.data[i + 2];
      resultData.data[i + 3] = imgData1.data[i + 3];
    } else {
      // 差分がない部分は透明
      resultData.data[i] = 0;
      resultData.data[i + 1] = 0;
      resultData.data[i + 2] = 0;
      resultData.data[i + 3] = 0;
    }
  }
  
  ctx.putImageData(resultData, 0, 0);
  return canvas;
}

export function createDiffMaskB(image1, image2, enableWidthAdjustment = false) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const image1Width = getSourceWidth(image1);
  const image2Width = getSourceWidth(image2);
  const image1Height = getSourceHeight(image1);
  const image2Height = getSourceHeight(image2);
  
  const shouldAdjustWidth = enableWidthAdjustment && image1Width !== image2Width;
  const width = Math.max(image1Width, image2Width);
  const height = Math.max(image1Height, image2Height);
  canvas.width = width;
  canvas.height = height;

  const drawImageWithOptionalWidthAdjustment = (image) => {
    const sourceWidth = getSourceWidth(image);
    const sourceHeight = getSourceHeight(image);

    if (shouldAdjustWidth) {
      const offsetX = Math.floor((width - sourceWidth) / 2);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(image, offsetX, 0, sourceWidth, sourceHeight);
      return;
    }

    ctx.drawImage(image, 0, 0, sourceWidth, sourceHeight);
  };
  
  // 元画像1を描画
  drawImageWithOptionalWidthAdjustment(image1);
  const imgData1 = ctx.getImageData(0, 0, width, height);
  
  // canvasをリセット
  canvas.width = width;
  canvas.height = height;
  
  // 元画像2を描画
  drawImageWithOptionalWidthAdjustment(image2);
  const imgData2 = ctx.getImageData(0, 0, width, height);
  
  // 差分があった部分だけ画像Bを表示
  const resultData = ctx.createImageData(width, height);
  
  for (let i = 0; i < imgData1.data.length; i += 4) {
    const rDiff = Math.abs(imgData1.data[i] - imgData2.data[i]);
    const gDiff = Math.abs(imgData1.data[i + 1] - imgData2.data[i + 1]);
    const bDiff = Math.abs(imgData1.data[i + 2] - imgData2.data[i + 2]);
    const aDiff = Math.abs(imgData1.data[i + 3] - imgData2.data[i + 3]);
    
    const totalDiff = rDiff + gDiff + bDiff + aDiff;
    const threshold = 60;
    
    if (totalDiff > threshold) {
      // 差分がある部分は画像Bのピクセルを表示
      resultData.data[i] = imgData2.data[i];
      resultData.data[i + 1] = imgData2.data[i + 1];
      resultData.data[i + 2] = imgData2.data[i + 2];
      resultData.data[i + 3] = imgData2.data[i + 3];
    } else {
      // 差分がない部分は透明
      resultData.data[i] = 0;
      resultData.data[i + 1] = 0;
      resultData.data[i + 2] = 0;
      resultData.data[i + 3] = 0;
    }
  }
  
  ctx.putImageData(resultData, 0, 0);
  return canvas;
}

export function displayDiff() {
  const imgA = document.getElementById('image-a');
  const imgB = document.getElementById('image-b');
  const diffCanvas = document.getElementById('diff-canvas');
  const diffMaskACanvas = document.getElementById('diff-mask-a');
  const diffMaskBCanvas = document.getElementById('diff-mask-b');
  const enabledWidthAdjustment = document.getElementById('enable-width-adjustment').checked;
  const enabledSingleImageDiff = document.getElementById('single-image-diff').checked;
  const singleImageDiffOption = document.querySelector('input[name="single-image-diff-option"]:checked').value;

  let sourceA = null;
  let sourceB = null;

  if (enabledSingleImageDiff) {
    if (!imgA.src) return;

    const splitCanvases = createSplitCanvasesFromSingleImage(imgA, singleImageDiffOption);
    if (!splitCanvases) return;

    [sourceA, sourceB] = splitCanvases;
  } else {
    if (!imgA.src || !imgB.src) return;
    sourceA = imgA;
    sourceB = imgB;
  }

  // 通常の差分表示
  const diffCanvasResult = diffImages(sourceA, sourceB, enabledWidthAdjustment);
  diffCanvas.width = diffCanvasResult.width;
  diffCanvas.height = diffCanvasResult.height;
  const diffCtx = diffCanvas.getContext('2d');
  diffCtx.drawImage(diffCanvasResult, 0, 0);

  // 差分部分だけ画像Aを表示
  const diffMaskAResult = createDiffMaskA(sourceA, sourceB, enabledWidthAdjustment);
  diffMaskACanvas.width = diffMaskAResult.width;
  diffMaskACanvas.height = diffMaskAResult.height;
  const diffMaskACtx = diffMaskACanvas.getContext('2d');
  diffMaskACtx.drawImage(diffMaskAResult, 0, 0);

  // 差分部分だけ画像Bを表示
  const diffMaskBResult = createDiffMaskB(sourceA, sourceB, enabledWidthAdjustment);
  diffMaskBCanvas.width = diffMaskBResult.width;
  diffMaskBCanvas.height = diffMaskBResult.height;
  const diffMaskBCtx = diffMaskBCanvas.getContext('2d');
  diffMaskBCtx.drawImage(diffMaskBResult, 0, 0);
}