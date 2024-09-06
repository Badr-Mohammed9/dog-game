export function setGravity(k, value) {
    k.setGravity(value)
  }
  
  export function handleCamera(player, k, cameraMode, fixedCameraPosition) {
    if (player.pos.x >= fixedCameraPosition) {
      k.camPos(player.pos.x, k.camPos().y);
      cameraMode = true;
    }
  }
  
  export function createLevel(k, blockWidth, blockHeight, dinoSprite) {
    return k.addLevel(
      [
        "                                                                                       ",
        "                                                                                       ",
        "                                                                                       ",
        "                                                       =                               ",
        "                                                     ",
        "     d     d    ======              d       ===                                         ",
        "=============================    ==========          =========             ===      ",
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
          d: () => [
            k.sprite("green-dino", dinoSprite),
            k.area({
              scale: 0.85,
              shape: new Polygon([k.vec2(0, 0), k.vec2(50, 0), k.vec2(50, 50), k.vec2(0, 50)]),
            }),
            k.anchor("center"),
            k.body(),
            { fixed_position: null, front: true },
            "dino",
          ],
        },
      }
    );
  }
  