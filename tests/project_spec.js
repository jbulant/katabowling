const assert = require('assert');
const expect = require('chai').expect;
const sinon = require('sinon')
const Project = require('../app/project.js');

describe('Project Test', () => {

/* TESTS LIST
    - test lancer
        - est un nombre en 0 et 10
        - le premier lancer d'une frame est un nombre 0 10
            - tester un nombre se trouvant entre 0 et 10
            - tester un nombre ne se trouvant pas entre 0 et 10
        - le second lancer d'une frame est la différence du précedent par rapport 10
            - tester une valeur ne dépassant pas 10 en ajoutant le précédent lancer
            - tester une valeur dépassant 10 en ajoutant le précédent lancer
        - valeur retournée:
            - la valeur du premier lancer est retournée
            - la valeur du second lancer est retournée en addition du premier
            - la valeur du troisième lancer est à nouveau retournée
    - test frame
        - est constituée de 2 lancer
        


    - test partie
        - est constituée de 10 frame

 */

 /*
    methods
    - lancer
        - si premier d'une frame enregistre une valeur entre 0 et 10
        - si second d'une frame enregistre une valeur

        const lancer1 = 7;
        const lancer2 = 2;
        project.lancer(lancer1)
        project.lancer(lancer2)
        project.getCurrentScore() == lancer1 + lancer2
        !- si je lance 7 au premier tour la valeur retournée sera 7
        !- si je lance 2 au second tour la valeur retournée sera 9
        !- si je lance 3 au second premier tour la valeur retournée sera 3
    !- getCurrentFrame
    !    - retourne une valeur entre 1 et 10
    - getCurrentScore
        - retourne le score actuel

    !private:
    !    - gameState
    !        - retourne 'started' ou 'finished'
    
  */
    context('Score simple', () => {
        it('le score apres un lancer doit etre la valeur de ce dernier', () => {
            const project = new Project();
            const lancer = 5;

            project.lancer(lancer);
            expect(project.getCurrentScore()).to.equal(lancer);
        })
        it('le score correspond au total de plusieurs lancers', () => {
            const project = new Project();
            const lancer1 = 5;
            const lancer2 = 3;
            const lancer3 = 8;

            project.lancer(lancer1);
            project.lancer(lancer2);
            project.lancer(lancer3);
            expect(project.getCurrentScore()).to.equal(lancer1 + lancer2 + lancer3);
        })
    })
    context('Score spare', () => {
        it('le score correspond au nombre de points gagnés est le nombre de quilles tombées plus les points du lancer suivant', () => {
            const project = new Project();
            const lancer1 = 3;
            const lancer2 = 7;
            const lancer3 = 1;

            project.lancer(lancer1);
            project.lancer(lancer2);
            project.lancer(lancer3);
            expect(project.getCurrentScore()).to.equal(lancer1 + lancer2 + 2 * lancer3);
        })
    })
    context('Score strike', () => {
        it('le score correspond au nombre de points gagnés est le nombre de quilles tombées plus les points des 2 lancers suivants', () => {
            const project = new Project();
            const lancer1 = 10;
            const lancer2 = 7;
            const lancer3 = 1;

            project.lancer(lancer1);
            project.lancer(lancer2);
            project.lancer(lancer3);
            expect(project.getCurrentScore()).to.equal(lancer1 + 2 * (lancer2 + lancer3));
        })
    })
    context('Fin de partie', () => {
        it('le score se termine à la fin de la 10ème frame', () => {
            const project = new Project();
            const lancers = [
                3, 2,
                7, 0,
                8, 1,
                0, 0,
                5, 1,
                3, 6,
                8, 0,
                1, 5,
                4, 5,
                7, 2
            ];
            for (let lancer of lancers) // effectue tout les lancers présents dans la variable "lancers"
                project.lancer(lancer);
            const score = lancers.reduce((ag, v) => ag + v, 0);
            expect(project.getCurrentScore()).to.equal(score);

            const lancer_en_trop = 4;
            project.lancer(lancer_en_trop);
            expect(project.getCurrentScore()).to.equal(score);
        })
        it("le score se termine sur 1 lancer bonus lorsqu'un spare est effectué sur le dernier tour", () => {
            const project = new Project();
            const lancers = [
                3, 2,
                7, 0,
                8, 1,
                0, 0,
                5, 1,
                3, 6,
                8, 0,
                1, 5,
                4, 5,
                7, 3
            ];
            for (let lancer of lancers) // effectue tout les lancers présents dans la variable "lancers"
                project.lancer(lancer);
            const score = lancers.reduce((ag, v) => ag + v, 0);
            expect(project.getCurrentScore()).to.equal(score);

            const lancer_bonus = 10;
            project.lancer(lancer_bonus);
            const lancer_en_trop = 4;
            project.lancer(lancer_en_trop);
            expect(project.getCurrentScore()).to.equal(score + lancer_bonus);
        })
    })
})
