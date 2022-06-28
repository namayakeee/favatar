const { createCanvas } = require('canvas')
const crypto = require('crypto');

module.exports = (req, res) => {
  // id should be base64 encoded string
  const { id } = req.params;
  const { size = 720 } = req.query;
  const imageSize = Math.min(Math.max(parseInt(size) || 240, 240), 2048);

  const decodedId = Buffer.from(id, 'base64').toString('ascii');
  const hash = crypto.createHash('sha256').update(decodedId).digest('hex');
  const canvas = createCanvas(imageSize, imageSize)
  const ctx = canvas.getContext('2d')
  
  ctx.fillStyle = `#${hash.substring(0, 6).toLowerCase()}`;
  const { color } = req.query;
  if (color && /^[0-9a-f]{6}$/.test(color)) ctx.fillStyle = `#${color}`;

  ctx.fillRect(0, 0, imageSize, imageSize);
  ctx.fillStyle = `#FFFFFF`;
  ctx.textAlign = "center";
  ctx.font = `${Math.round(imageSize / 2.4)}px Impact`
  ctx.textBaseline = 'middle';
  ctx.fillText(`${decodedId.substring(0, 1).toUpperCase()}`, Math.round(imageSize / 2), Math.round(imageSize / 2))
  
  res.set({
    'Content-disposition': `filename="image.png"`,
    'Content-Type': 'image/jpeg',
  })
  canvas.createPNGStream().pipe(res);
  // res.send('asd');
}