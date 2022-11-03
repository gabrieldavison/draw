import { Ctx } from "./types/ctx";

export const start = () => {
  console.log("brush start");
};

export const draw = (ctx: Ctx) => {
  if (ctx.drawing) {
    const brushWidth = 10;
    const offset = brushWidth / 2;
    const c = ctx.canvasContext;
    c.fillRect(
      ctx.mouseX - offset,
      ctx.mouseY - offset,
      brushWidth,
      brushWidth
    );
  }
};

export const stop = () => {
  console.log("brush stop");
};
