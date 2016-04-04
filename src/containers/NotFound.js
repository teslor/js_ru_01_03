import React, { Component, PropTypes } from 'react'

class NotFound extends Component {
    static propTypes = {

    };

    static contextTypes = {
        dict: PropTypes.object       
    }

    render() {
        const { not_found } = this.context.dict
        return (
            <div>
                <h1>{ not_found ? not_found : 'Not Found'}</h1>
            </div>
        )
    }
}

export default NotFound