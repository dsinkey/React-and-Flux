'use strict';

var Dispatcher = require('../dispatcher/appDispatcher');
var CourseApi = require('../api/courseApi');
var ActionTypes = require('../constants/actionTypes');

var CourseActions = {
    createCourse: function(course) {
        var savedCourse = CourseApi.saveCourse(course);
        Dispatcher.dispatch({
            actionType: ActionTypes.CREATE_COURSE,
            course: savedCourse
        });
    },

    updateCourse: function(course) {
		var updatedCourse = CourseApi.saveCourse(course);

		//This is the action creator.
		Dispatcher.dispatch({
			actionType: ActionTypes.UPDATE_COURSE,
			course: updatedCourse
		});
	},

    deleteCourse: function(id) {
        CourseApi.deleteCourse(id);

        Dispatcher.dispatch({
            actionType: ActionTypes.DELETE_COURSE,
            id: id
        });
    }
};

module.exports = CourseActions;
