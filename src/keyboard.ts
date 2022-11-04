import { Ctx } from "./ctx";
export const onKeyDown = (ctx: Ctx) => {
  const callbacks: { [index: string]: () => any } = {
    "1": () => console.log("key one pressed"),
    "2": () => console.log("key two pressed"),
    "3": () => console.log("key three pressed"),
  };
  const callback = callbacks[ctx.keyDown];
  if (callback !== undefined) callback();
};
