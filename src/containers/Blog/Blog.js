import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

import './Blog.css';
// Importing this way will tell webpack to include it in the global bundle
import Posts from './Posts/Posts';

// Lazy loading wants to import it when we need it (good for bigger apps)
// Instead of this:
// import NewPost from './NewPost/NewPost';
// Do this:
import asyncComponent from '../../hoc/asyncComponent';
const AsyncNewPost = asyncComponent(() => {
    // Dynamic import syntax
    // NewPost is only imported when @AsyncNewPost is used somewhere
    return import('./NewPost/NewPost');
});


class Blog extends Component {
    state = {
        auth: true,
    }

    render () {
        return (
            <div className='Blog'>
                <header>
                    <nav>
                        <ul>
                            {/* @activeClassName renames @active to whatever you specify */}
                            {/* activeStyle overrides any css classes */}
                            <li><NavLink 
                                to='/posts'
                                exact
                                activeClassName='my-active'
                                activeStyle={{
                                    color: 'blue',
                                    textDecoration: 'underline',
                                }}>Posts</NavLink></li>
                            {/* Can use @hash to jump to a scroll position */}
                            {/* Can parse @search for search term queries */}
                            {/* @pathname will always be appened to the root 
                            domain. It is always treated as an absolute path. 
                            You must build the @pathname dynamically to use
                            relative paths */}
                            <li><NavLink 
                                to={{
                                    // Below is an example for building the relative path
                                    // pathname: this.props.match.url + '/new-post',
                                    pathname: '/new-post',
                                    hash: '#submit',
                                    search: '?quick-submit=true'
                                }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>

                {/* @exact prop for the @Route object forces @Route to look at 
                the exact path and not if the path starts with "/" */}
                {/* <Route path='/' exact render={() => <h1>Home</h1>}/>
                <Route path='/' render={() => <h1>Home2</h1>}/> */}

                {/* Default case below */}
                {/* React will always try to render all routes if the url matches
                the @path prop in @Route. */}
                {/* The @Switch component tells React to only render the FIRST
                route whose @path prop matches the url */}
                {/* This means that the ORDER of the Routes matters */}
                {/* You can have @Routes outside of a @Switch (mix and match) */}
                <Switch>
                    {/* Should only need to download new components for bigger applications when you need it */}
                    {/* This is known as lazy loading */}
                    {this.state.auth ? <Route path='/new-post' component={AsyncNewPost}/> : null}
                    <Route path='/posts' component={Posts}/>
                    {/* Below is an example of how to handle 404 cases */}
                    <Route render={() => <h1>Not found</h1>}/>
                    {/* Ensures the user is redirected to the correct route */}
                    {/* <Redirect from='/' to='/posts' /> */}
                    {/* <Route path='/' component={Posts}/> */}
                </Switch>
            </div>
        );
    }
}

export default Blog;
