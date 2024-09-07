import kaplay from "kaplay";
import "kaplay/global";

export const k = kaplay({
  debug: true,
  scale: 2.5,
  background: [120, 183, 208],
  width: window.innerWidth,
  height: window.innerHeight,
  letterbox: true,
});

k.loadSprite("frog-idle", "./sprites/frog-idle.png", {
  sliceX: 11,
  sliceY: 1,
  anims: {
    base: { from: 0, to: 10, loop: true },
  },
});

k.loadSprite("frog-run", "./sprites/frog-run.png", {
  sliceX: 12,
  sliceY: 1,
  anims: {
    base: { from: 0, to: 11, loop: true },
  },
});

k.loadSprite("frog-back", "./sprites/frog-back.png", {
  sliceX: 12,
  sliceY: 1,
  anims: {
    base: { from: 0, to: 11, loop: true },
  },
});

k.loadSprite("frog-jump", "./sprites/frog-jump.png", {
  sliceX: 1,
  sliceY: 1,
  anims: {
    base: { from: 0, to: 0, loop: true },
  },
});

k.loadSprite("block", "./sprites/block.png", {
  sliceX: 1,
  sliceY: 1,
});

k.loadSprite("dirt", "./sprites/dirt.png", {
  sliceX: 1,
  sliceY: 1,
});

k.loadSprite("green-dino", "./sprites/green-dino.png", {
  sliceX: 24,
  sliceY: 1,
  anims: {
    idle: { from: 4, to: 9, loop: true },
  },
});

k.loadSprite("blue-dino", "./sprites/blue-dino.png", {
  sliceX: 24,
  sliceY: 1,
  anims: {
    idle: { from: 0, to: 3, loop: true },
    run: { from: 4, to: 9, loop: true },
  },
});

k.loadSprite("green-dino-back", "./sprites/green-dino-back.png", {
  sliceX: 24,
  sliceY: 1,
  anims: {
    idle: { from: 23, to: 13, loop: true },
  },
});

k.loadSprite("background", "./sprites/BG1.png");

k.loadSprite("brick", "./sprites/brick.png");

k.loadSprite("tree", "./sprites/tree.png");
