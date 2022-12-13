import { saveCanvas } from "./ctx.js";
export const onKeyDown = (ctx) => {
    const callbacks = {
        i: () => { var _a; return (_a = document.getElementById("image-container")) === null || _a === void 0 ? void 0 : _a.classList.toggle("hide"); },
        a: () => console.log("hello"),
        s: () => saveCanvas(),
    };
    const callback = callbacks[ctx.keyDown];
    if (callback !== undefined)
        callback();
};
