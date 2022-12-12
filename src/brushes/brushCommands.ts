/*
Want to implement a pattern where you can build up a list of commands
These commands make up the stroke of the brush

Each command should also have a cursor which will be the XY position.

Each cursor will have a parent that it is offset from

*/
import { Ctx } from "../ctx";
type Command = { execute: () => void };

interface Commander {
  ctx: Ctx;
  commands: (Command | Commander)[];
  line(width: number, height: number): Commander;
  newCursor(c: Commander): Commander;
  execute(): void;
}

const lineCommand = (ctx: Ctx, width: number, height: number) => {
  return {
    execute: () => {
      const c = ctx.canvasContext;
      const alpha = 0.1;
      c.fillStyle = `rgb(0,0,0,${alpha})`;
      const x = Math.round(ctx.mouseX);
      const y = Math.round(ctx.mouseY);
      // const h = ctx.pressure * 100;
      const h = height;
      const hOffset = h / 2;
      c.beginPath();
      c.fillRect(x - width / 2, y - hOffset, width / 2, h);
      c.closePath();
    },
  };
};

export const cursor: (
  ctx: Ctx,
  offsetX?: number,
  offsetY?: number
) => Commander = (ctx, offsetX = 0, offsetY = 0) => {
  return {
    ctx: { ...ctx, mouseX: ctx.mouseX + offsetX, mouseY: ctx.mouseY - offsetY },
    commands: [],
    line(width: number, height: number) {
      this.commands.push(lineCommand(this.ctx, width, height));
      return this;
    },
    newCursor(c: Commander) {
      this.commands.push(c);
      return this;
    },
    execute() {
      this.commands.forEach((c) => c.execute());
    },
  };
};
