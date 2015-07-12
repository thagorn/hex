grid1 = new Grid();
function setDimensions() {
    var rows = $("#rows").val()
        , columns = $("#columns").val()
        ;
    grid1.loadFromDimensions(rows, columns);
}
function draw() {
    var which = $("#which").val()
        , scale = $("#scale").val()
        ;
    grid1.draw(d3.select("#hex" + which), scale);
}
