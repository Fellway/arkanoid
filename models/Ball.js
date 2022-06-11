import Vector from "./Vector.js";
import { collisionVector } from "../utils/CalculateFunctions.js";

export default class Ball {
    constructor(config) {
        Object.assign(this,
            {
                id: Math.floor(Math.random() * 1000000),
                type: 'circle',
                position: new Vector(20, 20),
                velocity: new Vector(5, 3),
                r: 5,
                isDestroyed: false,
                color: 'red',
                collisions: []
            },
            config
        );
    }

    update(state, time, updateId) {
        if (this.collisions.length > 10) {
            this.collisions = this.collisions.slice(this.collisions.length - 3);
        }

        const upperLimit = new Vector(
            state.display.canvas.width - this.r,
            state.display.canvas.height - this.r
        );

        const lowerLimit = new Vector(0 + this.r, 0 + this.r);

        if (this.position.x >= upperLimit.x || this.position.x <= lowerLimit.x) {
            this.velocity = new Vector(-this.velocity.x, this.velocity.y);
        }

        if (this.position.y >= upperLimit.y || this.position.y <= lowerLimit.y) {
            this.velocity = new Vector(this.velocity.x, -this.velocity.y);
        }

        for (let actor of state.actors) {
            if (this === actor || this.collisions.includes(actor.id + updateId)) {
                continue;
            }

            const distance = this.position.subtract(actor.position).magnitude;

            if (actor.type == 'brick') {
                const isBallInsideBrick = () =>
                    this.position.x + 2 * this.r > actor.position.x &&
                    this.position.x - this.r < actor.position.x + actor.width &&
                    this.position.y + 2 * this.r > actor.position.y &&
                    this.position.y - this.r < actor.position.y + actor.height;
                if (isBallInsideBrick() && !this.isDestroyed) {
                    this.velocity = new Vector(this.velocity.x, -this.velocity.y);
                    if(actor.isBonusBlock) {
                        state.actors.filter(bonus => bonus.id == actor.id).forEach(bonus => bonus.velocity = new Vector(0, 2));
                    }
                    actor.destroy(actor.id);
                    state.addPoint();
                }
            } else if (actor.type == 'player') {
                if (this.position.y > actor.position.y + this.r ) {
                    state.ballNumber--;
                    this.velocity = new Vector(0, 0);
                    this.position = new Vector(-1000, -1000);
                    state.removeBallId = this.id;
                    state.gameOver();
                }
                const hitPaddle = () =>
                    this.position.y + 2 * this.r > state.display.canvas.height - actor.height &&
                    this.position.y + this.r < state.display.canvas.height &&
                    this.position.x + this.r > actor.position.x &&
                    this.position.x + this.r < actor.position.x + actor.width;
                if (hitPaddle()) {
                    this.velocity = new Vector(this.velocity.x, -this.velocity.y);
                }
            } else if (distance <= this.r + actor.r) {
                const v1 = collisionVector(this, actor);
                const v2 = collisionVector(actor, this);
                this.velocity = v1;
                actor.velocity = v2;
                this.collisions.push(actor.id + updateId);
                actor.collisions.push(this.id + updateId);
            }
        }

        return new Ball({
            ...this,
            position: this.position.add(this.velocity),
        });
    }
}