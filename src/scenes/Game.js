export function Game(k) {
    setGravity(2400);
  
    var jump_trails = 0;
    var cameraMode = false;
    var block_width = k.width() / 10;
    var block_height = k.height() / 8;
    const playerHeight = k.width() / 14;
    const SPEED = 600;
    const JUMP = 1000;
    var playerSprite = { anim: "base", width: playerHeight, height: 100 };
  
    const player = k.add([
      sprite("frog-idle", playerSprite),
      pos(0, 100),
      area(),
      body(),
      "player",
    ]);
  
    const block = k.add([
      k.sprite("block", { width: 100, height: 100 }),
      area(),
      pos(200, 300),
    //   body({ isStatic: true }),
      "block",
    ]);
  
  
  
    playUpdates(k, player, jump_trails, cameraMode, playerSprite, SPEED, JUMP);
  
    const level = k.addLevel(
      [
        // Design the level layout with symbols
        "",
        "",
        "",
        "",
        "",
        "",
        "====  ====",
        "####  ####",
      ],
      {
        // The size of each grid
        tileWidth: block_width,
        tileHeight: block_height,
        // The position of the top left block
        pos: k.vec2(block_width / 2, block_height),
        // Define what each symbol means (in components)
        tiles: {
          "=": () => [
            k.sprite("block", { width: block_width, height: block_height }),
            area(),
            body({ isStatic: true }),
            anchor("bot"),
          ],
          "#": () => [
            k.sprite("dirt", { width: block_width, height: block_height }),
            area(),
            body({ isStatic: true }),
            anchor("bot"),
          ],
        },
      }
    );
  }
  
  function playUpdates(
    k,
    player,
    jump_trails,
    cameraMode,
    playerSprite,
    SPEED,
    JUMP
  ) {
    k.onKeyDown("d", () => {
      if (player.sprite !== "frog-run") {
        player.use(k.sprite("frog-run", playerSprite));
      }
      player.move(SPEED, 0);
    });
  
    player.onUpdate(() => {
      if (player.pos.x >= k.camPos().x || cameraMode) {
        k.camPos(player.pos.x, k.camPos().y);
        cameraMode = true;
      }
      if (
        player.isGrounded() &&
        player.sprite !== "frog-run" &&
        player.sprite !== "frog-back"
      ) {
        player.use(k.sprite("frog-idle", playerSprite));
      }
      if (player.isGrounded()) {
        jump_trails = 0;
      }
    });
  
    k.onKeyRelease("d", () => {
      player.use(k.sprite("frog-idle", playerSprite));
    });
  
    k.onKeyRelease("a", () => {
      player.use(k.sprite("frog-idle", playerSprite));
    });
  
    k.onKeyPress("w", () => {
      if (player.isGrounded() || jump_trails < 2) {
        player.jump(JUMP);
        jump_trails++;
        player.use(k.sprite("frog-jump", playerSprite));
      }
    });
  
    k.onKeyDown("a", () => {
      if (player.sprite !== "frog-back") {
        player.use(k.sprite("frog-back", playerSprite));
      }
      player.move(-SPEED, 0);
    });
  }
  