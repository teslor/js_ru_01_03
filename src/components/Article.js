import React, { Component, PropTypes } from 'react'
import {findDOMNode} from 'react-dom'
import CommentList from './CommentList'
import { deleteArticle, loadArticleById } from '../actions/articles'

function isEqual(obj1, obj2) {

    //todo implement
    return false
}

class Article extends Component {
    static propTypes = {
        isOpen: PropTypes.bool,
        article: PropTypes.object.isRequired
    }
    
    static contextTypes = {
        dict: PropTypes.object       
    }    

    render() {
        const { art_del } = this.context.dict
        return (
            <div ref="container">
                <a href = "#" onClick = {this.handleDelete}>{ art_del ? art_del : 'delete'}</a>
                {this.getTitle()}
                {this.getBody()}
            </div>
        )
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !isEqual(nextProps, this.props)
    }

    handleDelete = (ev) => {
        ev.preventDefault()
        deleteArticle(this.props.article.id)
    }

    getBody() {
        const { article, isOpen } = this.props
        const { art_loading } = this.context.dict
        if (article.loading) return <h3>{ art_loading ? art_loading : 'Loading article...'}</h3>
        return (
            <div>
                <p>{article.text}</p>
                {this.getCommentList()}
            </div>
        )
    }

    getCommentList() {
        const { art_comments } = this.context.dict
        return  <CommentList ref= "comments"
                             article = {this.props.article}
        >
            <h3>{ art_comments ? art_comments : 'Comments for article'} {this.props.article.id}</h3>
        </CommentList>
    }

    addComment = (comment) => {
        addComment(comment, this.props.article.id)
    }

    getTitle() {
        const { article: { title }, openArticle  } = this.props
        return  (
            <h3 onClick={openArticle}>
                {title}
            </h3>
        )
    }
}

export default Article