export function setGravity(k, value) {
  k.setGravity(value);
}

export function handleCamera(player, k, fixedCameraPosition, backGround) {
  if (player.pos.x >= fixedCameraPosition) {
    k.camPos(player.pos.x, k.camPos().y);
    backGround.use(pos(player.pos.x - k.width() / 2, 0));
  }
}

export function createLevel(k, blockWidth, blockHeight, dinoSprite) {
  return k.addLevel(
    [
      "                                                                                       ",
      "                                                                                       ",
      "                                                                                       ",
      "                                                       =                               ",
      "                  @                                   ",
      "  btt  d    t d    @@@@@              d       ===                                         ",
      "=======@@====================    ==========          =========             ===      ",
      "#######  ###  ##############                         ##########                                     ",
    ],
    {
      tileWidth: blockWidth,
      tileHeight: blockHeight,
      pos: k.vec2(blockWidth / 2, blockHeight),
      tiles: {
        "=": () => [
          k.sprite("block", { width: blockWidth, height: blockHeight }),
          k.area(),
          k.body({ isStatic: true }),
          k.anchor("bot"),
        ],
        "#": () => [
          k.sprite("dirt", { width: blockWidth, height: blockHeight }),
          k.area(),
          k.body({ isStatic: true }),
          k.anchor("bot"),
        ],
        "@": () => [
          k.sprite("brick", { width: blockWidth, height: blockHeight }),
          k.area(),
          k.body({ isStatic: true }),
          k.anchor("bot"),
        ],
        t: () => [
          k.sprite("tree", { width: blockWidth * 2, height: blockHeight * 4 }),
          k.area(),
          k.anchor("bot"),
        ],
        d: () => [
          k.sprite("green-dino", dinoSprite),
          k.area({
            scale: 0.85,
            shape: new Polygon([
              k.vec2(0, 0),
              k.vec2(50, 0),
              k.vec2(50, 50),
              k.vec2(0, 50),
            ]),
          }),
          k.anchor("center"),
          k.body(),
          { fixed_position: null, front: true },
          "dino",
        ],
        b: () => [
          k.sprite("blue-dino", dinoSprite),
          k.area({
            scale: 0.85,
            shape: new Polygon([
              k.vec2(0, 0),
              k.vec2(50, 0),
              k.vec2(50, 50),
              k.vec2(0, 50),
            ]),
          }),
          k.anchor("center"),
          k.body(),
          {
            fixed_position: null,
            front: true,
            moveDino(NUM_BLOCKS, blockWidth) {
              const distince = blockWidth;
              const maxBlock = (this.fixed_position.x + distince * NUM_BLOCKS) - blockWidth;
              if (this.pos.x > maxBlock) {
                return;
              }
              for (let i = 0; i < NUM_BLOCKS; i++) {
                return tween(
                  this.pos,
                  vec2(this.pos.x + distince, this.pos.y),
                  3,
                  (val) => (this.pos = val)
                );
              }
            },
          },
          "blue-dino",
        ],
      },
    }
  );
}
