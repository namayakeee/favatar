const { createCanvas } = require('canvas')
const QRCode = require('qrcode')

module.exports = (req, res) => {
  // id should be base64 encoded string
  const { data } = req.params;
  const decodedData = Buffer.from(data, 'base64').toString('ascii');
  const { size = 240 } = req.query;
  const imageSize = Math.min(Math.max(parseInt(size) || 240, 240), 2048);

  const canvas = createCanvas(imageSize, imageSize)
  QRCode.toCanvas(canvas, decodedData, {
    width: size
  }, function (error) {
    if (error) res.status(500).send('');
    else {
      res.set({
        'Content-disposition': `filename="image.png"`,
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public,max-age=31536000,immutable'
      })
      canvas.createPNGStream().pipe(res);
    }
  })  
}