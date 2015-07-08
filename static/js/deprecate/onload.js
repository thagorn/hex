
delay.queue = d3.map();  // which elements need redrawing?
delay.refresh = d3.set();  // set of elements we've seen before
idle_tracker.callback = _delayDrawOnTimeout;
window.addEventListener('scroll', _delayedDraw);
window.addEventListener('resize', _delayedDraw);

/* NOTE: on iOS, scroll event doesn't occur until after the scrolling
 * stops, which is too late for this redraw. I am not sure how to do
 * this properly. Instead of drawing only on scroll, I also draw in
 * the background when the user is idle. */


/*
console.info("I'm happy to answer questions about the code — email me at redblobgames@gmail.com");


makeGridDiagram(d3.select('#grid-offset-odd-q'),
                Grid.trapezoidalShape(0, 7, 0, 5, Grid.oddQToCube))
    .addHexCoordinates(Grid.cubeToOddQ, true)
    .update(40, false);
makeGridDiagram(d3.select('#grid-offset-even-q'),
                Grid.trapezoidalShape(0, 7, 0, 5, Grid.evenQToCube))
    .addHexCoordinates(Grid.cubeToEvenQ, true)
    .update(40, false);
makeGridDiagram(d3.select('#grid-offset-odd-r'),
                Grid.trapezoidalShape(0, 6, 0, 6, Grid.oddRToCube))
    .addHexCoordinates(Grid.cubeToOddR, true)
    .update(40, true);
makeGridDiagram(d3.select('#grid-offset-even-r'),
                Grid.trapezoidalShape(0, 6, 0, 6, Grid.evenRToCube))
    .addHexCoordinates(Grid.cubeToEvenR, true)
    .update(40, true);


function makeHexToPixel() {
    var diagram = makeGridDiagram(d3.select("#diagram-hex-to-pixel"), Grid.trapezoidalShape(0, 1, 0, 1, Grid.oddRToCube));
    diagram.update(100, true);

    var A = Grid.oddRToCube(new Hex(0, 0));
    var Q = Grid.oddRToCube(new Hex(1, 0));
    var R = Grid.oddRToCube(new Hex(0, 1));
    var B = Grid.oddRToCube(new Hex(1, 1));
    diagram.addLabels(function(d) {
        if (d.key == A.toString()) return "A";
        if (d.key == Q.toString()) return "Q";
        if (d.key == R.toString()) return "R";
        if (d.key == B.toString()) return "B";
    });

    function addArrow(p1, p2) {
        p1 = diagram.grid.hexToCenter(p1);
        p2 = diagram.grid.hexToCenter(p2);
        makeArrow(diagram.root.append('path'), 3, 20, p1, p2.scale(0.8).add(p1.scale(0.2)));
    }
    addArrow(A, Q);
    addArrow(A, R);
    addArrow(A, B);

    return diagram;
}
makeHexToPixel();


function makePixelToHex() {
    var diagram = makeGridDiagram(d3.select("#diagram-pixel-to-hex"), Grid.hexagonalShape(6));
    diagram.addCubeCoordinates(false);
    diagram.update(70, true);

    var marker = diagram.root.append('circle');
    marker.attr('fill', "blue").attr('r', 5);

    diagram.root.on('mousemove', function() {
        var xy = d3.mouse(diagram.root.node());
        var cube = diagram.grid.cartesianToHex(new ScreenCoordinate(xy[0], xy[1]));
        marker.attr('transform', "translate(" + diagram.grid.hexToCenter(cube) + ")");
        diagram.tiles.classed('highlight', function(d) { return d.cube.equals(FractionalCube.cubeRound(cube)); });
    });
    return diagram;
}
makePixelToHex();


// Hex to pixel code is updated to match selected grid type
function updateHexToPixelAxial(orientation) {
    var code = d3.selectAll("#hex-to-pixel-code-axial span");
    code.style('display', function(_, i) { return (i == orientation)? "none":"inline"; });
}
updateHexToPixelAxial(true);
d3.select("#hex-to-pixel-axial-pointy").on('change', function() { updateHexToPixelAxial(true); }).node().checked = true;
d3.select("#hex-to-pixel-axial-flat").on('change', function() { updateHexToPixelAxial(false); });

function updateHexToPixelOffset(style) {
    var code = d3.selectAll("#hex-to-pixel-code-offset span").data(updateHexToPixelOffset.styles);
    code.style('display', function(d) { return (d == style)? "inline" : "none"; });
}
updateHexToPixelOffset.styles = ["oddR", "evenR", "oddQ", "evenQ"];
updateHexToPixelOffset.styles.forEach(function(style) {
    d3.select("#hex-to-pixel-offset-" + style).on('change', function() { updateHexToPixelOffset(style) });
});
updateHexToPixelOffset("oddR");
d3.select("#hex-to-pixel-offset-oddR").node().checked = true;


function makeMapStorage(config, scale) {
    var shape = config[0];
    var access_text = config[1];

    var svg = d3.select("#diagram-map-storage-shape");
    svg.selectAll("*").remove(); // just rebuild the whole thing on each shape change…

    // Write the code used for accessing the grid
    d3.select("#map-storage-formula").text(access_text);

    // Build the hex grid
    var diagram = makeGridDiagram(svg, shape);
    diagram.addHexCoordinates(Grid.cubeToTwoAxis, false);
    diagram.update(scale, true);

    // Build a square grid that can cover the range of axial grid coordinates
    var hexSet = d3.set();
    var first_column = [];
    var minQ = 0, maxQ = 0, minR = 0, maxR = 0;
    diagram.nodes.forEach(function(node) {
        var q = node.cube.x, r = node.cube.z;
        hexSet.add(node.cube);
        if (q < minQ) minQ = q;
        if (q > maxQ) maxQ = q;
        if (r < minR) minR = r;
        if (r > maxR) maxR = r;
        if (!(q > first_column[r])) first_column[r] = q;
    });

    var s_size = 260 / (maxR-minR+1);
    var storage = {};
    storage.svg = d3.select("#diagram-map-storage-array");
    storage.svg.selectAll("*").remove();
    storage.nodes = [];
    for (var r = minR; r <= maxR; r++) {
        storage.svg.append('text')
            .attr('transform', "translate(10," + (22.5 + 4 + (r-minR+0.5)*s_size) + ")")
            .text(first_column[r]);
        for (var q = minQ; q <= maxQ; q++) {
            storage.nodes.push({cube: new Cube(q, -q-r, r), q: q, r: r});
        }
    }

    var squares = storage.svg.selectAll("g").data(storage.nodes);
    squares.enter().append('g')
        .each(function(d) {
            var g = d3.select(this);
            d.square = g;
            g.attr('transform', "translate(" + ((d.q-minQ)*s_size) + "," + ((d.r-minR)*s_size) + ") translate(25, 22.5)");
            g.append('rect').attr('width', s_size).attr('height', s_size);
            g.append('text').text(d.q + ", " + d.r).attr('y', "0.4em").attr('transform', "translate(" + (s_size/2) + "," + (s_size/2) + ")");
            g.classed('unused', !hexSet.has(d.cube));
        });

    // Each grid should highlight things in the other grid
    function highlight(cube) {
        diagram.tiles.classed('highlight', function(node) { return node.cube.equals(cube); });
        squares.classed('highlight', function(node) { return node.cube.equals(cube); });
        diagram.tiles.classed('samerow', function(node) { return node.cube.z == cube.z; });
        squares.classed('samerow', function(node) { return node.cube.z == cube.z; });
    }

    diagram.tiles.on('mouseover', function(d) { highlight(d.cube); });
    squares.on('mouseover', function(d) { highlight(d.cube); });
    highlight(new Cube(2, -5, 3));
}
// Map storage shape is controlled separately, and orientation can't be set
var _mapStorage = [[Grid.trapezoidalShape(0, 5, 0, 5, Grid.oddRToCube), "array[r][q + r/2]"],
                   [Grid.triangularShape(5), "array[r][q]"],
                   [Grid.hexagonalShape(3), "array[r + N][q + N + min(0, r)]"],
                   [Grid.trapezoidalShape(0, 5, 0, 5, Grid.twoAxisToCube), "array[r][q]"]];
makeMapStorage(_mapStorage[0], 60);
d3.select("#map-storage-rectangle").node().checked = true;
d3.select("#map-storage-rectangle").on('change', function() { makeMapStorage(_mapStorage[0], 60); });
d3.select("#map-storage-triangle").on('change', function() { makeMapStorage(_mapStorage[1], 60); });
d3.select("#map-storage-hexagon").on('change', function() { makeMapStorage(_mapStorage[2], 50); });
d3.select("#map-storage-rhombus").on('change', function() { makeMapStorage(_mapStorage[3], 60); });


function makeWraparound() {
    var N = 2;
    var shape = [];
    var shape_center = [];
    var shape_mirror = [];
    var baseShape = Grid.hexagonalShape(N);  // Called "L" in the article text
    var centers = [new Cube(0, 0, 0)];  // Called "M" in the article text
    var center = new Cube(N*2+1, -N, -N-1);
    for (var dir = 0; dir < 6; dir++) {
        centers.push(center);
        center = center.rotateRight();
    }
    centers.forEach(function (c) {
        baseShape.forEach(function(b) {
            shape.push(Cube.add(b, c));
            shape_center.push(c);
            shape_mirror.push(b);
        });
    });

    var diagram = makeGridDiagram(d3.select("#diagram-wraparound"), shape);
    diagram.update(40, true);
    diagram.tiles
        .classed('center', function(d, i) { return Cube.$length(shape_mirror[i]) == 0; })
        .classed('wrapped', function(d) { return Cube.$length(d.cube) > 2; })
        .classed('parity', function(d, i) { var c = shape_center[i], a = Cube.$length(c); return c.x == a || c.y == a || c.z == a; });

    function setSelection(cube) {
        diagram.tiles.classed('highlight', function(d, i) { return shape_mirror[i].equals(cube); });
    }
    diagram.tiles
        .on('mouseover', function(d, i) { setSelection(shape_mirror[i]); });

    return diagram;
}
makeWraparound();


// Create all the diagrams that can be reoriented

var diagram_parts = makeParts();
var diagram_angles = makeAngles();
var diagram_spacing = makeSpacing();
var diagram_axes = makeGridComparison();

var grid_cube = makeGridDiagram(d3.select("#grid-cube"), Grid.hexagonalShape(3))
    .addCubeCoordinates(true);

var grid_axial = makeGridDiagram(d3.select("#grid-axial"), Grid.hexagonalShape(3))
    .addHexCoordinates(Grid.cubeToTwoAxis, true);

var neighbors_cube = makeNeighbors("#neighbors-cube", "#neighbors-cube-code");
var neighbors_axial = makeNeighbors("#neighbors-axial", "#neighbors-axial-code", Grid.cubeToTwoAxis, "");

var neighbors_diagonal = makeGridDiagram(d3.select("#neighbors-diagonal"),
                                         Grid.hexagonalShape(1).concat(
                                             [new Cube(2, -1, -1), new Cube(-2, 1, 1),
                                              new Cube(-1, 2, -1), new Cube(1, -2, 1),
                                              new Cube(-1, -1, 2), new Cube(1, 1, -2)]))
    .addCubeCoordinates(false);
neighbors_diagonal.tiles.classed('highlight', function(d) { return Cube.$length(d.cube) == 2; });

var diagram_distances = makeDistances();
var diagram_lines = makeLineDrawer();
var diagram_fov = makeFieldOfView();
var diagram_rotation = makeRotation();
var diagram_rings = makeSpiral("diagram-rings", false);
var diagram_spiral = makeSpiral("diagram-spiral", true);
var diagram_movement_range = makeMovementRange();
var diagram_pathfinding = makePathfinding();
var diagram_hex_region = makeHexRegion();
var diagram_intersection = makeIntersection();

function orient(orientation) {
    diagram_parts(orientation);
    diagram_angles(orientation);
    diagram_spacing(orientation);
    diagram_axes(orientation);
    
    grid_cube.update(65, orientation);
    grid_axial.update(65, orientation);

    neighbors_cube.update(100, orientation);
    neighbors_axial.update(100, orientation);
    neighbors_diagonal.update(75, orientation);

    diagram_distances.update(60, orientation);
    diagram_lines.update(45, orientation);
    diagram_fov.update(35, orientation);
    diagram_rotation.update(60, orientation);
    diagram_rings.update(50, orientation);
    diagram_spiral.update(50, orientation);
    diagram_movement_range.update(50, orientation);
    diagram_pathfinding.update(42, orientation);
    diagram_hex_region.update(50, orientation);
    diagram_intersection.update(35, orientation);

    // HACK: invading cubegrid.js space; should support this directly in cubegrid.js diagram object
    delay(d3.select("#cube-to-hex"), function(animate) {
        animate(d3.select("#cube-to-hex > g"))
            .attr('transform', "translate(184.5, 184.5) rotate(" + ((!orientation) * 30) + ")");
    });

    adjustTextForOrientation(orientation);
    d3.selectAll("button.flat").classed('highlight', !orientation);
    d3.selectAll("button.pointy").classed('highlight', orientation);
}

orient(true);

// Offset neighbors are controlled separately
var neighbors_offset = makeNeighbors("#neighbors-offset", "#neighbors-offset-code", Grid.cubeToOddR, "row").update(65, true);
d3.select("#neighbors-offset-odd-r").node().checked = true;
d3.select("#neighbors-offset-odd-r").on('change', function() { neighbors_offset.converter = Grid.cubeToOddR; neighbors_offset.parity_var = "row"; neighbors_offset.update(65, true); });
d3.select("#neighbors-offset-even-r").on('change', function() { neighbors_offset.converter = Grid.cubeToEvenR; neighbors_offset.parity_var = "row"; neighbors_offset.update(65, true); });
d3.select("#neighbors-offset-odd-q").on('change', function() { neighbors_offset.converter = Grid.cubeToOddQ; neighbors_offset.parity_var = "col"; neighbors_offset.update(65, false); });
d3.select("#neighbors-offset-even-q").on('change', function() { neighbors_offset.converter = Grid.cubeToEvenQ; neighbors_offset.parity_var = "col"; neighbors_offset.update(65, false); });

function test_coordinate_transforms() {
    function T(g, h1) {
        var p = g.hexToCenter(h1);
        var h2 = FractionalCube.cubeRound(g.cartesianToHex(p));
        if (h1.toString() != h2.toString()) {
            console.log("TEST FAILED: coordinate system transformation:", h1.toString(), h2.toString());
        }
    }
    T(new Grid(10, true, []), new Cube(1, 3, -4));
    T(new Grid(5, true, []), new Cube(-4, -3, 7));
    T(new Grid(10, false, []), new Cube(3, 5, -8));
}
test_coordinate_transforms();
*/
