import React, { Component } from 'react'
import styled from 'styled-components'

import { images } from '../imgs'
import Img from '../image/Img'
import BlowupImage from '../image/blowup'

const Grid4 = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);

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
            mobile: window.isMobile()
        }
    }

    blowup(img) {
        this.setState({largeImage:img})
    }

    close() {
        this.setState({largeImage: null})
    }

    render() {
        return (
            <div>
                <Grid4>
                {
                    this.state.urls.map((img, i) =>
                        <div onClick={this.blowup.bind(this, img)} key={i}>
                            <Img isLink={false} data={{img: img, title: ''}} />
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

