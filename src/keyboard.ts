import { saveCanvas } from "./ctx.js";
import { Ctx } from "./ctx";
export const onKeyDown = (ctx: Ctx) => {
  const callbacks: { [index: string]: () => any } = {
    i: () =>
      document.getElementById("image-container")?.classList.toggle("hide"),
    a: () => console.log("hello"),
    s: () => saveCanvas(),
  };
  const callback = callbacks[ctx.keyDown];
  if (callback !== undefined) callback();
};
