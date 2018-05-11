class Map {
  constructor(size, wallTexture) {
    this.size = size;
    this.wallGrid = new Uint8Array(size * size);
    this.wallTexture = wallTexture;
  }

  get(x, y) {
    x = Math.floor(x);
    y = Math.floor(y);
    if (x < 0 || x > this.size - 1 || y < 0 || y > this.size - 1) { return -1; }
    return this.wallGrid[y * this.size + x];
  }

  randomize() {
    for (let i = 0; i < this.size * this.size; i++) {
      this.wallGrid[i] = Math.random() < 0.3 ? 1 : 0;
    }
  }

  cast(point, angle, range) {
    const self = this;
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);
    const noWall = { length2: Infinity };

    return ray({ x: point.x, y: point.y, height: 0, distance: 0 });

    function ray(origin) {
      const stepX = step(sin, cos, origin.x, origin.y);
      const stepY = step(cos, sin, origin.y, origin.x, true);
      const nextStep = stepX.length2 < stepY.length2
        ? inspect(stepX, 1, 0, origin.distance, stepX.y)
        : inspect(stepY, 0, 1, origin.distance, stepY.x);

      if (nextStep.distance > range) { return [origin]; }
      return [origin].concat(ray(nextStep));
    }

    function step(rise, run, x, y, inverted) {
      if (run === 0) { return noWall; }
      const dx = run > 0 ? Math.floor(x + 1) - x : Math.ceil(x - 1) - x;
      const dy = dx * (rise / run);
      return {
        x: inverted ? y + dy : x + dx,
        y: inverted ? x + dx : y + dy,
        length2: dx * dx + dy * dy
      };
    }

    function inspect(step, shiftX, shiftY, distance, offset) {
      const dx = cos < 0 ? shiftX : 0;
      const dy = sin < 0 ? shiftY : 0;
      step.height = self.get(step.x - dx, step.y - dy);
      step.distance = distance + Math.sqrt(step.length2);
      if (shiftX > 0) { step.shading = cos < 0 ? 2 : 0; }
      else { step.shading = sin < 0 ? 2 : 1; }
      step.offset = offset - Math.floor(offset);
      return step;
    };
  }

  update(seconds) {

  }
}

export default Map;
