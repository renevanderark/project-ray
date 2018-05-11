class Camera {
  constructor(canvas, resolution, focalLength) {
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width = window.innerWidth * 0.5;
    this.height = canvas.height = window.innerHeight * 0.5;
    this.resolution = resolution;
    this.spacing = this.width / resolution;
    this.focalLength = focalLength || 0.8;
    this.range = 14;
    this.lightRange = 8;
    this.scale = (this.width + this.height) / 1200;
  }

  render(player, map) {
    this.drawColumns(player, map);
  }

  drawColumns(player, map) {
    this.ctx.save();
    for (let column = 0; column < this.resolution; column++) {
      var x = column / this.resolution - 0.5;
      var angle = Math.atan2(x, this.focalLength);
      var ray = map.cast(player, player.direction + angle, this.range);
      this.drawColumn(column, ray, angle, map);
    }
    this.ctx.restore();
  }

  drawColumn(column, ray, angle, map) {
    const ctx = this.ctx;
    const texture = map.wallTexture;
    const left = Math.floor(column * this.spacing);
    const width = Math.ceil(this.spacing);
    let hit = -1;

    while (++hit < ray.length && ray[hit].height <= 0);
    for (let s = ray.length - 1; s >= 0; s--) {
      const step = ray[s];
      if (s === hit) {
        const textureX = Math.floor(texture.width * step.offset);
        const wall = this.project(step.height, angle, step.distance);

        ctx.globalAlpha = 1;
        ctx.fillRect(left, wall.top, width, wall.height);

        ctx.drawImage(texture, textureX, 0, 1, texture.height, left, wall.top, width, wall.height);

        ctx.fillStyle = '#000000';
        ctx.globalAlpha = Math.max((step.distance + step.shading) / this.lightRange, 0);
        ctx.fillRect(left, wall.top-1, width, wall.height+2);
      }
    }
  }

  project(height, angle, distance) {
    const z = distance * Math.cos(angle);
    const wallHeight = this.height * height / z;
    const bottom = this.height / 2 * (1 + 1 / z);
    return {
      top: bottom - wallHeight,
      height: wallHeight
    };
  }
}

export default Camera;
