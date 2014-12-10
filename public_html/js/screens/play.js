

game.PlayScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */

//    this function is for loading my levels, player, and my keys
    onResetEvent: function() {
        // reset the score
        game.data.score = 0;
        me.levelDirector.loadLevel("levelD1");


        this.resetPlayer(0, 100);

        me.input.bindKey(me.input.KEY.D, "right");
        me.input.bindKey(me.input.KEY.A, "left");
        me.input.bindKey(me.input.KEY.W, "jump");
        
        // add our HUD to the game world
        this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD);
    },
    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        // remove the HUD from the game world
        me.game.world.removeChild(this.HUD);
    },
    resetPlayer: function(x, y) {
        var player = me.pool.pull("Mari0", x, y, {});
        me.game.world.addChild(player, 5);
    },
    

});

