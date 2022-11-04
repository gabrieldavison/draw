import * as eventBus from "./eventBus.js";
import * as sprayBrush from "./brushes/sprayBrush.js";
import { getContext, setContext } from "./ctx.js";
import { loadBrush } from "./brush.js";
import { onKeyDown } from "./keyboard.js";
const cnv = document.getElementById("drawing-canvas");
const canvasContext = cnv.getContext("2d");
canvasContext.canvas.width = window.innerWidth;
canvasContext.canvas.height = window.innerHeight;
// event listeners
document.addEventListener("mousedown", () => {
    eventBus.publish("down");
    setContext({ drawing: true });
});
document.addEventListener("mouseup", () => {
    eventBus.publish("up");
    setContext({ drawing: false });
});
document.addEventListener("mousemove", (e) => {
    setContext({
        mouseX: e.clientX - cnv.offsetLeft,
        mouseY: e.clientY - cnv.offsetTop,
    });
});
document.addEventListener("keydown", (e) => {
    const keyHeld = getContext().keyHeld;
    keyHeld[e.key] = true;
    setContext({ keyDown: e.key, keyHeld });
    eventBus.publish("keyup", getContext());
});
document.addEventListener("keyup", (e) => {
    const keyHeld = getContext().keyHeld;
    keyHeld[e.key] = false;
    setContext({ keyUp: e.key, keyHeld });
    eventBus.publish("keydown", getContext());
});
loadBrush(eventBus, sprayBrush); // Subscribes brush
eventBus.subscribe("keydown", onKeyDown);
// drawing loop
let frameCount = 0;
const drawLoop = () => {
    eventBus.publish("draw", getContext());
    frameCount += 1;
    setContext({ frameCount: getContext().frameCount + 1 });
    requestAnimationFrame(drawLoop);
};
requestAnimationFrame(drawLoop);
