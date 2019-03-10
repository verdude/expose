import React, { Component } from 'react'
import styled from 'styled-components'

import SliderItem from '../slider/SliderItem'
import { images } from '../imgs'
import Img from '../image/Img'

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
            title: props.match.params.title
        }
    }

    render() {
        return (
            <Grid4>
            {
                this.state.urls.map((img, i) =>
                    <Img isLink={false} key={i} data={{img: img, title: ''}} />
                )
            }
            </Grid4>
        )
    }
}

export default Grid
