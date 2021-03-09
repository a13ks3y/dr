const ctx = document.getElementById('ctx').getContext('2d');
const MDT = 10;
let lastTick = Date.now();
/*
    "Main"
 */
requestAnimationFrame(function loop() {
    const dt = Date.now() - lastTick;
    const dtt = dt * 1000 / 60;
    if (dt > MDT) {
        logic(dt, dtt)
        render(dt, dtt);
        lastTick = Date.now();
    }
    requestAnimationFrame(loop);
});
/*
   End Main
* */

let player = {
    x: 'center',
    y: 'bottom'
}
function logic(dt, dtt) {
}
function render(dt, dtt) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0, ctx.canvas.width, ctx.canvas.height);
}

function magic(anything) {
    switch (typeof anything) {
        case "undefined":
            break;
        case "object":
            break;
        case "boolean":
            break;
        case 'string':
                anything.replace('h-center', ctx.canvas.width / 2);
                anything.replace('w-center', ctx.canvas.height / 2);
                anything.replace('height', ctx.canvas.width);
                anything.replace('width', ctx.canvas.height);
                return Number(anything);
            break;
        case "function":
            break;
        case "symbol":
            break;
        case "bigint":
            break;
        case 'number': return anything;
        default:
            break;
    }
}