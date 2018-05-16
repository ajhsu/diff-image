const path = require('path');
const diffImage = require('./index');

(async function () {
  const percent = await diffImage({
    image1: path.resolve(__dirname, 'tix1.png'),
    image2: path.resolve(__dirname, 'tix2.png'),
    output: path.resolve(__dirname, 'diff.png')
  });
  console.log(percent);
})();