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
`

class Grid extends Component {
    constructor(props) {
        super(props)
        this.state = {
            urls: images[props.match.params.title],
            title: props.match.params.title,
            largeImage: null
        }
    }

    blowup(img) {
        this.setState({largeImage:img})
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
                <BlowupImage close={() => this.setState({largeImage:null})} url={this.state.largeImage} />
            </div>
        )
    }
}

export default Grid

