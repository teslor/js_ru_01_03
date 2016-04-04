import React, { Component, PropTypes } from 'react'
import history  from '../history'

class NewArticle extends Component {
    static propTypes = {

    }

    static contextTypes = {       
        dict: PropTypes.object,
        loggedIn: PropTypes.bool        
    }
    
    componentWillMount() {
        if (!this.context.loggedIn) {
            history.replace('/articles')
        }
    }

    render() {
        const { art_new } = this.context.dict
        return (
            <div>
                <h2>{ art_new ? art_new : 'New Article'}</h2>
            </div>
        )
    }
}

export default NewArticle