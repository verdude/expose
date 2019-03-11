import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'

import Thumbnail from './Thumbnail'
import { Link } from 'react-router-dom'

const Container = styled.div`
    text-decoration:none;
    color: black;
    padding: 1em;
    & h4 {
        font-weight: 500;
        text-align: center;
    }

    & div {
        box-shadow: 7px 7px 5px #aaaaaa;
        border-radius: 3px;
    }
`

class Picture extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLink: props.isLink,
            img: props.data.img,
            title: props.data.title,
            loaded: false
        }
    }

    componentWillMount() {
        var that = this
        var temp = new Image();
        temp.onload = () => {
            that.setState({loaded: true})
        }
        temp.src = this.state.img
    }

    render() {
        return (
            <Container as={this.state.isLink ? Link : undefined} to={`/${this.state.title}`}>
                <Thumbnail src={this.state.img} loaded={this.state.loaded} />
                {this.state.title?<h4>{this.state.title}</h4>:null}
            </Container>
        )
    }
}

export default Picture
