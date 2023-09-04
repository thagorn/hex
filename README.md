# Dependencies:

java 17
node 18

# To launch frontend:
    cd app
    npm start
navigate to http://localhost:3000/

# To launch backend:
    ./gradlew bootRun
navigate to http://localhost:8080/

# Creating a grid:
    grid = new grid();
    grid.loadFromDimensions(2,3);
    grid.setScale(30);
    grid.draw("#hex");

# Adding click handlers
Note: redrawing removes all handlers
## Hexes turn blue when dragging:
    grid.setHexAction("drag", function(event) { var hex = event.data.hex; hex.addClass("blue"); });
## Removing a click handler:
    grid.setHexAction("drag", null);
## Delete hexes from grid on click:
    grid.setHexAction("click", function(event) { var grid = event.data.grid, hex = event.data.hex; grid.deleteHex(hex.r, hex.c); });



