'use strict';

var Dispatcher = require('../dispatcher/appDistpatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var Assign = require('object-assign');
var CHANGE_EVENT = 'change';

var AuthorStore = assign({}, EventEmitter.prototype, {
    addChangeListener: function(callback){
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback){
        this.removeListener(CHANGE_EVENT, callback);
    },

    emitChange: function(){
        this.emitChange(CHANGE_EVENT);
    }
});



module.exports = AuthorStore;
