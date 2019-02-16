import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import SliderItem from '../slider/SliderItem'

class Grid extends Component {
    constructor(props) {
        super(props)
        this.state = {
            urls: props.urls,
            title: props.match.params.title
        }
    }

    render() {
        return (
            this.state.urls.map((url) =>
                <SliderItem data={{url:url, title:''}} />
            )
        );
    }
}

export default Grid
