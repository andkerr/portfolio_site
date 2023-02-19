(function() {
    var grid = [];

    function interpRand(a, b) {
        return a + Math.random() * (b - a);
    }

    function fillQuad(x1, y1, x2, y2) {
        if (x2 - x1 < 2 && y2 - y1 < 2) {
            return;
        }

        var xMid = Math.round((x2 - x1) / 2 + x1);
        var yMid = Math.round((y2 - y1) / 2 + y1);

        // top middle
        if (grid[xMid][y1] == -1) {
            grid[xMid][y1] = interpRand(grid[x1][y1], grid[x2][y1]);
        }
        // bottom middle
        if (grid[xMid][y2] == -1) {
            grid[xMid][y2] = interpRand(grid[x1][y2], grid[x2][y2]);
        }
        // left middle
        if (grid[x1][yMid] == -1) {
            grid[x1][yMid] = interpRand(grid[x1][y1], grid[x1][y2]);
        }
        // right middle
        if (grid[x2][yMid] == -1) {
            grid[x2][yMid] = interpRand(grid[x2][y1], grid[x2][y2]);
        }
        // centre
        if (grid[xMid][yMid] == -1) {
            grid[xMid][yMid] = interpRand(interpRand(grid[xMid][y1],
                                                     grid[xMid][y2]),
                                          interpRand(grid[x1][yMid],
                                                     grid[x2][yMid]));
        }

        fillQuad(x1, y1, xMid, yMid);
        fillQuad(xMid, y1, x2, yMid);
        fillQuad(x1, yMid, xMid, y2);
        fillQuad(xMid, yMid, x2, y2);
    }

    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

    for (var x = 0; x < WIDTH; ++x) {
        grid.push([]);
        for (var y = 0; y < HEIGHT; ++y) {
            grid[grid.length - 1].push(-1);
        }
    }

    // seed shading values
    if (Math.random() < 0.5) {
        grid[0][0] = 0;
        grid[WIDTH - 1][HEIGHT - 1] = 1;
        grid[0][HEIGHT - 1] = Math.random();
        grid[WIDTH - 1][0] = Math.random();
    }
    else {
        grid[0][0] = Math.random();
        grid[WIDTH - 1][HEIGHT - 1] = Math.random();
        grid[0][HEIGHT - 1] = 0;
        grid[WIDTH - 1][0] = 1;
    }

    fillQuad(0, 0, WIDTH - 1, HEIGHT - 1);

    // random hues
    var r1, r2, g1, g2, b1, b2;
    do {
        r1 = Math.random();
        r2 = Math.random();
        g1 = Math.random();
        g2 = Math.random();
        b1 = Math.random();
        b2 = Math.random();
    } while (Math.abs(r1 - r2) < 0.3 ||
             Math.abs(g1 - g2) < 0.3 ||
             Math.abs(b1 - b2) < 0.3);

    // draw grid onto canvas
    for (var x = 0; x < WIDTH; ++x) {
        for (var y = 0; y < HEIGHT; ++y) {
            if (grid[x][y] != -1) {
                var r = Math.round((grid[x][y] * (r1 - r2) + r2) * 255);
                var g = Math.round((grid[x][y] * (g1 - g2) + g2) * 255);
                var b = Math.round((grid[x][y] * (b1 - b2) + b2) * 255);
                ctx.fillStyle = 'rgb(' + r + ', ' + g + ', ' + b + ')';
                ctx.fillRect(x, y, 1, 1);
            }
        }
    }
})();
