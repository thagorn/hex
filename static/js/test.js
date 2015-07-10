map1 = new Map();
function setDimensions() {
    var rows = $("#rows").val()
        , columns = $("#columns").val()
        ;
    map1.loadFromDimensions(rows, columns);
}
function draw() {
    var which = $("#which").val()
        , scale = $("#scale").val()
        ;
    map1.draw(d3.select("#hex" + which), scale);
}
