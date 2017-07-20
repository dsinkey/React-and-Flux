'use strict';

var React = require('react');
var Router = require('react-router');
var AuthorForm = require('./authorForm');
var AuthorActions = require('../../actions/authorActions');
var AuthorStore = require('../../stores/authorStore');
var toastr = require('toastr');

var ManageAuthorPage = React.createClass({
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
            author: {id: '', firstName: '', lastName: ''},
            errors: {},
            dirty: false
        };
    },

    componentWillMount: function() {
        var authorId = this.props.params.id; //from the path 'author/:id'

        if(authorId){
            this.setState({author: AuthorStore.getAuthorById(authorId)});
        }
    },

    setAuthorState: function(event) {
        this.setState({dirty: true});
		var field = event.target.name;
		var value = event.target.value;
		this.state.author[field] = value;
		return this.setState({author: this.state.author});
	},

    authorFormIsValid: function(){
        var formIsValid = true;
        this.state.errors = {};

        if (this.state.author.firstName.length < 3){
            this.state.errors.firstName = 'First name must be at least 3 characters.';
            formIsValid = false;
        }

        if (this.state.author.lastName.length < 3){
            this.state.errors.lastName = 'Last name must be at least 3 characters.';
            formIsValid = false;
        }

        this.setState({errors: this.state.errors});
        return formIsValid;
    },

    saveAuthor: function(event){
        console.log("saveAuthor");
        event.preventDefault();

        if(!this.authorFormIsValid()){
            return;
        }
        console.log("before AuthorActions");
        AuthorActions.createAuthor(this.state.author);
        console.log("after AuthorActions");
        toastr.success('Author Saved');
        this.setState({dirty: false});
        this.transitionTo('authors');
    },

    render: function() {
        return (
            <AuthorForm
                author={this.state.author}
                onSave={this.saveAuthor}
                onChange={this.setAuthorState}
                errors={this.state.errors}
            />
        );
    }
});

module.exports = ManageAuthorPage;
