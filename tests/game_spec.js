const assert = require('assert');
const expect = require('chai').expect;
const sinon = require('sinon')
const Game = require('../app/game.js');

describe('Game Test', () => {
    context('Objet Game', () => {
        it('le rollProvider est bien utilisé', () => {
            let currentRollIndex = 0;
            const rolls = [5, 3, 8, 1];
            const rollProvider = {
                getRoll: function() {
                   return rolls[currentRollIndex++]
                }
            };
            const game = new Game(rollProvider);

            game.play()
            game.play()
            game.play()
            game.play()
            expect(game.getCurrentScore()).to.equal(17)
        })

        it('test avec le stub sinon', () => {
            const rollProvider = {
                getRoll: sinon.stub()
            };
            const game = new Game(rollProvider);

            rollProvider.getRoll.onCall(0).returns(5)
            rollProvider.getRoll.onCall(1).returns(3)
            rollProvider.getRoll.onCall(2).returns(8)
            rollProvider.getRoll.onCall(3).returns(1)
            game.play()
            game.play()
            game.play()
            game.play()
            expect(game.getCurrentScore()).to.equal(17)
        })

        it("test l'affichage du score en fin de partie", () => {
            // simulation stub rollProvider
            const rollProvider = {
                getRoll: sinon.stub()
            };
            var consoleDisplayer = { displayToConsole: function (){}, func: function(){} };

            const consoleDisplayerMock = sinon.mock(consoleDisplayer)
            const game = new Game(rollProvider, consoleDisplayer);
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
            const score = lancers.reduce((ag, v) => ag + v, 0);
            consoleDisplayerMock.expects('displayToConsole').once().withArgs(score)
            for (let index in lancers) {
                rollProvider.getRoll.onCall(index).returns(lancers[index])
                game.play()
            }
            consoleDisplayerMock.verify()
        })
    })
})
