import { cursor as c } from "../brushes/brushCommands.js";
import { saveCanvas } from "../ctx.js";
export const initUI = (eventBus) => {
    const button1 = document.getElementById("button1");
    const button2 = document.getElementById("button2");
    const button3 = document.getElementById("button3");
    const button4 = document.getElementById("button4");
    const buttonEval = document.getElementById("buttonEval");
    const buttonSave = document.getElementById("buttonSave");
    const buttonClear = document.getElementById("buttonClear");
    const editor = document.getElementById("editor");
    const editorState = ["", "", "", ""];
    let currentEditorIndex = 0;
    const switchEditorState = (bank) => {
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
            }
            catch {
                console.log("bad code!!!!");
            }
        });
    };
    button1 === null || button1 === void 0 ? void 0 : button1.addEventListener("click", () => switchEditorState(0));
    button2 === null || button2 === void 0 ? void 0 : button2.addEventListener("click", () => switchEditorState(1));
    button3 === null || button3 === void 0 ? void 0 : button3.addEventListener("click", () => switchEditorState(2));
    button4 === null || button4 === void 0 ? void 0 : button4.addEventListener("click", () => switchEditorState(3));
    buttonEval === null || buttonEval === void 0 ? void 0 : buttonEval.addEventListener("click", loadBrush);
    buttonSave === null || buttonSave === void 0 ? void 0 : buttonSave.addEventListener("click", saveCanvas);
};
