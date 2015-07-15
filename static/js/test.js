grid1 = new Grid();
function setDimensions() {
    var rows = $("#rows").val()
        , columns = $("#columns").val()
        ;
    grid1.loadFromDimensions(rows, columns);
}
function scale() {
    var scale = $("#scale").val();
    grid1.setScale(scale);
}
function draw() {
    grid1.draw("hex");
}
