export const onKeyDown = (ctx) => {
    const callbacks = {
        "1": () => console.log("key one pressed"),
        "2": () => console.log("key two pressed"),
        "3": () => console.log("key three pressed"),
    };
    const callback = callbacks[ctx.keyDown];
    if (callback !== undefined)
        callback();
};
