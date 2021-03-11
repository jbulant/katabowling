const Project = require('./project');

class Game {
  constructor(rollProvider, consoleDisplayer) {
    this.rollProvider = rollProvider;
    this.project = new Project()
    this.consoleDisplayer = consoleDisplayer
  }

  getCurrentScore() {
    return this.project.getCurrentScore();
  }

  play() {
    let roll = this.rollProvider.getRoll();
    this.project.lancer(roll);
    if(this.project.isGameOver() && this.consoleDisplayer) {
      this.consoleDisplayer.displayToConsole(this.getCurrentScore())
    }
  }
}

module.exports = Game;