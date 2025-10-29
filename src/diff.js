export function diffImages(image1, image2) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  // CSSの影響を受けない元画像のピクセルサイズを使用
  const width = Math.max(image1.naturalWidth, image2.naturalWidth);
  const height = Math.max(image1.naturalHeight, image2.naturalHeight);
  canvas.width = width;
  canvas.height = height;
  
  // 元画像1を描画
  ctx.drawImage(image1, 0, 0, image1.naturalWidth, image1.naturalHeight);
  const imgData1 = ctx.getImageData(0, 0, width, height);
  
  // canvasをリセット（widthを再設定すると自動でクリアされる）
  canvas.width = width;
  
  // 元画像2を描画
  ctx.drawImage(image2, 0, 0, image2.naturalWidth, image2.naturalHeight);
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

export function createDiffMaskA(image1, image2) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  const width = Math.max(image1.naturalWidth, image2.naturalWidth);
  const height = Math.max(image1.naturalHeight, image2.naturalHeight);
  canvas.width = width;
  canvas.height = height;
  
  // 元画像1を描画
  ctx.drawImage(image1, 0, 0, image1.naturalWidth, image1.naturalHeight);
  const imgData1 = ctx.getImageData(0, 0, width, height);
  
  // canvasをリセット
  canvas.width = width;
  
  // 元画像2を描画
  ctx.drawImage(image2, 0, 0, image2.naturalWidth, image2.naturalHeight);
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

export function createDiffMaskB(image1, image2) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  const width = Math.max(image1.naturalWidth, image2.naturalWidth);
  const height = Math.max(image1.naturalHeight, image2.naturalHeight);
  canvas.width = width;
  canvas.height = height;
  
  // 元画像1を描画
  ctx.drawImage(image1, 0, 0, image1.naturalWidth, image1.naturalHeight);
  const imgData1 = ctx.getImageData(0, 0, width, height);
  
  // canvasをリセット
  canvas.width = width;
  
  // 元画像2を描画
  ctx.drawImage(image2, 0, 0, image2.naturalWidth, image2.naturalHeight);
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

  if (imgA.src && imgB.src) {
    // 通常の差分表示
    const diffCanvasResult = diffImages(imgA, imgB);
    diffCanvas.width = diffCanvasResult.width;
    diffCanvas.height = diffCanvasResult.height;
    const diffCtx = diffCanvas.getContext('2d');
    diffCtx.drawImage(diffCanvasResult, 0, 0);
    
    // 差分部分だけ画像Aを表示
    const diffMaskAResult = createDiffMaskA(imgA, imgB);
    diffMaskACanvas.width = diffMaskAResult.width;
    diffMaskACanvas.height = diffMaskAResult.height;
    const diffMaskACtx = diffMaskACanvas.getContext('2d');
    diffMaskACtx.drawImage(diffMaskAResult, 0, 0);
    
    // 差分部分だけ画像Bを表示
    const diffMaskBResult = createDiffMaskB(imgA, imgB);
    diffMaskBCanvas.width = diffMaskBResult.width;
    diffMaskBCanvas.height = diffMaskBResult.height;
    const diffMaskBCtx = diffMaskBCanvas.getContext('2d');
    diffMaskBCtx.drawImage(diffMaskBResult, 0, 0);
  }
}