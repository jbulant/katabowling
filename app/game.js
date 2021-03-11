const Project = require('./project');

class Game {
  constructor(rollProvider) {
    this.rollProvider = rollProvider;
    this.project = new Project()
  }

  getCurrentScore() {
    return this.project.getCurrentScore();
  }

  play() {
    let roll = this.rollProvider.getRoll();
    this.project.lancer(roll);
  }
}

module.exports = Game;