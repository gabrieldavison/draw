import { setContext } from "../ctx.js";
import { cursor } from "./brushCommands.js";
export const start = () => { };
let pressure = 1;
export const init = (ctx) => {
    setContext({ brushX: 0.5, brushY: 0.5 });
};
export const draw = (ctx) => {
    const b = cursor(ctx)
        .line(-50, 100)
        .newCursor(cursor(ctx, -50, -50).line(10, 20))
        .newCursor(cursor(ctx, 50, -50).line(10, 200));
    if (ctx.drawing) {
        b.execute();
    }
};
export const setPressure = (ctx) => {
    pressure = ctx.pressure;
};
export const stop = () => { };
