import Bonus from "./Bonus.js";

export default class Brick {
    constructor(config) {
      Object.assign(this,
        {
        id: Math.floor(Math.random() * 1000000),
        type: 'brick',
        width: 35,
        height: 10,
        color: 'red',
        isBonusBlock: Math.floor(Math.random() * 100) > 0,
        collisions: []
      },
      config
      );
    }

    destroy(actorId) {
      if(this.id == actorId) {
        this.position.x = -10000;
      }
    }

    update(state, time, updateId) {
        return new Brick({
            ...this,
            position: this.position,
            color: 'red'
          });
    }

  }