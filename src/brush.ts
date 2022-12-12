import { Ctx } from "./ctx.js";
import { EventBus } from "./eventBus";

interface Brush {
  start: (ctx: Ctx) => void;
  draw: (ctx: Ctx) => void;
  stop: (ctx: Ctx) => void;
  setPressure: (ctx: Ctx) => void;
}

export const loadBrush = (eventBus: EventBus, brush: Brush) => {
  eventBus.subscribe("draw", brush.draw);
  eventBus.subscribe("down", brush.start);
  eventBus.subscribe("up", brush.stop);
  eventBus.subscribe("pressure", brush.setPressure);
};
