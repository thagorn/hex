(function(){
    Map = function() {
        //Public functions
        this.setHexAction = function(eventName, handler) {
            if(eventName === "drag") {
                var $window = $(window)
                    , map = this
                    ;
                $window.off("mousedown mousup");
                if(handler != null) {
                    this.setHexAction("mousedown", handler);
                    $window.on("mousedown", function() {
                        map.setHexAction("mouseover", handler);
                    });
                    $window.on("mouseup", function() {
                        map.setHexAction("mouseover", null);
                    });
                } else {
                    this.setHexAction("mousedown", null);
                }
            } else {
                this._getSafeHexes().forEach(function(hex) {
                    var $hex = $(hex.getNode()[0]);
                    $hex.off(eventName);
                    if(handler != null) {
                        $hex.on(eventName, { "hex":hex, "map":this}, handler);
                    }
                }, this);
            }
        };
        this.draw = function(svg, scale) {
            var root
                , hexNodes
                , hexes
                , points
                ;
            this.svg = svg;
            svg[0][0].innerHTML = "";
            root = svg.append('g');
            points = hexPoints(scale);
            hexNodes = root.selectAll("polygon")
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
            return this._hexes[this._getIndex(row, column)];
        };
        this.deleteHex = function(row, column) {
            var index = this._getIndex(row, column);
            if(this._hexes[index] != null) {
                this._hexes[index].getNode().remove();
                this._hexes[index] = null;
            }
        };
        this.loadFromDimensions = function(height, width) {
            this.height = height;
            this.width = width;
            var row = 0
              , column = 0
              ;
            this._hexes = [];
            while(row < height) {
                while(column < width) {
                    var hex = Hex(this, row, column);
                    this._hexes.push(hex);
                    column++;
                }
                row++;
                column = 0;
            }
        };
        this._getSafeHexes = function() {
            return this._hexes.filter(function(d) { return d != null; });
        }
        this._getIndex = function(row, column) {
            return this.width * row + column;
        };
        //Initialization
        this._init = function() {
            this._initialized = true;
        };
        if(this._initialized) {
            return new Map();
        } else {
            this._init();
            return this;
        }
    };
})();
