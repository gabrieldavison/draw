import { Ctx, setContext } from "../ctx.js";
import { cursor } from "./brushCommands.js";
export const start = () => {};

let pressure = 1;
export const init = (ctx: Ctx) => {
  setContext({ brushX: 0.5, brushY: 0.5 });
};

export const draw = (ctx: Ctx) => {
  const b = cursor(ctx)
    .line(-50, 100)
    .newCursor(cursor(ctx, -50, -50).line(10, 20))
    .newCursor(cursor(ctx, 50, -50).line(10, 200));
  if (ctx.drawing) {
    b.execute();
  }
};
export const setPressure = (ctx: Ctx) => {
  pressure = ctx.pressure;
};
export const stop = () => {};
