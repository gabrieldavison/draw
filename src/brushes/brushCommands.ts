/*
Want to implement a pattern where you can build up a list of commands
These commands make up the stroke of the brush

Each command should also have a cursor which will be the XY position.

Each cursor will have a parent that it is offset from

*/
import { Ctx } from "../ctx";
type Command = { execute: () => void };

const rectCommand = (
  ctx: Ctx,
  width: number,
  height: number,
  alpha: number = 1,
  rotation: number = 0
) => {
  return {
    execute: () => {
      const c = ctx.canvasContext;
      // const alpha = 0.1;
      c.fillStyle = `rgb(0,0,0,${alpha})`;
      // const x = Math.round(ctx.mouseX);
      // const y = Math.round(ctx.mouseY);
      c.translate(Math.round(ctx.mouseX), Math.round(ctx.mouseY));
      c.rotate((rotation * Math.PI) / 180);
      c.beginPath();
      c.fillRect(0 - width / 2, 0 - height / 2, width, height);
      c.closePath();
      c.resetTransform();
    },
  };
};

class Cursor {
  ctx: Ctx;
  commands: Command[];
  rotation: number;
  constructor(
    ctx: Ctx,
    offsetX: number = 0,
    offsetY: number = 0,
    rotation: number = 0
  ) {
    this.ctx = {
      ...ctx,
      mouseX: ctx.mouseX + offsetX,
      mouseY: ctx.mouseY - offsetY,
    };
    this.commands = [];
    this.rotation = rotation;
  }
  rect(width: number, height: number, alpha: number = 1, rotation: number = 0) {
    this.commands.push(rectCommand(this.ctx, width, height, alpha, rotation));
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
    const cnv = this.ctx.canvasContext;
    this.commands.forEach((c) => {
      c.execute();
    });
  }
}

export const cursor = (ctx: Ctx, offsetX?: number, offsetY?: number) =>
  new Cursor(ctx, offsetX, offsetY);
