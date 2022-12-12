import { saveCanvas } from "./ctx.js";
export const onKeyDown = (ctx) => {
    const callbacks = {
        a: () => console.log("hello"),
        s: () => saveCanvas(),
    };
    const callback = callbacks[ctx.keyDown];
    if (callback !== undefined)
        callback();
};
