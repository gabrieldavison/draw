import { Ctx, setContext } from "../ctx.js";
import { cursor } from "./brushCommands.js";
import { randBetween } from "../util.js";
export const start = () => {};

let pressure = 1;
export const init = (ctx: Ctx) => {
  setContext({ brushX: 0.5, brushY: 0.5 });
};

export const draw = (ctx: Ctx) => {
  // const a = Array(3)
  //   .fill(null)
  //   .map((v, i) => {
  //     return cursor(ctx).rect(
  //       0.5,
  //       Math.random() > 0.9 ? randBetween(0, 300) : randBetween(0, 30),
  //       0.7,
  //       randBetween(0, 365)
  //     );
  //   });

  // const b = cursor(ctx).newCursor(a);
  const b = cursor(ctx).rect(20, 20);

  if (ctx.drawing) {
    b.execute();
  }
};
export const setPressure = (ctx: Ctx) => {
  pressure = ctx.pressure;
};
export const stop = () => {};
