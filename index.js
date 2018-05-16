const fs = require('fs');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');

async function diffImage({
  image1,
  image2,
  output
}) {

  const img1 = await readImage(image1);
  const img2 = await readImage(image2);
  const imageWidth = img1.width;
  const imageHeight = img1.height;
  let diff;

  if (output) {
    diff = new PNG({
      width: imageWidth,
      height: imageHeight
    });
  }

  const diffImageData = output ? diff.data : null;
  const mismatchedPixelCount = pixelmatch(img1.data, img2.data, diffImageData, imageWidth, imageHeight, {
    threshold: 0.1,
    includeAA: false
  });

  if (output) {
    diff.pack().pipe(fs.createWriteStream(output));
  }

  const percentage = mismatchedPixelCount / (imageWidth * imageHeight);
  return percentage;
}

function readImage(filePath) {
  return new Promise(function (y, n) {
    const img = fs.createReadStream(filePath).pipe(new PNG()).on('parsed', function onParsed() {
      y(img);
    });
  })
}

module.exports = diffImage;