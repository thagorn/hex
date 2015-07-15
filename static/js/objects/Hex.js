(function(){
    Hex = function(grid, r, c) {
        //Public functions
        this.getOffset = function(scale) {
            var radius = scale / 2;
            //Add radius to xshift and yshift so edge borders svg instead of center
            xshift = 1.5 * this.x * radius + radius;
            yshift = (Math.sqrt(3) / 2 * this.x + Math.sqrt(3) * this.z) * radius + radius;
            return xshift + "," + yshift;
        };
        this.setNode = function(node) {
            this.node = node;
            this.$node = $(node[0]);
        };
        this.getNode = function() {
            return this.node;
        };
        this.addHexActions = function(eventMap) {
            eventMap.forEach(function(handler, eventName) {
                this.addHexAction(eventName, handler);
            }, this);
        };
        this.addHexAction = function(eventName, handler) {
            this.$node.off(eventName);
            if(handler != null) {
                this.$node.on(eventName, { "hex":this, "grid":this.grid}, handler);
            }
        };
        this.addClass = function(newClass) {
            this.classes.add(newClass);
            this._applyClasses();
        };
        this.removeClass = function(oldClass) {
            if(this.classes.remove(oldClass)) {
                this._applyClasses();
            }
        };
        this.getClasses = function() {
            var classString = ""
                , i = 0
                ;
            this.classes.forEach(function(className) {
                if(i++ > 0) {
                    classString += " ";
                }
                classString += className;
            });
            return classString;
        };
        //"Private" functions
        this._applyClasses = function() {
            if(this.node != null) {
                this.node.attr("class", this.getClasses());
            }
        };
        //Initialization
        this._init = function(grid, r, c) {
            this._initialized = true;
            this.grid = grid;
            this.r = r;
            this.c = c;
            this.x = c;
            //z = row - .5 * column rounded down
            this.z = r - (c - (c&1)) / 2
            // x + y + z = 0
            this.y = -this.x-this.z
            this.classes = new Set(["tile"]);
        };
        if(this._initialized) {
            return new Hex(grid, r, c);
        } else {
            this._init(grid, r, c);
            return this;
        }
    };
})();
hexPoints = function(scale) {
    var points = []
        , i = 0
        ;
    for(i = 0; i < 6; i++) {
        var angle = Math.PI * i / 3;
        points.push(0.5 * scale * Math.cos(angle) + "," + 0.5 * scale * Math.sin(angle));
    }
    return points;
};
