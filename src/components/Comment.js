import React, { Component, PropTypes } from 'react'

class Comment extends Component {
    static propTypes = {
        comment: PropTypes.object
    };

    static contextTypes = {
        user: PropTypes.string,
        dict: PropTypes.object        
    }

    render() {
        const { app_user } = this.context.dict
        return (
            <div>
                { app_user ? app_user : 'Current user'}: {this.context.user}
                <p>{this.props.comment.text}</p>
            </div>
        )
    }
}

export default Comment