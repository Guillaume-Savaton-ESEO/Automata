module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        nunjucks: {
            precompile: {
                src: "templates/*",
                dest: "build/automata.templates.js"
            }
        },
        
        uglify: {
            "automata.core": {
                src: [
                    'js/namespace.js',
                    'js/main.js',
                    'js/shims/*.js',
                    'js/model/Model.js',
                    'js/model/State.js',
                    'js/model/Transition.js',
                    'js/model/StateMachine.js',
                    'js/model/World.js',
                    'js/view/View.js',
                    'js/view/TransitionTable.js',
                    'js/view/ControlView.js',
                    'js/view/Diagram.js',
                    'js/storage/LocalStorage.js',
                    "<%= nunjucks.precompile.dest %>"
                ],
                dest: 'build/automata.core.min.js'
            },
            "automata.games.robot.Maze": {
                src: [
                    'games/robot/World.js',
                    'games/robot/WorldView.js',
                    'games/robot/Maze.js'
                ],
                dest: "build/automata.games.robot.Maze.min.js"
            }
        }
    });
    
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-nunjucks");
    
    // Default task(s).
    grunt.registerTask('default', ["nunjucks", "uglify"]);

};