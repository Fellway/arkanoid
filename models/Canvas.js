export default class Canvas {
    constructor(parent = document.body, width = 650, height = 400) {
        this.canvas = document.createElement('canvas');
        this.canvas.width = width;
        this.canvas.height = height;
        playArea.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
    }

    sync(state) {
        this.clearDisplay();
        this.drawActors(state.actors);
    }

    drawActors(actors) {
        for (let actor of actors) {
            if (actor.type === 'circle') {
                this.drawCircle(actor);
            }
            if (actor.type === 'brick') {
                this.drawBrick(actor);
            }
            if (actor.type === 'player') {
                this.drawPlayer(actor);
            }
            if(actor.type === 'bonus') {
                this.drawBonus(actor);
            }
        }
    }

    drawCircle(actor) {
        this.ctx.beginPath();
        this.ctx.arc(actor.position.x, actor.position.y, actor.r, 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.fillStyle = actor.color;
        this.ctx.fill();
    }

    drawBrick(actor) {
        this.ctx.beginPath();
        this.ctx.fillStyle = actor.color;
        this.ctx.fillRect(actor.position.x, actor.position.y, actor.width, actor.height);
        this.ctx.closePath();
    }

    drawBonus(actor) {
        this.ctx.beginPath();
        this.ctx.fillStyle = actor.color;
        this.ctx.fillRect(actor.position.x, actor.position.y, actor.width, actor.height);
        this.ctx.closePath();
    }

    drawPlayer(actor) {
        this.ctx.beginPath();
        this.ctx.fillStyle = actor.color;
        this.ctx.fillRect(actor.position.x, actor.position.y, actor.width, actor.height);
        this.ctx.closePath();
    }

    clearDisplay() {
        this.ctx.fillStyle = 'rgba(255, 255, 255, .4)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}