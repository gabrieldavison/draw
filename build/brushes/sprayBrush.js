const brushWidth = 1;
const brushHeight = 10;
const offsetW = brushWidth / 2;
const offsetH = brushHeight / 2;
const size = 3;
let pressure = 1;
export const start = () => { };
// solid black
export const draw = (ctx) => {
    if (ctx.drawing) {
        const c = ctx.canvasContext;
        const alpha = 0.1;
        c.fillStyle = `rgb(0,0,0,${alpha})`;
        const x = Math.round(ctx.mouseX);
        const y = Math.round(ctx.mouseY);
        const h = ctx.pressure * 100;
        const hOffset = h / 2;
        c.beginPath();
        c.fillRect(x - offsetW, y - hOffset, brushWidth, h);
        c.closePath();
    }
};
export const setPressure = (ctx) => {
    pressure = ctx.pressure;
};
// spray can
// export const draw = (ctx: Ctx) => {
//   if (ctx.drawing) {
//     const c = ctx.canvasContext;
//     for (let i = 0; i < 10; i++) {
//       const x = randBetween(-size, size);
//       const y = randBetween(-size, size);
//       c.fillRect(ctx.mouseX + x, ctx.mouseY + y, 1, 1);
//     }
//     for (let i = 0; i < 10; i++) {
//       const x = randBetween(-size, size);
//       const y = randBetween(-size, size);
//       c.fillRect(ctx.mouseX + x, ctx.mouseY + y - 200, 2, 2);
//     }
//   }
// };
// // spray can
// export const draw = (ctx: Ctx) => {
//   if (ctx.drawing) {
//     const c = ctx.canvasContext;
//     for (let i = 0; i < 10; i++) {
//       const { x, y } = randInCircle(size);
//       c.fillStyle = "black";
//       c.fillRect(ctx.mouseX + x, ctx.mouseY + y, 0.2, 0.2);
//     }
//     //   for (let i = 0; i < 10; i++) {
//     //     const x = randBetween(-size, size);
//     //     const y = randBetween(-size, size);
//     //     c.fillRect(ctx.mouseX + x, ctx.mouseY + y - 200, 2, 2);
//     //   }
//   }
// };
export const stop = () => { };
