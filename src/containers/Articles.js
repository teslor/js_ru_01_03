import React, { Component, PropTypes } from 'react'
import ArticleList from '../components/ArticleList'
import { articleStore, userStore } from '../stores'
import { signIn } from '../actions/user'

class Articles extends Component {
    constructor() {
        super()
        this.state = {
            articles: articleStore.getOrLoadAll(),
            loading: articleStore.loading,
            name: ''
        }
    }

    static contextTypes = {
        router: PropTypes.object,
        dict: PropTypes.object       
    }

    static childContextTypes = {
        user: PropTypes.string
    }

    getChildContext() {
        return {
            user: this.state.user//this.state.user
        }
    }

    componentDidMount() {
        articleStore.addChangeListener(this.articlesChanged)
        userStore.addChangeListener(this.userChanged)
    }

    componentWillUnmount() {
        articleStore.removeChangeListener(this.articlesChanged)
        userStore.removeChangeListener(this.userChanged)
    }

    articlesChanged =() => {
        this.setState({
            articles: articleStore.getOrLoadAll(),
            loading: articleStore.loading
        })
    }

    render() {
        const { articles, loading } = this.state
        const { app_loading, art_new, sign_in } = this.context.dict
        if (loading) return <h1>{ app_loading ? app_loading : 'Loading...'}</h1>
        return (
            <div>
                <h3 onClick = {this.goToNewArticle}>{ art_new ? art_new : 'New Article'}</h3>
                <input value={this.state.name} onChange = {this.changeName}/>
                <a href="#" onClick = {this.signIn} >{ sign_in ? sign_in : 'sign in'}</a>
                <ArticleList articles = {articles}/>
                {this.props.children}
            </div>
        )
    }

    changeName = (ev) => {
        this.setState({
            name: ev.target.value
        })
    }

    userChanged = () => {
        this.setState({
            user: userStore.currentUser
        })
    }

    signIn = (ev) => {
        ev.preventDefault()
        signIn(this.state.name)
    }

    goToNewArticle = () => {
//        this.context.router.push('/articles/new')
        this.context.router.replace('/articles/new')
    }
}

export default Articles