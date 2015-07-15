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
                    hex.addHexAction(eventName, handler);
                    if(handler != null) {
                        this._actions.set(eventName, handler);
                    } else {
                        this._actions.delete(eventName);
                    }
                }, this);
            }
        };
        this.draw = function(svgid) {
            var svg = d3.select("#" + svgid);
            this.root = svg.selectAll("g").data([this]);
            this.root.enter().append("g");
            this.root.exit().remove();
            this.redraw();
        };
        this.setScale = function(scale) {
            this.scale = scale;
            if(this._isDrawn()) {
                var points = hexPoints(scale)
                this.root.selectAll("polygon")
                            .attr('transform', function(d) { return "translate(" + d.getOffset(scale) + ")";})
                            .attr('points', points);
            }
        };
        this.redraw = function() {
            var scale = this.scale
                , points = hexPoints(scale)
                , grid = this
                , polygons = this.root.selectAll("polygon").data(this._getSafeHexes(), function(d) { return grid._getIndex(d.r,d.c); })
                , actions = this._actions
                ;
            polygons.exit().remove();
            polygons.enter().append("polygon")
                            .attr('class', function(d) { return d.getClasses(); })
                            .attr('data-row', function(d) { return d.r; })
                            .attr('data-column', function(d) { return d.c })
                            .attr('transform', function(d) { return "translate(" + d.getOffset(scale) + ")";})
                            .attr('points', points)
                            .each(function(d) { d.setNode(d3.select(this)); d.addHexActions(actions); });
        };
        this.getHex = function(row, column) {
            return this._hexes.get(this._getIndex(row, column));
        };
        this.createHex = function(row, column) {
            var index = this._getIndex(row, column)
                , hex = this._hexes.get(index)
                , $hex
                ;
            if(hex === undefined) {
                hex = new Hex(this, row, column);
                this._hexes.set(index, hex);
                this.redraw();
            }
        };
        this.deleteHex = function(row, column) {
            this._hexes.delete(this._getIndex(row, column));
            this.redraw();
        };
        this.loadFromDimensions = function(height, width) {
            this.height = height;
            this.width = width;
            var row = 0
              , column = 0
              , oldHexes = new Map()
              , index
              , hex
              ;
            if(this._hexes != undefined) {
                oldHexes = this._hexes;
            }
            this._hexes = new Map();
            while(row < height) {
                while(column < width) {
                    index = this._getIndex(row, column);
                    hex = oldHexes.get(index);
                    if(hex === undefined) {
                        hex = new Hex(this, row, column);
                    }
                    this._hexes.set(index, hex)
                    column++;
                }
                row++;
                column = 0;
            }
            if(this._isDrawn()) {
                this.redraw();
            }
        };
        //"Private" functions
        this._isDrawn = function() {
            return this.root != undefined;
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
            this._actions = new Map();
            this.scale = 30;
        };
        if(this._initialized) {
            return new Grid();
        } else {
            this._init();
            return this;
        }
    };
})();
