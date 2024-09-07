import {
  createPlayer,
  movePlayer,
  handleJump,
  resetPlayerSprite,
} from "../Player.js";
import { createDino, dinoMovement } from "../Dino.js";
import { setGravity, handleCamera, createLevel } from "../Utility.js";

export function Game(k) {
  setGravity(k, 2400);
  const backGround = k.add([
    sprite("background", { width: k.width(), height: k.height() }),
    pos(),
    area(),
  ]);

  const jumpTrails = 0;
  const cameraMode = false;
  const blockWidth = k.width() / 10;
  const blockHeight = k.height() / 8;
  const playerHeight = k.width() / 14;
  const SPEED = 600;
  const JUMP = 1000;
  const fixedCameraPosition = k.camPos().x;

  const playerSprite = { anim: "base", width: playerHeight, height: 100 };
  const player = createPlayer(k, playerSprite, playerHeight);

  const level = createLevel(k, blockWidth, blockHeight, {
    width: 100,
    height: 100,
    anim: "idle",
  });
  const dinos = level.get("dino");
  const blueDino = level.get("blue-dino")[0];
  blueDino.fixed_position = { x: blueDino.pos.x, y: blueDino.pos.y };

  dinos.forEach((dino) => {
    dino.fixed_position = { x: dino.pos.x, y: dino.pos.y };
  });

  GameUpdates(
    k,
    player,
    jumpTrails,
    cameraMode,
    playerSprite,
    SPEED,
    JUMP,
    fixedCameraPosition,
    dinos,
    blockWidth,
    backGround,
    blueDino
  );
}

function GameUpdates(
  k,
  player,
  jumpTrails,
  cameraMode,
  playerSprite,
  SPEED,
  JUMP,
  fixedCameraPosition,
  dinos,
  blockWidth,
  backGround,
  blueDino
) {
  k.onKeyDown("d", () => {
    blueDino.moveDino(2, blockWidth);
    movePlayer(k, player, SPEED, playerSprite, "frog-run");
  });
  k.onKeyDown("a", () =>
    movePlayer(k, player, -SPEED, playerSprite, "frog-back")
  );

  player.onUpdate(() => {
    dinos.forEach((dino) => dinoMovement(k, dino, blockWidth, 1));
    handleCamera(player, k, fixedCameraPosition, backGround);

    if (
      player.isGrounded() &&
      player.sprite !== "frog-run" &&
      player.sprite !== "frog-back"
    ) {
      resetPlayerSprite(k, player, playerSprite, "frog-idle", jumpTrails);
      blueDino.moveDino(1, blockWidth);
    }
  });

  k.onKeyRelease("d", () => {
    resetPlayerSprite(k, player, playerSprite, "frog-idle", jumpTrails);
  });
  k.onKeyRelease("a", () =>
    resetPlayerSprite(k, player, playerSprite, "frog-idle", jumpTrails)
  );

  k.onKeyPress("w", () =>
    handleJump(k, player, JUMP, jumpTrails, playerSprite)
  );
}
