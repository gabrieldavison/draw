export const onKeyDown = (ctx) => {
    const callbacks = {
    // i: () =>
    //   document.getElementById("image-container")?.classList.toggle("hide"),
    // a: () => console.log("hello"),
    // s: () => saveCanvas(),
    };
    const callback = callbacks[ctx.keyDown];
    if (callback !== undefined)
        callback();
};
