(function(){
    Hex = function(map, x, y) {
        //Public functions
        this.getOffset = function(scale) {
            xshift = 0.75 * this.x * scale;
            yshift = (Math.sqrt(3) / 2 * this.x + Math.sqrt(3) * this.y) * scale / 2;
            return xshift + "," + yshift;
        };
        this.setNode = function(node) {
            this.node = node;
        };
        this.addClass = function(newClass) {
            if(this.className.search(" " + newClass + " ")  === -1) {
                this.className += " " + newClass;
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
                this.node[0].className = this.getClasses();
            }
        };
        //Initialization
        this._init = function(map, x, y) {
            this._initialized = true;
            this.map = map;
            this.x = x;
            this.y = y;
            this.z = -x -y;
            this.classes = ["tile"];
        };
        if(this._initialized) {
            return new Hex(map, x, y);
        } else {
            this._init(map, x, y);
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
