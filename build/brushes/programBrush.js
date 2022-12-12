export const start = () => { };
// solid black
export const draw = (ctx) => {
    const brushWidth = 10;
    const offset = brushWidth / 2;
    if (ctx.drawing) {
        const c = ctx.canvasContext;
        c.fillStyle = "black";
        c.fillRect(ctx.mouseX - offset, ctx.mouseY - offset, brushWidth, brushWidth);
    }
};
export const stop = () => { };
