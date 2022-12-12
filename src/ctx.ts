export interface Ctx {
  canvas: HTMLCanvasElement;
  frameCount: number;
  drawing: boolean;
  mouseX: number;
  mouseY: number;
  canvasContext: CanvasRenderingContext2D;
  keyDown: string;
  keyUp: string;
  keyHeld: { [index: string]: boolean };
  brushX: number;
  brushY: number;
  pressure: number;
}

interface CtxUpdate {
  canvas?: HTMLCanvasElement;
  frameCount?: number;
  drawing?: boolean;
  mouseX?: number;
  mouseY?: number;
  canvasContext?: CanvasRenderingContext2D;
  keyDown?: string;
  keyUp?: string;
  keyHeld?: { [index: string]: boolean };
  brushX?: number;
  brushY?: number;
  pressure?: number;
}
const canvas = document.getElementById("drawing-canvas") as HTMLCanvasElement;
const canvasContext = canvas.getContext("2d") as CanvasRenderingContext2D;
canvasContext.canvas.width = window.innerWidth;
canvasContext.canvas.height = window.innerHeight;
canvasContext.fillStyle = "white";
canvasContext.fillRect(0, 0, canvas.width, canvas.height);

const store: Ctx = {
  canvas,
  canvasContext,
  drawing: false,
  mouseX: 0,
  mouseY: 0,
  keyHeld: {},
  keyDown: "",
  keyUp: "",
  frameCount: 0,
  brushX: 0,
  brushY: 0,
  pressure: 1,
};

export const getContext = () => {
  return store;
};

export const setContext = (ctx: CtxUpdate) => {
  Object.assign(store, ctx);
};

export const saveCanvas = () => {
  console.log("save!!");
  const link = document.createElement("a");
  link.setAttribute("download", ".png");
  const date = new Date();
  const ctx = getContext();
  link.setAttribute(
    "href",
    ctx.canvas.toDataURL(`png`).replace("image/png", "image/octet-stream")
  );
  link.setAttribute(
    "download",
    `${date.toLocaleDateString()}-${date.toLocaleTimeString()}.png`
  );
  link.click();
};
