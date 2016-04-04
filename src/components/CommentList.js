import React, { Component, PropTypes } from 'react'
import Comment from './Comment'
import toggleOpen from '../HOC/toggleOpen'
import linkedState from 'react-addons-linked-state-mixin'
import { addComment, loadCommentsForArticle } from '../actions/comments'

const CommentList = React.createClass({
    mixins: [linkedState],
    propTypes: {
        article: PropTypes.object
    },
    contextTypes: {
        user: PropTypes.string,
        dict: PropTypes.object       
    },
    getInitialState() {
        return {
            comment: ''
        }
    },
    componentWillReceiveProps(nextProps) {
        const { article, isOpen } = nextProps
        if (article.loadedComments || article.loadingComments) return

        if (isOpen && !this.props.isOpen) loadCommentsForArticle({id: article.id})
    },
    render() {
        const { isOpen, toggleOpen, article,children } = this.props
        const { coms_show, coms_hide } = this.context.dict
        const actionText = isOpen ? (coms_hide ? coms_hide : 'hide comments') : (coms_show ? coms_show : 'show comments')
        return (
            <div>
                {children}
                <a href = "#" onClick = {toggleOpen}>{actionText}</a>
                {this.getList()}
                {this.getInput()}
            </div>
        )
    },
    getInput() {
        const { com_add } = this.context.dict
        if (!this.props.isOpen) return null
        return <div>
            <input valueLink={this.linkState("comment")}/>
            <a href = "#" onClick = {this.addComment}>{ com_add ? com_add : 'add comment'}</a>
        </div>
    },

    getList() {
        const {isOpen, article} = this.props
        const { coms_loading } = this.context.dict
        if (!isOpen) return null
        if (article.loadingComments) return <h3>{ coms_loading ? coms_loading : 'Loading comments...'}</h3>
        if (!article.loadedComments) return null
        const commentItems = article.getRelation('comments').map((comment) => <li key={comment.id}><Comment comment = {comment}/></li>)
        return <ul>{commentItems}</ul>
    },

    addComment(ev) {
        ev.preventDefault()
        const { user } = this.context
        addComment(this.props.article.id, (user ? user + ': ' : '') + this.state.comment)
        this.setState({
            comment: ''
        })
    }
})

export default toggleOpen(CommentList)