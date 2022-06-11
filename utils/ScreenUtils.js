export function setScreen(id) {
    var screens = ['start-screen', 'game', 'game-over-screen'];
    
    screens.forEach(screen => {
      let element = document.getElementById(screen);
      if (screen === 'game-over-screen') {
        playArea.display = 'none';
      }
      if(screen === id) {
        element.style.display = 'block';
      } else {
        element.style.display = 'none';
      }
    })
  }