import { Ctx } from "../ctx";
import { EventBus } from "../eventBus";
import { cursor as c } from "../brushes/brushCommands.js";
import { saveCanvas, clearCanvas } from "../ctx.js";

export const initUI = (eventBus: EventBus) => {
  const buttonHide = document.getElementById("buttonHide");
  const buttonShow = document.getElementById("buttonShow");
  const button1 = document.getElementById("button1");
  const button2 = document.getElementById("button2");
  const button3 = document.getElementById("button3");
  const button4 = document.getElementById("button4");
  const buttonEval = document.getElementById("buttonEval");
  const buttonSave = document.getElementById("buttonSave");
  const buttonClear = document.getElementById("buttonClear");
  const editor = document.getElementById("editor") as HTMLTextAreaElement;
  const message = document.getElementById("message") as HTMLDivElement;

  const editorState = JSON.parse(
    localStorage.getItem("editorState") ?? '["", "", "", ""]'
  );
  let currentEditorIndex = 0;
  editor.value = editorState[currentEditorIndex];

  const saveState = () => {
    editorState[currentEditorIndex] = editor.value;
    localStorage.setItem("editorState", JSON.stringify(editorState));
  };

  const switchEditorState = (bank: number) => {
    // saveState();
    editor.value = editorState[bank];
    currentEditorIndex = bank;
  };

  const setMessage = (v: string) => {
    message.innerText = v;
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
        setMessage(".");
      } catch {
        setMessage("unable to evaluate code");
      }
    });
  };

  editor.addEventListener("input", (e) => {
    saveState();
  });

  // This is a hack to get tab to insert a character instead of changing focus
  editor.addEventListener("keydown", (e) => {
    if (e.key == "Tab") {
      e.preventDefault();
      var start = editor.selectionStart;
      var end = editor.selectionEnd;

      // set textarea value to: text before caret + tab + text after caret
      editor.value =
        editor.value.substring(0, start) + "\t" + editor.value.substring(end);

      // put caret at right position again
      editor.selectionStart = editor.selectionEnd = start + 1;
    }
  });
  const toggleHideShow = () => {
    document.getElementById("ui")?.classList.toggle("hide");
    buttonHide?.classList.toggle("hide");
    buttonShow?.classList.toggle("hide");
  };

  buttonHide?.addEventListener("click", toggleHideShow);
  buttonShow?.addEventListener("click", toggleHideShow);

  button1?.addEventListener("click", () => switchEditorState(0));
  button2?.addEventListener("click", () => switchEditorState(1));
  button3?.addEventListener("click", () => switchEditorState(2));
  button4?.addEventListener("click", () => switchEditorState(3));

  buttonEval?.addEventListener("click", loadBrush);
  buttonSave?.addEventListener("click", saveCanvas);
  buttonClear?.addEventListener("click", clearCanvas);
};
