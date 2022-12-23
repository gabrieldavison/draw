export const onKeyDown = (ctx) => {
    const callbacks = {
        // i: () =>
        //   document.getElementById("image-container")?.classList.toggle("hide"),
        // a: () => console.log("hello"),
        // s: () => saveCanvas(),
        Escape: () => { var _a; return (_a = document.getElementById("ui")) === null || _a === void 0 ? void 0 : _a.classList.toggle("hide"); },
    };
    const callback = callbacks[ctx.keyDown];
    if (callback !== undefined)
        callback();
};
