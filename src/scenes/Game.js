var curTween = null;
const dinoSprite = { width: 100, height: 100,anim:'idle' }

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
    const fixedCameraPostion = camPos().x 
    const player = k.add([
      sprite("frog-idle", playerSprite),
      pos(0, 100),
      area(),
      body(),
      "player",
    ]);
  
    // const dino = k.add([
    //   k.sprite("green-dino", { width: 100, height: 100,anim:'idle' }),
    //   area({scale:0.85 , shape: new Polygon([vec2(0,0), vec2(50,0), vec2(50,50), vec2(0,50)])}),
    //   pos(200, 300),
    //   anchor('center'),
    //   body(),
    //   "block",
    // ]);
  
  
  
  
    const level = k.addLevel(
      [
        "                                                                                       ",
        "                                                                                       ",
        "                                                                                       ",
        "                                                       =                               ",
        "                                                     ",
        "     d         ======                        ===                                         ",
        "=============================    ==========          =========             ===      ",
        "#######  ###  ##############                         ##########                                     ",
    ]
    ,
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
          'd':()=> [
            k.sprite("green-dino", dinoSprite),
            area({scale:0.85 , shape: new Polygon([vec2(0,0), vec2(50,0), vec2(50,50), vec2(0,50)])}),
            anchor('center'),
            body(),
            {
              fixed_postion: null,
              front: true
            },
            'dino'
          ]
        },
      }
    );

    let dino = level.get("dino")[0]
    dino.fixed_postion = {x:dino.pos.x,y:dino.pos.y};
    playUpdates(k, player, jump_trails, cameraMode, playerSprite, SPEED, JUMP,fixedCameraPostion,dino,block_width);
  }
  
  function playUpdates(
    k,
    player,
    jump_trails,
    cameraMode,
    playerSprite,
    SPEED,
    JUMP,
    fixedCameraPostion,
    dino,
    block_width
  ) {
    k.onKeyDown("d", () => {
      if (player.sprite !== "frog-run") {
        player.use(k.sprite("frog-run", playerSprite));
      }
      player.move(SPEED, 0);
    });
  
    player.onUpdate(() => {
      dinoMovement(dino,block_width)
      if (player.pos.x >= fixedCameraPostion ) {
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
      dinoMovement(dino,block_width)
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
  
function dinoMovement(dino,block_width) {
  let max_block = dino.fixed_postion.x + 2 * block_width;
  let min_block = dino.fixed_postion.x - 2 * block_width;
  if (dino) {
    if (curTween) curTween.cancel();
    // start the tween
    if (dino.pos.x < max_block && dino.front) {
      if (dino.sprite !== 'green-dino') {
        dino.use(sprite('green-dino',dinoSprite))
      }
      curTween = tween(
        // start value (accepts number, Vec2 and Color)
        dino.pos,
        // destination value
        vec2(dino.pos.x+ block_width,dino.pos.y),
        // duration (in seconds)
        3,
        // how value should be updated
        (val) => dino.pos = val,
        // interpolation function (defaults to easings.linear)
    )
    }else {
      dino.front = false;
    }

    if (dino.pos.x > min_block && !dino.front) {
      if (dino.sprite !== 'green-dino-back') {
        dino.use(sprite('green-dino-back',dinoSprite))
      }
      curTween = tween(
        // start value (accepts number, Vec2 and Color)
        dino.pos,
        // destination value
        vec2(dino.pos.x - block_width,dino.pos.y),
        // duration (in seconds)
        3,
        // how value should be updated
        (val) => dino.pos = val,
        // interpolation function (defaults to easings.linear)
    )
    }else {
      dino.front = true;
    }
  }
}