export function createPlayer(k, playerSprite, playerHeight) {
    return k.add([
      k.sprite("frog-idle", playerSprite),
      k.pos(0, 100),
      k.area(),
      k.body(),
      "player",
    ]);
  }
  
  export function movePlayer(k, player, speed, playerSprite, animation) {
    if (player.sprite !== animation) {
      player.use(k.sprite(animation, playerSprite));
    }
    player.move(speed, 0);
  }
  
  export function handleJump(k, player, JUMP, jumpTrails, playerSprite) {
    if (player.isGrounded() || jumpTrails < 2) {
      player.jump(JUMP);
      jumpTrails++;
      player.use(k.sprite("frog-jump", playerSprite));
    }
  }
  
  export function resetPlayerSprite(k, player, playerSprite, animation, jumpTrails) {
    if (player.isGrounded() && player.sprite !== "frog-run" && player.sprite !== "frog-back") {
      player.use(k.sprite(animation, playerSprite));
    }
    if (player.isGrounded()) {
      jumpTrails = 0;
    }
  }
  