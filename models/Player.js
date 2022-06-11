import Vector from "./Vector.js";
import { collisionVector } from "../utils/CalculateFunctions.js";

export default class Player {
    constructor(config) {
        document.addEventListener('keydown', e => this.move(e), true)
        document.addEventListener('keyup', e => this.stop(e), true)
        Object.assign(this,
            {
                id: Math.floor(Math.random() * 1000000),
                type: 'player',
                directions: 1,
                position: new Vector(200, 150),
                velocity: new Vector(0, 0),
                width: 100,
                height: 10,
                collisions: []
            },
            config
        );
    }

    setWidth(value) {
        this.width = this.width + value;
        console.log(this);
    }

    setDirections(value) {
        this.directions = value;
        console.log(this);
    }

    move(e) {
        if (e.keyCode === 65) {
            this.velocity = new Vector(this.directions * -2, 0);
            if (this.position.x < 0) {
                this.position.x = 0;
            }
        }
        if (e.keyCode === 68) {
            this.velocity = new Vector(this.directions * 2, 0);
            if (this.position.x + this.width > 650) {
                this.position.x = 650 - this.width;
            }
        }
    }

    stop(e) {
        if (e.keyCode === 65 || e.keyCode === 68) {
            this.velocity = new Vector(0, 0);
        }
    }

    update(state, time, updateId) {
        var width = 0;
        var direction = 1;
        if(state.bonusType != undefined) {
            console.log('hello from bonus');
            if(state.bonusType === 'large') {
                width+=20;
                state.bonusType = undefined;
            }
            if(state.bonusType === 'small') {
                width-=20;
                state.bonusType = undefined;
            }
            if(state.bonusType==='directions') {
                direction = -1;
                state.bonusType = undefined;
            }
        }
        return new Player({
            ...this,
            directions: this.directions * direction,
            width: this.width + width,
            position: this.position.add(this.velocity),
        });
    }
}