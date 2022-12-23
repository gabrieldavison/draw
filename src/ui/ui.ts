import { Ctx } from "../ctx";
import { EventBus } from "../eventBus";
import { cursor as c } from "../brushes/brushCommands.js";
import { saveCanvas, clearCanvas } from "../ctx.js";

export const initUI = (eventBus: EventBus) => {
  const button1 = document.getElementById("button1");
  const button2 = document.getElementById("button2");
  const button3 = document.getElementById("button3");
  const button4 = document.getElementById("button4");
  const buttonEval = document.getElementById("buttonEval");
  const buttonSave = document.getElementById("buttonSave");
  const buttonClear = document.getElementById("buttonClear");
  const editor = document.getElementById("editor") as HTMLTextAreaElement;

  const editorState = ["", "", "", ""];
  let currentEditorIndex = 0;
  const switchEditorState = (bank: number) => {
    editorState[currentEditorIndex] = editor.value;
    editor.value = editorState[bank];
    currentEditorIndex = bank;
    console.log(editorState);
  };

  const loadBrush = () => {
    // Need to define cursor here for dynamic evaluation to work
    const cursor = c;
    const editorState = editor.value;
    eventBus.clearEvent("draw");
    eventBus.subscribe("draw", (ctx) => {
      try {
        const brush = eval(editorState);
        if (ctx.drawing) {
          brush.execute();
        }
      } catch {
        console.log("bad code!!!!");
      }
    });
  };

  button1?.addEventListener("click", () => switchEditorState(0));
  button2?.addEventListener("click", () => switchEditorState(1));
  button3?.addEventListener("click", () => switchEditorState(2));
  button4?.addEventListener("click", () => switchEditorState(3));

  buttonEval?.addEventListener("click", loadBrush);
  buttonSave?.addEventListener("click", saveCanvas);
  buttonClear?.addEventListener("click", clearCanvas);
};
