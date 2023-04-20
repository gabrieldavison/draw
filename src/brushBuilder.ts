/*
I want to implement a pattern where you can build up a list of commands
These commands make up the stroke of the brush

Each command should also have a cursor which will be the XY position.

Each cursor will have a parent that it is offset from

*/
import { Ctx } from "./ctx";
type Command = { execute: () => void };

const getCurrentCanvas = (ctx: Ctx) =>
  ctx.keyHeld[" "] === true ? ctx.scratchCanvasContext : ctx.canvasContext;

const rectCommand = (
  ctx: Ctx,
  width: number,
  height: number,
  alpha: number = 1
) => {
  return {
    execute: () => {
      const c = getCurrentCanvas(ctx);
      c.fillStyle = `rgb(0,0,0,${alpha})`;
      c.beginPath();
      c.fillRect(0 - width / 2, 0 - height / 2, width, height);
      c.closePath();
    },
  };
};

class Cursor {
  ctx: Ctx;
  commands: Command[];
  rotation: number;
  isChild: boolean;
  offsetX: number;
  offsetY: number;
  constructor(
    ctx: Ctx,
    offsetX: number = 0,
    offsetY: number = 0,
    rotation: number = 0
  ) {
    this.ctx = {
      ...ctx,
    };
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.commands = [];
    this.rotation = rotation;
    this.isChild = false;
  }
  rect(width: number, height: number, alpha: number = 1, rotation: number = 0) {
    this.commands.push(rectCommand(this.ctx, width, height, alpha));
    return this;
  }
  rotate(amount: number) {
    this.rotation = amount;
    return this;
  }
  newCursor(c: Cursor | Cursor[]) {
    if (Array.isArray(c)) {
      this.commands.push(...c);
    } else {
      this.commands.push(c);
    }
    return this;
  }
  execute() {
    this.ctx.canvasContext.save();
    if (this.isChild) {
      this.ctx.canvasContext.translate(this.offsetX, this.offsetY);
    } else {
      this.ctx.canvasContext.translate(
        this.ctx.mouseX + this.offsetX,
        this.ctx.mouseY + this.offsetY
      );
    }
    this.ctx.canvasContext.rotate(this.rotation);
    this.commands.forEach((c) => {
      c.execute();
    });
    this.ctx.canvasContext.restore();
  }
}

class ChildCursor extends Cursor {
  constructor(
    ctx: Ctx,
    offsetX: number = 0,
    offsetY: number = 0,
    rotation: number = 0
  ) {
    super(ctx, offsetX, offsetY, rotation);
    this.isChild = true;
  }
}

export const cursor = (ctx: Ctx, offsetX?: number, offsetY?: number) =>
  new Cursor(ctx, offsetX, offsetY);

export const childCursor = (ctx: Ctx, offsetX?: number, offsetY?: number) =>
  new ChildCursor(ctx, offsetX, offsetY);
