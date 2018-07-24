import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null,
    }

    // Changed from @componentDidUpdate to @componentDidMount because we are
    // adding or removing this component from the DOM
    componentDidMount() {
        console.log(this.props)
        this.loadData();
    }

    componentDidUpdate() {
        this.loadData();
    }

    loadData = () => {
        if (this.props.match.params.id) {
            // Only make a new request if we've never loaded a post before, OR 
            // if we are loading a different post
            // TODO: What if we want to get new data for the same post?
            // @+ in front converts a string to a number
            if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== +this.props.match.params.id)) {
                axios.get('/posts/' + this.props.match.params.id)
                .then(response => {
                    // Calling @setState inside @componentDidUpdate will cause an
                    // infinite loop, since a call to @setState also triggers 
                    // a call to @componentDidUpdate
                    this.setState({loadedPost: response.data})
                });
            }
        }
    }

    deletePostHandler = () => {
        axios.delete('/posts/' + this.props.match.params.id)
            .then(response => {
                console.log(response);
            });
    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;

        if (this.props.match.params.id)
            post = <p style={{textAlign: 'center'}}>Loading...</p>;

        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    {/* loadedPost.title at this point may not exist because 
                    although we get a valid id, we may not get a valid title 
                    immediately */}
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
                    </div>
                </div>
    
            );
        }
        return post;
    }
}

export default FullPost;