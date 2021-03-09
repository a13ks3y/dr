const BRICK_HEIGHT = 50;
const BRICK_WIDTH = 12;
const ctx = document.getElementById('ctx').getContext('2d');
const MDT = 10;
let lastTick = Date.now();
/*
    Main Loop
 */
requestAnimationFrame(function loop() {
    const dt = Date.now() - lastTick;
    const dtt = dt / 1000 * 60;
    if (dt > MDT) {
        logic(dt, dtt)
        render(dt, dtt);
        lastTick = Date.now();
    }
    requestAnimationFrame(loop);
});
/*
   End Main Loop
* */

let player = {
    vx: 0, vy: 8,
    x: 'h-center',
    y: 'height',
    w: 27,
    h: 96,
    trace: [
        // @todo: transparent trace of player moving same path but with delay....
    ]
}
let roadside = {
    bricks: [
        'height - 32',
        'height - 132',
        'height - 232',
        'height - 332',
        'height - 432',
        'height - 532',
        'height - 632',
        'height - 732',
        'height - 832',
        'height - 932',
    ],
    markings: [
        'height',
        'height - 100',
        'height - 200',
        'height - 300',
        'height - 400',
        'height - 500',
        'height - 600',
        'height - 700',
        'height - 900',
    ]
}
init();

function init() {
    // @todo: path whole player object to magic function
    player.x = magic(player.x);
    player.y = magic(player.y);
    roadside.bricks = roadside.bricks.map(magic);
    roadside.markings = roadside.markings.map(magic);
    const DTP = 16;
    document.body.addEventListener('keydown', function(e) {
        switch (e.key) {
            case 'ArrowLeft': player.vx = player.vx > -DTP ? player.vx - DTP / 6 : -DTP; break;
            case 'ArrowRight': player.vx = player.vx < DTP ? player.vx + DTP / 6 : DTP; break;
            //case 'ArrowRight': player.vx = +DTP; break;
        }
    });
    document.body.addEventListener('keyup', function(e) {
        switch (e.key) {
            case 'ArrowLeft': case 'ArrowRight': player.vx = 0; break;
        }

    });
}

function logic(dt, dtt) {
    roadside.bricks = roadside.bricks.map(brick => brick < magic('height') ? brick + player.vy * dtt : -magic('height'));
    roadside.markings = roadside.markings.map(mark => mark < magic('height') ? mark + player.vy * dtt : -magic('height'));
    player.x += player.vx * dtt;
}
function render(dt, dtt) {
    ctx.fillStyle = 'rgba(0,0,0,0.5)' //'black';
    ctx.fillRect(0,0, ctx.canvas.width, ctx.canvas.height);

    roadside.bricks.forEach(brick => {
        ctx.fillStyle = '#666';
        ctx.fillRect(ctx.canvas.height, brick, BRICK_WIDTH, BRICK_HEIGHT);
        ctx.fillRect(ctx.canvas.width - ctx.canvas.height, brick - BRICK_HEIGHT / 2, BRICK_WIDTH, BRICK_HEIGHT);
    });
    roadside.markings.forEach(mark => {
        ctx.fillStyle = '#fff';
        ctx.fillRect(magic('h-center'), mark, BRICK_WIDTH, BRICK_HEIGHT);
    });

    ctx.fillStyle = '#f90';
    ctx.fillRect(player.x, player.y - player.h, player.w, player.h);
    ctx.fillStyle = '#f90';
    ctx.fillRect(player.x + player.w, player.y - player.w, player.w, player.h);
    ctx.fillStyle = '#f90';
    ctx.fillRect(player.x - player.w, player.y - player.w, player.w, player.h);

}

function magic(anything) {
    switch (typeof anything) {
        case "undefined":
            return 0;
        case "object":
            Object.keys(anything).forEach(key => {
                anything[key] = magic(anything[key]);
            });
            return anything;
        case "boolean":
            return anything ? 0 : 1;
        case 'string':
                anything = anything.replace('h-center', ~~(ctx.canvas.width / 2));
                anything = anything.replace('w-center', ~~(ctx.canvas.height / 2));
                anything = anything.replace('width', ctx.canvas.width);
                anything = anything.replace('height', ctx.canvas.height);
                return Number(eval(anything)); // @hack: DON'T DO THIS EVER!!!!
        case "function":
            return anything; // ???
        case "number":
            return  anything;
        default:
            return anything;
    }
}