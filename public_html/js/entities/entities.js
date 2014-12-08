// TODO
game.PlayerEntity = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "mari0",
                spritewidth: "64",
                spriteheight: "64",
                width: 64,
                height: 64,
                getShape: function() {
                    return(new me.Rect(0, 0, 30, 63)).toPolygon();
                }
            }]);
        
//        143

        this.renderable.addAnimation("idle", [16]);
        this.renderable.addAnimation("smallWalk",[143, 145, 146, 147, 148, 149, 150, 151], 80);

        this.renderable.setCurrentAnimation("idle");

        this.body.setVelocity(5, 20);
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

    },
    update: function(delta) {
       
        if (me.input.isKeyPressed("right")) {
            this.flipX(true);
            this.body.vel.x += this.body.accel.x * me.timer.tick;
            if (!this.renderable.isCurrentAnimation("smallWalk")){
                 this.renderable.setCurrentAnimation("smallWalk");
             }
     
        }
        
        else if (me.input.isKeyPressed('left')){
            this.flipX(false);
            this.body.vel.x += this.body.accel.x * me.timer.tick;
            if (!this.renderable.isCurrentAnimation("smallWalk")){
                 this.renderable.setCurrentAnimation("smallWalk");
             }
        }
        
        else {
            this.body.vel.x = 0;
        }
        
        if (me.input.isKeyPressed('jump')) {
            // make sure we are not already jumping or falling
            if (!this.body.jumping && !this.body.falling) {
                // set current vel to the maximum defined value
                // gravity will then do the rest
                this.body.vel.y = -this.body.maxVel.y * me.timer.tick;
                // set the jumping flag
                this.body.jumping = true;
            }
 
        }
        
        this.body.update(delta);
        me.collision.check(this, true, this.collideHandler.bind(this), true);
        
        if (this.body.vel.x !== 0) {
            if (!this.renderable.isCurrentAnimation("smallWalk")) {
                this.renderable.setCurrentAnimation("smallWalk");
                this.renderable.setAnimationFrame(); 
                
            }
        }else{
         this.renderable.setCurrentAnimation("idle");
            
        }

        

        this._super(me.Entity, "update", [delta]);

        return true;

    },
    
    collideHandler: function(response){
        
    }


});

game.LevelTrigger = me.Entity.extend({
 init: function (x, y, settings){
     this._super(me.Entity, "init", [x, y, settings]);
     this.body.onCollision = this.onCollision.bind(this);
     this.level = settings.level;
     this.xSpawn = settings.xSpawn;
     this.ySpawn = settings.ySpawn;
     
 },
 
 onCollision: function(){
     this.body.setCollisionMask(me.collision.types.NO_OBJECTS);
     me.levelDirector.loadLevel(this.level);
     me.state.current().resetPlayer(this.xSpawn, this.ySpawn);
     
 }
    
});