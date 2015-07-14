function startPaintBrush(color, grid) {
  grid.setHexAction("click", function(event) {
    var grid = event.data.grid, hex = event.data.hex;
    hex.addClass(color);
  });
}
