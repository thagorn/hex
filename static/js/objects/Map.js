(function(){
    Map = function() {
        //Public functions
        this.draw = function(svg, scale) {
            var root
                , hexNodes
                , hexes
                , points
                ;
            this.svg = svg;
            svg[0][0].innerHTML = "";
            root = svg.append('g');
            hexNodes = root.selectAll("g").data(this._hexes)
                        .enter().append("g")
                            .attr('class', function(d) { return d.getClasses(); })
                            .attr('transform', function(d) { return "translate(" + d.getOffset(scale) + ")";})
                            .each(function(d) { d.setNode(d3.select(this)); });
            points = hexPoints(scale);
            hexes = hexNodes.append('polygon')
                        .attr('points', points);
            
        };
        this.getHex = function(x, y) {
            return this._hexes[this._getIndex(x, y)];
        };
        this.deleteHex = function(x, y) {
            this._hexes[this._getIndex(x, y)] = null;
        };
        this.setHexAction = function(hexAction) {
            this.hexAction = hexAction;
        };
        this.getHexAction = function(hexAction) {
            return this.hexAction;
        };
        this.loadFromDimensions = function(height, width) {
            this.height = height;
            this.width = width;
            var x = 0
              , y = 0
              ;
            this._hexes = [];
            while(y < height) {
                while(x < width) {
                    var hex = Hex(this, x, y);
                    this._hexes.push(hex);
                    x++;
                }
                y++;
                x = 0;
            }
        };
        this._getIndex = function(x, y) {
            return this.width * x + y;
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
