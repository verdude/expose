import React, { Component } from 'react'
import styled, { keyframes, css } from 'styled-components'

const Background = styled.div`
    background-color: rgba(0, 0, 0, .5);
    position: absolute;
    height: ${props => props.height}px;
    width: ${props => props.width}px;
    top: ${props => props.top}px;
    left: ${props => props.left}px;
    display: flex;
    flex-flow: column;
    justify-content: center;
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
align-self: center;

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

class BlowupImage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loaded: false,
            width: 0,
            height: 0,
            isOpen: true,
            url: props.url,
            mobile: window.isMobile(),
            bg: {
                w: 0,
                h: 0,
                t: 0
            }
        }
        this.resizer = this.resize.bind(this)
    }

    imageDimensions(ww, wh, iw, ih) {
        let ratio = 0

        if (ww < iw) {
            ratio = ww / iw
            iw = ww
            ih = ih * ratio
        }

        if (wh < ih) {
            ratio = wh / ih
            ih = wh
            iw = iw * ratio
        }

        return {
            w: iw,
            h: ih
        }
    }

    loadImage() {
        var that = this
        var temp = new Image();
        temp.onload = (e) => {
            let { w:ww, h:wh } = this.bgDims()
            let { w, h } = this.imageDimensions(ww, wh, e.target.width, e.target.height)
            if (this.state.width !== w || this.state.height !== h) {
                that.setState({ loaded:true, width:w, height:h })
            }
        }
        temp.src = this.state.url
    }

    bgDims() {
        return {
            h: this.state.mobile ? document.documentElement.clientHeight : window.innerHeight,
            w: this.state.mobile ? document.documentElement.clientWidth : window.innerWidth,
            t: window.pageYOffset,
            l: window.pageXOffset
        }
    }

    resize() {
        this.loadImage()
        let { w, h, t, l } = this.bgDims()
        console.log(t, l)
        if (this.state.bg.h !== h || this.state.bg.w !== w || this.state.bg.t !== t || this.state.bg.l !== l) {
            this.setState({ bg: { h:h, w:w, t:t, l:l } })
        }
    }

    componentWillMount() {
        this.resize()
        window.addEventListener("resize", this.resizer)
        document.body.classList.add("noscroll")
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resizer)
        document.body.classList.remove("noscroll")
    }

    render() {
        return (
            <Background onClick={this.props.close} top={this.state.bg.t} left={this.state.bg.l}
                height={this.state.bg.h} width={this.state.bg.w}>
                <Img loaded={this.state.loaded} width={this.state.width} height={this.state.height}
                    src={this.props.url} />
            </Background>
        )
    }
}

export default BlowupImage

