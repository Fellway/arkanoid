import Vector from "./Vector.js"

export default class Bonus {
    constructor(config) {
        const bonuses = [  'additionalBall']
        Object.assign(this,
            {
                id: Math.floor(Math.random() * 1000000),
                type: 'bonus',
                width: 10,
                height: 10,
                velocity: new Vector(0, 0),
                bonusType: bonuses[Math.floor(Math.random() * bonuses.length)],
                color: 'red'
            },
            config
        );
    }

    update(state, time, updateId) {

        for (let actor of state.actors) {
            if (actor.type == 'player') {
                const checkCollision = () =>
                    (this.position.x >= actor.position.x && this.position.x <= actor.position.x + actor.width) &&
                    (this.position.y == actor.position.y);
                if (checkCollision()) {
                    this.position.x = - 10000;
                    if(this.bonusType === '2xPoints') {
                        state.addPoints(2);
                        console.log(this.bonusType);
                    }
                    if(this.bonusType === '5xPoints') {
                        state.addPoints(5);
                        console.log(this.bonusType);
                    }
                    if(this.bonusType === 'large') {
                        state.addBonus(this.bonusType);
                        console.log(this.bonusType);
                    }
                    if(this.bonusType === 'small') {
                        state.addBonus(this.bonusType);
                        console.log(this.bonusType);
                    }
                    if(this.bonusType==='directions') {
                        state.addBonus(this.bonusType);
                        console.log(this.bonusType);
                    }
                    if(this.bonusType==='additionalBall') {
                        state.addBall(this.bonusType);
                        console.log(this.bonusType);
                    }
                }
            }
        }

        return new Bonus({
            ...this,
            position: this.position.add(this.velocity)
        });
    }

}