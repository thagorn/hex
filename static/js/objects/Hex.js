(function(){
    Hex = function(map, r, c) {
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
        };
        this.getNode = function() {
            return this.node;
        };
        this.addClass = function(newClass) {
            if(this.classes.indexOf(newClass)  === -1) {
                this.classes.push(newClass);
            }
            this._applyClasses();
        };
        this.removeClass = function(oldClass) {
            var index = this.classes.indexOf(oldClass);
            if(index > -1) {
                this.classes.splice(index, 1);
            }
            this._applyClasses();
        };
        this.getClasses = function() {
            return this.classes.join(" ");
        };
        //"Private" functions
        this._applyClasses = function() {
            if(this.node != null) {
                this.node.attr("class", this.getClasses());
            }
        };
        //Initialization
        this._init = function(map, r, c) {
            this._initialized = true;
            this.map = map;
            this.r = r;
            this.c = c;
            this.x = c;
            //z = row - .5 * column rounded down
            this.z = r - (c - (c&1)) / 2
            // x + y + z = 0
            this.y = -x-z
            this.classes = ["tile"];
        };
        if(this._initialized) {
            return new Hex(map, r, c);
        } else {
            this._init(map, r, c);
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
