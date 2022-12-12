const lineCommand = (ctx, width, height) => {
    return {
        execute: () => {
            const c = ctx.canvasContext;
            const alpha = 0.1;
            c.fillStyle = `rgb(0,0,0,${alpha})`;
            const x = Math.round(ctx.mouseX);
            const y = Math.round(ctx.mouseY);
            // const h = ctx.pressure * 100;
            const h = height;
            const hOffset = h / 2;
            c.beginPath();
            c.fillRect(x - width / 2, y - hOffset, width / 2, h);
            c.closePath();
        },
    };
};
export const cursor = (ctx, offsetX = 0, offsetY = 0) => {
    return {
        ctx: { ...ctx, mouseX: ctx.mouseX + offsetX, mouseY: ctx.mouseY - offsetY },
        commands: [],
        line(width, height) {
            this.commands.push(lineCommand(this.ctx, width, height));
            return this;
        },
        newCursor(c) {
            this.commands.push(c);
            return this;
        },
        execute() {
            this.commands.forEach((c) => c.execute());
        },
    };
};
