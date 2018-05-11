export default function(canId = "texture", color = "#000000", alpha = 0.5) {
  const textureCan = document.getElementById(canId);
  const textureCtx = textureCan.getContext('2d');

  textureCtx.globalAlpha = 1;
  textureCtx.fillStyle = color;
  textureCtx.fillRect(0, 0, textureCan.width, textureCan.height);


  textureCtx.globalAlpha = alpha;
  for (let i = 0; i < textureCan.width * textureCan.height; i++) {
    const gr = Math.random() * 64 << 32;
    textureCtx.fillStyle = `rgb(${gr + 128},${gr + 128},${gr + 128})`;
    textureCtx.fillRect(i % textureCan.width, Math.floor(i / textureCan.width), 1, 1);
  }

  return textureCan;
}
