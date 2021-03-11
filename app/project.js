const MAX_LANCERS = 20;
const SPARE = 10;

class Project {

    constructor(){
        this.score = 0;
        this.nb_lancer = 0;
        this.previousFrameScore = 0; ///
    }
    _isNewFrame() {
        return this.nb_lancer % 2 === 0;
    }

    lancer(value) {
        if (this.nb_lancer < MAX_LANCERS) { // sinon partie terminée
            this.score += value;
            if (this._isNewFrame()) {
                if (this.previousFrameScore === SPARE) { // cas spare
                    this.score += value;
                }
                this.previousFrameScore = value;
            } else { // meme frame
                this.previousFrameScore += value;
            }
            this.nb_lancer++;
        } else if (this.previousFrameScore === SPARE) {
            this.score += value;
            this.previousFrameScore = 0;
        }
    }
    getCurrentScore() {
        return this.score;
    }
}

module.exports = Project
