const rectCommand = (ctx, width, height, alpha = 1, rotation = 0) => {
    return {
        execute: () => {
            const c = ctx.canvasContext;
            // const alpha = 0.1;
            c.fillStyle = `rgb(0,0,0,${alpha})`;
            // const x = Math.round(ctx.mouseX);
            // const y = Math.round(ctx.mouseY);
            c.translate(Math.round(ctx.mouseX), Math.round(ctx.mouseY));
            c.rotate((rotation * Math.PI) / 180);
            c.beginPath();
            c.fillRect(0 - width / 2, 0 - height / 2, width, height);
            c.closePath();
            c.resetTransform();
        },
    };
};
class Cursor {
    constructor(ctx, offsetX = 0, offsetY = 0, rotation = 0) {
        this.ctx = {
            ...ctx,
            mouseX: ctx.mouseX + offsetX,
            mouseY: ctx.mouseY - offsetY,
        };
        this.commands = [];
        this.rotation = rotation;
    }
    rect(width, height, alpha = 1, rotation = 0) {
        this.commands.push(rectCommand(this.ctx, width, height, alpha, rotation));
        return this;
    }
    rotate(amount) {
        this.rotation = amount;
        return this;
    }
    newCursor(c) {
        if (Array.isArray(c)) {
            this.commands.push(...c);
        }
        else {
            this.commands.push(c);
        }
        return this;
    }
    execute() {
        this.commands.forEach((c) => {
            c.execute();
        });
    }
}
export const cursor = (ctx, offsetX, offsetY) => new Cursor(ctx, offsetX, offsetY);
