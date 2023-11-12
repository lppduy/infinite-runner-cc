// Learn cc.Class:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
  extends: cc.Component,

  properties: {
    jumpSpeed: cc.v2({ x: 0, y: 300 }),
    maxJumpDistance: 300,
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    cc.systemEvent.on(
      cc.SystemEvent.EventType.KEY_DOWN,
      event => {
        switch (event.keyCode) {
          case cc.macro.KEY.space:
            this.jumpKeyPressed = true;
            this.isJumping = true;

            break;
        }
      },
      this,
    );
    cc.systemEvent.on(
      cc.SystemEvent.EventType.KEY_UP,
      event => {
        switch (event.keyCode) {
          case cc.macro.KEY.space:
            this.jumpKeyPressed = false;
            this.isJumping = false;

            break;
        }
      },
      this,
    );

    this.node.parent.on(
      cc.Node.EventType.TOUCH_START,
      () => {
        this.jumpKeyPressed = true;
        this.isJumping = true;
      },
      this,
    );

    this.node.parent.on(
      cc.Node.EventType.TOUCH_END,
      () => {
        this.isJumping = false;
        this.jumpKeyPressed = false;
      },
      this,
    );
  },

  start() {
    this.body = this.getComponent(cc.RigidBody);
    this.isJumping = false;
    this.jumpKeyPressed = false;
    this.touching = false;
    this.startJumpY = false;
  },

  onBeginContact() {
    cc.log('onBeginContact');
    this.touching = true;
  },
  onEndContact() {
    cc.log('onEndContact');
    this.touching = false;
  },

  update(dt) {
    if (this.jumpKeyPressed) this.jump();
  },

  jump() {
    //  * if hero touches the ground
    if (this) {
      //  *      remember hero's start position
      this.startJumpY = this.node.y;
      //  *      set jump is not finished
      this.jumpFinished = false;
      //  *      set jump is started
      this.isJumping = true;
      //  *      set hero's speed on Y axis
      this.body.linearVelocity = this.jumpSpeed;
      //  * else if hero is jumping and jump is not finish
    } else if (this.isJumping && !this.jumpFinished) {
      const jumpDistance = this.node.y - this.startJumpY;
      //  *      if jump distance is not maximum
      if (jumpDistance < this.maxJumpDistance) {
        //  *          keep hero's Y speed
        this.body.linearVelocity = this.jumpSpeed;
        //  *      else
      } else {
        //  *          finish jump
      }
    }
  },
});
