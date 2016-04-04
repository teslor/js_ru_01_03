import React, { Component, PropTypes } from 'react'
import { localeStore, userStore } from '../stores'

class App extends Component {
    static propTypes = {

    }

    state = {   
        dict: localeStore.getOrLoadDict('rus'),
        loggedIn: !!userStore.currentUser
    }

    static childContextTypes = {
        dict: PropTypes.object,
        loggedIn: PropTypes.bool
    }
    
    getChildContext() {
        return { 
            dict: this.state.dict,
            loggedIn: this.state.loggedIn
        }
    }

    componentDidMount() {
        localeStore.addChangeListener(this.localeOrUserChanged)
        userStore.addChangeListener(this.localeOrUserChanged)
    }

    componentWillUnmount() {
        localeStore.removeChangeListener(this.localeOrUserChanged)
        userStore.removeChangeListener(this.localeOrUserChanged)
    }

    render() {
        const { id, app_name } = this.state.dict
        return (
            <div style={ id ? {} : { visibility: 'hidden' }}>
                <a href="#" onClick = {this.changeLang} >eng</a>
                <span> | </span>
                <a href="#" onClick = {this.changeLang} >rus</a>
                <h1>{ app_name ? app_name : 'News App Name!'}</h1>
                {this.props.children}
            </div>
        )
    }

    changeLang = (ev) => {
        this.setState({
            dict: localeStore.getOrLoadDict(ev.target.innerHTML),
            loggedIn: !!userStore.currentUser
        })        
    }
    
    localeOrUserChanged = () => {
        this.setState({
            dict: localeStore.getOrLoadDict(localeStore.currentLang),
            loggedIn: !!userStore.currentUser
        })
    }    
}

export default App