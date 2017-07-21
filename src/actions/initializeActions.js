'use strict';

var Dispather = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var AuthorApi = require('../api/authorApi');

var InitializeActions = {
    initApp: function() {
        Dispather.dispatch({
            actionType: ActionTypes.INITIALIZE,
            initialData: {
                authors: AuthorApi.getAllAuthors()
            }
        });
    }
};

module.exports = InitializeActions;
