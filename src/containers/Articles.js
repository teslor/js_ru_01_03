import React, { Component, PropTypes } from 'react'
import { delArticle } from '../actions/articles'
import { connect } from 'react-redux'

class Articles extends Component {
    static propTypes = {
        articles: PropTypes.array,
        delArticle: PropTypes.func,
    };

    render() {
        const { articles, delArticle } = this.props
        
        const articleItems = articles.map((article) =>
            <li key={article.id}>
                <h3>{article.title}</h3><a href = "#" onClick = {delArticle.bind(null, { id: article.id })}>delete</a>
            </li>
        )
        return (
            <div>
                <ul>
                    {articleItems}
                </ul>
            </div>
        )        
    }
}

export default connect((state) => {
    const { articles } = state
    return { articles }
}, {
    delArticle
})(Articles)