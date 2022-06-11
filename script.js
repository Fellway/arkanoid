import Ball from "./models/Ball.js"
import Vector from "./models/Vector.js";
import Canvas from "./models/Canvas.js";
import State from "./models/State.js";
import Brick from "./models/Brick.js";
import Player from "./models/Player.js";
import {setScreen} from "./utils/ScreenUtils.js";
import Bonus from "./models/Bonus.js";

let db = null;

const runAnimation = animation => {
  let lastTime = null;
  const frame = time => {
    if (lastTime !== null) {
      const timeStep = Math.min(100, time - lastTime) / 1000;
      if (animation(timeStep) === false) {
        return;
      }
    }
    lastTime = time;
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
};

function saveScore() {
  const score = {
    nick: "nickname"
  };
  
  const tx = db.transaction("score", "readwrite")
  let scoreTable = tx.objectStore("score");
  scoreTable.add(score);
}

const request = indexedDB.open("game_db");
request.onupgradeneeded = e => {
  db = e.target.result;
  db.createObjectStore("score", {keyPath: "id", autoIncrement: true});
}

request.onsuccess = e => {
  db = e.target.result;
}

document.getElementById("start").onclick = function () {
  setScreen('game');
  const display = new Canvas();

  const ball = new Ball({
    position: new Vector(200, 100),
    velocity: new Vector(-1, 1),
    color: 'blue',
  });
  
  const player = new Player({
    position: new Vector((display.canvas.width / 2) - (display.canvas.width / 8), display.canvas.height - 20),
    velocity: new Vector(0, 0),
    color: 'green'
  });
  
  
  var bricks = [];
  var bonuses = [];
  
  for (let i =1; i<16; i++) {
    for (let j =0; j<4; j++) {
      let brick = new Brick({
        position: new Vector(i * 20 * 2 - 10, j * 20 + 20),
        color: 'red'
      });
      bricks.push(brick);
      if (brick.isBonusBlock) {
        bonuses.push(new Bonus({
          id: brick.id,
          position: brick.position
        }))
      }
    }    
  }
  const actors = [player, ball].concat(bricks).concat(bonuses);
  let state = new State(display, actors, 0);
  runAnimation(time => {
    state = state.update(time);
    display.sync(state);
  });
}


