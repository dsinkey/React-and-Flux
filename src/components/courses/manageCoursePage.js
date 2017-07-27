'use strict';

var React = require('react');
var Router = require('react-router');
var CourseForm = require('./courseForm');
var CourseActions = require('../../actions/courseActions');
var CourseStore = require('../../stores/courseStore');
var toastr = require('toastr');

var ManageCoursePage = React.createClass({
    mixins: [
        Router.Navigation
    ],

    statics: {
        willTransitionFrom: function(transtion, component){
            if(component.state.dirty && !confirm('Leave without saving?')){
                transtion.abort();
            }
        }
    },

    getInitialState: function(){
        return {
            course: {id: '', title: '', length: '', category: '', author: {name: '', id: ''}},
            errors: {},
            dirty: false
        };
    },

    componentWillMount: function() {
        var courseId = this.props.params.id; //from the path 'course/:id'

        if(courseId){
            this.setState({course: CourseStore.getCourseById(courseId)});
        }
    },

    setCourseState: function(event) {
        this.setState({dirty: true});
		var field = event.target.name;
		var value = event.target.value;
		this.state.course[field] = value;
		return this.setState({course: this.state.course});
	},

    courseFormIsValid: function(){
        var formIsValid = true;
        this.state.errors = {};

        // if (this.state.course.firstName.length < 3){
        //     this.state.errors.firstName = 'First name must be at least 3 characters.';
        //     formIsValid = false;
        // }
        //
        // if (this.state.course.lastName.length < 3){
        //     this.state.errors.lastName = 'Last name must be at least 3 characters.';
        //     formIsValid = false;
        // }

        this.setState({errors: this.state.errors});
        return formIsValid;
    },

    saveCourse: function(event){
        event.preventDefault();

        if(!this.courseFormIsValid()){
            return;
        }

        if(this.state.course.id){
            CourseActions.updateCourse(this.state.course);
        } else {
            CourseActions.createCourse(this.state.course);
        }

        toastr.success('Course Saved');
        this.setState({dirty: false});
        this.transitionTo('courses');
    },

    render: function() {
        return (
            <CourseForm
                course={this.state.course}
                onSave={this.saveCourse}
                onChange={this.setCourseState}
                errors={this.state.errors}
            />
        );
    }
});

module.exports = ManageCoursePage;
