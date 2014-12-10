game.TitleScreen = me.ScreenObject.extend({
    /**	
     *  action to perform on state change
     */
    
//    this is the function that loads in the title screen picture

    onResetEvent: function() {
        var titleImage = new me.Sprite(0, 0, me.loader.getImage("title-screen"));
        me.game.world.addChild(titleImage, 1);
        me.input.bindKey(me.input.KEY.ENTER, "start");

// this is the code for the title screen enter button
        this.handler = me.event.subscribe(me.event.KEYDOWN, function(action, keyCode, edge) {
            if (action === "start") {
                me.state.change(me.state.PLAY);
            }
        });

    },
    /**	
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        ; // TODO
    }
});
