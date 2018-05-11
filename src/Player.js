const CIRCLE = Math.PI * 2;

class Player {
  constructor(x, y, direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.speed = 5;
  }

  rotate(angle) {
    this.direction = (this.direction + angle + CIRCLE) % (CIRCLE);
  }

  walk(distance, map) {
    const dx = Math.cos(this.direction) * distance;
    const dy = Math.sin(this.direction) * distance;
    if (map.get(this.x + (dx*2), this.y) <= 0) { this.x += dx };
    if (map.get(this.x, this.y + (dy*2)) <= 0) { this.y += dy };
  }

  update(controls, map, seconds) {
    if (controls.left) { this.rotate(-Math.PI * seconds); }
    if (controls.right) { this.rotate(Math.PI * seconds); }
    if (controls.forward) {
      this.walk(this.speed * seconds, map);
    }
    if (controls.backward) { this.walk(-this.speed * seconds, map); }
  }
}

export default Player;
