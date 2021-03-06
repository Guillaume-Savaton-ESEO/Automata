
namespace("automata.games.robot", function (exports) {
    "use strict";

    exports.Cornered = {
        key: "automata.games.robot.Cornered",
        view: exports.WorldView,

        world: exports.World.create({
            width: 600,
            height: 400,

            walls: [
                [0,   0,   600, 10],
                [0,   390, 600, 400],
                [0,   0,   10,  400],
                [590, 0,   600, 400]
            ],

            startX: 30,
            startY: 30,

            goalX: 570,
            goalY: 370,
            goalRadius: 15
        })
    };
});
