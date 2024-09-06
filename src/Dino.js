export function createDino(k, dinoSprite) {
    return [
      k.sprite("green-dino", dinoSprite),
      k.area({ scale: 0.85, shape: new Polygon([vec2(0, 0), vec2(50, 0), vec2(50, 50), vec2(0, 50)]) }),
      k.anchor("center"),
      k.body(),
      { fixed_position: null, front: true },
      "dino",
    ];
  }
  
  export function dinoMovement(k, dino, blockWidth, NUM_BLOCKS) {
    const maxBlock = dino.fixed_position.x + NUM_BLOCKS * blockWidth;
    const minBlock = dino.fixed_position.x - NUM_BLOCKS * blockWidth;
  
    if (dino.front && dino.pos.x < maxBlock) {
      setDinoSprite(k, dino, "green-dino");
      moveDino(k, dino, dino.pos.x + blockWidth, dino.pos.y);
    } else {
      dino.front = false;
    }
  
    if (!dino.front && dino.pos.x > minBlock) {
      setDinoSprite(k, dino, "green-dino-back");
      moveDino(k, dino, dino.pos.x - blockWidth, dino.pos.y);
    } else {
      dino.front = true;
    }
  }
  
  function setDinoSprite(k, dino, animation) {
    if (dino.sprite !== animation) {
      dino.use(k.sprite(animation,{ width: 100, height: 100, anim: "idle" }));
    }
  }
  
  function moveDino(k, dino, x, y) {
    return k.tween(
      dino.pos,
      k.vec2(x, y),
      3,
      (val) => (dino.pos = val)
    );
  }
  