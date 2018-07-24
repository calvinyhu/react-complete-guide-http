import React, {Component} from 'react';
import axios from '../../../axios';
import { Route } from 'react-router-dom';

import './Posts.css';
import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost';

class Posts extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false,
    }

    // Good function for causing side-effects (i.e. HTTP requests)
    componentDidMount() {
        console.log(this.props);

        // @posts won't contain the data we went since, JavaScript doesn't wait 
        // for the @get request to finish. Therefore posts may be undefined.
        // const posts = axios.get('https://jsonplaceholder.typicode.com/posts');

        // axios @get returns Promises, therefore we can chain @then on it
        // @then will wait for the Promise to resolve; once the data from the 
        // back-end is there we can save it.
        axios.get('/posts')
            .then(response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Calvin',
                    }
                })
                this.setState({posts: updatedPosts});
            })
            .catch(error => {
                console.log(error);
                // this.setState({error: true});
            });
        // Immediately calling @setState after the get request won't work,
        // because the data from @get might not have been fetched yet. Therefore,
        // we should call @setState inside the chained @then function.
        // this.setState();
    }
    
    postSelectedHandler = (id) => {
        // Both work
        // this.props.history.push({pathname: '/posts' + id});
        this.props.history.push('/posts/' + id);
    }

    render() {
        let posts = <p style={{textAlign: "center"}}>Something went wrong!</p>;
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                    // <Link to={'/posts' + post.id} key={post.id}>
                        <Post
                        key={post.id}
                        title={post.title}
                        author={post.author}
                        // Few ways to pass on props of the routing object
                        // Use @withRouter instead and wrap the component that needs
                        // info from the nearest routed component
                        // match={this.props.match}
                        // {...this.props}
                        clicked={() => this.postSelectedHandler(post.id)} />
                    // </Link>
                );
            });
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                {/* @:id is replaced dynammically, called a flexible route parameter*/}
                <Route path={this.props.match.url + '/:id'} exact component={FullPost}/>
            </div>
        );
    }
}

export default Posts;
