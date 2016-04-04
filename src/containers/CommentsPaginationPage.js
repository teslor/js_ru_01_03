import React, { Component, PropTypes } from 'react'
import {commentStore} from '../stores'

class CommentsPaginationPage extends Component {
    static propTypes = {

    }
    
    static contextTypes = {
        dict: PropTypes.object
    }
    
    componentDidMount() {
        commentStore.addChangeListener(this.change)
    }

    componentWillUnmount() {
        commentStore.removeChangeListener(this.change)
    }

    constructor(props) {
        super(props)
        const { page } = props.params
        this.state = this.getState(page)
    }

    getState(page) {
        return {
            comments: commentStore.getOrLoadForPage(page),
            loading: commentStore.loading.includes(page),
            loaded: commentStore.loaded[page]
        }
    }

    change = (props) => {
        const { page } =  (props || this.props).params
        this.setState(this.getState(page))
    }

    componentWillReceiveProps(props) {
        this.change(props)
    }

    render() {
        const { loading, loaded, comments } = this.state
        const { app_loading } = this.context.dict
        if (!loaded || loading) return <h1>{ app_loading ? app_loading : 'Loading...'}</h1>
        if (!comments.length) return <h1>Sorry, no comments here</h1>
        const commentItems = comments.map(comment =>
            <li key = {comment.id}>{comment.text}</li>
        )
        return (
            <div>
                <ul>
                    {commentItems}
                </ul>
            </div>
        )
    }
}

export default CommentsPaginationPage