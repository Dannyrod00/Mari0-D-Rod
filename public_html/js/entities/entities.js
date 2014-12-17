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
        this.renderable.addAnimation("smallWalk", [143, 145, 146, 147, 148, 149, 150, 151, 152], 80);

        this.renderable.setCurrentAnimation("idle");

        this.body.setVelocity(5, 20);
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

    },
    update: function(delta) {

        if(me.input.isKeyPressed("right")){
            this.body.vel.x += this.body.accel.x * me.timer.tick;
            this.flipX(false);
  }else if(me.input.isKeyPressed("left")){
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
            this.flipX(true);  
        }else{
            this.body.vel.x = 0;
        }
        
        if(me.input.isKeyPressed("up")){
            if(!this.body.jumping && !this.body.falling){
                this.body.jumping = true;
                this.body.vel.y -= this.body.accel.y * me.timer.tick;
            }
        }

        this.body.update(delta);
        me.collision.check(this, true, this.collideHandler.bind(this), true);

        if (this.body.vel.x !== 0) {
            if (!this.renderable.isCurrentAnimation("smallWalk")) {
                this.renderable.setCurrentAnimation("smallWalk");
                this.renderable.setAnimationFrame();

            }
        } else {
            this.renderable.setCurrentAnimation("idle");

        }



        this._super(me.Entity, "update", [delta]);

        return true;

    },
    collideHandler: function(response) {

    }


});

game.LevelTrigger = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, "init", [x, y, settings]);
        this.body.onCollision = this.onCollision.bind(this);
        this.level = settings.level;
        this.xSpawn = settings.xSpawn;
        this.ySpawn = settings.ySpawn;

    },
    onCollision: function() {
        this.body.setCollisionMask(me.collision.types.NO_OBJECTS);
        me.levelDirector.loadLevel(this.level);
        me.state.current().resetPlayer(this.xSpawn, this.ySpawn);

    }

});

game.BadGuy = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "orc",
                spritewidth: "64",
                spriteheight: "64",
                width: 64,
                height: 64,
                getShape: function() {
                    return(new me.Rect(0, 0, 30, 63)).toPolygon();
                }
            }]);
        
        this.spritewidth = 64;
        var width = settings.width;
        x = this.pos.x;
        this.startX = x;
        this.endX = x + width -this.spritewidth;
        this.pos.x = x + width -this.spritewidth;
        this.updateBounds();
        
        this.alwaysUpdate = true;
        
        this.walkLeft = false;
        this.alive = true;
         
         this.type = "badguy";
         
          this.renderable.addAnimation("run", [143, 145, 146, 147, 148, 149, 150, 151, 152], 80);
          this.renderable.setCurrentAnimation("run");

        this.body.setVelocity(4, 6);
    },
    update: function(delta) {
        me.collision.check(this, true, this.collideHandler.bind(this), true);
        
        if(this.alive){
            
        }if(this.walkLeft && this.pos.x <= this.startX){
            this.walkLeft = false;
        }else if(this.walkLeft && this.pos.x >= this.endX){
            this.walkLeft = true;
        }
    else{
        me.game.world.removeChild(this);
    };
    
    this._super(me.Entity);
    }
    
    

});