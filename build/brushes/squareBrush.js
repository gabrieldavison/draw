import { setContext } from "../ctx.js";
export const start = () => { };
export const init = (ctx) => {
    setContext({ brushX: 0.5, brushY: 0.5 });
};
export const draw = (ctx) => {
    const brushHeight = 30 * ctx.brushY;
    const brushWidth = 30 * ctx.brushY;
    const offset = brushWidth / 2;
    const x = Math.round(ctx.mouseX);
    const y = Math.round(ctx.mouseY);
    if (ctx.drawing) {
        const c = ctx.canvasContext;
        c.fillStyle = "black";
        c.fillRect(x - offset, y - offset, brushWidth, brushWidth);
    }
};
export const stop = () => { };
