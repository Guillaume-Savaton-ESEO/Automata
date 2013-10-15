
namespace(this, "automata.model", function (exports, globals) {
    "use strict";

    exports.State = Object.create(exports.Model).augment({
        init: function (stateMachine) {
            exports.Model.init.call(this);
            
            this.name = "State" + this.id;
            this.stateMachine = stateMachine;
            
            this.encoding = stateMachine.stateVars.map(function () { return "0"; }),
            this.outgoingTransitions = [];
            this.incomingTransitions = [];
            
            return this;
        },
        
        destroy: function () {
            while (this.outgoingTransitions.length) {
                this.stateMachine.removeTransition(this.outgoingTransitions[0]);
            }
            while (this.incomingTransitions.length) {
                this.stateMachine.removeTransition(this.incomingTransitions[0]);
            }
        },
        
        setName: function (name) {
            this.name = name;
            
            this.fire("changed");
            
            return this;
        },
        
        setEncoding: function (index, value) {
            this.encoding[index] = value;
            
            this.fire("changed");
            
            return this;
        },

        addOutgoingTransition: function (transition) {
            this.outgoingTransitions.push(transition);
            return this;
        },
        
        removeOutgoingTransition: function (transition) {
            var index = this.outgoingTransitions.indexOf(transition);
            this.outgoingTransitions.splice(index, 1);
            return this;
        },
        
        addIncomingTransition: function (transition) {
            this.incomingTransitions.push(transition);
        },
        
        removeIncomingTransition: function (transition) {
            var index = this.incomingTransitions.indexOf(transition);
            this.incomingTransitions.splice(index, 1);
            return this;
        },
        
        getTransitionsToState: function (state) {
            return this.outgoingTransitions.filter(function (transition) {
                return transition.targetState === state;
            });
        },
        
        getMooreActions: function () {
            if (this.outgoingTransitions.length) {
                return this.stateMachine.world.actuators.filter(function (q, index) {
                    return this.outgoingTransitions.every(function (transition) {
                        return transition.outputs[index] === "1";
                    }, this);
                }, this);
            }
            else {
                return [];
            }
        },
    });
});
