const MAX_LANCERS = 20;
const SPARE_BONUS = 1;
const STRIKE_BONUS = 2;
const MAX_SCORE_LANCER = 10;
/*
    Descriptions des lancers:
    spare
        - premier lancer (dans une frame)
            => doubler score, changer figure -> none
        - derniere frame
            => 1 lancer bonus
    strike
        - les deux lancers d'une frame
            => doubler score
        - derniere frame
            => 2 lancers bonus
    commun
        si premier lancer == 10 => figure -> strike + nb_lancer++
        si second lancer + premier == 10 => figure -> spare
        nb_lancer++
*/
class Project {

    constructor(){
        this.score = 0;
        this.nb_lancer = 0;
        this.previousFrameScore = 0;
        this.previousFigure = 'none';
        this.gameState = 'started';
    }
    _isNewFrame() {
        return this.nb_lancer % 2 === 0;
    }
    _lancerStrike(value) {
        if (this.nb_lancer < MAX_LANCERS) {
            this.score += value * 2;
            if (this._isNewFrame() == false)
                this.previousFigure = 'none';
        } else if (this.nb_lancer < MAX_LANCERS + STRIKE_BONUS) {
            this.score += value;
            this.nb_lancer++;
            if (this.nb_lancer == MAX_LANCERS + STRIKE_BONUS ) 
                this.gameState = 'finished';
        }
    }
    _lancerSpare(value) {
        if (this.nb_lancer < MAX_LANCERS) {
            this.score += value * 2;
        } else if (this.nb_lancer < MAX_LANCERS + SPARE_BONUS) {
            this.score += value;
            this.gameState = 'finished'
        }
        this.previousFigure = 'none';
    }
    lancer(value) {
        if (this.previousFigure === 'spare')
            this._lancerSpare(value);
        else if (this.previousFigure === 'strike')
            this._lancerStrike(value);
        else if (this.nb_lancer < MAX_LANCERS) { // sinon partie terminée
           if (this._isNewFrame()) {
                this.score += value;
                this.previousFrameScore = value;
                if (value == MAX_SCORE_LANCER) {
                    this.previousFigure = 'strike';
                    this.nb_lancer++;
                }
           } else { // meme frame
                this.score += value;
                this.previousFrameScore += value;
                if (this.previousFrameScore === MAX_SCORE_LANCER)
                    this.previousFigure = 'spare';
                else if ( this.nb_lancer ==  MAX_LANCERS - 1)
                    this.gameState = 'finished'
           }
           this.nb_lancer++;
       }
   }
    getCurrentScore() {
        return this.score;
    }
    isGameOver() {
        return this.gameState === 'finished';
    }
}

module.exports = Project
