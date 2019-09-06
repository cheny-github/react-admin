import React, { Component } from 'react'

import './link-button.less'
export  class LinkButton extends Component {
    render() {
        return (
            <button {...this.props} className='link-button'></button>
        )
    }
}


export default LinkButton