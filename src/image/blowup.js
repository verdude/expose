import React, { Component } from 'react'
import styled, { keyframes, css } from 'styled-components'

const LargeImage = styled.div`
    top: 40px;
    left: 40px;
    right: 40px;
    botton: 40px;
    position: absolute;
    background-color: white;
`

const shimmer = keyframes`
0% {
    background-position: -30rem 0;
}
100% {
    background-position: 30rem 0;
}
`

const Img = styled.div`
width: ${props => props.width }px;
height: ${props => props.height}px;
margin-bottom: 1rem;

${
    props => !props.loaded ?
    css`animation: ${shimmer} 2s linear infinite;
    animation-fill-mode: forwards;
    background-color: #eee;
    background-image: linear-gradient(to right, #eee 0%, #fff 50%, #eee 100%);
    background-repeat: no-repeat;`
    :
    css`background: url(${props => props.src}) center no-repeat;
    background-color: gray;
    background-size: cover;`
}
`

const Closer = styled.div`
    :hover {
        cursor: pointer;
    }
`

class BlowupImage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loaded: false,
            width: 0,
            height: 0,
            isOpen: true
        }
    }

    calcDimensions(url) {
        var that = this
        var temp = new Image();
        temp.onload = (e) => {
            if (that.state.width !== e.target.width && that.state.height !== e.target.height) {
                that.setState({loaded:true, width:e.target.width, height:e.target.height})
            }
        }
        temp.src = url
    }

    render() {
        this.calcDimensions(this.props.url)
        if (this.props.url) {
            return (
                <LargeImage>
                    <Closer onClick={this.props.close}>X</Closer>
                    <Img loaded={this.state.loaded} width={this.state.width} height={this.state.height}
                        src={this.props.url} />
                </LargeImage>
            )
        }
        else return null
    }
}

export default BlowupImage

