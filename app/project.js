const MAX_LANCERS = 20;
const SPARE = 10;

class Project {

    constructor(){
        this.score = 0;
        this.nb_lancer = 0;
        this.previousFrameScore = 0;
        this.previousFigure = 'none';
    }
    _isNewFrame() {
        return this.nb_lancer % 2 === 0;
    }
    /*
    spare - lancer
        premier lancer (dans une frame)
            doubler score, changer figure -> none
        derniere frame
            1 lancer bonus
    strike - lancer
        les deux lancers d'une frame
            doubler score
        derniere frame
            2 lancers bonus
    commun - lancer
        si premier lancer == 10 => figure -> strike + nb_lancer++
        si second lancer + premier == 10 => figure -> spare
        nb_lancer++
    */
//    _lancerStrike(value) {

//    }
   _lancerSpare(value) {
    if (this.nb_lancer < MAX_LANCERS) { // sinon partie terminée
        this.score += value * 2;
    } else if (this.nb_lancer == MAX_LANCERS) {
        this.score += value;
        this.previousFrameScore = 0;
    }
    this.previousFigure = 'none';
   }
   lancer(value) {
        if (this.previousFigure === 'spare')
            this._lancerSpare(value);
        else if (this.nb_lancer < MAX_LANCERS) { // sinon partie terminée
           if (this._isNewFrame()) {
                // verif figure
                this.score += value;
                this.previousFrameScore = value;
                // cas verif strike value == 10
           } else { // meme frame
                this.score += value;
                // cas verif spare previousFrameScore == 10
               this.previousFrameScore += value;
               if (this.previousFrameScore === 10)
                this.previousFigure = 'spare';
           }
           this.nb_lancer++;
       }
   }
//    lancer(value) {
//        if (this.nb_lancer < MAX_LANCERS) { // sinon partie terminée
//            this.score += value;
//            if (this._isNewFrame()) {
//                // verif figure
//                if (this.previousFrameScore === SPARE) { // cas spare
//                    this.score += value;
//                }
//                this.previousFrameScore = value;
//                // cas verif strike value == 10
//            } else { // meme frame
//                // cas verif spare previousFrameScore == 10
//                this.previousFrameScore += value;
//            }
//            this.nb_lancer++;
//        } else if (this.previousFrameScore === SPARE) {
//            this.score += value;
//            this.previousFrameScore = 0;
//        }
//    }
    getCurrentScore() {
        return this.score;
    }
}

module.exports = Project
