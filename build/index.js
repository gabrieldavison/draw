import * as eventBus from "./eventBus.js";
import * as buildBrush from "./brushes/buildBrush.js";
import { getContext, setContext } from "./ctx.js";
import { loadBrush } from "./brush.js";
import { onKeyDown } from "./keyboard.js";
import { initUI } from "./ui/ui.js";
// event listeners
document.addEventListener("mousedown", () => {
    eventBus.publish("down");
    setContext({ drawing: true });
});
document.addEventListener("mouseup", () => {
    eventBus.publish("up");
    setContext({ drawing: false });
});
document.addEventListener("pointermove", (e) => {
    const ctx = getContext();
    setContext({
        mouseX: e.clientX - ctx.canvas.offsetLeft,
        mouseY: e.clientY - ctx.canvas.offsetTop,
        pressure: e.pressure,
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
loadBrush(eventBus, buildBrush); // Subscribes brush
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
initUI(eventBus);
