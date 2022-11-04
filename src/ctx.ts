export interface Ctx {
  frameCount: number;
  drawing: boolean;
  mouseX: number;
  mouseY: number;
  canvasContext: CanvasRenderingContext2D;
  keyDown: string;
  keyUp: string;
  keyHeld: { [index: string]: boolean };
}

interface CtxUpdate {
  frameCount?: number;
  drawing?: boolean;
  mouseX?: number;
  mouseY?: number;
  canvasContext?: CanvasRenderingContext2D;
  keyDown?: string;
  keyUp?: string;
  keyHeld?: { [index: string]: boolean };
}
const cnv = document.getElementById("drawing-canvas") as HTMLCanvasElement;

const store: Ctx = {
  canvasContext: cnv.getContext("2d") as CanvasRenderingContext2D,
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

export const setContext = (ctx: CtxUpdate) => {
  Object.assign(store, ctx);
};
