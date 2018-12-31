import React, { Component } from 'react';
import styled, { css } from 'styled-components';

const IMG_WIDTH = 300
const IMG_HEIGHT = 300
const IMG_MARGIN = 5

const Selection = styled.div`
  width: ${(IMG_WIDTH+IMG_MARGIN*2)*4}px;
  margin-right: auto;
  margin-left: auto;
  border: solid blue 1px;
  white-space: nowrap;
  overflow: hidden;
  display: inline-block;
`

const ImgContainer = styled.div`
  display: inline-block;
  position: relative;
  height: ${IMG_HEIGHT}px;
  width: ${IMG_WIDTH}px;
  padding: 0px;
  overflow: hidden;
  border: solid red 1px;
  margin: ${IMG_MARGIN}px;
`

const SquareImg = styled.img`
  position: absolute;
  left: 50%;
  top: 50%;
  height: 100%;
  width: auto;
  -webkit-transform: translate(-50%,-50%);
  -ms-transform: translate(-50%,-50%);
  transform: translate(-50%,-50%);
`

const SliderContainer = styled.div`
  display: flex;
  flex-flow: row no wrap;
  align-items: center;
  border: solid black 1px;
`

const Arrow = styled.a`
  display: inline-block;
  margin: 5px;
  ${props => props.right ? css`
    right: 20px;
    border-left: 30px solid palevioletred;
  ` : css`
    left: 20px;
    border-right: 30px solid palevioletred;
  `}
  border-top: 40px solid transparent;
  border-bottom: 40px solid transparent;
  width: 0;
  height: 0;
  opacity: 0.4;
  cursor: pointer;
  transition: 0.25s ease opacity;
  -webkit-transition: 0.25s ease opacity;
  -moz-transition: 0.25s ease opacity;
  -o-transition: 0.25s ease opacity;
  -ms-transition: 0.25s ease opacity;
`

class Slider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mediums: []
    }
  }

  shift(id, right){
    var els = document.querySelectorAll(id);
    console.log(right);
    [].forEach.call(els, (el) => {
      el.classList.toggle('dancer')
    })
  }

  arrToHex(n) {
    const hexies = ['A', 'B', 'C', 'D', 'E', 'F'],
      byte = n & 0xff, lob = 0xf, hob = 0xf0
    let first = (hob & byte) >> 4
    first = first > 9 ? hexies[first % 10] : first+''
    let second = lob & byte
    second = second > 9 ? hexies[second % 10] : second+''
    return first + second
  }
  
  gen_hashes(mediums) {
    let encoder = new TextEncoder()
    return Promise.all(mediums.map(async m => {
      let data = encoder.encode(m.url+m.title)
      let digest = await window.crypto.subtle.digest('SHA-512', data)
      m.key = Array.apply(null, new Uint8Array(digest)).map(this.arrToHex).join('')
      return m
    }))
  }

  async componentDidMount() {
    let mediums = [
      {
        "img": "https://images.unsplash.com/photo-1527602433043-7d8923f324eb",
        "title": "Sketch"
      },
      {
        "img": "https://images.unsplash.com/photo-1527602433043-7d8923f324eb",
        "title": "Acrylic"
      },
      {
        "img": "https://images.unsplash.com/photo-1527602433043-7d8923f324eb",
        "title": "Charcoal"
      },
      {
        "img": "https://images.unsplash.com/photo-1546029115-712217181a58",
        "title": "Watercolor"
      },
      {
        "img": "https://images.unsplash.com/photo-1527602433043-7d8923f324eb",
        "title": "Something Else"
      }
    ]
    mediums = await this.gen_hashes(mediums)
    this.setState({mediums: mediums})
  }
  
  render() {
    return (
      <SliderContainer>
          <Arrow onClick={this.shift.bind(this, '.img', false)} />
          <Selection>
            {this.state.mediums.map(m => {
              return (
                <ImgContainer className='img' key={m.key} >
                  <SquareImg src={m.img} />
                </ImgContainer>
              )
            })}
          </Selection>
          <Arrow right={true} onClick={this.shift.bind(this, '.img', true)} />
      </SliderContainer>
    )
  }
}

export default Slider;
