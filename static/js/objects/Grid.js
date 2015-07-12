(function(){
    Grid = function() {
        //Public functions
        this.setHexAction = function(eventName, handler) {
            if(eventName === "drag") {
                var $window = $(window)
                    , grid = this
                    ;
                $window.off("mousedown mousup");
                if(handler != null) {
                    this.setHexAction("mousedown", handler);
                    $window.on("mousedown", function() {
                        grid.setHexAction("mouseover", handler);
                    });
                    $window.on("mouseup", function() {
                        grid.setHexAction("mouseover", null);
                    });
                } else {
                    this.setHexAction("mousedown", null);
                }
            } else {
                this._getSafeHexes().forEach(function(hex) {
                    var $hex = $(hex.getNode()[0]);
                    $hex.off(eventName);
                    if(handler != null) {
                        $hex.on(eventName, { "hex":hex, "grid":this}, handler);
                    }
                }, this);
            }
        };
        this.draw = function(svg, scale) {
            this.scale = scale;
            this.root = svg.selectAll("g").data([this])
                            .enter().append("g");
            this.redraw();
        };
        this.redraw = function() {
            this.root.selectAll("polygon")
                        .data(this._getSafeHexes())
                        .enter().append("polygon")
                            .attr('class', function(d) { return d.getClasses(); })
                            .attr('data-row', function(d) { return d.r; })
                            .attr('data-column', function(d) { return d.c })
                            .attr('transform', function(d) { return "translate(" + d.getOffset(scale) + ")";})
                            .attr('points', points)
                            .each(function(d) { d.setNode(d3.select(this)); });
        };
        this.getHex = function(row, column) {
            return this._hexes.get(this._getIndex(row, column));
        };
        this.createHex = function(row, column) {
            var index = this._getIndex(row, column)
                , hex = this._hexes.get(index)
                ;
            if(hex === undefined) {
                hex = new Hex(this, row, column);
                this._hexes.set(index, hex);
                this.redraw();
            }
        };
        this.deleteHex = function(row, column) {
            var index = this._getIndex(row, column)
                , hex = this._hexes.get(index)
                ;
            if(hex !== undefined) {
                hex.getNode().remove();
                this._hexes.delete(index);
            }
        };
        this.loadFromDimensions = function(height, width) {
            this.height = height;
            this.width = width;
            var row = 0
              , column = 0
              ;
            this._hexes = new Map();
            while(row < height) {
                while(column < width) {
                    var hex = new Hex(this, row, column);
                    this._hexes.set(this._getIndex(row, column), hex)
                    column++;
                }
                row++;
                column = 0;
            }
        };
        this._getSafeHexes = function() {
            var safe = []
                , hex
                ;
            for(hex of this._hexes.values()) {
                if(hex !== undefined) {
                    safe.push(hex);
                }
            }
            return safe;
        }
        this._getIndex = function(row, column) {
            return row + "|" + column;
        };
        //Initialization
        this._init = function() {
            this._initialized = true;
        };
        if(this._initialized) {
            return new Grid();
        } else {
            this._init();
            return this;
        }
    };
})();
