'use strict';

var Dispather = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var AuthorApi = require('../api/authorApi');
var CourseApi = require('../api/courseApi');

var InitializeActions = {
    initApp: function() {
        Dispather.dispatch({
            actionType: ActionTypes.INITIALIZE,
            initialData: {
                authors: AuthorApi.getAllAuthors(),
                courses: CourseApi.getAllCourses()
            }
        });
    }
};

module.exports = InitializeActions;
