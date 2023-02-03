import { Ctx } from "./ctx";
import { clearScratchCanvas } from "./ctx.js";
export const onKeyDown = (ctx: Ctx) => {
  const callbacks: { [index: string]: () => any } = {
    // i: () =>
    //   document.getElementById("image-container")?.classList.toggle("hide"),
    // a: () => console.log("hello"),
    // s: () => saveCanvas(),
    Escape: () => {
      document.getElementById("ui")?.classList.toggle("hide");
      document.getElementById("buttonShow")?.classList.toggle("hide");
      document.getElementById("buttonHide")?.classList.toggle("hide");
    },
  };
  const callback = callbacks[ctx.keyDown];
  if (callback !== undefined) callback();
};

export const onKeyUp = (ctx: Ctx) => {
  const callbacks: { [index: string]: () => any } = {
    " ": clearScratchCanvas,
  };
  const callback = callbacks[ctx.keyUp];
  if (callback !== undefined) callback();
};
