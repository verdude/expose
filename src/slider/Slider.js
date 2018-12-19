import React, { Component } from 'react';
import styled from 'styled-components';

const Selection = styled.div`
  display: grid;
  grid-template: 100% / 1fr 1fr 1fr 1fr;
  overflow: hidden;
`

const ImgContainer = styled.div`
  position: relative;
  height: 300px;
  width: 300px;
  overflow: hidden;
`

const SquareImg = styled.img`
  position: absolute;
  left: 50%;
  top: 50%;
  height: 100%;
  width: 100%;
  width: auto;
  -webkit-transform: translate(-50%,-50%);
  -ms-transform: translate(-50%,-50%);
  transform: translate(-50%,-50%);
`

class Slider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mediums: props.mediums
        }
    }
    render() {
        return (
            <div>
                <Selection>{
                    this.state.mediums.map(m => {
                        return (
                            <ImgContainer>
                                <SquareImg src={m.img} />
                            </ImgContainer>
                        )
                    })}
                </Selection>
            </div>
        )
    }
}

export default Slider;
