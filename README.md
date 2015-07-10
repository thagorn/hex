#Creating a map:
    map = new Map();
    map.loadFromDimensions(2,3);
    map.draw(d3.select("#hex1"), 30);

#Adding click handlers
Note: redrawing removes all handlers
## Hexes turn blue when dragging:
    map.setHexAction("drag", function(event) { var hex = event.data.hex; hex.addClass("blue"); });
##Removing a click handler:
    map.setHexAction("drag", null);
## Delete hexes from map on click:
    map.setHexAction("click", function(event) { var map = event.data.map, hex = event.data.hex; map.deleteHex(hex.r, hex.c); });

