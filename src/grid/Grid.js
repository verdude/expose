import React, { Component } from 'react'
import styled from 'styled-components'

import { images } from '../imgs'
import Img from '../image/Img'
import BlowupImage from '../image/blowup'

const Grid4 = styled.div`
    display: grid;
    grid-template-columns: repeat(${props => props.cols || 1}, 1fr);

    & div {
        justify-self: center;
    }
    :hover {
        cursor: pointer;
    }
`

class Grid extends Component {
    constructor(props) {
        super(props)
        this.state = {
            urls: images[props.match.params.title],
            title: props.match.params.title,
            largeImage: null,
            mobile: window.isMobile(),
            width: "17.8rem",
            cols: NaN
        }
        this.resizer = this.resize.bind(this)
    }

    blowup(img) {
        this.setState({largeImage:img})
    }

    close() {
        this.setState({largeImage: null})
    }

    rem2px(r) {
        return r*parseFloat(getComputedStyle(document.documentElement).fontSize)
    }

    resize() {
        const iw = this.rem2px(Number.parseFloat(this.state.width) || 17.8)
        const ww = this.state.mobile ? document.documentElement.clientWidth: window.innerWidth
        const max_cols = 4
        const n_cols = Math.min(max_cols, Math.floor(ww/iw))
        this.setState({cols: n_cols})
    }

    componentWillMount() {
        this.resize()
        window.addEventListener("resize", this.resizer)
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resizer)
    }

    render() {
        return (
            <div>
                <Grid4 cols={this.state.cols}>
                {
                    this.state.urls.map((img, i) =>
                        <div onClick={this.blowup.bind(this, img)} key={i}>
                            <Img width={this.state.width} isLink={false} data={{img: img, title: ''}} />
                        </div>
                    )
                }
                </Grid4>
                {this.state.largeImage?<BlowupImage close={this.close.bind(this)} url={this.state.largeImage} />:null}
            </div>
        )
    }
}

export default Grid

