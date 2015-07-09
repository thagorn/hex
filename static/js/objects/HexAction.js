(function(){
    HexAction = function() {
        //Public functions
        this.setOnClick = function(onClickFunction) {
            this.onClick = onClickFunction;
        };
        this.on = function(action, hex) {
            switch(action) {
                case "click":
                    if(this.onClick != null) {
                        onClickFunction(hex);
                    }
                    break;
                default:
                    break;
            }
        }
        //"Private" functions
        //Initialization
        this._init = function(x, y) {
            this._initialized = true;
        };
        if(this._initialized) {
            return new Hex(x, y);
        } else {
            this._init(x, y);
            return this;
        }
    };
})();
