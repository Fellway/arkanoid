import {setScreen} from "../utils/ScreenUtils.js";
import Ball from "./Ball.js";
import Vector from "./Vector.js";

export default class State {
    constructor(display, actors, score, bonusType, additionalBall, ballNumber = 1, removeBallId) {
      this.display = display;
      this.actors = actors;
      this.score = score;
      this.bonusType = bonusType;
      this.additionalBall = additionalBall;
      this.ballNumber = ballNumber;
      this.removeBallId = removeBallId;
    }

    addBonus(bonusType) {
      this.bonusType = bonusType;
    }

    addBall() {
      this.additionalBall = true;
    }
  
    addPoints(value) {
      this.score += value;
      score.innerHTML = 'Score: ' + this.score; 
    }

    addPoint() {
      this.score++;
      score.innerHTML = 'Score: ' + this.score; 
    }

    removeBall(id) {
      this.removeBallId = id;
    }

    gameOver() {
      if(this.ballNumber === 0) {
        setScreen('game-over-screen')
        finalScore.innerHTML = this.score;
        this.display = none;
      }
    }

    update(time) {
      var ball = undefined;
      if(this.additionalBall != undefined) {
        this.ballNumber++;
        ball = new Ball({
          position: new Vector(200, 100),
          velocity: new Vector(-1, 1),
          color: 'blue',
        });
      }

      const updateId = Math.floor(Math.random() * 1000000);
      if(this.removeBallId!=undefined) {
        this.actors = this.actors.filter(actor=> actor.id !== this.removeBallId);
        this.removeBallId= undefined;
      }


      const actors = this.actors.map(actor => {
        return actor.update(this, time, updateId);
      });
      if(ball != undefined) {
        actors.push(ball);
        this.additionalBall = undefined;
      }
      return new State(this.display, actors, this.score, this.bonusType, this.additionalBall, this.ballNumber, this.removeBallId);
    }

  }