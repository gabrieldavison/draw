import * as canvas from "./canvas.js";
import * as eventBus from "./eventBus.js";
import * as brush from "./brush.js";
import { Ctx } from "./types/ctx";

const cnv = document.getElementById("drawing-canvas") as HTMLCanvasElement;
const canvasContext = cnv.getContext("2d") as CanvasRenderingContext2D;
canvasContext.canvas.width = window.innerWidth;
canvasContext.canvas.height = window.innerHeight;

// brush subscriptions
eventBus.subscribe("draw", brush.draw);
eventBus.subscribe("down", brush.start);
eventBus.subscribe("up", brush.stop);

// mouse state
let drawing = false;
let mouseX = 0;
let mouseY = 0;
document.addEventListener("mousedown", () => {
  eventBus.publish("down");
  drawing = true;
});
document.addEventListener("mouseup", () => {
  eventBus.publish("up");
  drawing = false;
});
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// drawing loop
let frameCount = 0;
const drawLoop = () => {
  const ctx: Ctx = { frameCount, drawing, mouseX, mouseY, canvasContext };
  eventBus.publish("draw", ctx);
  frameCount += 1;
  requestAnimationFrame(drawLoop);
};

requestAnimationFrame(drawLoop);
