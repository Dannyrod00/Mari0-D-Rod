// TODO

//these are the player functions
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
//       this is the code that shows the animations

        this.renderable.addAnimation("idle", [16]);
        this.renderable.addAnimation("smallWalk", [86, 87, 88, 89, 90, 91, 92, 93, 94], 80);
        this.renderable.setCurrentAnimation("idle");
        this.body.setVelocity(5, 20);
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
},
//    these are the keys for the game this is right
        update: function(delta) {
        if (me.input.isKeyPressed("right")) {
        this.body.vel.x += this.body.accel.x * me.timer.tick;
                this.flipX(false);
        } else if (me.input.isKeyPressed("left")) {
        this.flipX(true);
                this.body.vel.x -= this.body.accel.x * me.timer.tick;
        } else {
        this.body.vel.x = 0;
        }

        this.body.update(delta);
                me.collision.check(this, true, this.collideHandler.bind(this), true);
                if (me.input.isKeyPressed("jump")) {
        if (!this.body.jumping && !this.body.falling) {
        this.body.vel.y = - this.body.maxVel.y * me.timer.tick;
                this.body.jumping = true;
        }
        }



        },
//this is the code that dose the walking animation

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
        image: "skele-boxer",
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
                this.endX = x + width - this.spritewidth;
                this.pos.x = x + width - this.spritewidth;
                this.updateBounds();
                
                this.alwaysUpdate = true;
                this.walkLeft = false;
                this.alive = true;
                
                this.type = "BadGuy";
                
                this.renderable.addAnimation("run", [86, 87, 88, 89, 90, 91, 92, 93, 94], 80);
                this.renderable.setCurrentAnimation("run");
                this.body.setVelocity(3, 10);
        },
                update: function(delta) {
                
                }
                
            });