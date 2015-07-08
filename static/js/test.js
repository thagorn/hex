function createGrid() {
    $('#hex')[0].innerHTML = "";
    var w = parseInt($("#width").val());
    var h = parseInt($("#height").val());
    var s = parseInt($("#scale").val());
    makeGridDiagram(d3.select('#hex'),
                        Grid.trapezoidalShape(0, w, 0, h, Grid.oddQToCube))
            .update(s, false);
}
