import { randInCircle } from "../util.js";
const brushWidth = 10;
const offset = brushWidth / 2;
const size = 3;
export const start = () => { };
// solid black
// export const draw = (ctx: Ctx) => {
//   if (ctx.drawing) {
//     const c = ctx.canvasContext;
//     c.fillRect(
//       ctx.mouseX - offset,
//       ctx.mouseY - offset,
//       brushWidth,
//       brushWidth
//     );
//   }
// };
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
// spray can
export const draw = (ctx) => {
    if (ctx.drawing) {
        const c = ctx.canvasContext;
        for (let i = 0; i < 10; i++) {
            const { x, y } = randInCircle(size);
            c.fillRect(ctx.mouseX + x, ctx.mouseY + y, 0.2, 0.2);
        }
        //   for (let i = 0; i < 10; i++) {
        //     const x = randBetween(-size, size);
        //     const y = randBetween(-size, size);
        //     c.fillRect(ctx.mouseX + x, ctx.mouseY + y - 200, 2, 2);
        //   }
    }
};
export const stop = () => { };
