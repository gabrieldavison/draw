const cnv = document.getElementById("drawing-canvas");
const store = {
    canvasContext: cnv.getContext("2d"),
    drawing: false,
    mouseX: 0,
    mouseY: 0,
    keyHeld: {},
    keyDown: "",
    keyUp: "",
    frameCount: 0,
};
export const getContext = () => {
    return store;
};
export const setContext = (ctx) => {
    Object.assign(store, ctx);
};
